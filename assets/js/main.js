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

    const updateRTLText = () => {
        const currentDir = html.getAttribute('dir') || 'ltr';
        rtlToggles.forEach(btn => {
            btn.innerHTML = `<span style="font-weight: 700; font-size: var(--text-xs);">${currentDir === 'rtl' ? 'LTR' : 'RTL'}</span>`;
        });
    };

    const toggleRTL = () => {
        const currentDir = html.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', newDir);
        localStorage.setItem('oxen-dir', newDir);
        updateRTLText();
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
    
    // Initialize RTL button text
    updateRTLText();

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

    // Product Filter Logic
    const filterLinks = document.querySelectorAll('.filter-link');
    const products = document.querySelectorAll('.feature-card');

    if (filterLinks.length > 0 && products.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Toggle active class
                filterLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const filterValue = link.getAttribute('data-filter');
                
                products.forEach(product => {
                    const category = product.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        product.style.display = 'block';
                        // Add a small fade-in effect
                        product.style.opacity = '0';
                        setTimeout(() => {
                            product.style.transition = 'opacity 0.4s ease';
                            product.style.opacity = '1';
                        }, 10);
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --- Premium UX Javascript --- */
    

    // 2. Scroll-Triggered Fade & Stagger Sequences
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Dynamically apply animation classes to elements without touching HTML
    const revealTargets = document.querySelectorAll('section h2, .feature-card, .journal-card, .value-item, .editorial-content, .gallery-card');
    revealTargets.forEach((el, index) => {
        el.classList.add('reveal-up');
        // Add a slight stagger based on DOM order
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        revealObserver.observe(el);
    });

    // 3. Simple Parallax effect for massive sections
    const parallaxImages = document.querySelectorAll('.breakout-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxImages.forEach(img => {
            // Already uses background-attachment: fixed, but we can enhance it
            // if needed. Currently rely on native CSS for performance.
        });
    });

});
