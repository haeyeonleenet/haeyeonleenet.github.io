const fs = require('fs');
const path = require('path');

// Extract content from views.js strings (simplified regex approach since we can't import ES modules easily in CommonJS script without setup)
// Actually, we can read views.js file content and extract return values via regex to avoid module issues in a simple script.

const viewsPath = path.join(__dirname, '../js/views.js');
const viewsContent = fs.readFileSync(viewsPath, 'utf8');

const extractView = (name) => {
    // Regex matches: export const name = (...) => `...`;
    // We capture the content inside the backticks.
    // Updated to support arguments in function signature e.g. (activeTab = 'photos')
    // Updated to stop at the closing backtick, ignoring any chained methods like .replace()
    const regex = new RegExp(`export const ${name} = \\(.*?\\) => \`([\\s\\S]*?)\``);
    const match = viewsContent.match(regex);
    let content = match ? match[1] : '';
    // Robustness fix: If regex overshot and captured the closing backtick (and subsequent code),
    // truncate at the first backtick.
    if (content.includes('`')) {
        content = content.split('`')[0];
    }
    return content;
};

// We need to support passing arguments to the template for mediaView
// So we extract the function body string, but we also need to know how to "render" it with args if it was a real function.
// Since we are doing regex extraction of the template string, we are bypassing the function execution.
// BUT, my previous build-content.js change actually injects the logic INTO the template string using .replace().
// So the extracted string ALREADY contains the logic to handle activeTab if I extracted the whole thing.
// However, extractView above only captures content INSIDE the backticks of the first template literal. 
// My build-content.js change was: export const mediaView = (activeTab = 'photos') => `...`.replace(...)
// So the regex above will capture the `...` inside backticks, but MISS the .replace(...) chain at the end.
// This means the static generation will get the RAW template without the active class logic applied.

// Strategy: For static generation, we might want to just manually replace the active classes in the raw template 
// based on what page we are generating, similarly to how the build-script does it, 
// OR we can rely on the fact that we are generating distinct files.

const homeContent = extractView('homeView');
const aboutContent = extractView('aboutView');
const contactContent = extractView('contactView');
const mediaRawContent = extractView('mediaView'); // This gives us the raw HTML inside backticks

// Helper to apply active state to media content for static generation
const processMediaContent = (content, activeTab) => {
    const photosActive = activeTab === 'photos' ? 'active' : '';
    const videoActive = activeTab === 'video' ? 'active' : '';
    const photosDisplay = activeTab === 'photos' ? 'block' : 'none';
    const videoDisplay = activeTab === 'video' ? 'block' : 'none';

    return content
        .replace(/id="photos" class="tab-pane.*?" style="display:.*?"/, `id="photos" class="tab-pane ${photosActive}" style="display:${photosDisplay};"`)
        .replace(/id="video" class="tab-pane.*?" style="display:.*?"/, `id="video" class="tab-pane ${videoActive}" style="display:${videoDisplay};"`)
        .replace(/href="\/media\/photos" class="tab-btn.*?"/, `href="/media/photos" class="tab-btn ${photosActive}"`)
        .replace(/href="\/media\/videos" class="tab-btn.*?"/, `href="/media/videos" class="tab-btn ${videoActive}"`);
};

const template = (title, content, path) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="Official website of Soprano Haeyeon Lee. Biography, and Media.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Lato:wght@300;400&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header class="site-header">
        <div class="header-container">
            <a href="/" class="site-title" data-link>HAEYEON LEE</a>
            <button class="mobile-nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="site-nav">
                <a href="/about" data-link>About</a>
                <a href="/media" data-link>Media</a>
                <a href="/contact" data-link>Contact</a>
            </nav>
        </div>
    </header>

    <main id="app" class="site-content">
        ${content}
    </main>

    <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; <span id="year">2026</span> Haeyeon Lee. All Rights Reserved.</p>
            <div class="social-links">
                <a href="https://www.youtube.com/@Norae_haeyeon" target="_blank" aria-label="Youtube">Youtube</a>
            </div>
        </div>
    </footer>

    <script src="/js/bundle.min.js"></script>
    <script>
        // SEO Helper
    </script>
</body>
</html>`;

const pages = [
    { file: 'about.html', title: 'About | Haeyeon Lee', content: aboutContent },
    { file: 'contact.html', title: 'Contact | Haeyeon Lee', content: contactContent },

    // Media Sub-pages
    { file: 'media/photos/index.html', title: 'Media (Photos) | Haeyeon Lee', content: processMediaContent(mediaRawContent, 'photos') },
    { file: 'media/videos/index.html', title: 'Media (Videos) | Haeyeon Lee', content: processMediaContent(mediaRawContent, 'video') },
    // Redirect /media to photos (using same content as photos)
    { file: 'media/index.html', title: 'Media | Haeyeon Lee', content: processMediaContent(mediaRawContent, 'photos') },
];

pages.forEach(page => {
    const filePath = path.join(__dirname, '../' + page.file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, template(page.title, page.content));
    console.log(`Generated ${page.file}`);
});

// Update index.html to have static home content? 
// Current index.html has empty #app. Let's make it SEO friendly too.
const indexContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const indexWithContent = indexContent.replace('<!-- Dynamic Content Injected Here -->', homeContent);
fs.writeFileSync(path.join(__dirname, '../index.html'), indexWithContent);
console.log('Updated index.html with static content');
