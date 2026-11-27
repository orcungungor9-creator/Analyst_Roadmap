// ==========================================================================
// 2. AŞAMA: EVREN VE ÖRNEKLEM ÇERÇEVESİNİN TANIMLANMASI — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini anında ölçerek Hero Banner'ın kayma yapmadan ekrana oturmasını sağla
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s2-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Hero bölüm butonları ile ilgili bloğa yumuşak kaydırma
    document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-scroll-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 3. Mini Laboratuvar: Kapsama Hatası ve Seçim Yanlılığı Simülatörü
    // Denizli ticari gayrimenkul evreni (N = 12.000 mülk):
    // 0.20 * 72.000 + 0.45 * 40.000 + 0.20 * 27.000 + 0.15 * 28.000 = 42.000 TL/m² (Tam eşitlik)
    const SEGMENTS = {
        populer: { share: 0.20, count: 2400, mean: 72000 },
        ilce:    { share: 0.45, count: 5400, mean: 40000 },
        sanayi:  { share: 0.20, count: 2400, mean: 27000 },
        elalti:  { share: 0.15, count: 1800, mean: 28000 }
    };

    const TOTAL_N = 12000;
    const TRUE_MEAN = 42000;
    const MAX_BAR_PRICE = 72000;

    const checkboxes = document.querySelectorAll('#s2-sim input[data-seg]');
    const presetBtns = document.querySelectorAll('.s2-preset-btn');
    const coveragePctEl = document.getElementById('s2-coverage-pct');
    const coverageSubEl = document.getElementById('s2-coverage-sub');
    const estBoxEl = document.getElementById('s2-est-box');
    const estMeanEl = document.getElementById('s2-est-mean');
    const biasLabelEl = document.getElementById('s2-bias-label');
    const estBarEl = document.getElementById('s2-est-bar');
    const estBarValEl = document.getElementById('s2-est-bar-val');
    const verdictBoxEl = document.getElementById('s2-sim-verdict');
    const verdictTitleEl = document.getElementById('s2-verdict-title');
    const verdictTextEl = document.getElementById('s2-verdict-text');

    const formatTL = (val) => Math.round(val).toLocaleString('tr-TR');

    if (checkboxes.length && coveragePctEl && estMeanEl && verdictBoxEl) {
        const updateSim = () => {
            let coveredCount = 0;
            let weightedSum = 0;

            checkboxes.forEach((cb) => {
                const key = cb.getAttribute('data-seg');
                const seg = SEGMENTS[key];
                if (cb.checked && seg) {
                    coveredCount += seg.count;
                    weightedSum += seg.count * seg.mean;
                }
            });

            const estMean = coveredCount > 0 ? weightedSum / coveredCount : TRUE_MEAN;
            const coveragePct = Math.round((coveredCount / TOTAL_N) * 100);
            const diffPct = ((estMean - TRUE_MEAN) / TRUE_MEAN) * 100;
            const absDiff = Math.abs(diffPct);

            coveragePctEl.textContent = `%${coveragePct}`;
            coverageSubEl.textContent = `${formatTL(coveredCount)} / ${formatTL(TOTAL_N)} mülk erişilebilir`;
            estMeanEl.textContent = `${formatTL(estMean)} TL/m²`;

            const barWidth = Math.min(100, Math.max(10, (estMean / MAX_BAR_PRICE) * 100));
            estBarEl.style.width = `${barWidth.toFixed(1)}%`;
            estBarValEl.textContent = `${formatTL(estMean)} ₺`;

            estBoxEl.classList.remove('is-warn', 'is-error');
            verdictBoxEl.classList.remove('is-warn', 'is-error');

            if (absDiff < 2) {
                estBarEl.style.backgroundColor = '#16a34a';
                biasLabelEl.textContent = `Sapma: %0.0 (Yansız — Temsili)`;
                verdictTitleEl.textContent = 'Mükemmel Temsiliyet (Population ≈ Sample)';
                verdictTextEl.innerHTML =
                    'Örneklem çerçeven Denizli\'deki görünür ve görünmez tüm segmentleri kapsıyor. ' +
                    'Buradan yansız seçeceğin örneklem (n), anakütlenin gerçek ortalamasını (<strong>42.000 TL/m²</strong>) ' +
                    'doğru yansıtır ve regresyon katsayıların güvenilir olur.';
            } else if (absDiff < 25) {
                estBoxEl.classList.add('is-warn');
                verdictBoxEl.classList.add('is-warn');
                estBarEl.style.backgroundColor = '#d97706';
                const sign = diffPct > 0 ? '+' : '';
                biasLabelEl.textContent = `Sapma: ${sign}%${diffPct.toFixed(1)} (Kapsama Hatası)`;
                verdictTitleEl.textContent = 'Kapsama Hatası (Undercoverage) Tespit Edildi!';
                verdictTextEl.innerHTML =
                    `İlan dışı devredilen esnaf veya sanayi mülkleri çerçevenin dışında kaldı. ` +
                    `Veriyi ne kadar temizlersen temizle, modelin Denizli piyasasını gerçek değerinden ` +
                    `<strong>${formatTL(Math.abs(estMean - TRUE_MEAN))} TL/m²</strong> farklı tahmin ediyor. ` +
                    `Çerçeveyi yerel portföy veya saha verisiyle desteklemelisin.`;
            } else {
                estBoxEl.classList.add('is-error');
                verdictBoxEl.classList.add('is-error');
                estBarEl.style.backgroundColor = '#dc2626';
                const sign = diffPct > 0 ? '+' : '';
                biasLabelEl.textContent = `Sapma: ${sign}%${diffPct.toFixed(1)} (Ağır Seçim Yanlılığı!)`;
                verdictTitleEl.textContent = 'Ağır Seçim Yanlılığı (Selection Bias) — Model Çöktü!';
                verdictTextEl.innerHTML =
                    `Yalnızca popüler caddelerdeki kolay erişilen mülklere bakarak tüm Denizli hakkında karar veriyorsun! ` +
                    `Gerçek ortalama <strong>42.000 TL/m²</strong> iken modelin piyasayı <strong>${formatTL(estMean)} TL/m²</strong> ` +
                    `sanıyor. Bu veriyle alınan yatırım kararı şirketi doğrudan zarara uğratır.`;
            }
        };

        checkboxes.forEach((cb) => cb.addEventListener('change', updateSim));

        presetBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-preset');
                checkboxes.forEach((cb) => {
                    const seg = cb.getAttribute('data-seg');
                    if (seg === 'populer') {
                        cb.checked = true;
                    } else if (mode === 'full') {
                        cb.checked = true;
                    } else if (mode === 'digital') {
                        cb.checked = seg === 'ilce';
                    } else if (mode === 'biased') {
                        cb.checked = false;
                    }
                });
                updateSim();
            });
        });

        updateSim();
    }
});
