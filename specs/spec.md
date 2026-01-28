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
    - **Content**: Sourced from `resources/resume/` (Extracted during development phase).
    - **Sections**:
        - **Bio**: Narrative biography. Paragraphs must have `1.8em` spacing for readability.
        - **CV**: Professional curriculum vitae. List items must have `1.8em` spacing.

3.  **Media (`/media`)**
    - **Photos**: Dynamic Grid layout generated from `assets/images`.
        - **Format**: Portrait aspect ratio (`3/4`) with `object-position: top` to ensure faces remain visible.
    - **Video**: Dynamic Card layout generated from `data/videos.md`.
        - **Format**: Responsive Video Cards (16:9 <iframe> embed).
        - **Source**: YouTube URLs via OEmbed.

4.  **Schedule (`/schedule`)**
    - **List**: Upcoming performances.
    - **Format**: Date | Event Name | Location | Role.

5.  **Contact (`/contact`)**
    - **Details**: Email address, Management info, Social links.

## 3. Technical Requirements
- **Routing**: Hybrid SPA/MPA.
    - **SPA**: Client-side routing via `js/router.js` (History API) for smooth transitions without reload.
    - **MPA (SEO)**: Static HTML files (`about.html`, `media.html`, etc.) generated at build time for Robots/Crawlers.
    - **GitHub Pages**: `404.html` redirect hack to support SPA deep-linking.
- **Responsiveness**: Mobile-first CSS. Burger menu for mobile navigation.
- **Assets**: 
    - Images source: `assets/images`.
    - JS/CSS: Bundled and Minified via `npm run build` (uses `esbuild` & `clean-css`).
- **Favicon**: Generic fallback or custom if provided.
- **SEO**:
    - Title/Meta tags update dynamically on route change.
    - Static HTML fallbacks provided by `generate-static.js`.
    - **Automation**: GitHub Actions workflow (`.github/workflows/build-static-site.yml`) automatically builds and commits the latest static content and minified assets on every push to `main`.

## 4. Implementation Details
- **Build System**:
    - **Command**: `npm run build` (Chains content build, minification, and static generation).
    - `scripts/build-content.js`: Scans `assets/images` and `data/videos.md` to inject content into `js/views.js`.
    - `scripts/generate-static.js`: Generates SEO-friendly static `.html` files in root.
    - `esbuild`: Minifies `js/main.js` -> `js/bundle.min.js`.
    - `clean-css`: Minifies `css/style.css` -> `css/style.min.css`.
    - **CI/CD**: `build-static-site.yml` runs `npm run build` and commits changes to ensure the deployed site is always up-to-date with raw data.
- **CSS**: `css/style.css` (Source) -> `css/style.min.css` (Production). Uses CSS Grid/Flexbox.
- **JS**: `js/router.js` (Routing), `js/views.js` (Content Templates), `js/main.js` (Entry).
- **Data**:
    - Videos: Managed in `data/videos.md` (Markdown Table with Date, Description, and Youtube Link. Title is auto-fetched).
    - Photos: Managed by file existence in `assets/images`.
    - Schedule: Managed in `data/schedule.md` (Markdown Table).
    - Resume: `resources/resume/*.md` (Source of Truth for Bio, Education, Experience).

## 5. Content Strategy
- **Dynamic Loading**: 
    - Photos are not hardcoded; they are scraped from the directory during build.
    - Videos are embedded as iframes. Title is OEmbed-fetched. Date & Description are manual from `data/videos.md`.
    - Schedule is parsed from a Markdown table in `data/schedule.md` and rendered into HTML.

