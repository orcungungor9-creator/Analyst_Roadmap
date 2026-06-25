const m1Data = [
  {
    id: 1,
    title: "Sayılar, Gerçek Sayılar Kümesi ve Özellikleri",
    concept: "Sayı kümeleri, miktarları ve büyüklükleri tanımlamak için kullanılan matematiksel yapılardır. Gerçek (reel) sayılar kümesi, sayı doğrusundaki tüm boşlukları dolduran, hem kesikli (sayılabilir) hem de sürekli (ölçülebilir) durumları ifade edebilen en geniş tek boyutlu sayı doğrusudur.",
    theory: "Sayılar, birbirini kapsayan temel kümeler halinde sınıflandırılır:\n- <b>Doğal Sayılar (\\(\\mathbb{N}\\)):</b> Sıfırdan başlayarak sonsuza giden sayım sayılarından oluşur: \\(\\{0, 1, 2, 3...\\}\\).\n- <b>Tam Sayılar (\\(\\mathbb{Z}\\)):</b> Doğal sayılara negatif tam sayıların eklenmesiyle oluşur: \\(\\{... -2, -1, 0, 1, 2...\\}\\).\n- <b>Rasyonel Sayılar (\\(\\mathbb{Q}\\)):</b> İki tam sayının birbirine oranı şeklinde yazılabilen sayılardır. Payda sıfır olamaz.\n- <b>İrrasyonel Sayılar (\\(\\mathbb{Q}'\\)):</b> Rasyonel olmayan, virgülden sonraki basamakları herhangi bir tekrar düzeni olmadan sonsuza uzayan sayılardır (örn: \\(\\pi, e, \\sqrt{2}\\)).\n- <b>Gerçek Sayılar (\\(\\mathbb{R}\\)):</b> Rasyonel ve irrasyonel sayıların birleşiminden oluşan, sayı doğrusunun tamamını kapsayan kümedir.",
    properties: [
      {
        name: "Sayı Kümelerinin Kapsama İlişkisi",
        description: "Sayı kümeleri en dar kapsamlı olan Doğal Sayılardan başlayarak Gerçek Sayılara kadar birbirini kapsayacak şekilde hiyerarşik olarak sıralanır: $$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$",
        example_question: "\\(\\sqrt{3}\\), \\(-5\\), \\(3/4\\) ve \\(0\\) sayılarının ait olduğu en dar sayı kümelerini belirtiniz.",
        example_solution: "- \\(0\\): Ait olduğu en dar küme Doğal Sayılardır (\\(\\mathbb{N}\\)).\n- \\(-5\\): Negatif olduğu için Doğal Sayı olamaz, ait olduğu en dar küme Tam Sayılardır (\\(\\mathbb{Z}\\)).\n- \\(3/4\\): İki tam sayının oranı şeklinde yazıldığı için en dar küme Rasyonel Sayılardır (\\(\\mathbb{Q}\\)).\n- \\(\\sqrt{3}\\): Virgülden sonraki kısmı devretmeden sonsuza uzanır, rasyonel değildir. Ait olduğu en dar küme İrrasyonel Sayılardır (\\(\\mathbb{Q}'\\)).\nHepsi aynı zamanda Gerçek Sayılar (\\(\\mathbb{R}\\)) kümesinin elemanıdır."
      },
      {
        name: "Toplama ve Çarpma İşlemlerinin Birleşme ve Dağılma Özellikleri",
        description: "Gerçek sayılar kümesinde işlemler belirli kurallara tabidir. Birleşme özelliği: \\((a+b)+c = a+(b+c)\\). Dağılma özelliği: \\(a \\cdot (b + c) = a \\cdot b + a \\cdot c\\).",
        example_question: "\\(5 \\cdot (2x + 7) - 3 \\cdot (x - 4)\\) ifadesini gerçek sayıların dağılma özelliğini kullanarak en sade hale getiriniz.",
        example_solution: "Dağılma özelliğini terimlere uygulayalım:\n- \\(5 \\cdot (2x + 7) = 10x + 35\\)\n- \\(-3 \\cdot (x - 4) = -3x + 12\\)\n\nŞimdi terimleri birleştirelim:\n\\((10x - 3x) + (35 + 12) = 7x + 47\\)."
      },
      {
        name: "Ters Eleman Özelliği",
        description: "Her \\(a\\) gerçek sayısının toplama işlemine göre tersi \\(-a\\)'dır ve toplamları etkisiz eleman olan \\(0\\)'ı verir. Sıfırdan farklı her \\(a\\) gerçek sayısının çarpma işlemine göre tersi \\(1/a\\)'dır ve çarpımları etkisiz eleman olan \\(1\\)'i verir.",
        example_question: "Çarpma işlemine göre tersi kendisinin 4 katının 3 eksiğine eşit olan pozitif gerçek sayıyı bulunuz.",
        example_solution: "Aradığımız sayı \\(x\\) olsun (\\(x > 0\\)).\nÇarpma işlemine göre tersi: \\(\\frac{1}{x}\\).\nDenklemi kuralım: \\(\\frac{1}{x} = 4x - 3\\).\n\nHer iki tarafı \\(x\\) ile çarpalım (\\(x \\neq 0\\)): \n\\(1 = 4x^2 - 3x \\implies 4x^2 - 3x - 1 = 0\\).\n\nİkinci dereceden denklemi çarpanlarına ayıralım:\n\\((4x + 1)(x - 1) = 0\\).\nKökler: \\(x = -1/4\\) ve \\(x = 1\\).\nSayı pozitif istendiği için \\(x = 1\\) olur."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Sayı kümelerinin özellikleri veri tiplerinin tasarımı için temeldir. Sayılabilir doğal sayılar diskret (kesikli) olasılık modellerinde (Poisson Dağılımı vb.) tıklama sayısı, satış adedi gibi veriler için kullanılırken; gerçek sayılar continuous (sürekli) veri tiplerini (kullanıcı oturum süreleri, hisse senedi fiyatları, sıcaklık) temsil eder. FLOAT/DOUBLE türü veriler gerçek sayı doğrusunun bilgisayardaki karşılığıdır."
  },
  {
    id: 2,
    title: "Üslü ve Köklü Çokluklar",
    concept: "Üslü çokluklar bir sayının kendisiyle kaç kez çarpılacağını pratik yoldan gösterir. Köklü çokluklar ise bu tekrarlı çarpım işleminin tam tersini yaparak, 'hangi tabanın verilen kuvvete ulaştığını' bulmaya yarar.",
    theory: "Üslü ve köklü çoklukların çözümlenmesinde şu temel kurallar takip edilir:\n- Üslü sayılarda negatif kuvvet sayıyı çarpmaya göre tersine çevirir: \\(a^{-n} = 1/a^n\\).\n- Üssün üssü alınırken kuvvetler çarpılır: \\((a^m)^n = a^{m \\cdot n}\\).\n- Çarpım durumundaki köklü ifadeler aynı kök derecesinde tek bir kök içine alınabilir: \\(\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}\\).",
    properties: [
      {
        name: "Üslü Sayılarda Çarpma ve Bölme Özelliği",
        description: "Tabanları aynı olan üslü sayılar çarpılırken üsler toplanır: \\(a^m \\cdot a^n = a^{m+n}\\). Tabanları aynı olan üslü sayılar bölünürken payın üssünden paydanın üssü çıkarılır: \\(\\frac{a^m}{a^n} = a^{m-n}\\).",
        example_question: "\\(\\frac{32^3 \\cdot 8^2}{4^9}\\) işleminin sonucunu hesaplayınız.",
        example_solution: "Tüm sayıları 2'nin kuvveti olarak yazalım:\n- \\(32^3 = (2^5)^3 = 2^{15}\\)\n- \\(8^2 = (2^3)^2 = 2^6\\)\n- \\(4^9 = (2^2)^9 = 2^{18}\\)\n\nFormülleri uygulayalım:\n\\(\\frac{2^{15} \\cdot 2^6}{2^{18}} = \\frac{2^{15+6}}{2^{18}} = \\frac{2^{21}}{2^{18}} = 2^{21-18} = 2^3 = 8\\)."
      },
      {
        name: "Köklü Sayıyı Rasyonel Üsse Çevirme",
        description: "Her köklü sayı, kök derecesi payda olacak şekilde üslü sayı formatında yazılabilir: \\(\\sqrt[n]{x^m} = x^{\\frac{m}{n}}\\).",
        example_question: "\\(\\sqrt[3]{x^2} \\cdot \\sqrt[6]{x}\\) ifadesini tek bir üslü sayı olarak yazınız.",
        example_solution: "İfadeleri rasyonel üslere çevirelim:\n- \\(\\sqrt[3]{x^2} = x^{2/3}\\)\n- \\(\\sqrt[6]{x} = x^{1/6}\\)\n\nÇarpma işleminde üsleri toplayalım:\n\\(x^{2/3} \\cdot x^{1/6} = x^{2/3 + 1/6} = x^{4/6 + 1/6} = x^{5/6}\\).\nKöklü olarak yazmak istersek: \\(\\sqrt[6]{x^5}\\)."
      },
      {
        name: "Paydanın Eşlenik ile Rasyonel Yapılması",
        description: "Rasyonel bir ifadenin paydasında köklü terim varsa, payda eşlenik ifadesiyle çarpılarak rasyonel hale getirilir. \\(\\sqrt{a} - \\sqrt{b}\\)'nin eşleniği \\(\\sqrt{a} + \\sqrt{b}\\)'dir.",
        example_question: "\\(\\frac{6}{\\sqrt{5} - \\sqrt{2}}\\) ifadesinin paydasını rasyonel yapınız.",
        example_solution: "Kesrin pay ve paydasını paydanın eşleniği olan \\(\\sqrt{5} + \\sqrt{2}\\) ile çarpalım:\n\\(\\frac{6 \\cdot (\\sqrt{5} + \\sqrt{2})}{(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})}\\)\n\nPaydada iki kare farkı oluşur:\n\\((\\sqrt{5})^2 - (\\sqrt{2})^2 = 5 - 2 = 3\\).\n\nİfade:\n\\(\\frac{6 \\cdot (\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2}) = 2\\sqrt{5} + 2\\sqrt{2}\\)."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Logaritmik ve üstel büyüme modellerinde üslü sayılar esastır. Köklü sayılar ise istatistikteki varyansın karekökü alınarak hesaplanan <b>Standart Sapma (Standard Deviation)</b> hesaplarında doğrudan karşımıza çıkar. Sağa çarpık dağılımlara sahip gelir veya ev fiyatları gibi verilerde varyansı düşürmek için karekök dönüşümü (square root transform) uygulanır."
  },
  {
    id: 3,
    title: "Cebirsel İfadeler, Çarpanlara Ayırma",
    concept: "Cebirsel ifadeler matematiksel kuralların formülleştirilmiş halidir. Çarpanlara ayırma ise bu ifadeleri daha basit çarpım gruplarına bölerek denklemleri sadeleştirmeyi, sadeleştirme yoluyla çözüme hızla ulaşmayı sağlar.",
    theory: "Cebirsel ifadeleri sadeleştirirken özdeşlikler ve gruplandırma yöntemlerinden faydalanılır. Özellikle ortak çarpan parantezine alma, her terimde bulunan ortak çarpanın dışarı çıkarılması işlemidir: \\(ax + ay = a(x + y)\\). Ayrıca küp toplamı ve farkı açılımları sadeleştirme sorularında sıkça kullanılır.",
    properties: [
      {
        name: "İki Kare Farkı Özdeşliği",
        description: "İki terimin karelerinin farkı, bu terimlerin farkı ile toplamının çarpımına eşittir: \\(a^2 - b^2 = (a - b)(a + b)\\).",
        example_question: "\\(x^2 - 16\\) ifadesini çarpanlarına ayırıp, \\(x = 104\\) için sonucunu hesaplayınız.",
        example_solution: "\\(x^2 - 16 = x^2 - 4^2\\) şeklindedir.\nİki kare farkından: \\((x - 4)(x + 4)\\) olur.\n\n\\(x = 104\\) değerini yerine koyalım:\n\\((104 - 4)(104 + 4) = 100 \\cdot 108 = 10800\\)."
      },
      {
        name: "Tam Kare Açılımı",
        description: "İki terimin toplamının veya farkının karesi açılırken terimlerin kareleri ve çarpımlarının iki katı toplanır: \\((a \\pm b)^2 = a^2 \\pm 2ab + b^2\\).",
        example_question: "\\(x + \\frac{1}{x} = 5\\) olduğuna göre \\(x^2 + \\frac{1}{x^2}\\) değerini bulunuz.",
        example_solution: "Verilen eşitliğin her iki tarafının karesini alalım:\n\\(\\left(x + \\frac{1}{x}\\right)^2 = 5^2\\)\n\nSol tarafı tam kare kuralına göre açalım:\n\\(x^2 + 2 \\cdot x \\cdot \\frac{1}{x} + \\left(\\frac{1}{x}\\right)^2 = 25\\)\n\\(x^2 + 2 + \\frac{1}{x^2} = 25\\)\n\n2'yi sağ tarafa eksi olarak geçirelim:\n\\(x^2 + \\frac{1}{x^2} = 25 - 2 = 23\\)."
      },
      {
        name: "Üç Terimlilerin Çarpanlara Ayrılması",
        description: "\\(x^2 + bx + c\\) ifadesini çarpanlarına ayırırken, çarpımları \\(c\\)'yi, toplamları \\(b\\)'yi veren iki sayı (\\(m\\) ve \\(n\\)) aranır: \\(x^2 + (m+n)x + m \\cdot n = (x + m)(x + n)\\).",
        example_question: "\\(x^2 - 5x - 14\\) ifadesini çarpanlarına ayırınız.",
        example_solution: "Çarpımları \\(-14\\), toplamları \\(-5\\) olan iki sayı bulmalıyız. Bu sayılar \\(-7\\) ve \\(+2\\)'dir:\n- \\((-7) \\cdot (+2) = -14\\)\n- \\((-7) + (+2) = -5\\)\n\nBu durumda ifade: \\((x - 7)(x + 2)\\) şeklinde çarpanlarına ayrılır."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Makine öğrenmesinde kayıp fonksiyonlarının minimize edilmesi (optimizasyon) sırasında cebirsel sadeleştirmeler sıkça kullanılır. Örneğin, <b>En Küçük Kareler Yöntemi (Ordinary Least Squares - OLS)</b> formülleri türetilirken tam kare ifadelerin cebirsel açılımından yararlanılır. Özdeşlikler algoritmik karmaşıklığı düşürmede kritiktir."
  },
  {
    id: 4,
    title: "Kesirler, Doğrusal Eşitlikler",
    concept: "Doğrusal eşitlikler birinci dereceden bir bilinmeyenli denklemlerdir. Değişkenin doğrusal (lineer) bir hat üzerinde değişimini gösterir ve çözümü bilinmeyenin eşitliğin bir tarafında tek başına bırakılmasıyla bulunur.",
    theory: "Birinci dereceden doğrusal eşitliklerin çözümlenmesinde, eşitliğin her iki yanına aynı sayıyı ekleme, çıkarma veya sıfırdan farklı bir sayı ile çarpma işlemleri serbesttir. Rasyonel doğrusal denklemlerde ise içler-dışlar çarpımı yapılarak paydalardan kurtulunur.",
    properties: [
      {
        name: "Birinci Dereceden Doğrusal Denklem Çözümü",
        description: "En temel haliyle \\(ax + b = 0\\) denkleminin çözümü \\(x = -b/a\\)'dır. Bilinenler bir tarafa, bilinmeyenler diğer tarafa toplanarak çözüm aranır.",
        example_question: "\\(5x - 9 = 2x + 6\\) denkleminin çözüm kümesini bulunuz.",
        example_solution: "Bilinmeyenleri sol tarafta, sabit sayıları sağ tarafta toplayalım:\n\\(5x - 2x = 6 + 9\\)\n\\(3x = 15\\)\n\nHer iki tarafı 3'e bölelim:\n\\(x = 5\\).\nÇözüm kümesi: \\(\\{5\\}\\)."
      },
      {
        name: "Kesirli Doğrusal Denklemlerde Payda Eşitleme",
        description: "Kesirli ifadeler barındıran denklemlerde paydalar eşitlenerek ortak paydaya alınır ve ardından payda yok sayılarak doğrusal denklem çözülür.",
        example_question: "\\(\\frac{x - 2}{3} - \\frac{x + 1}{4} = 1\\) denklemini çözünüz.",
        example_solution: "Paydaları 12'de eşitleyelim:\n\\(\\frac{4(x - 2) - 3(x + 1)}{12} = 1\\)\n\nPay kısmını dağıtalım:\n\\(\\frac{4x - 8 - 3x - 3}{12} = 1 \\implies \\frac{x - 11}{12} = 1\\)\n\nİçler dışlar çarpımı yapalım:\n\\(x - 11 = 12 \\implies x = 23\\)."
      },
      {
        name: "Çözüm Kümesi Boş Olan Eşitlik Durumu",
        description: "Bir doğrusal denklemin katsayıları düzenlendiğinde \\(0 \\cdot x = B\\) (veya \\(0 = B\\), \\(B \\neq 0\\)) şeklinde bir eşitlik elde ediliyorsa, bu eşitliğin gerçek sayılarda hiçbir çözümü yoktur (çözüm kümesi boş kümedir).",
        example_question: "\\(3(x - 2) + 5 = 3x - 8\\) denkleminin çözümünü araştırınız.",
        example_solution: "Sol tarafı açalım:\n\\(3x - 6 + 5 = 3x - 8 \\implies 3x - 1 = 3x - 8\\)\n\nHer iki taraftan \\(3x\\) çıkaralım:\n\\(-1 = -8\\)\n\nBu eşitlik matematiksel olarak imkansız bir çelişkidir (\\(-1 \\neq -8\\)). Değişken tamamen yok olmuş ve yanlış bir eşitlik kalmıştır. Dolayısıyla denklemin çözüm kümesi boş kümedir (\\(\\emptyset\\))."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Doğrusal denklemler veri analitiğinde korelasyon ve doğrusal modellerin en basit halidir. Bir şirketin sabit ve değişken maliyetlerine göre ne zaman kar elde etmeye başlayacağını gösteren <b>Başabaş Noktası (Break-Even Point)</b> hesaplaması doğrusal denklemlerin en yaygın pratik uygulamasıdır."
  },
  {
    id: 5,
    title: "II. Dereceden Eşitlikler",
    concept: "İkinci dereceden denklemler, en yüksek dereceli üssü iki olan polinom denklemleridir. Grafiksel olarak parabol çizerler ve sistemin tepe noktasını bulmaya yönelik optimizasyonların temel taşlarıdır.",
    theory: "İkinci dereceden denklemlerin çözümünde çarpanlara ayırma yöntemi pratiklik sağlasa da, her ifade kolayca çarpanlarına ayrılmaz. Bu durumlarda diskriminant (\\(\\Delta\\)) yöntemi kesin çözüm sunar. Diskriminant, denklemin köklerinin gerçek veya sanal (karmaşık) olup olmadığını belirleyen bir test aracıdır.",
    properties: [
      {
        name: "Diskriminant (\\(\\Delta\\)) İncelemesi",
        description: "\\(ax^2 + bx + c = 0\\) denkleminde köklerin durumunu belirlemek için diskriminanta bakılır: \\(\\Delta = b^2 - 4ac\\). \n- \\(\\Delta > 0\\): İki farklı reel kök.\n- \\(\\Delta = 0\\): Çakışık (tek) reel kök.\n- \\(\\Delta < 0\\): Reel kök yoktur.",
        example_question: "\\(x^2 - 6x + 9 = 0\\) denkleminin kaç tane gerçek kökü olduğunu diskriminant yöntemiyle belirleyiniz.",
        example_solution: "Burada \\(a = 1, b = -6, c = 9\\) değerlerini alır.\nDiskriminantı hesaplayalım:\n\\(\\Delta = b^2 - 4ac = (-6)^2 - 4(1)(9) = 36 - 36 = 0\\).\n\n\\(\\Delta = 0\\) olduğu için denklemin birbirine eşit (çakışık) tek bir gerçek kökü vardır. (Bu kök \\(x_1 = x_2 = -b/2a = 6/2 = 3\\)'tür)."
      },
      {
        name: "İkinci Dereceden Denklem Kök Formülü",
        description: "Reel köklerin var olduğu durumlarda, kökler diskriminant yardımıyla şu formülle bulunur: \\(x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}\\).",
        example_question: "\\(x^2 - 5x + 4 = 0\\) denkleminin köklerini bulunuz.",
        example_solution: "Burada \\(a = 1, b = -5, c = 4\\)'tir.\n\\(\\Delta = (-5)^2 - 4(1)(4) = 25 - 16 = 9\\).\n\nKök formülünü uygulayalım:\n\\(x_{1,2} = \\frac{-(-5) \\pm \\sqrt{9}}{2(1)} = \\frac{5 \\pm 3}{2}\\)\n- \\(x_1 = \\frac{5 + 3}{2} = 4\\)\n- \\(x_2 = \\frac{5 - 3}{2} = 1\\).\nKökler: \\(\\{1, 4\\}\\)."
      },
      {
        name: "Kök - Katsayı İlişkileri (Vieta Kuralları)",
        description: "\\(ax^2 + bx + c = 0\\) denkleminin kökleri \\(x_1\\) ve \\(x_2\\) ise, kökler toplamı \\(x_1 + x_2 = -b/a\\), kökler çarpımı \\(x_1 \\cdot x_2 = c/a\\) formülüyle katsayılar üzerinden doğrudan bulunur.",
        example_question: "\\(3x^2 - 12x + 5 = 0\\) denkleminin köklerini tek tek bulmadan, kökler toplamı ile çarpımını bulunuz.",
        example_solution: "Burada \\(a = 3, b = -12, c = 5\\)'tir.\n- Kökler Toplamı: \\(x_1 + x_2 = -\\frac{b}{a} = -\\frac{-12}{3} = 4\\).\n- Kökler Çarpımı: \\(x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{5}{3}\\)."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Makine öğrenmesinde hata miktarını hesaplayan karesel hata (MSE - Mean Squared Error) fonksiyonunun grafik yapısı ikinci derecedendir. Bu fonksiyonun türevinin sıfıra eşitlenip en küçük hata değerinin bulunması aşamaları tamamen ikinci dereceden denklemlerin çözümüne ve tepe noktası analizine dayanır."
  },
  {
    id: 6,
    title: "I. ve II. Dereceden Eşitsizlikler ve Uygulamaları",
    concept: "Eşitsizlikler, bir değişkenin alabileceği değer aralıklarını tanımlar. İkinci dereceden eşitsizliklerin çözümünde kökler bulunarak işaret tablosu oluşturulur ve yön sınırları belirlenir.",
    theory: "Eşitsizlik çözümlerinde, sıradan denklemlerden farklı olarak yön değiştirme kuralı çok önemlidir. Eşitsizliği sıfır yapan kökler bulunduktan sonra oluşturulan işaret tablosu, aslında fonksiyonun hangi aralıklarda pozitif değerler (x-ekseninin üstü) veya negatif değerler (x-ekseninin altı) aldığını gösteren bir haritadır.",
    properties: [
      {
        name: "Birinci Dereceden Eşitsizlik ve Yön Değiştirme Kuralı",
        description: "Eşitsizliğin her iki tarafı negatif bir sayıya bölünürse veya negatif bir sayı ile çarpılırsa eşitsizlik yön değiştirir: \\(a < b \\text{ ve } c < 0 \\implies a \\cdot c > b \\cdot c\\).",
        example_question: "\\(-3x + 8 \\le 20\\) eşitsizliğinin çözüm kümesini bulunuz.",
        example_solution: "Sabit terimi karşıya atalım:\n\\(-3x \\le 12\\)\n\nHer iki tarafı negatif olan \\(-3\\) sayısına bölelim. Kural gereği eşitsizlik yön değiştirmelidir:\n\\(x \\ge \\frac{12}{-3} \\implies x \\ge -4\\).\nÇözüm kümesi: \\([-4, \\infty)\\)."
      },
      {
        name: "İkinci Dereceden Eşitsizlik ve İşaret Tablosu Yapımı",
        description: "\\(ax^2 + bx + c \\ge 0\\) biçimindeki eşitsizliklerde kökler bulunup tabloya yerleştirilir. En sağdan baş katsayı \\(a\\)'nın işaretiyle başlanır, her tek katlı kökte işaret değiştirilir.",
        example_question: "\\(x^2 - 2x - 8 < 0\\) eşitsizliğinin çözüm aralığını tablo çizerek bulunuz.",
        example_solution: "Öncelikle kökleri bulalım:\n\\(x^2 - 2x - 8 = 0 \\implies (x - 4)(x + 2) = 0 \\implies x_1 = -2, x_2 = 4\\).\n\nİşaret tablosunu kuralım. En sağdan \\(x^2\\)'nin katsayısı pozitif (\\(+\\)) olduğu için \\(+\\) ile başlayacağız:\n- \\(x > 4\\) için: \\(+\\)\n- \\(-2 < x < 4\\) için: \\(-\\) (kökten geçtik, işaret değişti)\n- \\(x < -2\\) için: \\(+\\) (diğer kökten geçtik, işaret değişti)\n\nEşitsizlikte \\(< 0\\) (negatif) olan bölge istendiği için aralığımız \\((-2, 4)\\) olur."
      },
      {
        name: "Rasyonel Eşitsizliklerde Payda Kısıtı",
        description: "Rasyonel eşitsizliklerde paydanın kökleri tabloya dahil edilir ancak payda hiçbir zaman sıfır olamayacağı için bu kökler çözüm kümesine asla dahil edilmez (açık bırakılır).",
        example_question: "\\(/frac{x - 3}{x - 1} /le 0\\) eşitsizliğinin çözüm kümesini bulunuz.",
        example_solution: "Kökleri belirleyelim:\n- Payın kökü: \\(x - 3 = 0 \\implies x = 3\\) (Dahil edilebilir çünkü \\(\\le 0\\) eşitlik var).\n- Paydanın kökü: \\(x - 1 = 0 \\implies x = 1\\) (Payda sıfır olamayacağı için tanımsızdır, dahil edilemez).\n\nEn sağdan pay ve payda katsayılarının işaret oranı olan \\((+) / (+) = (+)\\) ile başlarız:\n- \\(x > 3\\) için: \\(+\\)\n- \\(1 < x < 3\\) için: \\(-\\)\n- \\(x < 1\\) için: \\(+\\)\n\nNegatif bölge (\\(\\le 0\\)) istendiği için, payın kökü kapalı ve paydanın kökü açık aralık olacak şekilde: \\((1, 3]\\) yazılır."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Eşitsizlikler veri tabanlarında filtreleme (örneğin SQL'deki <code>WHERE</code> koşulundaki büyüktür/küçüktür kısıtları) için kullanılır. Makine öğrenmesinde karar ağaçları (Decision Trees), veriyi eşitsizlik eşik değerlerine göre dallara ayırarak sınıflandırma yapar."
  },
  {
    id: 7,
    title: "Mutlak Değer, Fonksiyonlara Giriş",
    concept: "Mutlak değer sayıların sıfır noktasına olan net mesafesidir, negatif olamaz. Fonksiyonlar ise girdileri belirli işlemlerden geçirerek tek bir çıktıya dönüştüren veri işleme fabrikalarıdır.",
    theory: "Mutlak değer, mesafe belirten geometrik bir tanımdır. Fonksiyonlar ise tanım kümesindeki elemanları değer kümesine bağlarken iki altın kuralı takip etmelidir:\n1. Tanım kümesinde eşleşmeyen (boşta kalan) hiçbir eleman olmamalıdır.\n2. Tanım kümesindeki bir eleman, değer kümesinde birden fazla elemanla eşleşemez (her girdinin tek bir çıktısı olmalıdır).",
    properties: [
      {
        name: "Mutlak Değerli Eşitsizlik Kuralları",
        description: "\\(|x| \\le a\\) eşitsizliği \\(-a \\le x \\le a\\) şeklinde açılırken; \\(|x| \\ge a\\) eşitsizliği \\(x \\ge a\\) veya \\(x \\le -a\\) şeklinde iki ayrı durumda incelenir.",
        example_question: "\\(|2x - 5| \\le 7\\) eşitsizliğini sağlayan en küçük ve en büyük tam sayı değerlerinin toplamını bulunuz.",
        example_solution: "Eşitsizlik kuralını uygulayalım:\n\\(-7 \\le 2x - 5 \\le 7\\)\n\nHer tarafa 5 ekleyelim:\n\\(-2 \\le 2x \\le 12\\)\n\nHer tarafı 2'ye bölelim:\n\\(-1 \\le x \\le 6\\).\n\nEn küçük tam sayı: \\(-1\\).\nEn büyük tam sayı: \\(6\\).\nToplamı: \\(-1 + 6 = 5\\)."
      },
      {
        name: "Rasyonel Fonksiyonların Tanım Kümesi Kısıtı",
        description: "Bir fonksiyonun rasyonel ifadesinde paydayı sıfır yapan girdiler tanım kümesinden çıkarılmalıdır. Aksi halde tanımsızlık oluşur.",
        example_question: "\\(f(x) = \\frac{2x + 1}{x^2 - 9}\\) fonksiyonunun gerçek sayılardaki en geniş tanım kümesini bulunuz.",
        example_solution: "Paydayı sıfır yapan değerleri bulalım:\n\\(x^2 - 9 = 0 \\implies x^2 = 9 \\implies x = 3 \\text{ ve } x = -3\\).\n\nBu iki değer fonksiyonu tanımsız yaptığı için tanım kümesine alınamaz. Dolayısıyla en geniş tanım kümesi:\n\\(\\mathbb{R} \\setminus \\{-3, 3\\}\\) (Tüm gerçek sayılardan -3 ve 3'ün çıkarılmasıyla elde edilen küme)."
      },
      {
        name: "Köklü Fonksiyonların Tanım Kümesi Kısıtı",
        description: "Çift dereceli köklü fonksiyonların gerçek sayılarda tanımlı olabilmesi için kök içindeki ifadenin sıfırdan büyük ya da eşit olması gerekir: \\(\\sqrt[2n]{g(x)}\\) için \\(g(x) \\ge 0\\).",
        example_question: "\\(f(x) = \\sqrt{x - 4}\\) fonksiyonunun tanım kümesini bulunuz.",
        example_solution: "Kök derecesi 2 (çift) olduğundan kök içi negatif olamaz:\n\\(x - 4 \\ge 0 \\implies x \\ge 4\\).\n\nTanım kümesi: \\([4, \\infty)\\) yarı açık aralığıdır."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Mutlak değer, regresyon modellerinin doğruluğunu ölçen Ortalama Mutlak Hata (MAE) metriğinde kullanılır. Fonksiyon kavramı ise bir veri setindeki bağımsız değişkenlerin (girdilerin) bağımlı değişkene (çıktıya) nasıl dönüştüğünü gösteren makine öğrenmesi modellerinin (\\(y = f(x)\\)) matematiksel özüdür."
  },
  {
    id: 8,
    title: "Özel Fonksiyonlar",
    concept: "Özel fonksiyonlar, özel cebirsel veya simetrik özellikler barındıran fonksiyon türleridir. Parçalı yapılar, simetri davranışları (tek/çift) ve fonksiyonların birbiriyle birleşmesi (bileşke) gibi durumları inceler.",
    theory: "Özel fonksiyonlarda birebir ve örtenlik tanımları önem taşır:\n- <b>Birebir Fonksiyon (1-1):</b> Farklı girdilerin daima farklı çıktılara gitmesidir.\n- <b>Örten Fonksiyon:</b> Değer kümesinde boşta eleman kalmamasıdır (Görüntü kümesi = Değer kümesi).\nBu iki şartı aynı anda sağlayan fonksiyonların tersi (\\(f^{-1}\\)) alınabilir. Grafik düzeyinde bir fonksiyonun tersinin grafiği, kendisinin \\(y = x\\) doğrusuna göre simetriğidir.",
    properties: [
      {
        name: "Parçalı Tanımlı Fonksiyonlarda Değer Hesaplama",
        description: "Parçalı fonksiyonlarda, girdinin hangi koşul aralığına uyduğuna bakılır ve yalnızca o aralığın karşısındaki kural uygulanır.",
        example_question: "\\(f(x) = \\begin{cases} x^2 - 1, & x < 2 \\\\ 3x + 2, & x \\ge 2 \\end{cases}\\) ise \\(f(1) + f(3)\\) toplamını bulunuz.",
        example_solution: "- \\(f(1)\\) için: Girdi \\(1 < 2\\) koşuluna uyduğundan üstteki formül uygulanır: \\(f(1) = 1^2 - 1 = 0\\).\n- \\(f(3)\\) için: Girdi \\(3 \\ge 2\\) koşuluna uyduğundan alttaki formül uygulanır: \\(f(3) = 3(3) + 2 = 11\\).\n\nToplam: \\(0 + 11 = 11\\)."
      },
      {
        name: "Tek ve Çift Fonksiyonların Simetri Kuralı",
        description: "Çift fonksiyonlar içeriye yazılan negatif işareti yok eder (\\(f(-x) = f(x)\\)) ve y-eksenine göre simetriktir. Tek fonksiyonlar negatif işareti dışarı kusar (\\(f(-x) = -f(x)\\)) ve orijine göre simetriktir.",
        example_question: "\\(f(x) = x^3 - 4x\\) fonksiyonunun tek mi çift mi olduğunu cebirsel olarak ispatlayınız.",
        example_solution: "Fonksiyonda \\(x\\) yerine \\(-x\\) yazalım:\n\\(f(-x) = (-x)^3 - 4(-x)\\)\n\\(f(-x) = -x^3 + 4x\\)\n\nŞimdi ifadeyi negatif parantezine alalım:\n\\(f(-x) = -(x^3 - 4x)\\)\n\n\\(x^3 - 4x\\) ifadesi \\(f(x)\\)'in kendisi olduğundan:\n\\(f(-x) = -f(x)\\) bulmuş oluruz. \nNegatif işaret dışarı çıktığı için bu fonksiyon bir <b>tek fonksiyondur</b>."
      },
      {
        name: "Bileşke Fonksiyon Aritmetiği",
        description: "Bileşke fonksiyon (\\(f \\circ g\\)), bir fonksiyonun çıktısının diğerinin girdisi olmasıdır: \\((f \\circ g)(x) = f(g(x))\\).",
        example_question: "\\(f(x) = 2x + 1\\) ve \\(g(x) = x^2 - 3\\) ise \\((f \\circ g)(x)\\) bileşke fonksiyonunu bulunuz.",
        example_solution: "Tanımı uygulayalım: \\((f \\circ g)(x) = f(g(x))\\).\n\\(f\\) fonksiyonunun içindeki \\(x\\) yerine komple \\(g(x)\\)'i yazmalıyız:\n\\(f(g(x)) = 2(g(x)) + 1 = 2(x^2 - 3) + 1\\)\n\nİfadeyi dağıtalım:\n\\(2x^2 - 6 + 1 = 2x^2 - 5\\).\nBileşke fonksiyonumuz: \\(2x^2 - 5\\)."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Yapay sinir ağlarındaki aktivasyon fonksiyonları özel fonksiyonlardır. Örneğin <b>ReLU (Rectified Linear Unit)</b> fonksiyonu parçalı bir fonksiyondur (sıfırdan küçük girdiler için sıfır, büyükler için kendisi). Simetrik çift/tek fonksiyonlar ise veri simetrisini kontrol etmede ve dağılımların çarpıklığını incelemede kullanılır."
  },
  {
    id: 9,
    title: "Doğrusal ve Karesel Fonksiyonlar",
    concept: "Doğrusal fonksiyonlar değişmeyen bir eğime sahip düz çizgilerdir. Karesel fonksiyonlar ise kavisli paraboller çizer. Verinin tepe/dip noktalarını bulmada bu fonksiyonların tepe noktası özellikleri kullanılır.",
    theory: "Doğrusal fonksiyonlarda eğim (\\(m\\)), bağımsız değişkendeki 1 birimlik değişimin bağımlı değişkene olan net etkisini belirtir. Karesel fonksiyonlarda ise tepe noktası (parabolün en üst veya en alt noktası), türev almadan yerel maksimum/minimum değerini bulmamıza yarayan kuadratik bir çözüm tekniğidir.",
    properties: [
      {
        name: "Doğrunun Eğimi ve Denklemi",
        description: "Doğrusal fonksiyonlar \\(f(x) = mx + n\\) biçimindedir. Burada \\(m\\) doğrunun eğimidir. İki noktası bilinen doğrunun eğimi: \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\) ile bulunur.",
        example_question: "\\(A(2, 5)\\) ve \\(B(4, 11)\\) noktalarından geçen doğrunun denklemini bulunuz.",
        example_solution: "Öncelikle eğimi (\\(m\\)) bulalım:\n\\(m = \\frac{11 - 5}{4 - 2} = \\frac{6}{2} = 3\\).\n\nDoğru şablonu: \\(y = 3x + n\\).\n\\(A(2, 5)\\) noktasını denklemde yerine koyup \\(n\\) sabitini bulalım:\n\\(5 = 3(2) + n \\implies 5 = 6 + n \\implies n = -1\\).\n\nDenklemimiz: \\(f(x) = 3x - 1\\) olur."
      },
      {
        name: "Parabolün Tepe Noktası Koordinatları",
        description: "\\(f(x) = ax^2 + bx + c\\) parabolünün tepe noktası \\(T(r, k)\\)'dır. \\(r = -b/(2a)\\) eksen simetrisi apsisiyken, \\(k = f(r)\\) parabolün alabileceği ekstremum (minimum veya maksimum) değerdir.",
        example_question: "\\(f(x) = x^2 - 6x + 5\\) parabolünün tepe noktasının koordinatlarını bulunuz.",
        example_solution: "Burada \\(a = 1, b = -6, c = 5\\)'tir.\n- Apsis \\(r\\):\n\\(r = -\\frac{b}{2a} = -\\frac{-6}{2(1)} = 3\\).\n- Ordinat \\(k = f(r)\\):\n\\(k = f(3) = 3^2 - 6(3) + 5 = 9 - 18 + 5 = -4\\).\n\nTepe noktası: \\(T(3, -4)\\) olur. (Parabolün kolları yukarı olduğundan minimum değer \\(-4\\)'tür)."
      },
      {
        name: "Parabolün Eksenleri Kestiği Noktalar",
        description: "Parabolün y-eksenini kestiği noktayı bulmak için \\(x = 0\\) yazılır (\\(y = c\\) noktası). x-eksenini kestiği noktaları bulmak için denklem sıfıra eşitlenip kökleri çözülür.",
        example_question: "\\(f(x) = -x^2 + 4x + 12\\) parabolünün eksenleri kestiği noktaları bulunuz.",
        example_solution: "- y-eksenini kestiği nokta: \\(x = 0\\) için \\(y = 12\\) olur (\\((0, 12)\\) noktası).\n- x-eksenini kestiği noktalar: \\(-x^2 + 4x + 12 = 0\\) denklemini çözelim:\nEksi ile çarparak düzenleyelim:\n\\(x^2 - 4x - 12 = 0 \\implies (x - 6)(x + 2) = 0\\).\nKökler: \\(x = 6\\) ve \\(x = -2\\).\n\nEksenleri kestiği noktalar: \\((6, 0)\\), \\((-2, 0)\\) ve \\((0, 12)\\)'dir."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Doğrusal regresyon modeli, bağımsız değişkenler arasındaki ilişkileri doğrusal fonksiyonlarla (\\(y = mx + n\\)) modeller. Veri bilimciler, iki değişken arasındaki korelasyonu ve değişim oranını saptamak için doğrunun eğimini (\\(m\\)) analiz ederler."
  },
  {
    id: 10,
    title: "Doğrusal ve Karesel Fonksiyonlar - II (Uygulamalar)",
    concept: "Uygulamalı optimizasyon modelleridir. Bir işletmenin ürettiği ürün hacmine bağlı kârını veya gelirini maksimize etmek için parabolik karesel fonksiyonlar kullanılır.",
    theory: "Gerçek hayattaki iş optimizasyonu senaryolarında, gelir parabolünün maksimum tepe noktası ile maliyet doğrusunun kesişim noktaları hesaplanarak kar aralıkları bulunur. Karın sıfır olduğu tepe noktası sınırları başabaş noktası sınırlarını, kâr fonksiyonunun tepe noktası ise maksimum kazanç noktasını gösterir.",
    properties: [
      {
        name: "Toplam Gelir ve Talep İlişkisi Modelleme",
        description: "Toplam Gelir (\\(R\\)), satılan ürün adedi \\(x\\) ile fiyatın \\(p(x)\\) çarpımıdır: \\(R(x) = x \\cdot p(x)\\). Eğer talep doğrusal ise gelir fonksiyonu karesel (parabolik) olur.",
        example_question: "Bir ürünün talep-fiyat denklemi \\(p(x) = 120 - 2x\\) ise, bu ürünün toplam gelir fonksiyonunu yazınız.",
        example_solution: "Gelir formülü: \\(R(x) = x \\cdot p(x)\\) şeklindedir.\n\\(p(x)\\) ifadesini yerine yazıp dağıtalım:\n\\(R(x) = x \\cdot (120 - 2x) = -2x^2 + 120x\\).\nBu gelir fonksiyonu kolları aşağı bakan bir karesel fonksiyondur."
      },
      {
        name: "Maksimum Kâr Noktası Hesaplama",
        description: "Kâr fonksiyonu \\(P(x) = R(x) - C(x)\\) (Gelir - Maliyet) şeklinde kurulur. Maksimum kâr noktası, kâr parabolünün tepe noktasının apsisi olan \\(r = -b/(2a)\\) ile hesaplanır.",
        example_question: "Haftalık kâr fonksiyonu \\(P(x) = -x^2 + 80x - 200\\) olan bir mağazanın kârını en üst seviyeye çıkarması için haftada kaç ürün satması gerektiğini ve maksimum kârını bulunuz.",
        example_solution: "\\(P(x) = -x^2 + 80x - 200\\) kâr parabolünde \\(a = -1, b = 80\\) değerleridir.\n- Maksimum kâr için satılması gereken ürün sayısı (\\(r\\)):\n\\(r = -\\frac{b}{2a} = -\\frac{80}{2(-1)} = 40\\) adet.\n\n- Elde edilecek maksimum kâr miktarı (\\(k = P(r)\\)):\n\\(P(40) = -(40)^2 + 80(40) - 200\\)\n\\(P(40) = -1600 + 3200 - 200 = 1400\\) TL."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Fiyat optimizasyonu modellerinde en yüksek karı veren optimum fiyat noktasını bulmak için veri ekipleri kuadratik modeller kurar. Veri analistleri geçmiş satış verilerinden fiyat-talep eğrisini türetir ve karı maksimize eden noktayı karesel katsayılarla hesaplar."
  },
  {
    id: 11,
    title: "Doğrusal ve Doğrusal Olmayan Denklem Sistemleri",
    concept: "Birden fazla değişkenin ortak çözüm kümesini bulmayı sağlayan denklemler topluluğudur. Kesişim noktası analizleri, arz-talep dengesi gibi durumlar bu sistemlerle çözülür.",
    theory: "Denklem sistemleri geometrik olarak doğruların ve eğrilerin kartezyen koordinat sisteminde kesiştiği noktaları belirtir. Doğrusal sistemlerin çözümünde yok etme yöntemi, doğrusal olmayan sistemlerde ise yerine koyma yöntemi kökleri (kesişim noktalarını) bulmak için en kararlı yaklaşımlardır.",
    properties: [
      {
        name: "Doğrusal Denklem Sistemlerinde Yok Etme Metodu",
        description: "Değişkenlerden birinin katsayısı eşit ve zıt işaretli olacak şekilde denklemler genişletilip taraf tarafa toplanarak o değişken yok edilir.",
        example_question: "\\(\\begin{cases} 2x + 3y = 12 \\\\ 3x - y = 7 \\end{cases}\\) sistemini yok etme yöntemiyle çözünüz.",
        example_solution: "İkinci denklemi 3 ile çarparak \\(y\\)'lerin katsayılarını zıt yapalım:\n- \\(2x + 3y = 12\\)\n- \\(9x - 3y = 21\\)\n\nDenklemleri taraf tarafa toplayalım:\n\\((2x + 9x) + (3y - 3y) = 12 + 21\\)\n\\(11x = 33 \\implies x = 3\\).\n\nHerhangi bir denklemde \\(x=3\\) yazarak \\(y\\)'yi bulalım:\n\\(3(3) - y = 7 \\implies 9 - y = 7 \\implies y = 2\\).\nÇözüm: \\((3, 2)\\)."
      },
      {
        name: "Doğrusal Olmayan Sistemlerin Çözümü (Eğri ve Doğru Kesişimi)",
        description: "Denklemlerden biri karesel ise, birinci dereceden olan denklemdeki değişken yalnız bırakılıp karesel denklemde yerine yazılır (yerine koyma metodu).",
        example_question: "\\(\\begin{cases} y = x^2 - 3 \\\\ y = x + 3 \\end{cases}\\) denklem sistemini sağlayan kesişim noktalarını bulunuz.",
        example_solution: "Her iki denklem de \\(y\\)'ye eşit olduğundan, ifadeleri birbirine eşitleyelim:\n\\(x^2 - 3 = x + 3\\)\n\nTüm terimleri sol tarafa alalım:\n\\(x^2 - x - 6 = 0\\)\n\nÇarpanlarına ayıralım:\n\\((x - 3)(x + 2) = 0 \\implies x_1 = 3 \\text{ ve } x_2 = -2\\).\n\nBulduğumuz \\(x\\) değerlerini \\(y = x + 3\\) denkleminde yazalım:\n- \\(x = 3\\) için: \\(y = 3 + 3 = 6\\) \\(\\implies (3, 6)\\)\n- \\(x = -2\\) için: \\(y = -2 + 3 = 1\\) \\(\\implies (-2, 1)\\).\n\nKesişim noktaları: \\(\\{(3, 6), (-2, 1)\\}\\)."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Arz ve Talep eğrilerinin kesişimini bularak piyasa denge fiyatını (market equilibrium price) hesaplamak ekonomi analizlerinde doğrusal ve doğrusal olmayan denklem sistemleriyle çözülür. Ayrıca çoklu doğrusal regresyonda yüzlerce doğrusal denklemin matris çözümleri bu yöntemlerin bilgisayarlarca paralel yapılmasıyla gerçekleşir."
  },
  {
    id: 12,
    title: "Üstel ve Logaritmik Fonksiyonlar",
    concept: "Üstel fonksiyonlar girdinin üstte yer aldığı çok hızlı artış veya azalış modelleridir. Logaritma ise üstel işlemleri tersine çevirerek aşırı büyük ölçekli sayıları sıkıştırmaya ve yönetmeye yarar.",
    theory: "Üstel fonksiyon (\\(y = a^x\\)) ve logaritmik fonksiyon (\\(y = \\log_a x\\)) birbirinin tersidir. Bu terslik ilişkisi, logaritmik denklemlerin çözümünde tabanı karşıya üs olarak atarak çözüme gitmemizi sağlar. Doğal logaritma (\\(\\ln\\)), tabanı \\(e\\) Euler sayısı olan özel bir logaritma türüdür.",
    properties: [
      {
        name: "Üstel Denklemlerin Taban Eşitleme Kuralı",
        description: "Tabanları aynı olan üstel eşitliklerde üsler de birbirine eşit olmalıdır: \\(a^f(x) = a^g(x) \\implies f(x) = g(x)\\).",
        example_question: "\\(4^{x - 1} = 32\\) denklemini çözünüz.",
        example_solution: "Her iki tarafı da 2 tabanında yazalım:\n- \\(4^{x-1} = (2^2)^{x-1} = 2^{2x - 2}\\)\n- \\(32 = 2^5\\)\n\nTabanlar eşit olduğuna göre üsleri eşitleyelim:\n\\(2x - 2 = 5 \\implies 2x = 7 \\implies x = 3.5\\)."
      },
      {
        name: "Logaritmanın Çarpım ve Bölüm Kuralları",
        description: "Logaritma çarpmayı toplamaya, bölmeyi ise çıkarmaya dönüştürür:\n- \\(\\log_a(x \\cdot y) = \\log_a x + \\log_a y\\)\n- \\(\\log_a(x / y) = \\log_a x - \\log_a y\\)",
        example_question: "\\(\\log_3 54 - \\log_3 2\\) işleminin sonucunu bulunuz.",
        example_solution: "Bölüm kuralını tersten uygulayarak ifadeleri birleştirelim:\n\\(\\log_3 54 - \\log_3 2 = \\log_3\\left(\\frac{54}{2}\\right) = \\log_3 27\\)\n\n27'yi 3'ün kuvveti olarak yazalım:\n\\(\\log_3 (3^3)\\)\n\nÜssü katsayı olarak başa atalım:\n\\(3 \\cdot \\log_3 3 = 3 \\cdot 1 = 3\\)."
      },
      {
        name: "Logaritmik Denklemlerin Çözümü",
        description: "Logaritmik denklemleri çözerken logaritma tanımı kullanılarak üstel forma geçiş yapılır: \\(\\log_a x = y \\iff a^y = x\\). Ayrıca bulunan köklerin logaritma tanım kısıtlarını (iç kısım sıfırdan büyük olmalıdır) sağladığı kontrol edilir.",
        example_question: "\\(\\log_2(x^2 - 1) = 3\\) denkleminin pozitif kökünü bulunuz.",
        example_solution: "Logaritma tanımını kullanarak üstel forma geçelim:\n\\(x^2 - 1 = 2^3\\)\n\\(x^2 - 1 = 8 \\implies x^2 = 9\\).\n\nBuradan \\(x = 3\\) veya \\(x = -3\\) bulunur.\nTanım kısıtını kontrol edelim: \\(x^2 - 1 > 0\\). Hem 3 hem -3 için \\(9-1 = 8 > 0\\) şartı sağlanır.\nPozitif kök istendiği için cevap \\(3\\)'tür."
      }
    ],
    guide: "<b>Veri Analitiğindeki Yeri:</b> Finansal veya nüfus verileri gibi üstel büyüme gösteren verilerin analizinde logaritma hayati önem taşır. Sağa çarpık dağılıma sahip verileri normalleştirmek için <b>Log Dönüşümü (Log Transform)</b> uygulanır. Ayrıca sınıflandırma modellerinin performansını ölçen <b>Log-Loss</b> fonksiyonu tamamen logaritma esaslıdır."
  }
];

if (typeof window !== 'undefined') {
  window.formulasData = m1Data; // fallback
  window.m1Data = m1Data;
}
