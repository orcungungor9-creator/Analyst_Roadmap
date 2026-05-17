const formulasData = [
    // ==========================================
    // 1. TEMEL (TANIMLAYICI) İSTATİSTİK
    // ==========================================
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Kitle (Evren) ve Örneklem Sembolleri",
        desc: "İstatistiksel formüllerin popülasyon üzerinden mi, yoksa örneklem üzerinden mi hesaplandığını belirtir.",
        formula: "$$ N, \\mu, \\sigma^2, \\sigma \\quad \\text{(Kitle)} \\\\ n, \\bar{x}, s^2, s \\quad \\text{(Örneklem)} $$",
        good: "Kitle ile örneklem arasındaki farkı netleştirir, formülün kime ait olduğunu anında söyler.",
        bad: "Bessel Düzeltmesi (n-1): Örneklem varyansı hesaplanırken payda n yerine n-1 alınmalıdır, aksi halde tahmin yanlı (biased) olur."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Aritmetik Ortalama (Basit Seri)",
        desc: "Gözlemlerin frekansı olmadan, tek tek sıralandığı ham veri setinin ortalamasıdır.",
        formula: "$$ \\bar{x} = \\frac{\\sum_{i=1}^n x_i}{n} $$",
        good: "Hesaplaması en kolay ve cebirsel işlemlere en yatkın merkez ölçütüdür.",
        bad: "Uç değerlerden (outliers) ölümcül derecede etkilenir."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Aritmetik Ortalama (Frekans Serisi)",
        desc: "Verilerin tekrarlanma sayılarının (frekans - f) bilindiği durumlar için.",
        formula: "$$ \\bar{x} = \\frac{\\sum_{i=1}^k f_i x_i}{\\sum_{i=1}^k f_i} $$",
        good: "Tekrarlayan binlerce veriyi tek tek toplamak yerine pratik çarpım sağlar.",
        bad: "Veri seti sürekli ve çok çeşitli ise frekans serisi yapmak anlamsızlaşır."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Aritmetik Ortalama (Sınıflandırılmış Seri)",
        desc: "Aralıklara bölünmüş verilerde, sınıfın tam orta noktası (m) alınarak hesaplanır.",
        formula: "$$ \\bar{x} = \\frac{\\sum_{i=1}^k f_i m_i}{\\sum_{i=1}^k f_i} $$",
        good: "Devasa verileri gruplayarak hafıza ve işlem yükünü minimuma indirir.",
        bad: "Veri kaybı yaşanır; sonuç kesin gerçek değil, gerçeğe çok yakın bir tahmindir."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Medyan (Basit ve Frekans Serisi)",
        desc: "Sıralanmış veride tam ortadaki (n+1)/2. sıradaki değerdir.",
        formula: "$$ \\text{Konum} = \\frac{n+1}{2} $$",
        good: "Aykırı değerlerden (örn: Bill Gates odaya girdiğinde) zerre etkilenmeyen (robust) sağlam bir merkezdir.",
        bad: "Matematiksel işlemlerde kullanılamaz, toplam değeri hesaba katmaz."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Medyan (Sınıflandırılmış Seri)",
        desc: "Aralıklı (gruplu) serilerde medyanın hangi sınıfın içinde tam olarak nerede olduğunu bulur.",
        formula: "$$ \\text{Medyan} = L + \\left( \\frac{\\frac{n}{2} - F}{f} \\right) \\times c $$",
        good: "L: Alt sınır, F: Önceki birikimli frekans, f: Medyan sınıf frekansı, c: Sınıf aralığı. Gruplanmış veride kusursuz nokta atışı yapar.",
        bad: "Eğer verilerin dağılımı sınıf içinde homojen değilse hata payı barındırır."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Mod (Basit ve Frekans Serisi)",
        desc: "Veri setinde frekansı en yüksek olan, en popüler değerdir.",
        formula: "$$ \\text{Maksimum } f_i \\text{ değerine sahip } x_i $$",
        good: "Kategorik ve nominal (örn: meslek, renk) verilerde tek merkez ölçütüdür.",
        bad: "Seride mod hiç olmayabilir veya birden fazla (bimodal, trimodal) olabilir."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Mod (Sınıflandırılmış Seri)",
        desc: "Gruplu serilerde modun hangi sınıf içinde olduğunu ve tam değerini tahmin eder.",
        formula: "$$ \\text{Mod} = L + \\left( \\frac{\\Delta_1}{\\Delta_1 + \\Delta_2} \\right) \\times c $$",
        good: "Δ1: Mod sınıfı ile önceki sınıf frekans farkı. Δ2: Sonraki sınıf frekans farkı. Çok akıllıca bir interpolasyon yöntemidir.",
        bad: "Medyan formülü gibi, sınıf içi verilerin homojen dağıldığını varsayar."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Geometrik Ortalama",
        desc: "Büyüme oranları, faizler, enflasyon gibi yüzdelik veya katlanarak artan oranların ortalamasıdır.",
        formula: "$$ G = \\sqrt[n]{x_1 \\cdot x_2 \\dots x_n} $$",
        good: "Birleşik büyüme (Compound Growth) etkisini hesaplamak için alternatifsizdir.",
        bad: "Setin içinde 0 veya negatif değer varsa tüm formülü patlatır."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Harmonik Ortalama",
        desc: "Hız (km/saat), fiyat-kazanç (F/K) gibi 'birim başına' oranların ortalamasıdır.",
        formula: "$$ H = \\frac{n}{\\sum_{i=1}^n \\frac{1}{x_i}} $$",
        good: "Büyük sayıların ortalamayı gereksiz yere şişirmesini engeller; küçük sayılara ağırlık verir.",
        bad: "0 ve negatif değerlere tamamen kapalıdır."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Kuarklar, Desiller, Yüzdelikler (Quartiles & Percentiles)",
        desc: "Veri setini 4'e (Çeyreklik), 10'a (Ondalık) veya 100'e (Yüzdelik) bölen konum ölçüleridir.",
        formula: "$$ P_k = L + \\left( \\frac{\\frac{k \\cdot n}{100} - F}{f} \\right) \\times c $$",
        good: "Bir öğrencinin sınavda ilk %10'a girip girmediğini (Percentile) hesaplamanın temelidir.",
        bad: "Medyan formülünün aynısıdır, sadece n/2 yerine kn/100 yazılır."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Varyans (Basit Seri - Örneklem)",
        desc: "Her bir verinin ortalamadan farkının karelerinin ortalamasıdır.",
        formula: "$$ s^2 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1} $$",
        good: "Ekonomi ve fizikte riskin/dalgalanmanın matematiksel kaynak kodudur.",
        bad: "Birimi orijinal birimin karesidir (örn: Dolar²), bu yüzden yorumlanamaz."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Varyans (Frekans Serisi - Örneklem)",
        desc: "Frekanslı verilerin ortalamadan sapmalarının karesinin ağırlıklı ortalamasıdır.",
        formula: "$$ s^2 = \\frac{\\sum_{i=1}^k f_i (x_i - \\bar{x})^2}{\\sum f_i - 1} $$",
        good: "Binlerce verinin varyansını kısa bir tabloyla hesaplamayı sağlar.",
        bad: "Aritmetik işlemler manuel yapıldığında hataya çok müsaittir."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Varyans (Sınıflandırılmış Seri)",
        desc: "Gruplanmış verilerde sınıf orta noktası (m) kullanılarak varyans hesaplaması.",
        formula: "$$ s^2 = \\frac{\\sum_{i=1}^k f_i (m_i - \\bar{x})^2}{\\sum f_i - 1} $$",
        good: "Büyük veritabanlarında varyans tahmini için oldukça etkilidir.",
        bad: "Sınıf içi değerler bilinmediği için varyans gerçek değerinden farklı (bias) çıkabilir (Sheppard Düzeltmesi gerekebilir)."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Çarpıklık Katsayısı (Pearson Skewness 1 & 2)",
        desc: "Dağılımın simetrik mi, yoksa sağa/sola mı yatık olduğunu Mod ve Medyan üzerinden ölçer.",
        formula: "$$ Sk_1 = \\frac{\\bar{x} - \\text{Mod}}{s} \\quad Sk_2 = \\frac{3(\\bar{x} - \\text{Medyan})}{s} $$",
        good: "Basit ve çok etkilidir. Eğer Ortalama > Medyan ise dağılım kesin sağa çarpıktır (Örn: Maaş dağılımı).",
        bad: "Momentlere dayalı asıl çarpıklık formülü kadar hassas değildir."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Basıklık Katsayısı (Kurtosis - 4. Moment)",
        desc: "Dağılımın kuyruk kalınlığını ve merkezdeki sivrilik potansiyelini (aykırı değer ihtimalini) ölçer.",
        formula: "$$ K = \\frac{\\frac{1}{n}\\sum (x_i - \\bar{x})^4}{s^4} - 3 $$",
        good: "Aşırı uç değerlerin (Siyah Kuğu) ne kadar muhtemel olduğunu finansal risk analizinde kusursuz söyler.",
        bad: "Yorumlaması her zaman karıştırılır. Kurtosis sivriliği değil, ekstrem uçlara gitme potansiyelini ölçer."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Kovaryans (Covariance)",
        desc: "İki değişkenin birlikte nasıl hareket ettiğini (yönünü) ölçer. Biri artarken diğeri de mi artıyor?",
        formula: "$$ Cov(X,Y) = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{n-1} $$",
        good: "Portföy teorisinde hisselerin birlikte hareket yönünü belirlemenin ana taşıdır.",
        bad: "Birimi X ve Y'nin birimlerinin çarpımıdır (Örn: kg * metre). Sadece yönü verir, ilişkinin gücü hakkında konuşamaz."
    },
    {
        category: "temel",
        badge: "Temel İstatistik",
        title: "Pearson Korelasyon Katsayısı (r)",
        desc: "İki sürekli değişken arasındaki doğrusal ilişkinin YÖNÜNÜ ve GÜCÜNÜ (-1 ile 1 arasında) ölçer.",
        formula: "$$ r = \\frac{Cov(X,Y)}{s_x \\cdot s_y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2} \\sqrt{\\sum (y_i - \\bar{y})^2}} $$",
        good: "Birimden tamamen bağımsız, standardize ve harika bir metrik. -1 mükemmel ters, +1 mükemmel doğru orantıdır.",
        bad: "Korelasyon nedensellik DEĞİLDİR (Correlation is not causation). Sadece doğrusal ilişkilere duyarlıdır, eğrisel ilişkilerde 0 çıkar."
    },

    // ==========================================
    // 2. ÇIKARIMSAL İSTATİSTİK
    // ==========================================
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Tek Örneklem Z-Testi",
        desc: "Örneklem ortalamasının, bilinen bir kitle ortalamasından (μ) farklı olup olmadığını (kitle varyansı biliniyorsa) test eder.",
        formula: "$$ Z = \\frac{\\bar{x} - \\mu_0}{\\frac{\\sigma}{\\sqrt{n}}} $$",
        good: "Büyük örneklemlerde (n>30) ve kitle standart sapması bilindiğinde en güçlü testtir.",
        bad: "Gerçek hayatta kitle standart sapması (σ) neredeyse hiçbir zaman bilinmez, bu yüzden yerini T-Testine bırakır."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Tek Örneklem T-Testi",
        desc: "Örneklem ortalamasının, belirli bir hedeften farklı olup olmadığını (kitle varyansı bilinmiyorken) test eder.",
        formula: "$$ t = \\frac{\\bar{x} - \\mu_0}{\\frac{s}{\\sqrt{n}}} $$",
        good: "Küçük veri setlerinde, sadece örneklemin kendi standart sapması (s) kullanılarak güvenle analiz yapılır.",
        bad: "Verinin normal dağılımdan geldiğini varsayar. (Serbestlik derecesi: n-1)."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Bağımsız Çift Örneklem T-Testi",
        desc: "İki bağımsız grubun (Örn: İlaç A alanlar ve İlaç B alanlar) ortalamaları arasındaki farkı test eder.",
        formula: "$$ t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}} $$",
        good: "A/B testleri (A/B Testing) için dünyada en çok kullanılan bilimsel standarttır.",
        bad: "Grupların varyanslarının eşit (Homoscedasticity) olduğunu varsayar. Eşit değilse Welch T-Testi kullanılmalıdır."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Bağımlı (Eşleştirilmiş) Örneklem T-Testi",
        desc: "Aynı grubun farklı zamanlardaki (Örn: Diyet Öncesi Kilo vs Diyet Sonrası Kilo) değişimini ölçer.",
        formula: "$$ t = \\frac{\\bar{d}}{s_d / \\sqrt{n}} \\quad (d_i = x_{2i} - x_{1i}) $$",
        good: "Bireylerin kendi içindeki gelişimini çok hassas ölçer, bireysel farklılıkların yarattığı hatayı sıfırlar.",
        bad: "Ölçümlerin aynı sırayla eşleştirilmesi zorunludur."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Tek Yönlü ANOVA (F-Testi)",
        desc: "3 veya daha fazla bağımsız grubun ortalamalarının eşitliği hipotezini Varyansları bölerek test eder.",
        formula: "$$ F = \\frac{MS_B}{MS_W} = \\frac{\\frac{SS_B}{k-1}}{\\frac{SS_W}{N-k}} $$",
        good: "SS_B (Gruplar Arası Sapma) ve SS_W (Grup İçi Sapma). Çoklu testlerin Tip I Hata şişirmesini tek bir testle çözer.",
        bad: "Farkın HANGİ gruplar arasında olduğunu asla söylemez. Tukey, Scheffe veya Bonferroni (Post-Hoc) şarttır."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Ki-Kare (Chi-Square) Bağımsızlık Testi",
        desc: "İki kategorik değişken arasında (Örn: Cinsiyet ile Meslek Seçimi) anlamlı bir ilişki/bağlılık olup olmadığını ölçer.",
        formula: "$$ \\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i} $$",
        good: "O_i: Gözlenen Frekans, E_i: Beklenen Frekans. Anket ve pazar araştırmalarının vazgeçilmezidir.",
        bad: "Yüzdelerle DEĞİL, mutlak sayı (frekans) ile çalışmak zorundadır. Beklenen değerlerin çoğu 5'ten küçük olmamalıdır."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Spearman Sıra Korelasyonu (Rho)",
        desc: "Pearson korelasyonunun parametrik olmayan (non-parametric) kardeşidir. Değerleri değil, Sıra Numaralarını (Rank) karşılaştırır.",
        formula: "$$ \\rho = 1 - \\frac{6 \\sum d_i^2}{n(n^2 - 1)} $$",
        good: "Aykırı değerlere karşı tamamen zırhlıdır. Doğrusal değil, tek yönlü (monotonic) ilişkileri mükemmel yakalar.",
        bad: "Orijinal veri değerlerindeki metrik bilgiyi ('aradaki fark ne kadar' bilgisini) sıraya çevirirken çöpe atar."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Mann-Whitney U Testi",
        desc: "Bağımsız İki Örneklem T-Testi'nin dağılımdan bağımsız (non-parametrik) versiyonudur.",
        formula: "$$ U = n_1 n_2 + \\frac{n_1(n_1+1)}{2} - R_1 $$",
        good: "Veri normal dağılmadığında veya Likert ölçeği (Ankete Katılıyorum/Katılmıyorum) verilerinde tek kurtarıcıdır.",
        bad: "T-Testi kadar güçlü değildir, ufak farkları kaçırabilir."
    },
    {
        category: "cikarimsal",
        badge: "Çıkarımsal İstatistik",
        title: "Güven Aralığı (Ortalama için)",
        desc: "Bir kitle parametresinin belirli bir olasılık (genelde %95) aralığında nerede olduğunu tahmin eder.",
        formula: "$$ CI = \\bar{x} \\pm Z_{\\frac{\\alpha}{2}} \\left( \\frac{\\sigma}{\\sqrt{n}} \\right) \\quad \\text{veya} \\quad t \\left( \\frac{s}{\\sqrt{n}} \\right) $$",
        good: "Nokta atışı yapmanın imkansız olduğu durumlarda belirsizliği çok profesyonelce raporlar.",
        bad: "%95 Güven aralığı demek, %95 ihtimalle gerçek değer buradadır DEMEK DEĞİLDİR (Sıkça yapılan felsefi bir hata)."
    },
    
    // ==========================================
    // 3. EKONOMETRİ & REGRESYON
    // ==========================================
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Basit Doğrusal Regresyon (Model)",
        desc: "Bağımlı değişken (Y) ile tek bir bağımsız değişken (X) arasındaki doğrusal ilişkiyi kurar.",
        formula: "$$ Y_i = \\beta_0 + \\beta_1 X_i + \\epsilon_i $$",
        good: "Ekonomik teorileri test etmenin ve gelecek tahmini yapmanın (forecasting) en temiz yoludur.",
        bad: "ε_i (Hata terimi) bir sürü varsayıma (Gauss-Markov) uymak zorundadır, aksi halde model çöker."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "EKK Beta Tahmincileri (Eğim ve Sabit)",
        desc: "Hataların karesini minimize (En Küçük Kareler - OLS) ederek en iyi doğruyu çizen Beta formülleri.",
        formula: "$$ \\hat{\\beta}_1 = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sum (X_i - \\bar{X})^2} \\\\ \\hat{\\beta}_0 = \\bar{Y} - \\hat{\\beta}_1 \\bar{X} $$",
        good: "Analitik ve doğrudan çözülebilir, iteresyona (gradient descent'e) gerek duymadan kesin sonucu verir.",
        bad: "Karesel bir optimizasyon olduğu için tek bir şiddetli aykırı değer (Outlier) regresyon çizgisini kendine büker."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Çoklu Regresyon (Matris Formu)",
        desc: "Birden fazla bağımsız değişkenin (X1, X2, Xn) sisteme girdiği modelin matris cebiriyle çözümü.",
        formula: "$$ \\hat{\\beta} = (X^T X)^{-1} X^T Y $$",
        good: "Kaç tane X değişkeni olursa olsun tek bir formülle tüm Beta katsayılarını anında hesaplar.",
        bad: "X matrisinin devrik çarpımının tersi alınabilmelidir. Mükemmel Çoklu Doğrusal Bağlantı varsa ters matris alınamaz, model patlar."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "R-Kare (Belirtme Katsayısı - R²)",
        desc: "Bağımsız değişkenlerin, bağımlı değişkendeki değişimin yüzde kaçını açıkladığını söyler.",
        formula: "$$ R^2 = 1 - \\frac{RSS}{TSS} = 1 - \\frac{\\sum (Y_i - \\hat{Y}_i)^2}{\\sum (Y_i - \\bar{Y})^2} $$",
        good: "0 ile 1 arasında muazzam yorumlanabilir bir uyum iyiliği (Goodness of Fit) metriğidir.",
        bad: "Modele 'Çöp' bir değişken ekleseniz bile asla düşmez. Araştırmacıyı daha fazla değişken eklemeye kandırır."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Düzeltilmiş R-Kare (Adjusted R²)",
        desc: "Modele gereksiz değişken eklenmesini cezalandıran, serbestlik derecesine duyarlı R² versiyonudur.",
        formula: "$$ \\bar{R}^2 = 1 - \\left[ \\frac{(1-R^2)(n-1)}{n-k-1} \\right] $$",
        good: "k (Değişken sayısı) arttıkça formül R²'yi aşağı çeker. Hangi X'lerin çıkarılması gerektiğine karar vermeye yardımcı olur.",
        bad: "Regresyon modellerini kıyaslamak için iyidir ancak doğrusal olmayan modellerde anlamsızlaşır."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Regresyonda F-Testi (Genel Anlamlılık)",
        desc: "Kurulan modelin BÜTÜNÜNÜN (tüm X'lerin hep birlikte) Y'yi açıklamada istatistiksel olarak anlamlı olup olmadığını test eder.",
        formula: "$$ F = \\frac{\\frac{R^2}{k}}{\\frac{1-R^2}{n-k-1}} $$",
        good: "T-Testi tek tek değişkenleri yargılarken, F-Testi kurulan modelin tamamını mahkemeye çıkarır.",
        bad: "Çok büyük veri setlerinde F-Testi p-değeri neredeyse her zaman anlamlı (<0.05) çıkar."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Durbin-Watson Testi (Otokorelasyon)",
        desc: "Zaman serilerinde birbirini takip eden (ardışık) hataların birbiriyle korelasyonlu olup olmadığını test eder.",
        formula: "$$ DW = \\frac{\\sum_{t=2}^T (e_t - e_{t-1})^2}{\\sum_{t=1}^T e_t^2} $$",
        good: "Sonuç 0 ile 4 arasındadır. 2'ye yakın olması otokorelasyon olmadığını gösterir, ekonometrist derin bir nefes alır.",
        bad: "Sadece birinci derece (Gecikme 1) otokorelasyonları yakalar. Üst düzey mevsimsellikler için Breusch-Godfrey LM testi gerekir."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Akaike Bilgi Kriteri (AIC) & BIC",
        desc: "Modeller arası kalite yarışması yapar. En düşük değere sahip olan model en iyisidir.",
        formula: "$$ AIC = 2k - 2\\ln(\\hat{L}) $$",
        good: "Karmaşıklık ile veriye uyum arasındaki muazzam dengeyi sağlar. Overfitting'i önler.",
        bad: "AIC değerlerinin kendi başına mutlak bir anlamı yoktur, sadece diğer modellerin AIC değerleriyle kıyaslanınca bir anlam ifade eder."
    },
    {
        category: "ekonometri",
        badge: "Ekonometri",
        title: "Dickey-Fuller Testi (Birim Kök)",
        desc: "Zaman serisinin durağan (Stationary) olup olmadığını test eder. Seride birim kök varsa seri şokları unutmaz.",
        formula: "$$ \\Delta Y_t = \\alpha + \\gamma Y_{t-1} + \\sum_{i=1}^p \\beta_i \\Delta Y_{t-i} + \\epsilon_t $$",
        good: "Sahte Regresyon (Spurious Regression) felaketine düşmekten kurtarır. Modern zaman serisi analizinin başlangıç noktasıdır.",
        bad: "Yapısal kırılmalar (Örn: 2008 krizi) olduğunda testin gücü düşer, seriyi yanlışlıkla durağan değilmiş gibi gösterir."
    },

    // ==========================================
    // 4. MAKİNE ÖĞRENMESİ (MACHINE LEARNING)
    // ==========================================
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Hata Fonksiyonu: Ortalama Kare Hata (MSE)",
        desc: "Tahminlerin gerçek değerden ne kadar uzaklaştığının karesel ortalamasıdır. ML modellerinin Cost Fonksiyonudur.",
        formula: "$$ MSE = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2 $$",
        good: "Türevi alınabildiği için (Gradient Descent) sinir ağlarında optimizasyon yapmanın en favori yoludur.",
        bad: "Karesel olduğu için hata birimi anlamsızlaşır. İnsan gözüyle anlamak için karekökü (RMSE) alınmalıdır."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Ortalama Mutlak Hata (MAE)",
        desc: "Hataların karesi yerine sadece mutlak değerini alan, aykırı değerleri fazla cezalandırmayan regresyon metriği.",
        formula: "$$ MAE = \\frac{1}{n} \\sum_{i=1}^n |y_i - \\hat{y}_i| $$",
        good: "CFO ve CEO'lara durumu anlatmak için muazzamdır. 'Ortalama tahminimiz 500 Dolar sapıyor' demek kolaydır.",
        bad: "Mutlak değerin x=0 noktasında türevi alınamadığı için geriye yayılım (backpropagation) algoritmalarında sorun yaratır."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "L2 Düzenlileştirmesi (Ridge Regresyon)",
        desc: "Makine öğrenmesinde OLS'ye bir penaltı ekleyerek katsayıların (betaların) aşırı büyümesini engeller.",
        formula: "$$ \\text{Kayıp (Loss)} = \\sum (y_i - \\hat{y}_i)^2 + \\lambda \\sum_{j=1}^p \\beta_j^2 $$",
        good: "Çoklu doğrusal bağlantıyı parçalar ve modelin aşırı öğrenmesini (Overfitting) çok şık bir şekilde önler.",
        bad: "Katsayıları sıfıra yaklaştırır ama asla tam sıfır yapmaz (Lasso'nun aksine). Değişken seçimi yapamaz."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "L1 Düzenlileştirmesi (Lasso Regresyon)",
        desc: "Ridge'den farklı olarak, katsayıları mutlak değeri üzerinden cezalandıran regresyon modeli.",
        formula: "$$ \\text{Kayıp} = \\sum (y_i - \\hat{y}_i)^2 + \\lambda \\sum_{j=1}^p |\\beta_j| $$",
        good: "Gereksiz değişkenlerin (Betaların) katsayısını TAM OLARAK SIFIR yapar. Otomatik Değişken Seçimi (Feature Selection) makinesidir.",
        bad: "Aralarında yüksek korelasyon olan değişken grupları varsa rastgele birini seçip diğerlerini sıfırlar, stabil değildir."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Sınıflandırma: Lojistik Fonksiyon (Sigmoid)",
        desc: "Elde edilen herhangi bir gerçek sayıyı (Z), 0 ile 1 arasında ezerek Olasılığa (Probability) çeviren efsanevi fonksiyon.",
        formula: "$$ \\sigma(z) = \\frac{1}{1 + e^{-z}} $$",
        good: "Derin Öğrenmede (Deep Learning) nöronların aktif olup olmayacağına karar veren kapıdır (Aktivasyon Fonksiyonu).",
        bad: "Gradient Vanishing (Gradyan Kaybolması) problemi: Çok büyük pozitif veya negatif değerlerde türevi sıfıra gider, öğrenme durur."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Softmax Fonksiyonu",
        desc: "Sigmoid'in çoklu sınıflar için genelleştirilmiş halidir. Nöral ağların çıktı katmanında sonuçları olasılık dağılımına (%'ye) çevirir.",
        formula: "$$ Softmax(z_i) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}} $$",
        good: "Örn: Modelin fotoğrafı %70 kedi, %20 köpek, %10 kuş olarak tahmin etmesini sağlar (Toplamları her zaman 1'dir).",
        bad: "Aykırı değerlere hassastır; büyük bir Z değeri, diğer sınıfların olasılıklarını neredeyse sıfıra ezer."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Log-Loss (Cross-Entropy Loss)",
        desc: "Sınıflandırma algoritmalarının kalbini oluşturan ceza (kayıp) fonksiyonudur.",
        formula: "$$ \\text{LogLoss} = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\log(p_i) + (1-y_i) \\log(1-p_i) \\right] $$",
        good: "Model, doğru tahmin etmesine rağmen kendine GÜVENMİYORSA (Örn: %51 olasılıkla kedi diyorsa) onu ağır cezalandırır.",
        bad: "Gözle görülüp anlaşılabilecek (Accuracy gibi) pragmatik bir metrik değildir, tamamen optimizasyon motoru içindir."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Karar Ağaçları: Bilgi Kazancı (Information Gain) ve Entropi",
        desc: "Veriyi dallara (düğümlere) bölerken, o bölmenin içindeki saflığı (veya kaosu) ölçer. Ağacın nereyi keseceğine karar verir.",
        formula: "$$ \\text{Entropi(S)} = - \\sum_{i=1}^c p_i \\log_2(p_i) $$",
        good: "Bilgi Teorisinin mucizesidir. Karar ağaçlarının (Random Forest vb.) nasıl düşündüğünün matematiksel formülüdür.",
        bad: "Çok fazla benzersiz değeri olan (Örn: TC Kimlik No) değişkenlere karşı zaafı vardır, onları seçmeye çok eğilimlidir."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Karar Ağaçları: Gini Safsızlığı (Gini Impurity)",
        desc: "Entropi'nin rakibidir. Rastgele seçilen bir örneğin, o düğümdeki dağılıma göre sınıflandırıldığında yanlış etiketlenme olasılığıdır.",
        formula: "$$ \\text{Gini} = 1 - \\sum_{i=1}^c (p_i)^2 $$",
        good: "Logaritma içermediği için (sadece kare alma) Entropiye göre hesaplanması bilgisayarlar için çok daha hızlıdır.",
        bad: "Sınıflar çok dengesiz olduğunda Entropi kadar hassas cezalandırma yapamaz."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Karmaşıklık Matrisi (Confusion Matrix)",
        desc: "Sınıflandırma modelinin Tüm Doğru (TP/TN) ve Yanlış (FP/FN) kararlarını haritalandıran tablodur.",
        formula: "$$ \\begin{bmatrix} TN & FP \\\\ FN & TP \\end{bmatrix} $$",
        good: "Accuracy'nin maskelediği yalanları ortaya çıkarır. Modelin 'Yanlış Alarm' mı (FP) yoksa 'Kaçırma' mı (FN) yaptığını deşifre eder.",
        bad: "Çok Sınıflı problemlerde matris (Örn 100x100) korkunç bir boyuta ulaşır."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Duyarlılık (Recall / Sensitivity / TPR)",
        desc: "Gerçek pozitif vakaların ne kadarını başarıyla yakalayabildik? (Kaçırmama yeteneği).",
        formula: "$$ \\text{Recall} = \\frac{TP}{TP + FN} $$",
        good: "Kanser teşhisi, Deprem tahmini gibi 'Kaçırmanın bedelinin ölüm olduğu' senaryolarda en kritik metriktir.",
        bad: "Sürekli Pozitif tahminleyen tembel bir model %100 Recall alır ama Precision'ı sıfıra çakılır."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Kesinlik (Precision)",
        desc: "Model 'Pozitif' dediğinde, gerçekten ne kadarı pozitif çıkıyor? (Atıp tutturma / Yanlış alarm vermeme yeteneği).",
        formula: "$$ \\text{Precision} = \\frac{TP}{TP + FP} $$",
        good: "Spam filtreleme veya masum birini hapse atmama gibi 'Yanlış Alarm'ın çok maliyetli olduğu durumlarda kraldır.",
        bad: "Recall ile aralarında hep bir tahterevalli savaşı vardır. Biri artarken genelde diğeri düşer (Precision-Recall Tradeoff)."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "F1-Skoru (F1-Score)",
        desc: "Precision ve Recall'un Harmonik Ortalamasıdır. İkisi arasında adil bir denge kurar.",
        formula: "$$ F1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} $$",
        good: "Özellikle dengesiz (Imbalanced) veri setlerinde (Örn: %99 Normal, %1 Sahtekarlık) modelin gerçek performansını veren en dürüst skordur.",
        bad: "TN (True Negative) değerlerini tamamen göz ardı ettiği için negatif sınıfın başarısını maskeler."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "K-En Yakın Komşu (KNN) - Öklid Mesafesi",
        desc: "KNN Algoritmasında noktalar arasındaki kuş uçuşu düz çizgi mesafesini (Pisagor) hesaplar.",
        formula: "$$ d(x,y) = \\sqrt{\\sum_{i=1}^n (x_i - y_i)^2} $$",
        good: "Gerçek dünyadaki 3 boyutlu uzay algımıza en uygun, sezgisel ve en çok kullanılan uzaklık ölçütüdür.",
        bad: "Veriler standardize edilmemişse (Örn: Biri Milyon TL, biri 1-5 arası Yaş) büyük ölçekli değişken tamamen mesafeyi domine eder."
    },
    {
        category: "makine",
        badge: "Makine Öğrenmesi",
        title: "Destek Vektör Makineleri (SVM) Margin Maksimizasyonu",
        desc: "İki sınıfı birbirinden ayıran EN GENİŞ yolu (Margin) çizen hiper-düzlemin matematiksel optimizasyonudur.",
        formula: "$$ \\min_{w,b} \\frac{1}{2} ||w||^2 \\quad \\text{şartıyla: } y_i(w \\cdot x_i + b) \\ge 1 $$",
        good: "Kernel (Çekirdek) hilesi sayesinde boyutları bükerek doğrusal olarak ayrılamayan verileri harika ayırır.",
        bad: "Milyonlarca satırlık veri setlerinde çalışması inanılmaz yavaştır ve çok fazla RAM harcar."
    }
];

window.formulasData = formulasData;
