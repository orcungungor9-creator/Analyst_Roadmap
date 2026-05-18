// script.js - Main entry point

function initFormulas() {
    const searchInput = document.getElementById('formula-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const formulaListContainer = document.getElementById('formula-list');
    const noResultsMsg = document.getElementById('no-results');

    if (!searchInput || !filterBtns.length || !formulaListContainer) return;
    if (document.body.classList.contains('formulas-page')) return;
    if (formulaListContainer.hasAttribute('data-initialized')) return;
    formulaListContainer.setAttribute('data-initialized', 'true');

    const data = window.formulasData || (typeof formulasData !== 'undefined' ? formulasData : null);

    // Populate formulas from global formulasData
    if (data) {
        data.forEach(item => {
            // Badge styling based on category
            let badgeStyle = '';
            if (item.category === 'cikarimsal') {
                badgeStyle = 'color:var(--neon-blue); border-color:rgba(56, 189, 248, 0.2); background:rgba(56, 189, 248, 0.1);';
            } else if (item.category === 'ekonometri') {
                badgeStyle = 'color:#a855f7; border-color:rgba(168, 85, 247, 0.2); background:rgba(168, 85, 247, 0.1);';
            } else if (item.category === 'makine') {
                badgeStyle = 'color:#fbbf24; border-color:rgba(251, 191, 36, 0.2); background:rgba(251, 191, 36, 0.1);';
            }
            const div = document.createElement('div');
            div.className = 'formula-item';
            div.setAttribute('data-category', item.category);
            let html = `
                <span class="category-badge" style="${badgeStyle}">${item.badge}</span>
                <h3>${item.title}</h3>
                <div class="f-section"><span class="f-label" style="color:var(--text-main);">Ne İşe Yarar:</span> ${item.desc}</div>
            `;
            if (item.formula) {
                html += `<div class="f-section formula-math">${item.formula}</div>`;
            }
            if (item.good) {
                html += `<div class="f-section"><span class="f-label label-good">İyi Yönü:</span> ${item.good}</div>`;
            }
            if (item.bad) {
                html += `<div class="f-section"><span class="f-label label-bad">Riskli Yönü:</span> ${item.bad}</div>`;
            }
            div.innerHTML = html;
            formulaListContainer.insertBefore(div, noResultsMsg);
        });
        // Render KaTeX if available
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(formulaListContainer, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '\\(', right: '\\)', display: false }
                ],
                throwOnError: false
            });
        }
    }

    const formulaItems = document.querySelectorAll('.formula-item');
    function filterFormulas() {
        const term = searchInput.value.toLowerCase().trim();
        const active = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let visible = 0;
        formulaItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.textContent.toLowerCase();
            const cat = item.getAttribute('data-category');
            const matches = (title.includes(term) || content.includes(term)) && (active === 'all' || active === cat);
            if (matches) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                void item.offsetWidth; // reflow
                item.style.animation = 'fadeInUp 0.4s ease forwards';
                visible++;
            } else {
                item.classList.add('hidden');
            }
        });
        noResultsMsg.style.display = visible === 0 ? 'block' : 'none';
    }
    searchInput.addEventListener('input', filterFormulas);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterFormulas();
        });
    });
}

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('analyst_theme') || 'theme-dark';
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
    if (savedTheme !== 'theme-dark') {
        document.body.classList.add(savedTheme);
    }
    
    // Update active state in theme cards if modal is present
    document.querySelectorAll('.theme-card').forEach(card => {
        if (card.getAttribute('data-theme') === savedTheme) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function setTheme(themeName) {
    localStorage.setItem('analyst_theme', themeName);
    initTheme();
}

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

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCategoryDragScroll();
    initCarouselDragScroll();
    if (window.initNavOutsideClick) window.initNavOutsideClick();
    if (window.initModal) window.initModal();
    if (typeof window.formulasData !== 'undefined' || typeof formulasData !== 'undefined') {
        initFormulas();
    }
}); // end DOMContentLoaded

// Search panel toggle
function toggleSearchPanel() {
    const panel = document.getElementById('search-panel');
    const btn = document.getElementById('search-toggle-btn');
    const icon = document.getElementById('search-toggle-icon');
    const isCollapsed = panel?.classList.toggle('collapsed');
    btn?.classList.toggle('collapsed', isCollapsed);
    if (icon) {
        icon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// ==========================================
// CAROUSEL SLIDER & MOMENTUM DRAG MANAGEMENT
// ==========================================
function scrollCarousel(direction, carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const scrollAmount = carousel.offsetWidth * 0.8;
    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function initCarouselDragScroll() {
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

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        prevX = e.pageX;
        timestamp = performance.now();
        cancelAnimationFrame(momentumID);
    });

    carousel.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            carousel.classList.remove('dragging');
            startMomentum();
        }
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('dragging');
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

    carousel.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    function startMomentum() {
        let speed = velocity * 25; // Momentum katsayısı
        if (Math.abs(speed) < 1) return;

        function step() {
            carousel.scrollLeft -= speed;
            speed *= 0.92; // Sürtünme / yavaşlama
            if (Math.abs(speed) > 0.5) {
                momentumID = requestAnimationFrame(step);
            }
        }
        momentumID = requestAnimationFrame(step);
    }
}

window.initFormulas = initFormulas;
window.toggleSearchPanel = toggleSearchPanel;
window.setTheme = setTheme;
window.initTheme = initTheme;
window.toggleSearchDropdown = toggleSearchDropdown;
window.selectDropdownCategory = selectDropdownCategory;
window.scrollCarousel = scrollCarousel;
window.initCarouselDragScroll = initCarouselDragScroll;