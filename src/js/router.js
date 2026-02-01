import { homeView, aboutView, mediaView, scheduleView, contactView } from './views.js';

export default class Router {
    constructor() {
        this.routes = {
            '/': homeView,
            '/about': aboutView,
            '/media': mediaView,
            '/schedule': scheduleView,
            '/contact': contactView
        };

        this.app = document.getElementById('app');
    }

    init() {
        // Handle SPA Redirect from 404.html (GitHub Pages)
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('p');
        if (redirectPath) {
            // Remove the query param and replace history
            window.history.replaceState(null, null, redirectPath);
            this.handleRoute(redirectPath);
            this.updateActiveLink(redirectPath);
        } else {
            // Normal Load
            this.handleRoute(window.location.pathname);
            this.updateActiveLink(window.location.pathname);
        }

        // Handle Back/Forward buttons
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
            this.updateActiveLink(window.location.pathname);
        });

        // Intercept all clicks on data-link
        // Intercept all clicks on data-link
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute(window.location.pathname);
        this.updateActiveLink(window.location.pathname);
    }

    async handleRoute(rawPath) {
        // Normalize path: ignore trailing slash for routing logic
        const path = rawPath.endsWith('/') && rawPath !== '/' ? rawPath.slice(0, -1) : rawPath;

        // Handle Media Redirects and Sub-routes
        if (path === '/media') {
            this.navigateTo('/media/photos');
            return;
        }

        let viewFunction;
        let args = [];

        if (path === '/media/photos') {
            viewFunction = this.routes['/media'];
            args = ['photos'];
        } else if (path === '/media/videos') {
            viewFunction = this.routes['/media'];
            args = ['video'];
        } else {
            viewFunction = this.routes[path] || this.routes['/'];
        }

        // If route not found (and not handled above), fallback to home
        if (!viewFunction && !this.routes[path]) {
            viewFunction = this.routes['/'];
        }

        this.app.innerHTML = viewFunction(...args);

        // Restore Tab Functionality for non-link tabs (About Page)
        this.app.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTabId = e.target.getAttribute('data-tab');
                const container = e.target.closest('.content-section');

                // Update Buttons
                container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Update Content
                container.querySelectorAll('.tab-pane').forEach(pane => {
                    if (pane.id === targetTabId) {
                        pane.style.display = 'block';
                        pane.classList.add('active');
                    } else {
                        pane.style.display = 'none';
                        pane.classList.remove('active');
                    }
                });
            });
        });

        // Update Meta Title
        const titleMap = {
            '/': 'Haeyeon Lee | Soprano',
            '/about': 'About | Haeyeon Lee',
            '/media/photos': 'Media (Photos) | Haeyeon Lee',
            '/media/videos': 'Media (Videos) | Haeyeon Lee',
            '/schedule': 'Schedule | Haeyeon Lee',
            '/contact': 'Contact | Haeyeon Lee'
        };
        document.title = titleMap[path] || 'Haeyeon Lee | Soprano';

        window.scrollTo(0, 0);
    }

    updateActiveLink(rawPath) {
        const path = rawPath.endsWith('/') && rawPath !== '/' ? rawPath.slice(0, -1) : rawPath;
        document.querySelectorAll('.site-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || (href === '/media' && path.startsWith('/media/'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}
