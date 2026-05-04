import { spawn } from 'node:child_process';
import { execSync } from 'node:child_process';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE = `http://${HOST}:${PORT}`;
const ROUTES = ['/', '/pages/dangnhap', '/pages/quanlytaikhoan'];

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
  const preview = spawn(`pnpm preview --host ${HOST} --port ${PORT}`, {
    shell: true,
    stdio: 'pipe',
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
      execSync(`taskkill /PID ${preview.pid} /T /F`, { stdio: 'ignore' });
    } catch {
      preview.kill('SIGTERM');
    }
  }

  if (preview.exitCode && preview.exitCode !== 0) {
    throw new Error(`Preview exited with code ${preview.exitCode}\n${logs}`);
  }
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
