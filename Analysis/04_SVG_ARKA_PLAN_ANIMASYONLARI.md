# 🟡 Sorun #4: Sabit SVG Arka Plan Animasyonları

**Önem:** 🟡 Orta  
**Etkilenen Dosyalar:**
- `css/styles.css` (satır 75-152) — `.bg-analytics-mesh` stilleri
- `index.html` (satır 32-117) — 4 adet SVG elementi

---

## Sorunun Açıklaması

Ana sayfanın arka planında 4 adet SVG grafik elementi (trend çizgisi, pasta grafiği, sütun grafiği, mum grafiği) `position: fixed` olarak yerleştirilmiş ve sürekli animasyonlu:

```css
/* styles.css, satır 87-96 */
.bg-chart-item {
    position: absolute;
    opacity: 0.15;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    transition: opacity 0.5s ease;
}
```

Her SVG için ayrı bir `@keyframes` animasyonu tanımlı:

```css
@keyframes float-chart-1 {
    0% { transform: translate3d(0, 0, 0) rotate(-2deg) scale(1); }
    100% { transform: translate3d(0, -20px, 0) rotate(2deg) scale(1.03); }
}

@keyframes float-chart-2 { /* ... */ }
@keyframes float-chart-3 { /* ... */ }
@keyframes float-chart-4 { /* ... */ }
```

---

## Performans Etkisi

1. **4 ayrı GPU compositing katmanı** sürekli aktif.
2. Her animasyon frame'inde `translate3d` + `rotate` + `scale` hesaplanıyor.
3. `will-change: transform` doğru kullanılmış ama 4 katman birden GPU belleğini tüketir.
4. Sayfa arka planında `position: fixed` → scroll sırasında viewport'a göre sürekli yeniden konumlandırma.

### İyi Yapılmış Kısım
- Mobilde (`max-width: 768px`) animasyonlar kapatılmış:
```css
@media (max-width: 768px) {
    .bg-analytics-mesh * { animation: none !important; transition: none !important; }
}
```

---

## Düzeltme Önerisi

### Seçenek A: `prefers-reduced-motion` desteği ekle
```css
@media (prefers-reduced-motion: reduce) {
    .bg-chart-item {
        animation: none !important;
        transition: none !important;
    }
}
```

### Seçenek B: Animasyonları tamamen kaldır (maksimum performans)
```css
.bg-chart-item {
    /* will-change: transform;   ← KALDIR */
    /* perspective: 1000px;      ← KALDIR */
    transform: translateZ(0);  /* GPU katmanını koru ama animasyon yok */
}
```

### Seçenek C: SVG'leri statik arka plan resmi olarak kullan
SVG'leri CSS `background-image` olarak tek bir statik katmanda göster. Animasyon kaybedilir ama performans büyük ölçüde artar.

**Zorluk:** Orta — CSS düzenlemesi.
