# 🔴 Sorun #3: Render-Blocking Harici Kaynaklar

**Önem:** 🔴 Kritik  
**Etkilenen Dosya:** `index.html` (satır 8-19)

---

## Sorunun Açıklaması

Sayfa `<head>` bölümünde birden fazla harici kaynak senkron yükleniyor:

```html
<!-- index.html, satır 8-19 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800
      &family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">

<script src="https://unpkg.com/@phosphor-icons/web"></script>  <!-- ⚠️ defer YOK! -->

<link rel="stylesheet" href="css/styles.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
```

---

## Sorunlar Detayı

### 3a. Phosphor Icons — Senkron Script (En Kritik)
```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```
- `defer` veya `async` attribute'u **yok**.
- HTML parser bu script'e geldiğinde **durur**, dosyayı indirir, çalıştırır ve ancak sonra devam eder.
- unpkg.com CDN'den yükleniyor → ağ gecikmesi direkt olarak sayfa render süresini etkiler.
- **Sayfa boş ekranda bekler** bu script indirilirken.

### 3b. Google Fonts — 2 Aileli Ağır Font Yükü
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800
      &family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
```
- **Inter:** 6 ağırlık (300, 400, 500, 600, 700, 800)
- **Montserrat:** 3 ağırlık (700, 800, 900)
- Toplam 9 font dosyası indiriliyor.
- `display=swap` kullanılmış (iyi) ama CSS yine de render-blocking.

### 3c. KaTeX — Ana Sayfada Gereksiz
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
```
- Ana sayfada **hiçbir matematiksel formül yok**.
- KaTeX CSS render-blocking → CSSOM oluşturmayı geciktirir.
- KaTeX JS dosyaları `defer` ile yükleniyor (iyi) ama yine de gereksiz network isteği.
- Bu kaynaklar sadece `guides/formulas/` gibi formül sayfalarında gerekli.

---

## Performans Etkisi

```
Tarayıcı Yükleme Akışı:
──────────────────────────────────────────────────────────
HTML Parse başlar
  ├─ Google Fonts CSS indir (render-blocking)     ~100-300ms
  ├─ Phosphor Icons JS indir + çalıştır (BLOKLAMA!) ~200-500ms
  ├─ styles.css indir (render-blocking)           ~50-150ms
  ├─ KaTeX CSS indir (render-blocking, GEREKSİZ)  ~100-200ms
  └─ İlk paint (First Contentful Paint)          ~500-1200ms GECİKME
──────────────────────────────────────────────────────────
```

---

## Düzeltme Önerisi

### 3a. Phosphor Icons'a `defer` ekle
```html
<!-- Önceki (SORUNLU) -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<!-- Sonraki (DÜZELTİLMİŞ) -->
<script defer src="https://unpkg.com/@phosphor-icons/web"></script>
```

### 3b. Google Fonts — Font ağırlıklarını azalt
```html
<!-- Sadece gerçekten kullanılan ağırlıklar -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700
      &family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
```
> 300 ve 800 Inter ağırlıkları ve 900 Montserrat gerçekten kullanılıyor mu kontrol edilmeli.

### 3c. KaTeX'i ana sayfadan çıkar
```html
<!-- Ana sayfada KALDIR, sadece formül sayfalarında yükle -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"> -->
<!-- <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script> -->
<!-- <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script> -->
```

### 3d. Font preconnect ekle (opsiyonel)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Zorluk:** Kolay — Birkaç satır düzenleme.
