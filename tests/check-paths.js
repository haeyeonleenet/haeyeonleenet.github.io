const fs = require('fs');
const path = require('path');

const MEDIA_PHOTOS_FILE = path.join(__dirname, '../media/photos/index.html');
const VIEWS_FILE = path.join(__dirname, '../js/views.js');

let hasError = false;

// Test 1: Check absolute paths in media/photos/index.html
try {
    const content = fs.readFileSync(MEDIA_PHOTOS_FILE, 'utf8');
    const imgTags = content.match(/<img src=".*?"/g) || [];

    console.log('Checking image paths in media/photos/index.html...');
    imgTags.forEach(tag => {
        if (!tag.includes('src="/assets')) {
            console.error(`ERROR: Found relative path: ${tag}. Expected absolute path starting with /assets.`);
            hasError = true;
        } else {
            console.log(`OK: ${tag}`);
        }
    });

    if (imgTags.length === 0) {
        console.warn('WARNING: No image tags found to check.');
    }
} catch (e) {
    console.error(`ERROR: Could not read ${MEDIA_PHOTOS_FILE}: ${e.message}`);
    hasError = true;
}

// Test 2: Check scheduleView availability in js/views.js
try {
    const viewsContent = fs.readFileSync(VIEWS_FILE, 'utf8');
    console.log('\nChecking scheduleView in js/views.js...');
    if (viewsContent.includes('export const scheduleView =')) {
        console.log('OK: scheduleView is present.');
    } else {
        console.error('ERROR: scheduleView is MISSING from js/views.js!');
        hasError = true;
    }
} catch (e) {
    console.error(`ERROR: Could not read ${VIEWS_FILE}: ${e.message}`);
    hasError = true;
}

if (hasError) {
    console.error('\nTests FAILED.');
    process.exit(1);
} else {
    console.log('\nTests PASSED.');
    process.exit(0);
}
