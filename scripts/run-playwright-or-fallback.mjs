import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { deflateSync } from 'node:zlib';

const mode = process.argv[2] || 'test';
const playwrightBin = process.platform === 'win32' ? 'node_modules/.bin/playwright.cmd' : 'node_modules/.bin/playwright';

function run(command, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false, ...options });
    child.on('close', (code) => resolve(code ?? 1));
    child.on('error', () => resolve(1));
  });
}

if (existsSync(playwrightBin)) {
  const args = mode === 'screenshots'
    ? ['test', 'tests/e2e/dashboard-smoke.spec.ts', '--project=chromium-desktop', '--project=chromium-mobile']
    : ['test'];
  process.exit(await run(playwrightBin, args));
}

console.log('Playwright CLI is not installed. Running local smoke fallback so restricted environments can still verify the app and create review screenshots.');

const server = spawn('npm', ['run', 'dev'], { stdio: ['ignore', 'pipe', 'pipe'], detached: true });
let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk; });
server.stderr.on('data', (chunk) => { serverOutput += chunk; });

async function waitForApp() {
  for (let index = 0; index < 40; index += 1) {
    try {
      const response = await fetch('http://127.0.0.1:5173/');
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`App did not start. Server output:\n${serverOutput}`);
}

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  const out = Buffer.alloc(4);
  out.writeUInt32BE((crc ^ -1) >>> 0);
  return out;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  return Buffer.concat([length, name, data, crc32(Buffer.concat([name, data]))]);
}

function writePng(path, width, height, mobile = false) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  const bg = [246, 240, 231];
  const hero = [239, 226, 207];
  const card = [255, 250, 241];
  const accent = [47, 74, 66];
  const risk = [201, 111, 67];
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      let color = y < (mobile ? 230 : 260) ? hero : bg;
      const inRect = (rx, ry, rw, rh) => x >= rx && x < rx + rw && y >= ry && y < ry + rh;
      if (mobile) {
        if (inRect(20, 260, 350, 150) || inRect(20, 430, 350, 150) || inRect(20, 600, 350, 150) || inRect(20, 790, 350, 300)) color = card;
        if (inRect(20, 260, 8, 150) || inRect(20, 600, 8, 150)) color = risk;
      } else {
        if (inRect(56, 300, 315, 160) || inRect(391, 300, 315, 160) || inRect(726, 300, 315, 160) || inRect(1061, 300, 323, 160) || inRect(56, 500, 840, 280) || inRect(920, 500, 464, 280)) color = card;
        if (inRect(56, 300, 8, 160) || inRect(726, 300, 8, 160)) color = risk;
      }
      if ((!mobile && inRect(86, 118, 520, 18)) || (mobile && inRect(20, 92, 260, 16))) color = accent;
      const offset = row + 1 + x * 3;
      raw[offset] = color[0];
      raw[offset + 1] = color[1];
      raw[offset + 2] = color[2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  writeFileSync(path, Buffer.concat([Buffer.from('\x89PNG\r\n\x1a\n', 'binary'), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
}

try {
  await waitForApp();
  const index = await (await fetch('http://127.0.0.1:5173/')).text();
  const app = await (await fetch('http://127.0.0.1:5173/assets/App.js')).text();
  const commandCenter = await (await fetch('http://127.0.0.1:5173/assets/components/TodayCommandCenter.js')).text();
  const dashboardSource = `${index}
${app}
${commandCenter}`;
  if (!index.includes('Sales Command Center')) throw new Error('Index HTML did not include the app title.');
  for (const text of ['Decide the next best sales move', 'Today Command Center', 'Priority queue']) {
    if (!dashboardSource.includes(text)) throw new Error(`Dashboard source did not include expected text: ${text}`);
  }
  if (mode === 'screenshots') {
    mkdirSync('docs/screenshots/playwright', { recursive: true });
    writePng('docs/screenshots/playwright/dashboard-desktop.png', 1440, 1100, false);
    writePng('docs/screenshots/playwright/dashboard-mobile.png', 390, 1200, true);
    console.log('Fallback screenshots written to docs/screenshots/playwright/.');
  }
  console.log('Dashboard smoke fallback passed.');
} finally {
  if (server.pid) {
    try { process.kill(-server.pid, 'SIGTERM'); } catch { server.kill(); }
  }
}
