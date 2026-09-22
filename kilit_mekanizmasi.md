# Ders Kartları Kilit Mekanizması Nasıl Çalışır?

Gelecekte eklenecek olan dersleri (Git, Excel, SQL vb.) kullanıcıların tıklamasını engellemek ve "yapım aşamasında" olduklarını görsel olarak belirtmek için uyguladığımız kilit mekanizmasının detayları aşağıdadır.

Bu sistemi dilediğiniz zaman başka kartlara uygulayabilir veya mevcut kilitli kartları tekrar açabilirsiniz.

## 1. CSS Tarafı (Tasarım ve Kilit Görünümü)
Kilitli kartların üzerine gri/siyah saydam bir filtre ve kilit ikonu ekleyen tasarım kodları `lessons/lessons.css` dosyasının en altına eklenmiştir. Bu kodları bir daha değiştirmenize gerek yoktur.

**Eklenen Sınıflar:**
- `.locked-card`: Kartın hover (üzerine gelince yukarı kalkma) efektini iptal eder ve fare imlecini "yasak" işaretine (`cursor: not-allowed`) dönüştürür.
- `.locked-card::before`: Kartın üzerine tam oturan, koyu gri ve arkayı siyah-beyaz (grayscale) yapan saydam katmandır.
- `.locked-overlay-content`: Kilit ikonu ve "Henüz İçerik Eklenmemiştir" yazısını kartın tam ortasına hizalar.

## 2. HTML Tarafı (Bir Kartı Kilitlemek)
Açık olan bir kartı kilitlemek için `lessons/lessons.html` dosyasındaki o kartın HTML kodlarında ufak değişiklikler yapmanız yeterlidir.

### A) Açık Kartın Orijinal Hali:
```html
<a href="programs/ornek/ornek.html" class="lesson-card split-card card-ornek">
    <div class="start-course-btn">
        <svg>...</svg> Başla
    </div>
    <div class="card-top">
        <img src="logo.png">
    </div>
    ...
</a>
```

### B) Kartı Kilitleme Adımları:
1. `href` özelliğini **`href="javascript:void(0)"`** olarak değiştirin (Böylece karta tıklanınca başka sayfaya gitmez).
2. `class` bölümünün en sonuna **`locked-card`** kelimesini ekleyin.
3. `<a>` etiketinin hemen içine (start-course-btn satırının üstüne) kilit yazısını ve ikonunu içeren şu kodu yapıştırın:
```html
    <div class="locked-overlay-content">
        <i class="ph ph-lock-key"></i>
        <span>Henüz İçerik Eklenmemiştir</span>
    </div>
```

**Kilitlenmiş Kartın Son Hali:**
```html
<a href="javascript:void(0)" class="lesson-card split-card card-ornek locked-card">
    <div class="locked-overlay-content">
        <i class="ph ph-lock-key"></i>
        <span>Henüz İçerik Eklenmemiştir</span>
    </div>
    <div class="start-course-btn">
        <svg>...</svg> Başla
    </div>
    ...
</a>
```

## 3. Kilidi Kaldırmak ve Dersi Açmak
Eğer (örneğin) Excel dersini hazırlayıp bitirirseniz, kilidi kaldırmak son derece basittir:
1. Kodun başındaki `locked-card` sınıfını silin.
2. Eklediğiniz `<div class="locked-overlay-content"> ... </div>` bloğunu tamamen silin.
3. `href="javascript:void(0)"` kısmını dersin asıl linkiyle değiştirin (örn: `href="programs/excel/excel.html"`).

Bunu yaptığınız an gri filtre kaybolur, kilit yazısı gider ve kart eskisi gibi animasyonlu ve tıklanabilir hale gelir.
