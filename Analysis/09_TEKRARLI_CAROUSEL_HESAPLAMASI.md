# 🟢 Sorun #9: Carousel'de Tekrarlı Scroll Hesaplaması

**Önem:** 🟢 Düşük  
**Etkilenen Dosyalar:**
- `index.html` (satır 250-264) — Inline `<script>`
- `js/index.js` (satır 153-170) — `initCarouselObserver` fonksiyonu

---

## Sorunun Açıklaması

Carousel'in ortadaki karta odaklanması için **aynı hesaplama iki kez** yapılıyor:

### 1. Hesaplama — Inline Script (index.html, satır 250-264):
```javascript
// index.html'de inline script
(function() {
    var carousel = document.getElementById('quick-guides-carousel');
    if (carousel) {
        var cards = carousel.querySelectorAll('.carousel-card');
        if (cards.length > 0) {
            var target = cards[Math.floor(cards.length / 2)];
            carousel.style.scrollBehavior = 'auto';
            carousel.style.scrollSnapType = 'none';
            carousel.scrollLeft = target.offsetLeft - (carousel.offsetWidth / 2) + (target.offsetWidth / 2);
        }
    }
})();
```

### 2. Hesaplama — index.js (satır 153-170):
```javascript
// index.js, initCarouselObserver() içinde
carousel.style.scrollBehavior = 'auto';
carousel.style.scrollSnapType = 'none';

const targetIndex = Math.floor(allCards.length / 2);
const target = allCards[targetIndex];

if (target) {
    const scrollPos = target.offsetLeft - (carousel.offsetWidth / 2) + (target.offsetWidth / 2);
    carousel.scrollLeft = scrollPos;
}

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        carousel.style.scrollBehavior = 'smooth';
        carousel.style.scrollSnapType = 'x mandatory';
    });
});
```

---

## Performans Etkisi

1. **İlk inline script** çalışır → `offsetLeft`, `offsetWidth` değerleri okunur → **layout hesaplaması** (forced reflow).
2. **`DOMContentLoaded`** tetiklenir → `initCarouselObserver` çalışır → aynı değerler tekrar okunur → **ikinci forced reflow**.
3. `scrollLeft` iki kez set edilir → iki kez scroll pozisyonlama.
4. Aradaki stil değişiklikleri (`scrollBehavior`, `scrollSnapType`) ek reflow'lara neden olabilir.

### Layout Thrashing Riski:
```
[Inline Script]
  read: target.offsetLeft    → Layout hesaplama #1
  read: carousel.offsetWidth → Layout hesaplama #1
  write: carousel.scrollLeft → Layout invalidation

[initCarouselObserver]
  write: carousel.style.scrollBehavior → Layout invalidation
  write: carousel.style.scrollSnapType → Layout invalidation
  read: target.offsetLeft    → Layout hesaplama #2 (YENİDEN!)
  read: carousel.offsetWidth → Layout hesaplama #2
  write: carousel.scrollLeft → Layout invalidation #2
```

---

## Düzeltme Önerisi

Inline script'i kaldır ve sadece `initCarouselObserver`'daki hesaplamayı kullan:

```html
<!-- index.html'deki inline script'i SİL -->
<!-- <script>
    (function() {
        var carousel = document.getElementById('quick-guides-carousel');
        ...
    })();
</script> -->
```

> Inline script'in amacı "layout flash"ı önlemekti ama `initCarouselObserver` zaten `scrollBehavior: 'auto'` ile aynı işi yapıyor. İki kez yapmak sadece gereksiz reflow üretir.

**Zorluk:** Kolay — Inline script bloğunu silmek yeterli.
