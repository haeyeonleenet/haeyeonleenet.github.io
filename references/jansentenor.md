# Reference Spec: Jansen Tenor

**Target URL:** [https://jansentenor.com](https://jansentenor.com)
**Vibe:** Minimalist, Classical, Professional, "Artistic"
**Primary Font:** `futura-pt` (Adobe Typekit) / Fallback: `sans-serif`
**Primary Colors:** 
- Background: `#FFFFFF` (White)
- Text (Headings): `#1A1F2D` (Dark Navy)
- Text (Body): `#293047` (Dark Grey/Blue)

## 1. Structure & Layout

### Global Header
- **Layout**: 
    - Desktop: Site title (left), Navigation (right).
    - Mobile: Site title (left/center), Burger Menu (right).
- **Sticky**: No (Static at top) or Optional Sticky.
- **Navigation Items**:
    - About
    - Media (Dropdown: Photos, Audio/Video)
    - Schedule
    - Press
    - Contact

### Global Footer
- **Content**:
    - Email address (centered)
    - Social Media Icons (Instagram, SoundCloud) (centered below email)
- **Style**: Minimal top padding, plenty of whitespace.

## 2. Page Specifications

### Home (Landing)
- **Hero**: Full-width or large-grid high-quality artist portrait.
- **Overlay**: Minimal textual overlay (Artist Name or minimal quote), often just the image speaks.

### About (Biography)
- **Layout**: 2-Column Grid (Desktop).
    - **Left**: Biography text (serif or clean sans-serif, ~16px, 1.7em line-height).
    - **Right**: Professional Headshot (Vertical/Portrait orientation).
- **Responsive**: Stacks vertically on mobile (Image mentions might move to top or stay bottom).

### Media
- **Photos**:
    - Layout: Large-scale Slider or Masonry Grid.
    - Style: Clean, no borders, high-resolution.
- **Audio/Video**:
    - Embedded players (YouTube/Vimeo/SoundCloud).
    - Title + Description for each media item.

### Schedule
- **Layout**: List View (Date left, Details right).
- **Item**: 
    - [Date] [Month/Year]
    - [Event Title]
    - [Location] (Link to map)
    - [Role/Description]
- **Style**: Clean horizontal lines separating entries.

### Contact
- **Content**:
    - General Management info.
    - Direct Contact form or Email link.

## 3. Design Tokens

### Typography
- **Headings (h1, h2)**: Uppercase, spacing ~1.8px, `futura-pt`.
- **Nav Links**: Uppercase, small (~13-15px), `futura-pt`.
- **Body**: Readable, `futura-pt` or high-quality serif, ~16px.

### Buttons & Links
- **Style**: Text-only mostly, underlined on hover or color shift `rgb(26, 31, 45)` -> Lighter grey.
- **Buttons**: Outline style (if used), sharp corners, 1px border.

### Spacing
- **Margins**: Generous global padding (e.g., `4vw` sides).
- **Vertical Rhythm**: Distinct separation between sections.
