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
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }

            // Handle Tab Switching
            if (e.target.matches('.tab-btn')) {
                const targetTabId = e.target.getAttribute('data-tab');
                const container = e.target.closest('.content-section');

                // Update Buttons
                container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
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
            }
        });
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute(window.location.pathname);
        this.updateActiveLink(window.location.pathname);
    }

    async handleRoute(path) {
        // Simple normalization for Github Pages without configuration (optional hack later)
        // For now, exact match

        // Handle dynamic base or trailing slashes if needed.
        // Assuming clean paths for now.

        const viewFunction = this.routes[path] || this.routes['/'];
        this.app.innerHTML = viewFunction();

        // Update Meta Title
        const titleMap = {
            '/': 'Haeyeon Lee | Soprano',
            '/about': 'About | Haeyeon Lee',
            '/media': 'Media | Haeyeon Lee',
            '/schedule': 'Schedule | Haeyeon Lee',
            '/contact': 'Contact | Haeyeon Lee'
        };
        document.title = titleMap[path] || 'Haeyeon Lee | Soprano';

        window.scrollTo(0, 0);
    }

    updateActiveLink(path) {
        document.querySelectorAll('.site-nav a').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}
