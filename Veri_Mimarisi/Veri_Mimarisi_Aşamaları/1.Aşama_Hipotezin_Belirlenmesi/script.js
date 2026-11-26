// ==========================================================================
// 1. AŞAMA: ARAŞTIRMA SORUSU VE HİPOTEZİN BELİRLENMESİ — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ın ilk ekrana milimetrik oturmasını sağla
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            document.documentElement.style.setProperty('--s1-header-h', `${header.offsetHeight}px`);
        }
    };
    setTimeout(syncHeaderHeight, 25);
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

    // 3. Mini Laboratuvar: Hipotez Karar Simülatörü (p-değeri vs. α)
    const rangeInput = document.getElementById('s1-p-range');
    const pValueEl = document.getElementById('s1-p-value');
    const alphaBtns = document.querySelectorAll('.s1-alpha-btn');
    const rejectBar = document.getElementById('s1-sim-reject');
    const markerEl = document.getElementById('s1-sim-marker');
    const resultBox = document.getElementById('s1-sim-result');
    const resultTitle = document.getElementById('s1-sim-title');
    const resultText = document.getElementById('s1-sim-text');

    if (rangeInput && pValueEl && rejectBar && markerEl && resultBox && resultTitle && resultText) {
        let currentAlpha = 0.05;
        const maxScale = 0.20;

        const updateSimulator = () => {
            const p = Number(rangeInput.value) / 1000; // 0.001 .. 0.200
            pValueEl.textContent = p.toFixed(3);

            // Red bölgesi genişliği (%0 - %100)
            const rejectPct = Math.min(100, Math.max(0, (currentAlpha / maxScale) * 100));
            rejectBar.style.width = `${rejectPct}%`;
            const rejectLabel = rejectBar.querySelector('span');
            if (rejectLabel) {
                rejectLabel.textContent = currentAlpha <= 0.01 ? 'α' : `Red bölgesi (α = ${currentAlpha.toFixed(2)})`;
            }

            // p işaretçisi konumu (kenarlardan taşmaması için %3 - %97 aralığında tut)
            const rawPct = (p / maxScale) * 100;
            const clampedPct = Math.min(97, Math.max(3, rawPct));
            markerEl.style.left = `${clampedPct}%`;

            // İstatistiksel karar
            if (p < currentAlpha) {
                resultBox.classList.remove('is-fail');
                resultTitle.textContent = `H₀ Reddedildi! (p = ${p.toFixed(3)} < α = ${currentAlpha.toFixed(2)})`;
                resultText.innerHTML =
                    `Elde ettiğimiz kanıt şans eseri açıklanamayacak kadar güçlü. ` +
                    `<strong>Alternatif hipotez (H₁) destekleniyor:</strong> Kredi faiz oranlarındaki artışın ` +
                    `ticari gayrimenkul m² satış fiyatları üzerinde istatistiksel olarak anlamlı bir etkisi vardır.`;
            } else {
                resultBox.classList.add('is-fail');
                resultTitle.textContent = `H₀ Reddedilemedi (p = ${p.toFixed(3)} ≥ α = ${currentAlpha.toFixed(2)})`;
                resultText.innerHTML =
                    `Gözlenen ilişki bu anlamlılık düzeyinde şans faktöründen ayırt edilemiyor. ` +
                    `Dikkat: <strong>"Faizin etkisi kesinlikle yoktur" demiyoruz</strong>; yalnızca elimizdeki veriyle ` +
                    `etkiyi kanıtlamaya yetecek güçte delil bulamadığımızı söylüyoruz.`;
            }
        };

        rangeInput.addEventListener('input', updateSimulator);

        alphaBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                alphaBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                currentAlpha = Number(btn.getAttribute('data-alpha')) || 0.05;
                updateSimulator();
            });
        });

        updateSimulator();
    }
});
