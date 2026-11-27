// ==========================================================================
// 5. AŞAMA: KISITLAR VE ETİK ÇERÇEVENİN BELİRLENMESİ — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s5-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: Fizibilite ve Etik Denetim Masası
    const checks = document.querySelectorAll('#s5-audit input[type="checkbox"]');
    const verdictBox = document.getElementById('s5-audit-verdict');
    const verdictTitle = document.getElementById('s5-verdict-title');
    const verdictText = document.getElementById('s5-verdict-text');

    if (checks.length && verdictBox && verdictTitle && verdictText) {
        const evaluateAudit = () => {
            let passedCount = 0;
            const missingCritical = [];
            const missingNormal = [];

            checks.forEach((cb) => {
                const labelEl = cb.closest('.s5-check-card')?.querySelector('strong');
                const title = labelEl ? labelEl.textContent : cb.getAttribute('data-key');
                if (cb.checked) {
                    passedCount += 1;
                } else if (cb.getAttribute('data-critical') === 'true') {
                    missingCritical.push(title);
                } else {
                    missingNormal.push(title);
                }
            });

            verdictBox.classList.remove('is-warn', 'is-block');

            if (missingCritical.length > 0) {
                verdictBox.classList.add('is-block');
                verdictTitle.textContent = `DUR — Yasal / Etik Kırmızı Çizgi İhlali (${passedCount} / ${checks.length})`;
                verdictText.innerHTML =
                    `Eksik kritik kontrol: <strong>${missingCritical.join(', ')}</strong>. ` +
                    `KVKK/GDPR onayı veya kullanım koşulları (ToS) izni olmadan sahaya çıkamazsın; aksi halde toplanan tüm veri hukuken geçersiz sayılır.`;
            } else if (missingNormal.length > 0) {
                verdictBox.classList.add('is-warn');
                verdictTitle.textContent = `REVİZYON GEREKLİ — Operasyonel veya Etik Risk (${passedCount} / ${checks.length})`;
                verdictText.innerHTML =
                    `Giderilmesi gereken nokta: <strong>${missingNormal.join(', ')}</strong>. ` +
                    `Yasal engel yok ancak zamanlama yanlılığı, bütçe aşımı veya maskeleme kaynaklı bilgi kaybını önlemek için planı güncellemelisin.`;
            } else {
                verdictTitle.textContent = `SAHAYA ÇIKABİLİRSİN — Tam Uyum (${passedCount} / ${checks.length})`;
                verdictText.innerHTML =
                    `Operasyonel bütçe/zaman sınırların net, KVKK ve ToS kuralları güvence altında, minimizasyon ve anonimleştirme dengesi kurulmuş. ` +
                    `Artık güvenle <strong>6. Aşama (Dijital Altyapı ve Format)</strong> tasarımına geçebilirsin.`;
            }
        };

        checks.forEach((cb) => cb.addEventListener('change', evaluateAudit));
        evaluateAudit();
    }
});
