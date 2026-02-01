# Project Spec: Haeyeon Lee's Promotion Page

**Reference:** [Jansen Tenor](https://jansentenor.com) (See `references/jansentenor.md`)
**Subject:** Haeyeon Lee (Soprano)
**Stack:** Vanilla HTML/CSS/JS, Github Pages (Artifact Deployment), Node.js SSG
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
    - **Hero**: Side-by-side layout.
        - **Desktop**: Text "HAEYEON LEE" (Left) | Photo (Right).
        - **Mobile**: Text top, Photo stacked below.
    - **Header**: Sticky header, but "HAEYEON LEE" title is **hidden** while on the landing page (to avoid duplication with Hero).
    - **Meta**: SOPRANO.

2.  **About (`/about`)**
    - **URL Structure**: `/about/index.html` (Pretty URL: `haeyeonlee.net/about`).
    - **Layout**: Split view (Desktop) / Stacked (Mobile).
    - **Content**: Sourced from `assets/resume/haeyeon.lee.md`.
    - **Sections**:
        - **Bio**: Narrative biography. Paragraphs must have `1.8em` spacing for readability.
        - **CV**: Professional curriculum vitae. List items must have `1.8em` spacing.

3.  **Media (`/media/photos`)**
    - **URL Structure**: `/media/photos/index.html` (Pretty URL: `haeyeonlee.net/media/photos`).
    - **Photos**: Dynamic Grid layout generated from `assets/images`.
        - **Exclusions**: `main.jpeg`, `about.jpeg` are excluded from the gallery.
        - **Format**: Portrait aspect ratio (`3/4`) with `object-position: top`.

4.  **Videos (`/media/videos`)**
    - **URL Structure**: `/media/videos/index.html` (Pretty URL: `haeyeonlee.net/media/videos`).
    - **Content**: Generated from `assets/videos/videos.md`.
        - **Format**: Responsive Video Cards (16:9 <iframe> embed).
        - **Source**: YouTube URLs via OEmbed.

5.  **Contact (`/contact`)**
    - **URL Structure**: `/contact/index.html` (Pretty URL: `haeyeonlee.net/contact`).
    - **Details**: Email address, Management info, YouTube Channel.

## 3. Technical Requirements
- **Architecture**: **Pure Static Site Generator (SSG)**.
    - No Client-Side Routing (SPA removed).
    - "Folders per page" structure for clean URLs and SEO.
- **Responsiveness**: Mobile-first CSS. Burger menu for mobile navigation (Right-aligned).
- **Assets**: 
    - Images source: `assets/images`.
    - JS: Bundled and Minified via `esbuild`.
    - CSS: Raw `css/style.css`.
- **Favicon**: Generic fallback or custom if provided.
- **SEO**:
    - Title/Meta tags are hardcoded in source templates (e.g., `src/about.html`) or injected during build.
    - **Automation**: GitHub Actions workflow (`.github/workflows/build-static-site.yml`) uses **Artifact Deployment**.
        - Generated files (`index.html`, `about/`) are **NOT** committed to the repo.
        - They are uploaded as build artifacts and deployed directly to GitHub Pages.

## 4. Implementation Details
- **Build System**:
    - **Command**: `npm run build` (Runs `minify-assets.js` && `generate-static.js`).
    - `scripts/generate-static.js`: The core SSG script.
        - Inputs: `src/*.html` (Templates) + `assets/` (Data).
        - Logic: Injects content, filters images, handles markdown parsing.
        - Outputs: 
            - `index.html`
            - `about/index.html`
            - `contact/index.html`
            - `media/photos/index.html`
            - `media/videos/index.html`
    - `esbuild`: Minifies `src/js/main.js` -> `js/bundle.min.js`.

- **Source Structure**:
    - `src/`: contains HTML templates (`index.html`, `about.html`, `contact.html`, `media/index.html`).
    - `assets/`: Contains content (`resume/`, `videos/`, `images/`).
- **CSS**: `css/style.css`.
- **JS**: `src/js/main.js` (Handles Mobile Menu, Copyright Year). No Router.
- **Data**:
    - Bio/CV: `assets/resume/*.md`.
    - Videos: `assets/videos/videos.md`.
    - Images: Files in `assets/images` (excluding strictly used UI images).

## 5. Content Strategy
- **Dynamic Loading**: 
    - Photos are scraped from the directory during build.
    - Videos are embedded as iframes. Title is OEmbed-fetched.
