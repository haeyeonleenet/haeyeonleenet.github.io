# Implementation Plan: Haeyeon Lee Static Website

**Status**: Planning
**Reference Spec**: `specs/spec.md`
**Task List**: `task.md`

## 1. Technical Strategy
- **Architecture**: Hybrid MPA/SPA using Vanilla JS "Router".
    - **Why**: Satisfies requirements for "Frontend routing" and "smooth transitions" while avoiding framework overhead.
    - **Hosting**: GitHub Pages (Static).
    - **SEO**: Meta tags on `index.html`, plus distinct URL handling via History API.
- **Stack**: 
    - HTML5 (Semantic)
    - CSS3 (Variables, Flexbox/Grid, Responsive)
    - Vanilla JavaScript (ES6 Modules)

## 2. Phased Implementation

### Phase 1: Setup & Foundation
**Goal**: Establish the project structure and core styling system.
- [ ] Initialize project structure (`/css`, `/js`, `/assets`).
- [ ] Create `index.html` with semantic HTML5 shell and layout containers (Header/Main/Footer).
- [ ] Create `css/style.css` with CSS Variables and Typography definitions (Futura PT / Sans-Serif).
- [ ] Implement `js/router.js` skeleton and navigation event listeners (History API).
- [ ] Create `js/views.js` for modular view templates.

### Phase 2: User Story 1 (Home & Shell)
**Goal**: Implement the global layout and the first visual impression.
- [ ] **Navigation**: Fixed/Sticky top bar with specific links (Home, Bio, Media, Contact).
- [ ] **Hero Section**: Full-screen portrait, no text overlay.
- [ ] **Footer**: Minimalist copyright and social links.
- [ ] **Responsiveness**: Mobile "Burger" menu implementation.
- [ ] **CSS**: Hero background image sticks to top.

### Phase 3: User Story 2 (About)
**Goal**: Implement the Biography section.
- [ ] **Layout**: Split view (Text Left, Image Right) for Desktop; Stacked for Mobile.
- [ ] **Content**: Dynamic injection of Biography text and Headshot via `js/views.js`.

### Phase 4: User Story 3 (Media)
**Goal**: Implement the portfolio gallery.
- [ ] **Photos**: Masonry or Grid layout for high-res images.
- [ ] **Video**: Embedded players (YouTube/Vimeo) with clean styling.
- [ ] **Routing**: Support sub-routes if needed or tabbed interface (`/media/photos`, `/media/video`).

### Phase 5: User Story 5 (Contact)
**Goal**: specific functional pages.
- [ ] **Contact**: Simple display of Management info and Email/Social links.

### Phase 6: Polish & Verification
**Goal**: SEO and transition refinements.
- [ ] **Transitions**: Smooth fade-in/out between route changes.
- [ ] **SEO**: Ensure Title and Meta Description update on route change.
- [ ] **404 Handling**: GitHub Pages compatible 404 redirection or hash-bang fallback if necessary (prefer `pushState` with 404 hack).

## 3. Key Design Decisions (from Research)
- **Typography**: `Futura PT` (Adobe) or `Jost` (Google) for Headings. Clean Sans for body.
- **Colors**: White background, Dark Navy text. Very high contrast, minimal color usage.
- **Routing**: Custom `router.js` intercepting click events on `a[href]`.
