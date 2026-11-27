// ==========================================================================
// 3. AŞAMA: ZAMAN VE MEKÂN BOYUTUNU BELİRLEMEK — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s3-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: Veri Yapısı Teşhis & Satır Karıştırma Testi
    const DATASETS = {
        cross: {
            indexLabel: 'İndis: i = 1…n',
            orderLabel: 'Sıra Önemi: Önemsiz',
            riskLabel: 'Ana Risk: Değişen Varyans',
            orderMatters: false,
            columns: ['Konut ID (i)', 'Dönem (t)', 'Tür', 'm² Fiyatı'],
            rows: [
                ['#101', '2026-11', '1+1 Daire', '34.500 ₺'],
                ['#102', '2026-11', '3+1 Daire', '42.000 ₺'],
                ['#103', '2026-11', 'Lüks Villa', '88.000 ₺'],
                ['#104', '2026-11', '2+1 Daire', '38.200 ₺']
            ],
            okText: 'Her satır farklı bir konutu gösterir ve dönem aynıdır (2026-11). Satırları karıştırsan bile model sonucu değişmez; ancak küçük dairelerle lüks villaların bir arada olması Değişen Varyans riski yaratır.'
        },
        time: {
            indexLabel: 'İndis: t = 1…T',
            orderLabel: 'Sıra Önemi: Hayati (Kronolojik)',
            riskLabel: 'Ana Risk: Otokorelasyon & Durağanlık',
            orderMatters: true,
            columns: ['Birim (i)', 'Dönem (t)', 'Yıllık Enflasyon', 'Kredi Faizi'],
            rows: [
                ['Türkiye', '2023-Q1', '%50,5', '%22,4'],
                ['Türkiye', '2024-Q1', '%68,5', '%43,1'],
                ['Türkiye', '2025-Q1', '%38,1', '%39,0'],
                ['Türkiye', '2026-Q1', '%29,4', '%31,5']
            ],
            okText: 'Tek bir birim (Türkiye) zaman içinde izleniyor. Kronolojik sıra bozulmamalıdır; çünkü t dönemindeki faiz, t−1 döneminin devamıdır. Sıra bozulursa otokorelasyon ve gecikme yapısı çöker.'
        },
        panel: {
            indexLabel: 'İndis: (i, t) çift boyutlu',
            orderLabel: 'Sıra Önemi: Birim içinde kronolojik',
            riskLabel: 'Süper Güç: Sabit Etki (αᵢ) Kontrolü',
            orderMatters: true,
            columns: ['Mülk ID (i)', 'Yıl (t)', 'Lokasyon', 'Yıllık Kira'],
            rows: [
                ['#D-14', '2024', 'Çamlık Cad.', '480.000 ₺'],
                ['#D-14', '2025', 'Çamlık Cad.', '610.000 ₺'],
                ['#D-42', '2024', 'Sanayi Sit.', '210.000 ₺'],
                ['#D-42', '2025', 'Sanayi Sit.', '265.000 ₺']
            ],
            okText: 'Aynı mülkler (#D-14 ve #D-42) yıllar boyunca takip ediliyor. Bu sayede Çamlık gibi semtlerin zamanla değişmeyen gizli prestijini Sabit Etkiler (Fixed Effects) ile kontrol edebilirsin.'
        },
        pooled: {
            indexLabel: 'İndis: Farklı (i) + Dönem (Dₜ)',
            orderLabel: 'Sıra Önemi: Dönem sütunuyla taşınır',
            riskLabel: 'Dikkat: Sabit etki izlenemez',
            orderMatters: false,
            columns: ['Ev ID (Yeni)', 'Seçim Yılı', 'D₂₀₂₆ Kukla', 'Satış Fiyatı'],
            rows: [
                ['#A-09', '2024', '0', '2.850.000 ₺'],
                ['#A-71', '2024', '0', '3.120.000 ₺'],
                ['#B-18', '2026', '1', '4.300.000 ₺'],
                ['#B-64', '2026', '1', '4.650.000 ₺']
            ],
            okText: '2024 ve 2026 yıllarında tamamen farklı rastgele evler (#A ve #B) seçilip birleştirilmiş. Birim takibi olmadığı için sabit etki kurulamaz; 2024→2026 yapısal kaymasını D₂₀₂₆ kukla değişkeni ölçer.'
        }
    };

    const tabBtns = document.querySelectorAll('.s3-lab-tab');
    const theadEl = document.getElementById('s3-lab-thead');
    const tbodyEl = document.getElementById('s3-lab-tbody');
    const metaIndexEl = document.getElementById('s3-meta-index');
    const metaOrderEl = document.getElementById('s3-meta-order');
    const metaRiskEl = document.getElementById('s3-meta-risk');
    const shuffleBtn = document.getElementById('s3-shuffle-btn');
    const verdictBox = document.getElementById('s3-lab-verdict');
    const verdictTitle = document.getElementById('s3-verdict-title');
    const verdictText = document.getElementById('s3-verdict-text');

    if (tabBtns.length && theadEl && tbodyEl && shuffleBtn && verdictBox) {
        let currentMode = 'cross';
        let currentRows = [];

        const renderTable = (cols, rows) => {
            theadEl.innerHTML = `<tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr>`;
            tbodyEl.innerHTML = rows
                .map((r) => `<tr>${r.map((cell, idx) => `<td>${idx === 0 ? `<b>${cell}</b>` : cell}</td>`).join('')}</tr>`)
                .join('');
        };

        const loadMode = (mode) => {
            currentMode = mode;
            const cfg = DATASETS[mode];
            currentRows = cfg.rows.map((r) => [...r]);

            metaIndexEl.textContent = cfg.indexLabel;
            metaOrderEl.textContent = cfg.orderLabel;
            metaRiskEl.textContent = cfg.riskLabel;

            renderTable(cfg.columns, currentRows);
            verdictBox.classList.remove('is-ok', 'is-warn');
            verdictBox.classList.add('is-ok');
            verdictTitle.textContent = 'Mimari Özeti';
            verdictText.textContent = cfg.okText;
        };

        tabBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                tabBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                loadMode(btn.getAttribute('data-mode'));
            });
        });

        shuffleBtn.addEventListener('click', () => {
            const cfg = DATASETS[currentMode];
            currentRows.sort(() => Math.random() - 0.5);
            renderTable(cfg.columns, currentRows);

            verdictBox.classList.remove('is-ok', 'is-warn');
            if (cfg.orderMatters) {
                verdictBox.classList.add('is-warn');
                verdictTitle.textContent = 'Dikkat! Sıra Bozuldu — Kronolojik Akış Koptu';
                verdictText.textContent =
                    'Satırları karıştırdığın için zaman sırası bozuldu! Bu yapıda gecikmeli terimler (t−1) ' +
                    've otokorelasyon kontrolleri zaman sırasına güvendiği için analiz öncesi veriyi yeniden tarih sırasına dizmelisin.';
            } else {
                verdictBox.classList.add('is-ok');
                verdictTitle.textContent = 'Sorun Yok! Satır Sırası Modeli Etkilemedi';
                verdictText.textContent =
                    'Gözlemler farklı birimlerden oluştuğu (veya dönem bilgisi ayrı sütunda tutulduğu) için ' +
                    'satırları rastgele karıştırman OLS katsayılarını ve model sonucunu değiştirmez.';
            }
        });

        loadMode('cross');
    }
});
