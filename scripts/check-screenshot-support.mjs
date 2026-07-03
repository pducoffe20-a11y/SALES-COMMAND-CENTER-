import { existsSync } from 'node:fs';
import { delimiter, join } from 'node:path';

function commandExists(command) {
  const pathDirs = (process.env.PATH || '').split(delimiter);
  return pathDirs.some((dir) => existsSync(join(dir, command)) || existsSync(join(dir, `${command}.exe`)));
}

const playwrightAvailable = existsSync('node_modules/playwright/package.json');
const chromiumAvailable = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'].some(commandExists);

if (playwrightAvailable || chromiumAvailable) {
  console.log('Screenshot support available.');
  process.exit(0);
}

console.log('Screenshot support unavailable: install Playwright or a Chromium-compatible browser to capture UI screenshots.');
process.exit(0);
