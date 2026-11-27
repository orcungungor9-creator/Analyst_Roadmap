// ==========================================================================
// 4. AŞAMA: DEĞİŞKENLERİN MATEMATİKSEL DOĞASI — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s4-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: Ölçek Denetçisi
    const VARIABLES = {
        heating: {
            scale: 'Nominal (İsimsel) Ölçek',
            mean:   ['error', 'GEÇERSİZ İŞLEM', 'Isınma tiplerinin ortalaması alınamaz!', 'Doğalgaz, Klima ve Soba değerleri yalnızca etiket taşır. Sayı atayıp ortalamasını almak (ör. 1,83) matematiksel olarak tamamen anlamsızdır; yalnızca Mod ve Frekans hesaplanır.'],
            median: ['error', 'GEÇERSİZ İŞLEM', 'Sıralama ve medyan hesaplanamaz!', 'Kategoriler arasında doğal bir büyüklük sırası yoktur. Klima, Soba\'dan büyük veya küçük değildir.'],
            ratio:  ['error', 'GEÇERSİZ İŞLEM', 'Oranlama yapılamaz!', 'Bir kategoriyi diğerinin 2 katı olarak tanımlamak mümkün değildir.'],
            log:    ['error', 'GEÇERSİZ İŞLEM', 'Logaritma alınamaz!', 'Nominal etiketlerde sayısal büyüklük ve mutlak sıfır yoktur.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'k − 1 adet Kukla Değişken (0 ve 1) kullan', 'Doğalgaz, Klima ve Soba için 2 adet 0/1 kukla değişken üret (ör. D_Klima ve D_Soba). Doğalgaz baz (referans) grup kalır; aksi halde Kukla Değişken Tuzağı doğar.']
        },
        rating: {
            scale: 'Ordinal (Sıralayıcı) Ölçek',
            mean:   ['warn',  'RİSKLİ / DİKKAT', 'Ortalama alırken eşit mesafe varsayımı yapılır!', 'Tek başına sıralamadır; AAA→AA farkı ile AA→B farkı eşit değildir. Aritmetik ortalama yerine Medyan tercih edilmelidir.'],
            median: ['ok',    'İZİN VERİLİR',    'Sıralama (<, >) ve Medyan anlamlıdır', 'Notlar arasında doğal bir hiyerarşi olduğu için büyüklük karşılaştırması ve ortanca (medyan) hesaplanabilir.'],
            ratio:  ['error', 'GEÇERSİZ İŞLEM', 'Oranlama yapılamaz!', 'B notunun 2 katı AAA değildir; dereceler arası aralıklar sabit ve ölçülebilir değildir.'],
            log:    ['error', 'GEÇERSİZ İŞLEM', 'Logaritma alınamaz!', 'Mutlak sıfır ve eşit aralık olmadığı için ln() dönüşümü anlamsızdır.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'X ise Kukla (k − 1); Y ise Ordered Logit/Probit', 'Sıralı notu 1, 2, 3 diye sürekli sayı gibi modele sokma. Açıklayıcı ise kuklalarla ayır; bağımlı değişken ise Ordered Logit/Probit kur.']
        },
        temp: {
            scale: 'Aralık (Interval) Ölçeği',
            mean:   ['ok',    'İZİN VERİLİR',    'Ortalama ve Standart Sapma hesaplanabilir', 'Santigrat dereceler arasındaki farklar (10°C→20°C ile 20°C→30°C) eşit olduğu için toplama, çıkarma, ortalama ve standart sapma geçerlidir.'],
            median: ['ok',    'İZİN VERİLİR',    'Sıralama ve Medyan geçerlidir', 'Aralık ölçeği kendinden önceki tüm basamakların (Nominal ve Ordinal) izin verdiği işlemleri de taşır.'],
            ratio:  ['error', 'GEÇERSİZ İŞLEM', '20°C, 10°C\'nin 2 katı sıcak değildir!', '0°C mutlak sıfır (sıcaklığın yokluğu) değil keyfi bir başlangıç noktasıdır. Bu yüzden çarpma ve bölme (oranlama) hatalıdır.'],
            log:    ['error', 'GEÇERSİZ İŞLEM', 'Negatif ve keyfi sıfır yüzünden ln(X) alınamaz!', '0°C veya −5°C değerleri görülebileceği için logaritmik dönüşüm ve yüzde (%) değişim hesabı yapılamaz; fark (ΔX) kullanılır.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'Doğrusal fark (ΔX) olarak modele girer', 'Etki her +1°C artışın Y üzerindeki mutlak değişimi olarak yorumlanır (yüzde esneklik olarak değil).']
        },
        price: {
            scale: 'Oran (Ratio) · Sürekli Ölçek',
            mean:   ['ok',    'İZİN VERİLİR',    'Ortalama ve tüm parametrik istatistikler serbest', 'Gerçek sıfır ve eşit aralık sayesinde ortalama, standart sapma, varyans güvenle hesaplanır (çarpıklık varsa medyanla desteklenir).'],
            median: ['ok',    'İZİN VERİLİR',    'Sıralama ve Medyan geçerlidir', 'Özellikle aşırı lüks villaların ortalamayı yukarı çektiği piyasalarda medyan mükemmel bir tamamlayıcıdır.'],
            ratio:  ['ok',    'İZİN VERİLİR',    '4.000.000 TL, 2.000.000 TL\'nin tam 2 katıdır!', '0 TL gerçekten fiyatın yokluğunu ifade ettiği için tüm oranlama, çarpma ve bölme işlemleri matematiksel olarak kusursuzdur.'],
            log:    ['ok',    'İZİN VERİLİR',    'ln(Fiyat) dönüşümü ekonometrinin altın standardıdır', 'Pozitif oran ölçeğinde logaritma almak hem sağa çarpıklığı ve Değişen Varyansı azaltır hem de katsayıların doğrudan % esneklik olarak okunmasını sağlar.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'Sürekli sayısal değişken veya ln(Y)', 'OLS/Panel regresyonlarda doğrudan TL veya logaritmik formda (ln TL) modele dahil edilir.']
        },
        hour: {
            scale: 'Özel Ölçek · Döngüsel (Circular)',
            mean:   ['error', 'TUZAK / HATALI',  '23:00 ile 01:00\'in aritmetik ortalaması 12:00 (öğlen) çıkar!', 'Düz sayı gibi ortalama alırsan gece yarısı işlemlerinin ortalamasını öğle vakti sanırsın. Döngüsel verilerde doğrusal ortalama çöker.'],
            median: ['warn',  'DİKKAT',          'Sıralama döngü sınırında kopar', '23, 00 değerinden büyüktür ama gerçekte sadece 1 saat gerisindedir. Standart sıralama sınırda yanıltır.'],
            ratio:  ['error', 'GEÇERSİZ İŞLEM', 'Saat 20:00, saat 10:00\'ın 2 katı değildir!', 'Sayısal etiket döngüsel zamanı gösterir, büyüklük oranı kurulamaz.'],
            log:    ['error', 'GEÇERSİZ İŞLEM', 'Döngüsel saatte logaritma anlamsızdır', '00:00 saati mutlak sıfır değildir; ln(0) zaten tanımsızdır.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'Sinüs / Kosinüs (sin θ, cos θ) veya Saat Dilimi Kuklaları', 'Döngüsel sürekliliği korumak için 2π·saat/24 üzerinden sin ve cos sütunları üret ya da saat dilimlerini (Sabah, Öğle, Akşam, Gece) kukla değişken yap.']
        },
        sold: {
            scale: 'Özel Ölçek · İkili / Dikotom (0 / 1)',
            mean:   ['ok',    'ÖZEL GÜÇ!',       '0/1 ortalaması doğrudan "Satılma Olasılığıdır (%)"', '100 ilanın 35\'i satılmışsa (1), 0/1 sütununun ortalaması 0,35 yani %35 satış oranı verir!'],
            median: ['ok',    'İZİN VERİLİR',    'En sık grup (Mod / Medyan) belirlenir', 'Yalnızca iki sınıf olduğu için hangi grubun ağırlıkta olduğunu gösterir.'],
            ratio:  ['error', 'GEÇERSİZ İŞLEM', '"Satıldı (1)", "Satılmadı (0)"ın sayısal katı değildir', '0 ve 1 yalnızca durum göstergesidir; olasılık oranı dışında ham değer üzerinden çarpma/bölme yapılmaz.'],
            log:    ['error', 'GEÇERSİZ İŞLEM', 'Ham 0 ve 1 değerine doğrudan ln(Y) alınamaz', 'ln(0) tanımsızdır. Bunun yerine olasılığın odds oranının logaritması (Logit = ln(p / (1−p))) modellenir.'],
            model:  ['ok',    'DOĞRU TEMSİL',    'X ise 0/1 Kukla; Y ise Logit / Probit Modeli', 'Açıklayıcı değişken olarak 0/1 kukla halinde direkt girer; hedef değişken (Y) ise tahminin 0–1 dışına taşmaması için Logit/Probit kullanılır.']
        }
    };

    const varBtns = document.querySelectorAll('.s4-var-btn');
    const opBtns = document.querySelectorAll('.s4-op-btn');
    const resultBox = document.getElementById('s4-lab-result');
    const resScale = document.getElementById('s4-res-scale');
    const resBadge = document.getElementById('s4-res-badge');
    const resTitle = document.getElementById('s4-res-title');
    const resText = document.getElementById('s4-res-text');

    if (varBtns.length && opBtns.length && resultBox) {
        let activeVar = 'heating';
        let activeOp = 'mean';

        const renderLab = () => {
            const v = VARIABLES[activeVar];
            const [status, badge, title, text] = v[activeOp];

            resScale.textContent = `Ölçek: ${v.scale}`;
            resBadge.textContent = badge;
            resTitle.textContent = title;
            resText.textContent = text;

            resultBox.classList.remove('is-warn', 'is-error');
            if (status === 'warn') resultBox.classList.add('is-warn');
            if (status === 'error') resultBox.classList.add('is-error');
        };

        varBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                varBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                activeVar = btn.getAttribute('data-var');
                renderLab();
            });
        });

        opBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                opBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                activeOp = btn.getAttribute('data-op');
                renderLab();
            });
        });

        renderLab();
    }
});
