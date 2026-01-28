const fs = require('fs');
const path = require('path');

// Extract content from views.js strings (simplified regex approach since we can't import ES modules easily in CommonJS script without setup)
// Actually, we can read views.js file content and extract return values via regex to avoid module issues in a simple script.

const viewsPath = path.join(__dirname, '../js/views.js');
const viewsContent = fs.readFileSync(viewsPath, 'utf8');

const extractView = (name) => {
    const regex = new RegExp(`export const ${name} = \\(\\) => \`([\\s\\S]*?)\`;`);
    const match = viewsContent.match(regex);
    return match ? match[1] : '';
};

const homeContent = extractView('homeView');
const aboutContent = extractView('aboutView');
const mediaContent = extractView('mediaView');
const scheduleContent = extractView('scheduleView');
const contactContent = extractView('contactView');

const template = (title, content, path) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="Official website of Soprano Haeyeon Lee. Biography, Schedule, and Media.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Lato:wght@300;400&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/style.min.css">
    <!-- Base tag to handle relative links if we were using subdirectories, but we are using flat files -->
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
                <a href="/schedule" data-link>Schedule</a>
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
                <a href="#" target="_blank" aria-label="Instagram">Instagram</a>
                <a href="#" target="_blank" aria-label="SoundCloud">SoundCloud</a>
            </div>
        </div>
    </footer>

    <script src="js/bundle.min.js"></script>
    <script>
        // SEO Helper: If JS loads, it might take over, but for Robots, this static content is visible.
        // We update links to point to .html files for non-JS users/robots, 
        // but our Router intercepts data-link clicks to use pushState.
        // To be safe, we can leave .html extensions in the hrefs above, 
        // and Router can strip them if needed, or just handle them.
    </script>
</body>
</html>`;

const pages = [
    { file: 'about.html', title: 'About | Haeyeon Lee', content: aboutContent },
    { file: 'media.html', title: 'Media | Haeyeon Lee', content: mediaContent },
    { file: 'schedule.html', title: 'Schedule | Haeyeon Lee', content: scheduleContent },
    { file: 'contact.html', title: 'Contact | Haeyeon Lee', content: contactContent },
    // Home is index.html, already exists but let's make sure it has content if we want it static too
    // But index.html defines the shell. We should inject home content into it if we want it fully static.
];

// Read index.html to serve as base if we want exact match, otherwise use template
// Actually, let's just generate these specific files.
pages.forEach(page => {
    fs.writeFileSync(path.join(__dirname, '../' + page.file), template(page.title, page.content));
    console.log(`Generated ${page.file} in root`);
});

// Update index.html to have static home content? 
// Current index.html has empty #app. Let's make it SEO friendly too.
const indexContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const indexWithContent = indexContent.replace('<!-- Dynamic Content Injected Here -->', homeContent);
fs.writeFileSync(path.join(__dirname, '../index.html'), indexWithContent);
console.log('Updated index.html with static content');
