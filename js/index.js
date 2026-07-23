// main.js - Dedicated script for main/index.html (landing page)

document.addEventListener('DOMContentLoaded', () => {
    initCategoryDragScroll();
    initCarouselObserver();
    initCarouselInteractive();
});

// Category drag scroll management
function initCategoryDragScroll() {
    const slider = document.querySelector('.category-filters');
    if (!slider) return;

    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
        setTimeout(() => { isDragging = false; }, 50);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 5) {
            isDragging = true;
        }
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
}

// Search dropdown management
function toggleSearchDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function selectDropdownCategory(cat) {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });
    const selectedItem = document.querySelector(`.dropdown-item[onclick*="${cat}"]`);
    if (selectedItem) selectedItem.classList.add('active');

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.click();
    }

    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) dropdown.classList.remove('show');
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('search-dropdown-menu');
    const btn = document.querySelector('.search-hamburger-btn');
    if (dropdown && dropdown.classList.contains('show') && !dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
        dropdown.classList.remove('show');
    }
});

// Carousel slider management
function scrollCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.carousel-card');
    if (cards.length === 0) return;
    
    const stride = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : (cards[0].offsetWidth + 24);

    if (direction === 'left') {
        carousel.scrollBy({ left: -stride, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: stride, behavior: 'smooth' });
    }
}

function initCarouselObserver() {
    const carousel = document.getElementById('quick-guides-carousel');
    if (!carousel) return;

    const originalCards = Array.from(carousel.querySelectorAll('.carousel-card'));
    if (originalCards.length === 0) return;

    // Assign a unique index to sync active states across clones
    originalCards.forEach((card, idx) => {
        card.setAttribute('data-sync-index', idx);
    });

    // Clone cards for infinite loop
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('carousel-clone');
        carousel.appendChild(clone);
    });
    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('carousel-clone');
        carousel.prepend(clone);
    });

    const allCards = carousel.querySelectorAll('.carousel-card');

    const observerOptions = {
        root: carousel,
        rootMargin: '0px -49% 0px -49%',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        let activeIndex = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeIndex = entry.target.getAttribute('data-sync-index');
            }
        });
        
        if (activeIndex !== null) {
            allCards.forEach(c => {
                if (c.getAttribute('data-sync-index') === activeIndex) {
                    c.classList.add('active-card');
                } else {
                    c.classList.remove('active-card');
                }
            });
        }
    }, observerOptions);

    allCards.forEach(card => observer.observe(card));

    // Cache dimension calculations to prevent layout thrashing (Reflow) on scroll
    let stride = 0;
    let totalOriginalWidth = 0;
    
    function calculateDimensions() {
        if (!carousel) return;
        stride = allCards.length > 1 ? (allCards[1].offsetLeft - allCards[0].offsetLeft) : (originalCards[0].offsetWidth + 24);
        totalOriginalWidth = stride * originalCards.length;
    }
    
    // Initial calculation
    calculateDimensions();
    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions, { passive: true });

    // Handle Infinite Scroll resetting
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (carousel.isResetting || !stride) return;
        
        // Debounce heavy checks (throttle to ~60fps)
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            if (carousel.scrollLeft <= stride) {
                carousel.isResetting = true;
                carousel.style.scrollBehavior = 'auto';
                carousel.style.scrollSnapType = 'none';
                carousel.scrollLeft += totalOriginalWidth;
                void carousel.offsetWidth; // Reflow
                carousel.style.scrollBehavior = 'smooth';
                carousel.style.scrollSnapType = 'x mandatory';
                setTimeout(() => { carousel.isResetting = false; }, 50);
            } else if (carousel.scrollLeft >= (totalOriginalWidth * 2) - stride) {
                carousel.isResetting = true;
                carousel.style.scrollBehavior = 'auto';
                carousel.style.scrollSnapType = 'none';
                carousel.scrollLeft -= totalOriginalWidth;
                void carousel.offsetWidth;
                carousel.style.scrollBehavior = 'smooth';
                carousel.style.scrollSnapType = 'x mandatory';
                setTimeout(() => { carousel.isResetting = false; }, 50);
            }
        }, 16); // ~16ms = 60fps throttle
    }, { passive: true });

    // Focus on the middle (original) cards on start
    setTimeout(() => {
        carousel.style.scrollBehavior = 'auto';
        carousel.style.scrollSnapType = 'none';
        
        const isMobile = window.innerWidth <= 768;
        // The originals are offset by originalCards.length (since we prepended 1 set)
        const targetIndex = isMobile ? originalCards.length : originalCards.length + 2; 
        const target = allCards[targetIndex];
        
        if (target) {
            const scrollPos = target.offsetLeft - (carousel.offsetWidth / 2) + (target.offsetWidth / 2);
            carousel.scrollLeft = scrollPos;
        }
        
        void carousel.offsetWidth;
        carousel.style.scrollBehavior = 'smooth';
        carousel.style.scrollSnapType = 'x mandatory';
    }, 150);
}

function initCarouselInteractive() {
    const carousel = document.getElementById('quick-guides-carousel');
    if (!carousel) return;

    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let prevX = 0;
    let timestamp = 0;
    let momentumID;

    // Prevent default drag events
    carousel.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        carousel.style.scrollSnapType = 'none';
        carousel.style.scrollBehavior = 'auto';
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        prevX = e.pageX;
        timestamp = performance.now();
        cancelAnimationFrame(momentumID);
    });

    carousel.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        carousel.style.cursor = 'grab';
        startMomentum();
    });

    carousel.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        carousel.style.cursor = 'grab';
        startMomentum();
        setTimeout(() => { isDragging = false; }, 50);
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 5) {
            isDragging = true;
        }
        carousel.scrollLeft = scrollLeft - walk;

        const now = performance.now();
        const elapsed = now - timestamp;
        if (elapsed > 0) {
            velocity = (e.pageX - prevX) / elapsed;
        }
        prevX = e.pageX;
        timestamp = now;
    });

    function startMomentum() {
        let speed = velocity * 5;
        if (Math.abs(speed) < 1) {
            finishDrag();
            return;
        }

        function step() {
            carousel.scrollLeft -= speed;
            speed *= 0.92;
            if (Math.abs(speed) > 0.5) {
                momentumID = requestAnimationFrame(step);
            } else {
                finishDrag();
            }
        }
        momentumID = requestAnimationFrame(step);
    }

    function finishDrag() {
        carousel.style.scrollSnapType = 'x mandatory';
        carousel.style.scrollBehavior = 'smooth';
    }

    // CLICK EVENT (Capture Phase)
    carousel.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const clickedCard = e.target.closest('.carousel-card');
        if (clickedCard) {
            if (!clickedCard.classList.contains('active-card')) {
                e.preventDefault();
                e.stopPropagation();
                
                carousel.style.scrollBehavior = 'smooth';
                const scrollPos = clickedCard.offsetLeft - (carousel.offsetWidth / 2) + (clickedCard.offsetWidth / 2);
                carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
            }
        }
    }, true);
}

window.toggleSearchDropdown = toggleSearchDropdown;
window.selectDropdownCategory = selectDropdownCategory;
window.scrollCarousel = scrollCarousel;
window.initCarouselObserver = initCarouselObserver;
window.initCarouselInteractive = initCarouselInteractive;
