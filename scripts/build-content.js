const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const VIDEOS_FILE = path.join(__dirname, '../data/videos.md');
const SCHEDULE_FILE = path.join(__dirname, '../data/schedule.md');
const RESUME_FILE = path.join(__dirname, '../resources/resume/haeyeon.lee.md');
const VIEWS_FILE = path.join(__dirname, '../js/views.js');

// Helper to clean Markdown bold syntax
function cleanMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// 1. Scan Images
function getImages() {
    if (!fs.existsSync(IMAGES_DIR)) return [];
    return fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => `assets/images/${file}`);
}

// 2. Fetch OEmbed Data
function fetchOEmbed(url) {
    return new Promise((resolve) => {
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            resolve(null);
            return;
        }
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

        https.get(oembedUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({
                        title: json.title,
                        thumbnail: json.thumbnail_url,
                        html: json.html, // iframe
                        url: url
                    });
                } catch (e) {
                    console.error(`Failed to parse OEmbed for ${url}`);
                    resolve(null);
                }
            });
        }).on('error', (err) => {
            console.error(`Error fetching OEmbed for ${url}: ${err.message}`);
            resolve(null);
        });
    });
}

async function getVideos() {
    if (!fs.existsSync(VIDEOS_FILE)) return [];

    const content = fs.readFileSync(VIDEOS_FILE, 'utf8');
    const lines = content.split('\n');
    const videos = [];

    // Parse Markdown Table
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('|')) {
            // Skip header and separator
            if (trimmed.includes('---')) continue;
            if (trimmed.toLowerCase().includes('date') && trimmed.toLowerCase().includes('description') && trimmed.toLowerCase().includes('youtube')) continue;

            const cols = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
            if (cols.length >= 3) {
                const [date, description, url] = cols;
                const oembedData = await fetchOEmbed(url);

                if (oembedData) {
                    videos.push({
                        ...oembedData,
                        // title is auto-fetched from OEmbed
                        uploadDate: date,
                        description: description
                    });
                }
            }
        }
    }
    return videos;
}

function generateMediaView(images, videos, activeTab = 'photos') {
    const photosActive = activeTab === 'photos' ? 'active' : '';
    const videoActive = activeTab === 'video' ? 'active' : '';
    const photosDisplay = activeTab === 'photos' ? 'block' : 'none';
    const videoDisplay = activeTab === 'video' ? 'block' : 'none';

    const photosHtml = images.map(img =>
        `<img src="${img}" alt="Gallery Image" loading="lazy">`
    ).join('\n                    ');

    const videosHtml = videos.map(v => `
                    <div class="video-card">
                        <div class="video-wrapper">
                            ${v.html}
                        </div>
                        <div class="video-info">
                            <h3>${v.title}</h3>
                            <p class="date">${v.uploadDate}</p>
                            <p class="desc">${v.description}</p>
                        </div>
                    </div>
    `).join('\n');

    return `
    <section class="content-section fade-in">
        <h2>Media</h2>
        <div class="media-tabs">
            <a href="/media/photos" class="tab-btn ${photosActive}" data-link>Photos</a>
            <a href="/media/videos" class="tab-btn ${videoActive}" data-link>Video</a>
        </div>
        <div class="media-content">
            <div id="photos" class="tab-pane ${photosActive}" style="display:${photosDisplay};">
                <div class="media-grid">
                    ${photosHtml}
                </div>
            </div>
            <div id="video" class="tab-pane ${videoActive}" style="display:${videoDisplay};">
                <div class="video-grid">
                    ${videosHtml}
                </div>
            </div>
        </div>
    </section>
`;
}

// 3. Parse Schedule
function getSchedule() {
    if (!fs.existsSync(SCHEDULE_FILE)) return [];

    const content = fs.readFileSync(SCHEDULE_FILE, 'utf8');
    const lines = content.split('\n');
    const events = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('|')) {
            if (trimmed.includes('---')) continue;
            if (trimmed.toLowerCase().includes('date') && trimmed.toLowerCase().includes('event')) continue;

            const cols = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
            if (cols.length >= 3) {
                events.push({
                    date: cols[0],
                    event: cols[1],
                    location: cols[2]
                });
            }
        }
    }
    return events;
}

function generateScheduleHTML(events) {
    if (events.length === 0) return '<p>No upcoming events.</p>';

    const listItems = events.map(e => `
            <li class="schedule-item">
                <span class="date">${e.date}</span>
                <span class="event">${e.event}</span>
                <span class="location">${e.location}</span>
            </li>`).join('\n');

    return `
    <section class="content-section fade-in">
        <h2>Schedule</h2>
        <ul class="schedule-list">
            ${listItems}
        </ul>
    </section>
`;
}

