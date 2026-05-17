// formulas.js - High-performance dedicated script for formulas.html

function initStandaloneFormulas() {
    const searchInput = document.getElementById('formula-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const formulaListContainer = document.getElementById('formula-list');
    const noResultsMsg = document.getElementById('no-results');

    if (!searchInput || !filterBtns.length || !formulaListContainer) return;

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
                <div class="f-section"><span class="f-label">Ne İşe Yarar:</span> <p class="f-desc">${item.desc}</p></div>
            `;

            if (item.formula) {
                html += `<div class="f-section formula-math-box">${item.formula}</div>`;
            }

            let footerHtml = '';
            if (item.good) {
                footerHtml += `<div class="f-section f-pro-con"><span class="f-label label-good">İyi Yönü:</span> <p>${item.good}</p></div>`;
            }
            if (item.bad) {
                footerHtml += `<div class="f-section f-pro-con"><span class="f-label label-bad">Riskli Yönü:</span> <p>${item.bad}</p></div>`;
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
