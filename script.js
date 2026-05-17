// script.js - Main entry point

function initFormulas() {
    const searchInput = document.getElementById('formula-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const formulaListContainer = document.getElementById('formula-list');
    const noResultsMsg = document.getElementById('no-results');

    if (!searchInput || !filterBtns.length || !formulaListContainer) return;
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

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    if (window.initNavOutsideClick) window.initNavOutsideClick();
    if (window.initModal) window.initModal();
    // If data.js was already loaded synchronously, initialize formulas now
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

window.initFormulas = initFormulas;
window.toggleSearchPanel = toggleSearchPanel;
window.setTheme = setTheme;
window.initTheme = initTheme;