// 4. Parse Resume
function getResume() {
    if (!fs.existsSync(RESUME_FILE)) return { bio: '', cv: [] };

    const content = fs.readFileSync(RESUME_FILE, 'utf8');
    const sections = content.split('**'); // Split by bold headers

    let bio = '';
    let cv = [];

    for (let i = 1; i < sections.length; i += 2) {
        const title = sections[i].trim(); // e.g. "Bio Page", "CV Page", "Selected Performances"
        const body = sections[i + 1] || ''; // Content

        if (title.toUpperCase() === 'BIO PAGE' || title.toUpperCase() === 'BIO') {
            // Split by double newline (or more) for paragraphs
            bio = body.trim().split(/\n{2,}/).map(p => `<p>${p.trim()}</p>`).join('\n');
        } else if (title.toUpperCase() === 'CV PAGE') {
            // Skip the "CV Page" marker section
            continue;
        } else {
            // For CV sections (e.g. Selected Performances)
            // Split by double newline to identify separate "Items"
            // e.g. "Title \n Location" is one item.
            const rawItems = body.trim().split(/\n{2,}/).filter(l => l.trim() !== '');

            const formattedItems = rawItems.map(item => {
                // Replace single newlines with <br> for visual formatting
                // Clean bold syntax just in case
                return `<li>${cleanMarkdown(item).replace(/\n/g, '<br>')}</li>`;
            });

            cv.push({
                title: title,
                items: formattedItems
            });
        }
    }
    return { bio, cv };
}

function generateAboutHTML(resumeData) {
    const { bio, cv } = resumeData;

    const cvHtml = cv.map(section => `
        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">${section.title}</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                ${section.items.join('\n')}
            </ul>
        </div>
    `).join('\n');

    const portraitImg = 'assets/images/EYR00610.JPG';

    return `
    <section class="content-section fade-in">
        <h2>About</h2>
        
        <!-- TABS HEADER -->
        <div class="media-tabs" style="margin-bottom: 2rem;">
            <button class="tab-btn active" data-tab="tab-bio">Bio</button>
            <button class="tab-btn" data-tab="tab-cv">CV</button>
        </div>

        <!-- BIO TAB (With Split Layout & Photo) -->
        <div id="tab-bio" class="tab-pane active">
            <div class="split-layout">
                <div class="text-column">
                    <div class="bio-content">
                        ${bio}
                    </div>
                </div>
                <!-- Photo lives INSIDE the bio tab -->
                <div class="image-column">
                    <img src="${portraitImg}" alt="Haeyeon Lee Portrait" class="about-image">
                </div>
            </div>
        </div>

        <!-- CV TAB (Full Width, No Photo) -->
        <div id="tab-cv" class="tab-pane" style="display:none;">
            <div class="cv-container" style="max-width: 800px; margin: 0 auto;">
                ${cvHtml}
            </div>
        </div>

    </section>
`;
}

async function main() {
    const images = getImages();
    console.log(`Found ${images.length} images.`);

    const videos = await getVideos();
    console.log(`Processed ${videos.length} videos.`);

    const schedule = getSchedule();
    console.log(`Found ${schedule.length} schedule events.`);

    const resume = getResume();
    console.log(`Parsed resume sections: Bio length ${resume.bio.length}, CV sections ${resume.cv.length}`);

    const newMediaHTML = generateMediaView(images, videos);
    const newScheduleHTML = generateScheduleHTML(schedule);
    const newAboutHTML = generateAboutHTML(resume);

    let viewsContent = fs.readFileSync(VIEWS_FILE, 'utf8');

    // Replace mediaView
    const mediaRegex = /export const mediaView = \(\) => `[\s\S]*?`;/;
    if (mediaRegex.test(viewsContent)) {
        viewsContent = viewsContent.replace(mediaRegex, `export const mediaView = (activeTab = 'photos') => \`${newMediaHTML}\`.replace(/id="photos" class="tab-pane.*?" style="display:.*?"/, \`id="photos" class="tab-pane \${activeTab === 'photos' ? 'active' : ''}" style="display:\${activeTab === 'photos' ? 'block' : 'none'};"\`).replace(/id="video" class="tab-pane.*?" style="display:.*?"/, \`id="video" class="tab-pane \${activeTab === 'video' ? 'active' : ''}" style="display:\${activeTab === 'video' ? 'block' : 'none'};"\`).replace(/href="\\/media\\/photos" class="tab-btn.*?"/, \`href="/media/photos" class="tab-btn \${activeTab === 'photos' ? 'active' : ''}"\`).replace(/href="\\/media\\/videos" class="tab-btn.*?"/, \`href="/media/videos" class="tab-btn \${activeTab === 'video' ? 'active' : ''}"\`);`);
    } else {
        console.error('Could not find mediaView');
    }

    // Replace scheduleView
    const scheduleRegex = /export const scheduleView = \(\) => `[\s\S]*?`;/;
    if (scheduleRegex.test(viewsContent)) {
        viewsContent = viewsContent.replace(scheduleRegex, `export const scheduleView = () => \`${newScheduleHTML}\`;`);
    } else {
        console.error('Could not find scheduleView');
    }

    // Replace aboutView
    const aboutRegex = /export const aboutView = \(\) => `[\s\S]*?`;/;
    if (aboutRegex.test(viewsContent)) {
        viewsContent = viewsContent.replace(aboutRegex, `export const aboutView = () => \`${newAboutHTML}\`;`);
    } else {
        console.error('Could not find aboutView');
    }

    fs.writeFileSync(VIEWS_FILE, viewsContent);
    console.log('Updated views.js.');
}

main();
