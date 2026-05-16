// Mobil Nav Dropdown
function toggleNavMenu() {
    const extra = document.getElementById('nav-extra');
    const btn   = document.getElementById('nav-dots-btn');
    const isOpen = extra.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
}

// Menü dışına tıklanınca kapat
document.addEventListener('click', function(e) {
    const nav = document.getElementById('main-nav');
    if (nav && !nav.contains(e.target)) {
        document.getElementById('nav-extra')?.classList.remove('open');
        document.getElementById('nav-dots-btn')?.classList.remove('open');
    }
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Mobil menüyü kapat
        document.getElementById('nav-extra')?.classList.remove('open');
        document.getElementById('nav-dots-btn')?.classList.remove('open');

        // Formüller modalı açılınca search panel'i sıfırla (açık yap)
        if (modalId === 'formulas-modal') {
            const panel = document.getElementById('search-panel');
            const btn   = document.getElementById('search-toggle-btn');
            if (panel) { panel.classList.remove('collapsed'); }
            if (btn)   { btn.classList.remove('collapsed'); }

            // Scroll listener: aşağı kaydırınca otomatik kapat (yukarı gelince açmaz)
            const body = document.getElementById('formula-list');
            if (body && !body._searchScrollBound) {
                body._searchScrollBound = true;
                let lastScroll = 0;
                body.addEventListener('scroll', function() {
                    const curr = body.scrollTop;
                    const panel = document.getElementById('search-panel');
                    const btn   = document.getElementById('search-toggle-btn');
                    if (!panel) return;
                    if (curr > lastScroll && curr > 60) {
                        // Aşağı kayıyor → kapat
                        panel.classList.add('collapsed');
                        btn && btn.classList.add('collapsed');
                    }
                    lastScroll = curr;
                });
            }
        }
    }
}

// Arama paneli manuel toggle
function toggleSearchPanel() {
    const panel = document.getElementById('search-panel');
    const btn   = document.getElementById('search-toggle-btn');
    if (!panel) return;
    panel.classList.toggle('collapsed');
    btn && btn.classList.toggle('collapsed');
}

/**
 * Belirtilen ID'ye sahip modalı kapatır.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Scroll'u geri getir
        document.body.style.overflow = 'auto';
    }
}

// Kullanıcı modalın dışındaki bulanık alana (overlay) tıklarsa modalı kapat
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (event) {
        // Eğer tıklanan element direkt olarak overlay'in kendisiyse (içindeki içerik değilse)
        if (event.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// ESC tuşuna basıldığında açık olan modalı kapat
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Arama ve Filtreleme İşlemleri
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('formula-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const formulaListContainer = document.getElementById('formula-list');
    const noResultsMsg = document.getElementById('no-results');

    if (!searchInput || !filterBtns.length || !formulaListContainer) return;

    // 1. Verileri (data.js'den) HTML'e Enjekte Etme
    if (typeof formulasData !== 'undefined') {
        formulasData.forEach(item => {
            // Renkleri kategoriye göre belirle (styles.css ile uyumlu)
            let badgeStyle = "";
            if (item.category === 'cikarimsal') {
                badgeStyle = "color:var(--neon-blue); border-color:rgba(56, 189, 248, 0.2); background:rgba(56, 189, 248, 0.1);";
            } else if (item.category === 'ekonometri') {
                badgeStyle = "color:#a855f7; border-color:rgba(168, 85, 247, 0.2); background:rgba(168, 85, 247, 0.1);";
            } else if (item.category === 'makine') {
                badgeStyle = "color:#fbbf24; border-color:rgba(251, 191, 36, 0.2); background:rgba(251, 191, 36, 0.1);";
            }

            const div = document.createElement('div');
            div.className = 'formula-item';
            div.setAttribute('data-category', item.category);

            let htmlContent = `
                <span class="category-badge" style="${badgeStyle}">${item.badge}</span>
                <h3>${item.title}</h3>
                <div class="f-section"><span class="f-label" style="color:var(--text-main);">Ne İşe Yarar:</span> ${item.desc}</div>
            `;

            if (item.formula) {
                htmlContent += `<div class="f-section formula-math">${item.formula}</div>`;
            }

            if (item.good) {
                htmlContent += `<div class="f-section"><span class="f-label label-good">İyi Yönü:</span> ${item.good}</div>`;
            }
            if (item.bad) {
                htmlContent += `<div class="f-section"><span class="f-label label-bad">Riskli Yönü:</span> ${item.bad}</div>`;
            }

            div.innerHTML = htmlContent;
            
            // no-results mesajından ÖNCE ekle
            formulaListContainer.insertBefore(div, noResultsMsg);
        });

        // KaTeX ile matematiksel formülleri render et
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(formulaListContainer, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '\\(', right: '\\)', display: false}
                ],
                throwOnError: false
            });
        }
    }

    // 2. Arama ve Filtreleme Mantığı
    const formulaItems = document.querySelectorAll('.formula-item');

    function filterFormulas() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        let visibleCount = 0;

        formulaItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesCategory = activeFilter === 'all' || activeFilter === category;

            if (matchesSearch && matchesCategory) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                void item.offsetWidth;
                item.style.animation = 'fadeInUp 0.4s ease forwards';
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', filterFormulas);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterFormulas();
        });
    });
});