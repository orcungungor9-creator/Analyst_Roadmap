// ==========================================================================
// 8. AŞAMA: ÖRNEKLEME TEKNİĞİNİN KARARLAŞTIRILMASI — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s8-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: Canlı Örneklem Büyüklüğü (n) Hesaplayıcı
    const zBtns = document.querySelectorAll('.s8-z-btn');
    const nBtns = document.querySelectorAll('.s8-n-btn');
    const errRange = document.getElementById('s8-err-range');
    const errVal = document.getElementById('s8-err-val');
    const pRange = document.getElementById('s8-p-range');
    const pVal = document.getElementById('s8-p-val');
    const outN0 = document.getElementById('s8-out-n0');
    const outN = document.getElementById('s8-out-n');
    const outSub = document.getElementById('s8-out-sub');

    if (zBtns.length && errRange && pRange && outN0 && outN && outSub) {
        let z = 1.96;
        let popN = 0; // 0 => sonsuz / çok büyük evren
        let confText = '%95';

        const calculateSampleSize = () => {
            const ePct = Number(errRange.value);
            const e = ePct / 100;
            const p = Number(pRange.value) / 100;

            errVal.textContent = `± %${ePct} (${e.toFixed(2)})`;
            pVal.textContent = p === 0.5 ? '0.50 (En Güvenli)' : p.toFixed(2);

            const n0Raw = (z * z * p * (1 - p)) / (e * e);
            const n0 = Math.ceil(n0Raw);

            let finalN = n0;
            let extraNote = '';
            if (popN > 0) {
                finalN = Math.ceil(n0Raw / (1 + (n0Raw - 1) / popN));
                if (popN <= 50 || finalN / popN >= 0.85) {
                    finalN = popN;
                    extraNote = ' → Evren çok küçük olduğu için örneklem yerine N = n (Tam Sayım) önerilir!';
                }
            }

            outN0.textContent = n0.toLocaleString('tr-TR');
            outN.textContent = `${finalN.toLocaleString('tr-TR')} gözlem`;

            const popLabel = popN > 0 ? ` · N = ${popN.toLocaleString('tr-TR')} (FPC uygulandı)` : ' · Büyük Evren';
            outSub.textContent = `${confText} güven ve ± %${ePct} hata payı ile${popLabel}${extraNote}`;
        };

        zBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                zBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                z = Number(btn.getAttribute('data-z')) || 1.96;
                confText = btn.textContent.split(' ')[0];
                calculateSampleSize();
            });
        });

        nBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                nBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                popN = Number(btn.getAttribute('data-pop')) || 0;
                calculateSampleSize();
            });
        });

        errRange.addEventListener('input', calculateSampleSize);
        pRange.addEventListener('input', calculateSampleSize);
        calculateSampleSize();
    }
});
