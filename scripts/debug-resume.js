const fs = require('fs');
const path = require('path');

// Mock helpers
function cleanMarkdown(text) { return text; }

const RESUME_FILE = path.join(__dirname, '../resources/resume/haeyeon.lee.md');

// Code from build-content.js
function getResume() {
    if (!fs.existsSync(RESUME_FILE)) return { bio: '', cv: [] };

    const content = fs.readFileSync(RESUME_FILE, 'utf8');
    const sections = content.split('**');

    let bio = '';
    let cv = [];

    for (let i = 1; i < sections.length; i += 2) {
        const title = sections[i].trim();
        const body = sections[i + 1] || '';

        if (title.toUpperCase() === 'BIO PAGE' || title.toUpperCase() === 'BIO') {
            bio = body.trim().split(/\n{2,}/).map(p => `<p>${p.trim()}</p>`).join('\n');
        } else if (title.toUpperCase() === 'CV PAGE') {
            continue;
        } else {
            const rawItems = body.trim().split(/\n{2,}/).filter(l => l.trim() !== '');
            const formattedItems = rawItems.map(item => `<li>${cleanMarkdown(item).replace(/\n/g, '<br>')}</li>`);

            cv.push({
                title: title,
                items: formattedItems
            });
        }
    }
    return { bio, cv };
}

const data = getResume();
console.log('--- BIO HTML ---');
console.log(data.bio);
console.log('--- CV SECTIONS ---');
data.cv.forEach(c => {
    console.log(`SECTION: ${c.title}`);
    console.log(`ITEMS: ${c.items.length}`);
    console.log(c.items.join('\n'));
});
