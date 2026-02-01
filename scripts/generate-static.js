const fs = require('fs');
const path = require('path');
const https = require('https');

// --- CONFIG ---
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

const IMAGES_DIR = path.join(ASSETS_DIR, 'images');
const VIDEOS_FILE = path.join(ASSETS_DIR, 'videos/videos.md');
const RESUME_FILE = path.join(ASSETS_DIR, 'resume/haeyeon.lee.md');

// --- HELPERS ---

// 1. Helper to clean Markdown bold syntax
function cleanMarkdown(text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// 2. Fetch OEmbed Data (Async)
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

// --- DATA FETCHING ---

// 1. Get Images
function getImages() {
    if (!fs.existsSync(IMAGES_DIR)) return [];
    return fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .filter(file => !['main.jpeg', 'about.jpeg'].includes(file))
        .map(file => `/assets/images/${file}`);
}

// 2. Get Videos
async function getVideos() {
    if (!fs.existsSync(VIDEOS_FILE)) return [];

    const content = fs.readFileSync(VIDEOS_FILE, 'utf8');
    const lines = content.split('\n');
    const videos = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('|')) {
            if (trimmed.includes('---')) continue;
            if (trimmed.toLowerCase().includes('date') && trimmed.toLowerCase().includes('description')) continue;

            const cols = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
            if (cols.length >= 3) {
                const [date, description, url] = cols;
                const oembedData = await fetchOEmbed(url);

                if (oembedData) {
                    videos.push({
                        ...oembedData,
                        uploadDate: date,
                        description: description
                    });
                }
            }
        }
    }
    return videos;
}

// 3. Get Resume (Bio & CV)
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
            bio = body.trim().split(/\n{2,}/).map(p => `<p>${cleanMarkdown(p.trim())}</p>`).join('\n');
        } else if (title.toUpperCase() === 'CV PAGE') {
            continue;
        } else {
            const rawItems = body.trim().split(/\n{2,}/).filter(l => l.trim() !== '');
            const formattedItems = rawItems.map(item => {
                return `<li>${cleanMarkdown(item).replace(/\n/g, '<br>')}</li>`;
            });

            if (formattedItems.length > 0) {
                cv.push({
                    title: title,
                    items: formattedItems
                });
            }
        }
    }
    return { bio, cv };
}

// --- HTML GENERATION ---

function generateCVHTML(cvData) {
    return cvData.map(section => `
        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">${section.title}</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                ${section.items.join('\n')}
            </ul>
        </div>
    `).join('\n');
}

function generatePhotosHTML(images) {
    return `
        <div class="media-grid">
            ${images.map(img => `<img src="${img}" alt="Gallery Image" loading="lazy">`).join('\n')}
        </div>
    `;
}

function generateVideosHTML(videos) {
    return `
        <div class="video-grid">
            ${videos.map(v => `
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
            `).join('\n')}
        </div>
    `;
}

// --- MAIN BUILD ---

async function build() {
    console.log('Starting SSG Build...');

    // 1. Fetch Data
    const images = getImages();
    const videos = await getVideos();
    const resume = getResume();
    console.log(`Loaded: ${images.length} images, ${videos.length} videos, Resume parsed.`);

    // 2. Read Templates
    const tplIndex = fs.readFileSync(path.join(SRC_DIR, 'index.html'), 'utf8');
    const tplAbout = fs.readFileSync(path.join(SRC_DIR, 'about.html'), 'utf8');
    const tplMedia = fs.readFileSync(path.join(SRC_DIR, 'media/index.html'), 'utf8');
    const tplContact = fs.readFileSync(path.join(SRC_DIR, 'contact.html'), 'utf8');

    // 3. Generate pages

    // A. Index (Home)
    const indexHTML = tplIndex.replace('<!-- DYNAMIC_BODY_CLASS -->', 'home-page');
    fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), indexHTML);
    console.log('Generated index.html');

    // B. About -> about/index.html
    const aboutDir = path.join(ROOT_DIR, 'about');
    if (!fs.existsSync(aboutDir)) fs.mkdirSync(aboutDir);

    const aboutHTML = tplAbout
        .replace('<!-- DYNAMIC_BIO -->', resume.bio)
        .replace('<!-- DYNAMIC_CV -->', generateCVHTML(resume.cv));
    fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHTML);
    console.log('Generated about/index.html');

    // C. Contact -> contact/index.html
    const contactDir = path.join(ROOT_DIR, 'contact');
    if (!fs.existsSync(contactDir)) fs.mkdirSync(contactDir);

    fs.writeFileSync(path.join(contactDir, 'index.html'), tplContact);
    console.log('Generated contact/index.html');

    // D. Media (Photos & Videos)
    const mediaDir = path.join(ROOT_DIR, 'media');
    const photosDir = path.join(mediaDir, 'photos');
    const videosDir = path.join(mediaDir, 'videos');

    if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir);
    if (!fs.existsSync(photosDir)) fs.mkdirSync(photosDir);
    if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir);

    // D-1. Photos Page
    const photosHTML = tplMedia
        .replace('<!-- ACTIVE_PHOTOS -->', 'active')
        .replace('<!-- ACTIVE_VIDEOS -->', '')
        .replace('<!-- DYNAMIC_MEDIA_CONTENT -->', generatePhotosHTML(images));
    fs.writeFileSync(path.join(photosDir, 'index.html'), photosHTML);
    // Also redirect /media/index.html to photos usually, or just duplicate content
    fs.writeFileSync(path.join(mediaDir, 'index.html'), photosHTML);
    console.log('Generated media/photos/index.html');

    // D-2. Videos Page
    const videosHTML = tplMedia
        .replace('<!-- ACTIVE_PHOTOS -->', '')
        .replace('<!-- ACTIVE_VIDEOS -->', 'active')
        .replace('<!-- DYNAMIC_MEDIA_CONTENT -->', generateVideosHTML(videos));
    fs.writeFileSync(path.join(videosDir, 'index.html'), videosHTML);
    console.log('Generated media/videos/index.html');

    console.log('SSG Build Complete.');
}

build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
