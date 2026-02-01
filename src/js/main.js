import Router from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    // Update Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize Router
    const router = new Router();
    router.init();

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            // Animate hamburger icon logic here if needed
        });

        // Close nav when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
            });
        });
    }
});
