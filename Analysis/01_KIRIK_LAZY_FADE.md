# 🔴 Sorun #1: Kırık Tembel Yükleme — `lazy-fade` CSS'de Tanımsız

**Önem:** 🔴 Kritik  
**Etkilenen Dosyalar:**
- `css/styles.css` — `.lazy-fade` ve `.visible` kuralı **yok**
- `js/components.js` (satır 392-401) — IntersectionObserver tanımı
- `index.html` — 30+ element `lazy-fade` sınıfını kullanıyor

---

## Sorunun Açıklaması

HTML'de 30'dan fazla element `lazy-fade` CSS sınıfını kullanıyor:

```html
<!-- index.html'den örnekler -->
<div class="guide-card glass-card carousel-card lazy-fade">...</div>
<div class="tool-card-new glass-card lazy-fade" data-tool="r">...</div>
<div class="tool-card-new glass-card lazy-fade" data-tool="python">...</div>
<!-- ... ve 27+ daha -->
```

JavaScript tarafında bu elementler IntersectionObserver ile gözlemleniyor:

```javascript
// components.js, satır 391-402
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // ← 'visible' sınıfını ekliyor
            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.lazy-fade').forEach(el => fadeObserver.observe(el));
```

**Ancak CSS'de ne `.lazy-fade` ne de `.visible` kuralı tanımlı.**

---

## Ne Olması Gerekiyordu

```css
/* Bu kurallar CSS'de OLMASI gerekiyordu ama YOK */
.lazy-fade {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.lazy-fade.visible {
    opacity: 1;
    transform: translateY(0);
}
```

---

## Performans Etkisi

1. **Boşa çalışan IntersectionObserver:** 30+ element gözlemleniyor, her biri için callback tetikleniyor ama görsel bir etki yok.
2. **Gereksiz DOM mutasyonu:** Her element ekrana girdiğinde `classList.add('visible')` çağrılıyor ama hiçbir stil uygulanmıyor.
3. **Beklenen fade-in animasyonu çalışmıyor:** Elementler anında görünür oluyor, kullanıcı deneyimi etkileniyor.

---

## Düzeltme Önerisi

`css/styles.css` dosyasına aşağıdaki kuralları ekle:

```css
/* Tembel Yükleme Fade-In Animasyonu */
.lazy-fade {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}

.lazy-fade.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Reduced motion tercihine saygı */
@media (prefers-reduced-motion: reduce) {
    .lazy-fade {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```

**Zorluk:** Kolay — Tek dosyada ~15 satır ekleme.
