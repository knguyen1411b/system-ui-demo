import { spawn } from 'node:child_process';
import { once } from 'node:events';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE = `http://${HOST}:${PORT}`;
const ROUTES = [
  '/',
  '/pages/gioithieuhethong',
  '/pages/dangnhap',
  '/pages/bangdieukhien',
  '/pages/baohong',
  '/pages/dangky',
  '/pages/dichvu',
  '/pages/lichsu',
  '/pages/phonghientai',
  '/pages/quanlybanggia',
  '/pages/quanlydichvu',
  '/pages/quanlyloaiphong',
  '/pages/quanlyphong',
  '/pages/quanlytaikhoan',
  '/pages/thuephong',
  '/pages/trangcanhan',
  '/pages/traphong',
];
const PNPM_EXEC_PATH = process.env.npm_execpath;
const PNPM_FALLBACK = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntilReady(timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {
      // wait for preview server
    }
    await sleep(400);
  }
  throw new Error('Preview server did not become ready in time.');
}

async function run() {
  const previewCommand = PNPM_EXEC_PATH || PNPM_FALLBACK;
  const previewArgs = PNPM_EXEC_PATH
    ? [previewCommand, 'preview', '--host', HOST, '--port', String(PORT)]
    : ['preview', '--host', HOST, '--port', String(PORT)];

  const preview = spawn(PNPM_EXEC_PATH ? process.execPath : previewCommand, previewArgs, {
    shell: false,
    stdio: 'pipe',
  });
  preview.on('error', (err) => {
    console.error(`Failed to start preview server: ${err.message}`);
    process.exit(1);
  });
  let logs = '';
  preview.stdout.on('data', (d) => {
    logs += d.toString();
  });
  preview.stderr.on('data', (d) => {
    logs += d.toString();
  });

  try {
    await waitUntilReady(45000);

    for (const route of ROUTES) {
      const res = await fetch(`${BASE}${route}`);
      if (!res.ok) throw new Error(`Route ${route} returned status ${res.status}`);
      const html = await res.text();
      if (!html.includes('<div id="root">')) {
        throw new Error(`Route ${route} did not return app shell HTML.`);
      }
    }

    console.log('Smoke routes OK:', ROUTES.join(', '));
  } finally {
    try {
      preview.kill('SIGTERM');
      await Promise.race([once(preview, 'exit'), sleep(5000)]);
      if (preview.exitCode === null) {
        preview.kill('SIGKILL');
        await Promise.race([once(preview, 'exit'), sleep(3000)]);
      }
    } catch {
      // no-op
    }
  }

  if (preview.exitCode !== null && preview.exitCode !== 0) {
    throw new Error(`Preview exited with code ${preview.exitCode}\n${logs}`);
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
