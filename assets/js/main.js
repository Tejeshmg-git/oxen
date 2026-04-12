/* 
    Oxen - Main Application Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Update all theme icons
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('[data-lucide]');
            if (icon) icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        });
        
        lucide.createIcons();
        localStorage.setItem('oxen-theme', isDark ? 'dark' : 'light');
    };

    themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;

    const toggleRTL = () => {
        const currentDir = html.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', newDir);
        localStorage.setItem('oxen-dir', newDir);
    };

    rtlToggles.forEach(btn => btn.addEventListener('click', toggleRTL));

    // Scroll Effect Logic
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Check saved preferences
    const savedTheme = localStorage.getItem('oxen-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('[data-lucide]');
            if (icon) icon.setAttribute('data-lucide', 'sun');
        });
        lucide.createIcons();
    }

    const savedDir = localStorage.getItem('oxen-dir');
    if (savedDir) {
        html.setAttribute('dir', savedDir);
    }

    // Side-Nav Mobile Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidenav = document.getElementById('sidenav');
    const sidenavClose = document.getElementById('sidenav-close');
    const overlay = document.getElementById('overlay');

    const openMenu = () => {
        if (sidenav && overlay) {
            sidenav.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        }
    };

    const closeMenu = () => {
        if (sidenav && overlay) {
            sidenav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        }
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (sidenavClose) sidenavClose.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
});
