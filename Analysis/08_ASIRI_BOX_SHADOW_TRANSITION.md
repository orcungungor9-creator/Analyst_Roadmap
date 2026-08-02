# 🟢 Sorun #8: Aşırı `box-shadow` ve `transition: all` Kullanımı

**Önem:** 🟢 Düşük  
**Etkilenen Dosya:** `css/styles.css` (dosya genelinde)

---

## Sorunun Açıklaması

### 8a. Box-shadow Yoğunluğu

CSS dosyasında **96+ adet `box-shadow`** tanımı mevcut. Birçok kart hover durumunda çoklu box-shadow kullanıyor:

```css
/* styles.css, satır 175 — glass-card hover */
.glass-card:hover {
    box-shadow: var(--shadow-card-hover), 0 0 20px var(--neon-blue-glow);
    /* 2 katmanlı gölge */
}

/* styles.css, satır 654 — hero button hover */
.btn-hero-formulas:hover {
    box-shadow: 0 15px 35px rgba(56, 189, 248, 0.4), 0 0 20px rgba(56, 189, 248, 0.3);
    /* 2 katmanlı gölge */
}
```

### 8b. `transition: all` Kullanımı

Birçok elementte genel `transition` tanımı var:

```css
/* styles.css, satır 339 */
.nav-btn {
    transition: all 0.3s ease;
}

/* styles.css, satır 390 */
.hamburger-btn span {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* styles.css, satır 634 — btn-hero */
.btn-hero {
    transition: transform 0.4s ..., box-shadow 0.4s ..., border-color 0.4s ..., background 0.4s ...;
    /* Bu doğru kullanım — spesifik property'ler belirtilmiş */
}
```

---

## Performans Etkisi

1. **`box-shadow` paint tetikler:** Her hover'da tarayıcı gölge hesaplaması yapar. Çoklu katmanlı gölgeler daha maliyetlidir.
2. **`transition: all`:** Tarayıcı **tüm CSS property'lerinin** değişip değişmediğini kontrol etmek zorundadır. Sadece gerekli property'ler belirtildiğinde bu yük ortadan kalkar.
3. **Kaydırma sırasında:** Eğer gölgeli elementler kaydırma sırasında görünür hale geliyorsa, paint süresi artar.

> **Not:** Bu sorun tek başına ciddi kasmaya neden olmaz ama diğer sorunlarla birleştiğinde kümülatif etki yaratır.

---

## Düzeltme Önerisi

### 8a. `transition: all` yerine spesifik property kullan
```css
/* Önceki (SORUNLU) */
.nav-btn {
    transition: all 0.3s ease;
}

/* Sonraki (DÜZELTİLMİŞ) */
.nav-btn {
    transition: color 0.3s ease, background-color 0.3s ease;
}
```

### 8b. Box-shadow sayısını azalt
Hover durumlarında tek katmanlı gölge kullan veya gölge yerine `outline` tercih et:

```css
/* Daha performanslı alternatif */
.glass-card:hover {
    outline: 2px solid var(--neon-blue);
    outline-offset: -2px;
    /* box-shadow yerine outline — paint tetiklemez */
}
```

**Zorluk:** Orta — Dosya genelinde düzenleme gerektirir.
