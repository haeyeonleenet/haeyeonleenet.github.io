# Task List for Haeyeon Lee's Promotion Page

- [x] Document reference spec for jansentenor.com <!-- id: 0 -->
- [x] Create/Update specs/spec.md for Haeyeon Lee based on reference <!-- id: 1 -->

## Phase 1: Setup & Foundation
- [x] [T001] Create project structure (css, js, assets directories)
- [x] [T002] Create `index.html` shell with Meta tags and Layout containers
- [x] [T003] Create `css/style.css` with CSS Variables and Typography definitions
- [x] [T004] Implement `js/router.js` skeleton and navigation event listeners
- [x] [T005] Create `js/views.js` for view templates

## Phase 2: User Story 1 (Home & Shell)
- [x] [T006] [US1] Implement Header and Navigation in `index.html`
- [x] [T007] [US1] Implement Footer in `index.html`
- [x] [T008] [US1] Create Home View content (Hero section) in `js/views.js`
- [x] [T009] [US1] Style Header, Footer, and Hero in `css/style.css`
- [x] [T010] [US1] Implement Responsive Navigation (mobile menu)

## Phase 3: User Story 2 (About)
- [x] [T011] [US2] Create About View structure in `js/views.js`
- [x] [T012] [US2] Implement split-layout styles for About in `css/style.css`

## Phase 4: User Story 3 (Media)
- [x] [T013] [US3] Create Media View structure (Photos/Video tabs or sections)
- [x] [T014] [US3] Implement Masonry/Grid styles for photos
- [x] [T015] [US3] Add video embed styles

## Phase 5: User Story 5 (Contact)
- [x] [T018] [US5] Create Contact View structure and styles

## Phase 6: Polish & Verification
- [x] [T019] [US6] Finalize Router logic (History API pushState/popState)
- [x] [T020] [US6] Verify all links and smooth transitions
- [x] [T021] [US6] Check Mobile responsiveness on all pages

## Phase 7: Final Polish (Images, SEO, Minification)
- [x] [T022] Place real images in `js/views.js` based on composition
- [x] [T023] Generate static HTML files (`about.html`, `media.html`, etc.) for SEO
- [x] [T024] specific minification of JS and CSS files (Bundling with esbuild)

## Phase 8: Dynamic Media Content (Build System)
- [x] [T025] Create `data/videos.md` and define format
- [x] [T026] Create `scripts/build-content.js` to scan images and fetch YouTube metadata
- [x] [T027] Update `js/views.js` via the build script
- [x] [T028] Verify dynamic content loading locally


