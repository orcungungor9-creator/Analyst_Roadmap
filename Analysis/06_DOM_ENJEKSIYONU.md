# 🟡 Sorun #6: `components.js` ile Ağır DOM Enjeksiyonu — 41 KB

**Önem:** 🟡 Orta  
**Etkilenen Dosya:** `js/components.js` (41,169 byte, 403 satır)

---

## Sorunun Açıklaması

`components.js` dosyası şu büyük HTML bloklarını JavaScript template literal'leri ile oluşturup `DOMContentLoaded` olayında DOM'a enjekte ediyor:

```javascript
// components.js, satır 384-389
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML + MOBILE_NAV_HTML);
    document.body.insertAdjacentHTML('beforeend', ABOUT_MODAL_HTML + THEME_MODAL_HTML);
    // + IntersectionObserver kurulumu
});
```

### Enjekte edilen bileşenler:

| Bileşen | Satır | Tahmini HTML Boyutu |
|---------|-------|---------------------|
| `HEADER_HTML` | 24-134 | ~5 KB |
| `MOBILE_NAV_HTML` | 136-209 | ~8 KB |
| `ABOUT_MODAL_HTML` | 211-240 | ~2 KB |
| `THEME_MODAL_HTML` | 242-382 | ~7 KB |
| **Toplam** | | **~22 KB HTML** |

---

## Performans Etkisi

1. **DOM reflow/repaint:** `insertAdjacentHTML('afterbegin', ...)` çağrısı body'nin başına büyük HTML ekler → tüm mevcut elementlerin konumu yeniden hesaplanır.
2. **İki ayrı enjeksiyon:** Biri `afterbegin`, diğeri `beforeend` → 2 kez reflow.
3. **15+ küçük logo resmi:** Header'daki navigasyon dropdown'larında 15+ `<img>` etiketi oluşturuluyor, hepsi sayfa yüklenirken eager olarak indirilmeye başlar.
4. **FOUC riski:** Header JavaScript ile eklendiğinden, script yüklenene kadar header görünmez → Flash of Unstyled Content.

### İçindeki logo yükleri:
```javascript
// Her araç için ayrı logo yükleniyor (components.js, satır 84-99)
<img src="${pathPrefix}assets/logos/python-logo.svg" ...>
<img src="${pathPrefix}assets/logos/r-logo.svg" ...>
<img src="${pathPrefix}assets/logos/sql-logo.svg" ...>
// ... 15 adet daha
```

---

## Düzeltme Önerisi

### Seçenek A: Header'ı HTML'e taşı (En performanslı)
Header ve modal'ları her sayfanın HTML'ine statik olarak ekle. `components.js` sadece interaksiyon mantığını yönetsin.

### Seçenek B: Tek enjeksiyon ile birleştir
```javascript
// İki ayrı insertAdjacentHTML yerine tek seferde ekle
const allComponents = HEADER_HTML + MOBILE_NAV_HTML;
document.body.insertAdjacentHTML('afterbegin', allComponents);
// Modal'ları gecikmeli yükle
requestIdleCallback(() => {
    document.body.insertAdjacentHTML('beforeend', ABOUT_MODAL_HTML + THEME_MODAL_HTML);
});
```

### Seçenek C: Navigasyon logolarını lazy yükle
```javascript
// Logo img etiketlerine loading="lazy" ekle
<img loading="lazy" src="${pathPrefix}assets/logos/python-logo.svg" ...>
```

**Zorluk:** Kolay (Seçenek B/C) / Orta (Seçenek A)
