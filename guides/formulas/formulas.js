// formulas.js - High-performance dedicated script for guides/formulas/index.html

function initStandaloneFormulas() {
    const searchInput = document.getElementById('formula-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const formulaListContainer = document.getElementById('formula-list');
    const noResultsMsg = document.getElementById('no-results');

    if (!searchInput || !filterBtns.length || !formulaListContainer) return;
    if (formulaListContainer.hasAttribute('data-initialized')) return;
    formulaListContainer.setAttribute('data-initialized', 'true');

    const data = typeof window.formulasData !== 'undefined' ? window.formulasData : (typeof formulasData !== 'undefined' ? formulasData : null);

    if (data) {
        // Clear container (keep no-results message)
        formulaListContainer.innerHTML = '';
        formulaListContainer.appendChild(noResultsMsg);

        data.forEach(item => {
            let badgeStyle = 'color:var(--neon-blue); border-color:rgba(56, 189, 248, 0.2); background:rgba(56, 189, 248, 0.1);';
            if (item.category === 'cikarimsal') {
                badgeStyle = 'color:var(--neon-blue); border-color:rgba(56, 189, 248, 0.2); background:rgba(56, 189, 248, 0.1);';
            } else if (item.category === 'ekonometri') {
                badgeStyle = 'color:#a855f7; border-color:rgba(168, 85, 247, 0.2); background:rgba(168, 85, 247, 0.1);';
            } else if (item.category === 'makine') {
                badgeStyle = 'color:#fbbf24; border-color:rgba(251, 191, 36, 0.2); background:rgba(251, 191, 36, 0.1);';
            }

            const div = document.createElement('div');
            div.className = 'formula-card glass-card';
            div.setAttribute('data-category', item.category);

            let html = `
                <div class="formula-card-header">
                    <span class="category-badge" style="${badgeStyle}">${item.badge}</span>
                    <h3>${item.title}</h3>
                </div>
                <div class="f-section f-desc-section">
                    <span class="f-label-modern">💡 Ne İşe Yarar?</span>
                    <p class="f-desc">${item.desc}</p>
                </div>
            `;

            if (item.formula) {
                html += `<div class="f-section formula-math-box">${item.formula}</div>`;
            }

            let footerHtml = '';
            if (item.good) {
                footerHtml += `
                    <div class="f-pro-con f-good-box">
                        <span class="f-label-modern label-good">✔️ İyi Yönü</span>
                        <p>${item.good}</p>
                    </div>
                `;
            }
            if (item.bad) {
                footerHtml += `
                    <div class="f-pro-con f-bad-box">
                        <span class="f-label-modern label-bad">⚠️ Riskli Yönü</span>
                        <p>${item.bad}</p>
                    </div>
                `;
            }

            if (footerHtml) {
                html += `<div class="formula-card-footer">${footerHtml}</div>`;
            }

            div.innerHTML = html;
            formulaListContainer.insertBefore(div, noResultsMsg);
        });

        // Render KaTeX math equations
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

    const formulaCards = document.querySelectorAll('.formula-card');

    function filterFormulas() {
        const term = searchInput.value.toLowerCase().trim();
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        let visibleCount = 0;

        formulaCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.textContent.toLowerCase();
            const cat = card.getAttribute('data-category');
            
            const matchesTerm = title.includes(term) || content.includes(term);
            const matchesCat = activeFilter === 'all' || activeFilter === cat;

            if (matchesTerm && matchesCat) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
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

document.addEventListener('DOMContentLoaded', () => {
    initStandaloneFormulas();
});

function scrollToSearch() {
    const searchSection = document.getElementById('search-section');
    const searchInput = document.getElementById('formula-search');
    if (searchSection && searchInput) {
        const headerOffset = 90;
        const elementPosition = searchSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        setTimeout(() => {
            searchInput.focus();
        }, 400);
    }
}

window.initStandaloneFormulas = initStandaloneFormulas;
window.scrollToSearch = scrollToSearch;
// ==========================================
// SCROLL & DROPDOWN MANAGEMENT (Added)
// ==========================================

function scrollCategoryFilters(direction) {
    const container = document.getElementById('category-filters');
    if (!container) return;
    
    // Calculate a scroll step (about 2 buttons width)
    const step = 250; 
    
    if (direction === 'left') {
        container.scrollBy({ left: -step, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: step, behavior: 'smooth' });
    }
}

// Search dropdown management
function toggleSearchDropdown(e) {
    if(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function selectDropdownCategory(cat) {
    // Dropdown icindeki active class guncelleme
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
    });
    const selectedItem = document.querySelector('.dropdown-item[onclick*=\"' + cat + '\"]');
    if (selectedItem) selectedItem.classList.add('active');

    // Asil filtre butonlarindaki active class guncelleme
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    const targetBtn = document.querySelector('.filter-btn[data-filter=\"' + cat + '\"]');
    if (targetBtn) {
        targetBtn.classList.add('active');
        // Bu click olayi yukaridaki filterFormulas fonksiyonunu tetikleyecek
        targetBtn.click();
    }

    // Menuyu kapat
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) dropdown.classList.remove('show');
}

// Menuyu disariya tiklaninca kapat
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('search-dropdown-menu');
    const btn = document.querySelector('.search-hamburger-btn');
    if (dropdown && dropdown.classList.contains('show') && !dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
        dropdown.classList.remove('show');
    }
});

window.scrollCategoryFilters = scrollCategoryFilters;
window.toggleSearchDropdown = toggleSearchDropdown;
window.selectDropdownCategory = selectDropdownCategory;

