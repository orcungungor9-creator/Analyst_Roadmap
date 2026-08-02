# 🟡 Sorun #7: Tutarsız `loading="lazy"` Kullanımı

**Önem:** 🟡 Orta  
**Etkilenen Dosya:** `index.html` (satır 276-476 — araç kartları bölümü)

---

## Sorunun Açıklaması

Ana sayfadaki 16 araç kartının logo görselleri arasında `loading="lazy"` kullanımı tutarsız:

### `loading="lazy"` OLMAYAN kartlar (ilk 11):
```html
<!-- Satır 281 → R Studio -->
<img src="assets/logos/r-logo.svg" alt="R Logo" class="tool-svg">

<!-- Satır 293-294 → Python -->
<img src="assets/logos/python-logo.svg" alt="Python Logo" class="tool-svg">

<!-- Satır 306-307 → SQL -->
<img src="assets/logos/sql-logo.svg" alt="SQL Logo" class="tool-svg">

<!-- Satır 319-320 → Excel -->
<img src="assets/logos/excel-logo.png" alt="Excel Logo" class="tool-svg">

<!-- Satır 332-333 → Power BI -->
<img src="assets/logos/powerbi-logo.svg" alt="Power BI Logo" class="tool-svg">

<!-- Satır 345-346 → Tableau -->
<img src="assets/logos/tableau-logo.png" alt="Tableau Logo" class="tool-svg">

<!-- Satır 358-359 → SPSS -->
<img src="assets/logos/spss-logo.png" alt="SPSS Logo" class="tool-svg">

<!-- Satır 372-373 → Stata -->
<img src="assets/logos/stata-logo.png" alt="Stata Logo" class="tool-svg">

<!-- Satır 385-386 → EViews -->
<img src="assets/logos/eviews-logo.png" alt="EViews Logo" class="tool-svg">

<!-- Satır 398-399 → Gretl -->
<img src="assets/logos/gretl-logo.svg" alt="Gretl Logo" class="tool-svg">

<!-- Satır 411-412 → SAS -->
<img src="assets/logos/sas-logo.png" alt="SAS Logo" class="tool-svg">
```

### `loading="lazy"` OLAN kartlar (son 5):
```html
<!-- Satır 424 → Julia -->
<img loading="lazy" src="assets/logos/julia-logo.svg" alt="Julia Logo" class="tool-svg">

<!-- Satır 437 → Hadoop -->
<img loading="lazy" src="assets/logos/hadoop-logo.svg" alt="Hadoop Logo" class="tool-svg">

<!-- Satır 448 → PySpark -->
<img loading="lazy" src="assets/logos/pyspark-logo.svg" alt="PySpark Logo" class="tool-svg">

<!-- Satır 459 → MATLAB -->
<img loading="lazy" src="tools/matlab/matlab-logo.webp" alt="MATLAB Logo" class="tool-svg">

<!-- Satır 470 → Git -->
<img loading="lazy" src="assets/logos/git-logo.svg" alt="Git Logo" class="tool-svg">
```

---

## Performans Etkisi

- 11 logo **sayfa yüklenirken anında** indirilmeye başlıyor (eager loading).
- Bu logolar ekranın alt kısmında, kullanıcının görmediği alanda yer alıyor.
- Özellikle `.png` formatındaki logolar (Excel, Tableau, SPSS, Stata, EViews, SAS) SVG'lere göre daha büyük dosya boyutuna sahip.
- 11 gereksiz HTTP isteği sayfa yüklenme süresini uzatıyor.

---

## Düzeltme Önerisi

Ekranın üst kısmında (above-the-fold) görünen ilk 1-2 kart hariç, tüm logolara `loading="lazy"` ekle:

```html
<!-- Tüm araç kartı logolarına loading="lazy" ekle -->
<img loading="lazy" src="assets/logos/r-logo.svg" alt="R Logo" class="tool-svg">
<img loading="lazy" src="assets/logos/python-logo.svg" alt="Python Logo" class="tool-svg">
<!-- ... diğer tüm logolar ... -->
```

> **Not:** SVG dosyaları genellikle küçüktür (~1-5 KB) bu yüzden etki PNG'lere göre daha az. Ama yine de 11 gereksiz HTTP isteğini ortadan kaldırır.

**Zorluk:** Kolay — Her img etiketine `loading="lazy"` eklemek yeterli.
