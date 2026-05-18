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
    initFullScreenViewer();
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

// ==========================================
// FULLSCREEN LIGHTBOX & PREVIEW MANAGEMENT
// ==========================================
function initFullScreenViewer() {
    // 1. Create Modal DOM if not exists
    let modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fullscreen-viewer-modal';
        modal.className = 'fullscreen-viewer-modal';
        modal.innerHTML = `
            <div class="fullscreen-topbar">
                <div class="fullscreen-topbar-left">
                    <span id="fullscreen-modal-icon" style="font-size: 1.5rem;">🖥️</span>
                    <h3 id="fullscreen-title" class="fullscreen-topbar-title">Kod / Arayüz Önizleme</h3>
                </div>
                <div class="fullscreen-topbar-right">
                    <button id="fullscreen-copy-btn" class="fullscreen-copy-btn" onclick="copyFullScreenCode()" title="Kodu Kopyala">
                        <svg id="fullscreen-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span id="fullscreen-copy-text">Kodu Kopyala</span>
                    </button>
                    <button class="fullscreen-close-btn" onclick="closeFullScreenViewer()" title="Kapat (ESC)">&times;</button>
                </div>
            </div>
            <div class="fullscreen-content-container" onclick="if(event.target === this) closeFullScreenViewer()">
                <img id="fullscreen-img" class="fullscreen-img" alt="Fullscreen Preview">
                <div id="fullscreen-code-box" class="fullscreen-code-box">
                    <pre><code id="fullscreen-code"></code></pre>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Escape key listener for closing
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeFullScreenViewer();
            }
        });
    }

    // 2. Add Fullscreen buttons to Code Blocks (<pre>)
    document.querySelectorAll('pre').forEach((pre) => {
        // Skip if already processed or if it's inside the fullscreen modal itself
        if (pre.closest('#fullscreen-viewer-modal') || pre.hasAttribute('data-fs-init')) return;
        pre.setAttribute('data-fs-init', 'true');

        const parent = pre.parentElement; // This is the dark box with background #0d1117 and overflow-x: auto
        if (!parent || !parent.parentNode) return;

        // Create a wrapper div to hold the dark box and the absolute button
        const wrapper = document.createElement('div');
        wrapper.className = 'code-fullscreen-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        
        // Preserve any bottom margin from the parent
        const parentStyle = window.getComputedStyle(parent);
        wrapper.style.marginBottom = parentStyle.marginBottom;
        parent.style.marginBottom = '0';

        // Insert wrapper before parent, then move parent inside wrapper
        parent.parentNode.insertBefore(wrapper, parent);
        wrapper.appendChild(parent);

        const btn = document.createElement('button');
        btn.className = 'fullscreen-toggle-btn';
        btn.title = 'Tam Ekran Göster';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            <span>Tam Ekran</span>
        `;
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openFullScreenViewer({
                type: 'code',
                content: pre.querySelector('code') ? pre.querySelector('code').innerHTML : pre.innerHTML,
                title: 'Kod Sözdizimi & Kullanım Örneği',
                icon: '<>'
            });
        });

        // Append button to WRAPPER (outside the overflow-x: auto box) so it stays visible at top right
        wrapper.appendChild(btn);
    });

    // 3. Add Fullscreen buttons to Preview Images (img[src*="preview"], etc.)
    document.querySelectorAll('img[src*="preview"], img[src*="dashboard"], img[src*="interface"]').forEach((img) => {
        // Skip if already processed or inside fullscreen modal
        if (img.closest('#fullscreen-viewer-modal') || img.hasAttribute('data-fs-init')) return;
        img.setAttribute('data-fs-init', 'true');

        const parent = img.parentElement;
        if (!parent) return;

        if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const btn = document.createElement('button');
        btn.className = 'fullscreen-toggle-btn';
        btn.title = 'Tam Ekran Göster';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            <span>Tam Ekran</span>
        `;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openFullScreenViewer({
                type: 'image',
                src: img.src,
                title: img.alt ? img.alt.replace(/^🖥️\s*/, '') : 'Arayüz & Dashboard Önizleme',
                icon: '🖥️'
            });
        });

        parent.appendChild(btn);
    });
}

function openFullScreenViewer({ type, content, src, title, icon }) {
    const modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) return;

    const titleEl = document.getElementById('fullscreen-title');
    const iconEl = document.getElementById('fullscreen-modal-icon');
    const copyBtn = document.getElementById('fullscreen-copy-btn');
    const imgEl = document.getElementById('fullscreen-img');
    const codeBox = document.getElementById('fullscreen-code-box');
    const codeEl = document.getElementById('fullscreen-code');

    if (titleEl) titleEl.textContent = title;
    if (iconEl) iconEl.textContent = icon || '🖥️';

    if (type === 'code') {
        imgEl.style.display = 'none';
        codeBox.style.display = 'block';
        codeEl.innerHTML = content;
        copyBtn.style.display = 'flex';
        const span = copyBtn.querySelector('span');
        if (span) span.textContent = 'Kodu Kopyala';
        const newIcon = copyBtn.querySelector('svg');
        if (newIcon && copyBtn.dataset.origSvg) {
            newIcon.outerHTML = copyBtn.dataset.origSvg;
        }
        copyBtn.classList.remove('copied');
    } else {
        codeBox.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = src;
        copyBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullScreenViewer() {
    const modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function copyFullScreenCode() {
    const codeEl = document.getElementById('fullscreen-code');
    const copyBtn = document.getElementById('fullscreen-copy-btn');
    if (!codeEl || !copyBtn) return;

    const text = codeEl.innerText || codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const span = copyBtn.querySelector('span');
        const iconEl = copyBtn.querySelector('svg');
        if (span) span.textContent = 'Kopyalandı! ✓';
        if (iconEl) {
            if (!copyBtn.dataset.origSvg) copyBtn.dataset.origSvg = iconEl.outerHTML;
            iconEl.outerHTML = `<svg id="fullscreen-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        }
        copyBtn.classList.add('copied');
        setTimeout(() => {
            if (span) span.textContent = 'Kodu Kopyala';
            const newIcon = copyBtn.querySelector('svg');
            if (newIcon && copyBtn.dataset.origSvg) {
                newIcon.outerHTML = copyBtn.dataset.origSvg;
            }
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama başarısız:', err);
    });
}

window.initFormulas = initFormulas;
window.toggleSearchPanel = toggleSearchPanel;
window.setTheme = setTheme;
window.initTheme = initTheme;
window.toggleSearchDropdown = toggleSearchDropdown;
window.selectDropdownCategory = selectDropdownCategory;
window.scrollCarousel = scrollCarousel;
window.initCarouselDragScroll = initCarouselDragScroll;
window.initFullScreenViewer = initFullScreenViewer;
window.openFullScreenViewer = openFullScreenViewer;
window.closeFullScreenViewer = closeFullScreenViewer;
window.copyFullScreenCode = copyFullScreenCode;