# 🔴 Sorun #2: `background-attachment: fixed` — GPU Killer

**Önem:** 🔴 Kritik  
**Etkilenen Dosya:** `css/styles.css` (satır 62-66)

---

## Sorunun Açıklaması

`body` elementinde 3 adet `radial-gradient` ile birlikte `background-attachment: fixed` kullanılıyor:

```css
/* styles.css, satır 56-70 */
body {
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    overflow-x: hidden;
    background-image:
        radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(52, 211, 153, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.05) 0%, transparent 50%);
    background-attachment: fixed;  /* ← SORUN BURADA */
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

---

## Neden Kasma Yapıyor?

`background-attachment: fixed` şu şekilde çalışır:

1. Kullanıcı sayfayı kaydırdığında, arka plan sabit kalır (viewport'a bağlıdır).
2. Tarayıcı, **her scroll frame'inde** arka planı yeniden rasterize etmek zorundadır.
3. 3 adet radial-gradient'in her biri her frame'de yeniden hesaplanır.
4. Bu, GPU compositing yerine **CPU-bound repaint** tetikler.
5. 60fps scroll hedefine ulaşılamaz → **kasma/takılma**.

### Teknik Detay
- `background-attachment: fixed` kullanıldığında, tarayıcı arka planı ayrı bir compositing katmanına **taşıyamaz**.
- Her scroll olayında `paint` aşaması tetiklenir.
- Chrome DevTools'da Performance sekmesinde yeşil (paint) çubuklarının uzaması bu yüzdendir.

---

## Düzeltme Önerisi

### Seçenek A: `background-attachment: fixed` kaldır (En basit)
```css
body {
    /* ... */
    background-image:
        radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(52, 211, 153, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.05) 0%, transparent 50%);
    /* background-attachment: fixed;  ← KALDIR */
}
```

### Seçenek B: `::before` pseudo-element ile GPU katmanı (Sabit efekti korur)
```css
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    pointer-events: none;
    background-image:
        radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(52, 211, 153, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.05) 0%, transparent 50%);
    will-change: transform;
    transform: translateZ(0);
}
```

> Seçenek B, gradient'i `position: fixed` bir pseudo-element'e taşır. Bu element kendi GPU katmanında yaşar ve scroll sırasında yeniden paint yapılmaz.

**Zorluk:** Kolay — Tek satır silme veya ~12 satır ekleme.
