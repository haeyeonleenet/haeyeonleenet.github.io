const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const JS_ENTRY = path.join(ROOT_DIR, 'src/js/main.js');
const JS_OUT = path.join(ROOT_DIR, 'js/bundle.min.js');


console.log('Building assets...');

try {
    // 1. Bundle and Minify JS
    console.log('Bundling JS...');
    const outDir = path.dirname(JS_OUT);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    if (!fs.existsSync(JS_ENTRY)) {
        throw new Error(`JS Entry file not found: ${JS_ENTRY}`);
    }

    const esbuildBin = path.join(ROOT_DIR, 'node_modules/.bin/esbuild');
    if (!fs.existsSync(esbuildBin)) {
        // Fallback to npx if binary not found (local dev vs CI?)
        console.warn('Local esbuild binary not found, falling back to npx');
        execSync(`npx esbuild "${JS_ENTRY}" --bundle --minify --outfile="${JS_OUT}"`, { stdio: 'inherit', cwd: ROOT_DIR });
    } else {
        execSync(`"${esbuildBin}" "${JS_ENTRY}" --bundle --minify --outfile="${JS_OUT}"`, { stdio: 'inherit', cwd: ROOT_DIR });
    }
    console.log(`JS bundled to ${JS_OUT}`);

    console.log('Assets build complete.');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
