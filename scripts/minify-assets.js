const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const JS_ENTRY = path.join(ROOT_DIR, 'js/main.js');
const JS_OUT = path.join(ROOT_DIR, 'js/bundle.min.js');


console.log('Building assets...');

try {
    // 1. Bundle and Minify JS
    console.log('Bundling JS...');
    execSync(`npx esbuild "${JS_ENTRY}" --bundle --minify --outfile="${JS_OUT}"`, { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(`JS bundled to ${JS_OUT}`);



    console.log('Assets build complete.');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
