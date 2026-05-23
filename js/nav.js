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
        if (mobileNav && mobileNav.classList.contains('open')) {
            if (e.target === mobileNav || (header && !header.contains(e.target) && !mobileNav.contains(e.target))) {
                closeNavMenu();
            }
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

function toggleMobileAccordion(id, btnElement) {
    const content = document.getElementById(id);
    if (!content) return;
    
    const isClosed = content.style.display === 'none' || content.style.display === '';
    
    // Tüm akordeonları kapat
    const allAccordions = ['courses-accordion', 'guides-accordion', 'tools-accordion'];
    allAccordions.forEach(accId => {
        const accContent = document.getElementById(accId);
        if (accContent) {
            accContent.style.display = 'none';
            if (accContent.previousElementSibling) {
                const arr = accContent.previousElementSibling.querySelector('.accordion-arrow');
                if (arr) arr.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Eğer kapalıysa, tıklananı aç
    if (isClosed) {
        content.style.display = 'flex';
        const arrow = btnElement.querySelector('.accordion-arrow');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
}
window.toggleMobileAccordion = toggleMobileAccordion;
