document.addEventListener('DOMContentLoaded', () => {
    // Update Copyright Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close nav when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    console.log('Haeyeon Lee Website Loaded');
});
