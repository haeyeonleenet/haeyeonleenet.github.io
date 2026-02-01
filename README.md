# Haeyeon Lee - Official Website

This is the repository for the official portfolio website of Soprano Haeyeon Lee.
The site is built using a custom **Static Site Generator (SSG)** architecture with vanilla HTML/CSS/JS.

## 📁 Project Structure

*   **`src/`**: The **Source Code**. Edit these files.
    *   `*.html`: Master HTML templates (e.g., `about.html`, `contact.html`).
    *   `js/`: Source JavaScript files.
*   **`assets/`**: The **Content Source**.
    *   `resume/`: Markdown files for Bio and CV.
    *   `videos/`: Metadata for video section.
    *   `images/`: Source images.
*   **`scripts/`**: Node.js build scripts.
    *   `generate-static.js`: Compiles `src/` templates + `assets/` content into final HTML pages.
    *   `minify-assets.js`: Bundles and minifies JavaScript using `esbuild`.
*   **`css/`**: Global styles.

## 🛠 Local Development

### Prerequisites
*   Node.js installed.
*   Run `npm install` to install dependencies (`esbuild`).

### Building the Site
To build the static files locally (for testing):

```bash
npm run build
```

This command will:
1.  Minify `src/js/main.js` -> `js/bundle.min.js`.
2.  Generate static HTML pages in the root directory (`index.html`, `about/index.html`, etc.).

### Previewing
Since this is a static site, you can use any local server:
*   **VS Code Live Server**: Right-click `index.html` (generated in root) and "Open with Live Server".
*   **Python**: `python3 -m http.server 8000`

## 🚀 Deployment Workflow

We use **GitHub Actions** for automated deployment. The generated HTML files are **NOT** committed to the repository (they are gitignored).

1.  **Edit Content/Code**:
    *   Modify templates in `src/`.
    *   Add strings or images in `assets/`.
2.  **Commit & Push**:
    *   `git add .`
    *   `git commit -m "update: ..."`
    *   `git push origin main`
3.  **Automated Build**:
    *   The GitHub Action (`.github/workflows/build-static-site.yml`) triggers automatically.
    *   It runs `npm run build` on the server.
    *   It uploads the generated site as an **Artifact**.
4.  **Deploy**:
    *   GitHub Pages deploys the artifact to `haeyeonlee.net`.

### ⚠️ Important: Artifact Deployment
This website is deployed **directly from the GitHub Action artifact**, NOT from a specific branch (like `gh-pages`).

*   **No Generated Files in Repo**: You will **NOT** see `index.html`, `about/` or `contact/` in the GitHub repository file list. They are generated on the fly during the build process and ignored by git.
*   **Source of Truth**: The `src/` folder is the only source.
*   **Settings**: Ensure GitHub Pages settings are set to **Source: GitHub Actions**.
