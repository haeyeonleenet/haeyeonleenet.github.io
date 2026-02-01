# Project Spec: Haeyeon Lee's Promotion Page

**Reference:** [Jansen Tenor](https://jansentenor.com) (See `references/jansentenor.md`)
**Subject:** Haeyeon Lee (Soprano)
**Stack:** Vanilla HTML/CSS/JS, Github Pages, Node.js Build Scripts
**Design Philosophy:** Minimalist, Elegant, Classical, "Artistic"

## 1. Visual Identity
- **Color Palette**:
    - Background: `#FFFFFF`
    - Text (Primary): `#1A1F2D`
    - Text (Secondary): `#293047`
    - Accents: Minimal, usage of strict black or dark grey for contrast.
- **Typography**:
    - Headings: `Futura PT` (via Typekit or Google Fonts fallback `Jost`). Uppercase, letter-spaced.
    - Body: Clean Sans-Serif (`Lato`).
    - Sizes: 16px base size.

## 2. Site Structure (Sitemap)

1.  **Home (`/`)**
    - **Hero**: Full-screen or large centered portrait of Haeyeon Lee.
    - **Content**: Name "Haeyeon Lee" clearly visible (overlay or below). Minimal text.
    - **Meta**: SOPRANO.

2.  **About (`/about`)**
    - **Layout**: Split view (Desktop) / Stacked (Mobile).
    - **Content**: Sourced from `assets/resume/` (Extracted during development phase).
    - **Sections**:
        - **Bio**: Narrative biography. Paragraphs must have `1.8em` spacing for readability.
        - **CV**: Professional curriculum vitae. List items must have `1.8em` spacing.

3.  **Media (`/media` -> redirects to `/media/photos`)**
    - **Photos (`/media/photos`)**: Dynamic Grid layout generated from `assets/images`.
        - **Format**: Portrait aspect ratio (`3/4`) with `object-position: top` to ensure faces remain visible.
    - **Video (`/media/videos`)**: Dynamic Card layout generated from `assets/videos/videos.md`.
        - **Format**: Responsive Video Cards (16:9 <iframe> embed).
        - **Source**: YouTube URLs via OEmbed.


4.  **Contact (`/contact`)**
    - **Details**: Email address, Management info, YouTube Channel.

## 3. Technical Requirements
- **Routing**: Hybrid SPA/MPA.
    - **SPA**: Client-side routing via `js/router.js` (History API) for smooth transitions without reload.
    - **MPA (SEO)**: Static HTML files (`about.html`, `media.html`, etc.) generated at build time for Robots/Crawlers.
    - **GitHub Pages**: `404.html` redirect hack to support SPA deep-linking.
- **Responsiveness**: Mobile-first CSS. Burger menu for mobile navigation.
- **Assets**: 
    - Images source: `assets/images`.
    - JS: Bundled and Minified via `npm run build` (uses `esbuild`).
    - CSS: Raw `css/style.css`.
- **Favicon**: Generic fallback or custom if provided.
- **SEO**:
    - Title/Meta tags update dynamically on route change.
    - Static HTML fallbacks provided by `generate-static.js`.
    - **Automation**: GitHub Actions workflow (`.github/workflows/build-static-site.yml`) automatically builds and commits the latest static content and minified assets on every push to `main`.

## 4. Implementation Details
- **Build System (SSG)**:
    - **Command**: `npm run build` (Chains minification and static generation).
    - `scripts/generate-static.js`: The core SSG script.
        - Inputs: `src/*.html` (Templates) + `assets/` (Data/Content).
        - Outputs: Root HTML files (`index.html`, `about.html`, `media/photos/index.html`, etc.).
    - `esbuild`: Minifies `src/js/main.js` -> `js/bundle.min.js`.

    - **CI/CD**: `build-static-site.yml` runs `npm run build` and commits changes.
- **Source Structure**:
    - `src/`: Contains raw HTML templates (`about.html`, `media.html`, etc.) and JS.
    - `assets/`: Contains content (`resume/`, `videos/`, `images/`).
- **CSS**: `css/style.css` (Source). Uses CSS Grid/Flexbox.
- **JS**: `src/js/main.js` (Entry).
- **Data**:
    - Videos: `assets/videos/videos.md`.
    - Resume: `assets/resume/*.md`.
    - Videos: Managed in `assets/videos/videos.md` (Markdown Table with Date, Description, and Youtube Link. Title is auto-fetched).
    - Photos: Managed by file existence in `assets/images`.
    - Resume: `assets/resume/*.md` (Source of Truth for Bio, Education, Experience).

## 5. Content Strategy
- **Dynamic Loading**: 
    - Photos are not hardcoded; they are scraped from the directory during build.
    - Videos are embedded as iframes. Title is OEmbed-fetched. Date & Description are manual from `assets/videos/videos.md`.

