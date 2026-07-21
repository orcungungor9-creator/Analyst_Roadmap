import os

base_dir = r"c:\Users\HP\OneDrive\Desktop\code\Analyst_Roadmap\ai"

stages = [
    {
        "id": "stage1",
        "title": "1. Aşama: Isınma Turu (Neden Buradayız?)",
        "subtitle": "Yapay zeka nedir, makine öğrenmesi nedir? Geleneksel istatistiksel yöntemlerle arasındaki temel fark nedir?",
        "content_title": "İstatistiğin Kaslı Versiyonu",
        "content_desc": "Teknik detay sıfır. Yapay zekanın işinizi elinizden alacak bir canavar değil, sadece çok daha gelişmiş bir istatistiksel araç olduğunu öğrenin.",
        "color": "var(--neon-blue)"
    },
    {
        "id": "stage2",
        "title": "2. Aşama: Kaputun Altı (Sistem Nasıl Çalışır?)",
        "subtitle": "Algoritmalar veriyi nasıl okur? Denetimli (Supervised) ve denetimsiz (Unsupervised) öğrenme nedir?",
        "content_title": "Makinenin Öğrenme Mantığı",
        "content_desc": "Derin Öğrenme kelimelerine boğulmadan önce, bir makinenin veriden nasıl örüntü çıkardığını mantıksal olarak kavrayın.",
        "color": "var(--neon-green)"
    },
    {
        "id": "stage3",
        "title": "3. Aşama: Fabrika Ayarları (Yapay Zeka Nasıl İnşa Edilir?)",
        "subtitle": "Hammadde (Veri), Mimari (Sinir Ağları) ve Eğitim (Training) süreçleri.",
        "content_title": "Yapay Zekanın Doğum Hikayesi",
        "content_desc": "Sıfırdan bir yapay zekanın nasıl kurgulandığını adım adım, mühendislik seviyesinde ama anlaşılır bir dille keşfedin.",
        "color": "var(--neon-purple)"
    },
    {
        "id": "stage4",
        "title": "4. Aşama: Analistin Çalışma Masası (Pratik)",
        "subtitle": "Öğrenilen yapı analitik süreçlerde nasıl kullanılır? Doğru prompt yazımı ve halüsinasyon yönetimi.",
        "content_title": "Direksiyon Sizde",
        "content_desc": "Yapay zeka modellerini yönlendirmek için prompt kütüphanesi ve pratik kullanım senaryoları.",
        "color": "var(--neon-orange)"
    }
]

html_template = """<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Analyst Roadmap</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/styles.css?v=3.4">
    <link rel="stylesheet" href="{id}.css">
</head>
<body class="formulas-page">
    <script>
        (function() {{
            const savedTheme = localStorage.getItem('analyst_theme') || 'theme-light-purple';
            if (savedTheme !== 'theme-dark') {{
                document.body.classList.add(savedTheme);
            }}
        }})();
    </script>

    <div class="bg-analytics-mesh">
        <div class="bg-chart-item bg-chart-1">
            <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="100" r="80" fill="{color}" opacity="0.1" />
            </svg>
        </div>
    </div>

    <!-- Header will be injected by components.js -->

    <section class="formulas-hero" style="padding-top: 140px; padding-bottom: 60px;">
        <div class="hero-content" style="max-width: 900px;">
            <div class="badge-pill" style="margin-bottom: 16px; background: rgba(255,255,255,0.1); color: {color}; border-color: {color};">Yapay Zeka ve Analist Entegrasyonu</div>
            <h1 class="hero-title" style="font-size: 2.8rem; margin: 0;">{title}</h1>
            <p class="hero-subtitle" style="font-size: 1.25rem; line-height: 1.6; margin-top: 24px;">
                {subtitle}
            </p>
        </div>
    </section>

    <main class="formulas-main" style="max-width: 1200px; width: 100%; margin: 0 auto 100px auto; padding: 0 24px;">
        <div class="glass" style="padding: 40px; border-radius: 28px; border: 1px solid var(--glass-border); margin-bottom: 48px;">
            <h2 style="font-size: 2rem; color: {color}; margin-bottom: 24px;">{content_title}</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
                {content_desc}
            </p>
            <div style="margin-top: 40px; padding: 24px; border-radius: 16px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05);">
                <p style="color: var(--text-main); font-style: italic; text-align: center;">Buraya detaylı içerikler, grafikler ve interaktif öğeler eklenecektir.</p>
            </div>
        </div>
    </main>

    <script src="../../js/components.js"></script>
    <script src="../../js/nav.js"></script>
    <script src="../../js/modal.js"></script>
    <script src="../../js/script.js"></script>
    <script src="{id}.js"></script>
</body>
</html>"""

css_template = """/* {id}.css */
.formulas-hero h1 {{
    text-shadow: 0 0 30px {color};
}}
"""

js_template = """// {id}.js
document.addEventListener('DOMContentLoaded', () => {{
    console.log('{title} yüklendi.');
}});
"""

for stage in stages:
    stage_dir = os.path.join(base_dir, stage["id"])
    
    html_content = html_template.format(**stage)
    css_content = css_template.format(**stage)
    js_content = js_template.format(**stage)
    
    with open(os.path.join(stage_dir, f"{stage['id']}.html"), "w", encoding="utf-8") as f:
        f.write(html_content)
        
    with open(os.path.join(stage_dir, f"{stage['id']}.css"), "w", encoding="utf-8") as f:
        f.write(css_content)
        
    with open(os.path.join(stage_dir, f"{stage['id']}.js"), "w", encoding="utf-8") as f:
        f.write(js_content)

print("Stage files populated successfully.")
