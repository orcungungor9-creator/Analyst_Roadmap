// nav.js - Navigation handling module
function toggleNavMenu() {
    const mobileNav = document.getElementById('mobile-nav-menu');
    const hamburger = document.getElementById('hamburger-btn');
    if (!mobileNav || !hamburger) return;
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}

function closeNavMenu() {
    const mobileNav = document.getElementById('mobile-nav-menu');
    const hamburger = document.getElementById('hamburger-btn');
    if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// Close navigation when clicking outside the main nav
function initNavOutsideClick() {
    document.addEventListener('click', function (e) {
        const header = document.querySelector('header');
        const mobileNav = document.getElementById('mobile-nav-menu');
        if (header && !header.contains(e.target) && mobileNav && mobileNav.classList.contains('open')) {
            closeNavMenu();
        }
    });

    // Close on window resize if desktop size reached
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeNavMenu();
        }
    });
}

window.toggleNavMenu = toggleNavMenu;
window.closeNavMenu = closeNavMenu;
window.initNavOutsideClick = initNavOutsideClick;
