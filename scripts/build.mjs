import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

rmSync('dist', { recursive: true, force: true });
rmSync('.app', { recursive: true, force: true });
execFileSync('npx', ['tsc', '-p', 'tsconfig.build.json'], { stdio: 'inherit' });

mkdirSync('dist/assets', { recursive: true });
mkdirSync('dist/react', { recursive: true });
mkdirSync('dist/react-dom', { recursive: true });

cpSync('.app', 'dist/assets', { recursive: true });
copyFileSync('vendor/react/index.js', 'dist/react/index.js');
copyFileSync('vendor/react/jsx-runtime.js', 'dist/react/jsx-runtime.js');
copyFileSync('vendor/react-dom/client.js', 'dist/react-dom/client.js');

const cssFiles = ['src/styles.css', 'src/saas-bi.css'];
const combinedCss = cssFiles
  .filter((filePath) => existsSync(filePath))
  .map((filePath) => readFileSync(filePath, 'utf8'))
  .join('\n\n');
writeFileSync('dist/assets/styles.css', combinedCss);

writeFileSync('dist/index.html', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sales Command Center</title>
    <script type="importmap">{"imports":{"react":"/react/index.js","react/jsx-runtime":"/react/jsx-runtime.js","react-dom/client":"/react-dom/client.js"}}</script>
    <link rel="stylesheet" href="/assets/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main.js"></script>
  </body>
</html>
`);
