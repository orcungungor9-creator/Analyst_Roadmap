let pathPrefix = '';
let isInsideFolder = false;

// Determine path depth based on how components.js is loaded
const scripts = document.getElementsByTagName('script');
let myScriptSrc = '';
for (let script of scripts) {
    const rawSrc = script.getAttribute('src');
    if (rawSrc && rawSrc.includes('components.js')) {
        myScriptSrc = rawSrc;
        break;
    }
}

if (myScriptSrc) {
    // Extract the prefix (e.g., "", "../", "../../")
    const cleanSrc = myScriptSrc.split('?')[0]; // Remove cache parameters if any
    pathPrefix = cleanSrc.replace('js/components.js', '');
}

const isIndexPage = (pathPrefix === '');
const isFormulasPage = window.location.pathname.includes('/guides/formulas/');

const HEADER_HTML = `
    <style>
        @media (max-width: 900px) {
            .hide-on-mobile { display: none !important; }
        }
    </style>
    <header class="site-header glass-header">
        <div class="header-container">
            <div class="header-left" style="display: flex; align-items: center;">
                <a href="${isIndexPage ? '#' : pathPrefix + 'index.html'}" class="logo" style="color: var(--neon-blue); display: flex; align-items: center; gap: 12px; text-decoration: none; flex-wrap: nowrap;">
                    Analyst Roadmap
                    ${isIndexPage ? '' : `
                    <div style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: transparent; border: 1px solid var(--neon-blue); color: var(--neon-blue); transition: all 0.2s ease; cursor: pointer; opacity: 0.8;" onmouseover="this.style.background='var(--neon-blue-glow)'; this.style.transform='scale(1.05)'; this.style.opacity='1';" onmouseout="this.style.background='transparent'; this.style.transform='scale(1)'; this.style.opacity='0.8';" title="Ana Sayfaya Dön">
                        <i data-lucide="home" style="width: 18px; height: 18px;"></i>
                    </div>
                    `}
                </a>
            </div>

            <nav class="desktop-main-nav">
                <!-- DERSLER DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i data-lucide="book" style="width: 18px; height: 18px; color: var(--neon-purple);"></i> Dersler <span style="font-size: 0.8rem; margin-left: 2px; color: var(--neon-purple);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}courses/courses.html" class="dropdown-item purple-hover" style="border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; justify-content: center;"><i data-lucide="book" style="width: 16px; height: 16px; margin-right: 6px; color: var(--neon-purple);"></i> Tüm Akademik Dersler</a>
                        <a href="${pathPrefix}courses/istatistik/istatistik.html" class="dropdown-item purple-hover">📊 İstatistik</a>
                        <a href="${pathPrefix}courses/olasilik/olasilik.html" class="dropdown-item purple-hover">🎲 Olasılık</a>
                        <a href="${pathPrefix}courses/matematiksel_istatistik/matematiksel_istatistik.html" class="dropdown-item purple-hover">🧮 Mat. İstatistik</a>
                        <a href="${pathPrefix}courses/istatistiksel_yontemler/istatistiksel_yontemler.html" class="dropdown-item purple-hover">🧪 İst. Yöntemler</a>
                        <a href="${pathPrefix}courses/regresyon_analizi/regresyon_analizi.html" class="dropdown-item purple-hover">📈 Regresyon Analizi</a>
                        <a href="${pathPrefix}courses/hipotez_testleri/hipotez_testleri.html" class="dropdown-item purple-hover">📉 Hipotez Testleri</a>
                        <a href="${pathPrefix}courses/veri_yapilari/veri_yapilari.html" class="dropdown-item purple-hover">🧠 Veri Yapıları</a>
                        <a href="${pathPrefix}courses/yoneylem/yoneylem.html" class="dropdown-item purple-hover">📈 Yöneylem Arş.</a>
                        <a href="${pathPrefix}courses/ysa/ysa.html" class="dropdown-item purple-hover">🤖 Yapay Sinir Ağları</a>
                        <a href="${pathPrefix}courses/lineer_cebir/lineer_cebir.html" class="dropdown-item purple-hover">📐 Lineer Cebir</a>
                    </div>
                </div>

                <!-- REHBERLER DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i data-lucide="compass" style="width: 18px; height: 18px; color: var(--neon-blue);"></i> Rehberler <span style="font-size: 0.8rem; margin-left: 2px; color: var(--neon-blue);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#guides-section" class="dropdown-item blue-hover" style="border-bottom: 1px dashed rgba(56, 189, 248, 0.3); border-radius: 0; justify-content: center;"><i data-lucide="compass" style="width: 16px; height: 16px; margin-right: 6px; color: var(--neon-blue);"></i> Tüm Rehberleri Gör</a>
                        <a href="${pathPrefix}guides/basics/basics.html" class="dropdown-item blue-hover">📦 İstatistiğin Yapı Taşları (101)</a>
                        <a href="${pathPrefix}guides/formulas/formulas.html" class="dropdown-item blue-hover">⚡ İstatistiksel Formüller Sözlüğü</a>
                        <a href="${pathPrefix}guides/datatypes/datatypes.html" class="dropdown-item blue-hover">🏷️ Veri Türleri &amp; Ölçüm Ölçekleri</a>
                        <a href="${pathPrefix}guides/datasets/datasets.html" class="dropdown-item blue-hover">📁 Veri Seti Türleri &amp; Ekonometri</a>
                        <a href="${pathPrefix}guides/charts/charts.html" class="dropdown-item blue-hover">📊 Grafik Seçim &amp; Görselleştirme</a>
                    </div>
                </div>

                <!-- ARAÇLAR DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i data-lucide="briefcase" style="width: 18px; height: 18px; color: var(--neon-green);"></i> Araçlar <span style="font-size: 0.8rem; margin-left: 2px; color: var(--neon-green);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#tools-section" class="dropdown-item green-hover" style="border-bottom: 1px dashed rgba(52, 211, 153, 0.3); border-radius: 0; justify-content: center;"><i data-lucide="briefcase" style="width: 16px; height: 16px; margin-right: 6px; color: var(--neon-green);"></i> Tüm Araçları Gör</a>
                        <a href="${pathPrefix}tools/python/python.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/python-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Python</a>
                        <a href="${pathPrefix}tools/r/r.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/r-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> R Programlama</a>
                        <a href="${pathPrefix}tools/sql/sql.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/sql-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SQL</a>
                        <a href="${pathPrefix}tools/excel/excel.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/excel-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Excel</a>
                        <a href="${pathPrefix}tools/powerbi/powerbi.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/powerbi-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Power BI</a>
                        <a href="${pathPrefix}tools/tableau/tableau.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/tableau-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Tableau</a>
                        <a href="${pathPrefix}tools/spss/spss.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/spss-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SPSS</a>
                        <a href="${pathPrefix}tools/stata/stata.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/stata-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Stata</a>
                        <a href="${pathPrefix}tools/eviews/eviews.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/eviews-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> EViews</a>
                        <a href="${pathPrefix}tools/gretl/gretl.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/gretl-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Gretl</a>
                        <a href="${pathPrefix}tools/sas/sas.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/sas-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SAS</a>
                        <a href="${pathPrefix}tools/julia/julia.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/julia-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Julia</a>
                        <a href="${pathPrefix}tools/hadoop/hadoop.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/hadoop-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Hadoop</a>
                        <a href="${pathPrefix}tools/pyspark/pyspark.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/pyspark-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> PySpark</a>
                        <a href="${pathPrefix}tools/matlab/matlab.html" class="dropdown-item green-hover"><img src="${pathPrefix}tools/matlab/matlab-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> MATLAB</a>
                        <a href="${pathPrefix}tools/git/git.html" class="dropdown-item green-hover"><img src="${pathPrefix}assets/logos/git-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Git</a>
                    </div>
                </div>

                <!-- YAPAY ZEKA DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i data-lucide="cpu" style="width: 18px; height: 18px; color: var(--neon-orange);"></i> Yapay Zeka <span style="font-size: 0.8rem; margin-left: 2px; color: var(--neon-orange);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#ai-integration-section" class="dropdown-item ai-hover" style="border-bottom: 1px dashed color-mix(in srgb, var(--neon-orange) 30%, transparent); border-radius: 0; justify-content: center;"><i data-lucide="cpu" style="width: 16px; height: 16px; margin-right: 6px; color: var(--neon-orange);"></i> AI Yol Haritasını Gör</a>
                        <a href="${pathPrefix}ai/stage1/stage1.html" class="dropdown-item ai-hover">💬 1. Aşama: Yapay Zeka Okuryazarlığı</a>
                        <a href="${pathPrefix}ai/stage2/stage2.html" class="dropdown-item ai-hover">💼 2. Aşama: Veri Mühendisliği</a>
                        <a href="${pathPrefix}ai/stage3/stage3.html" class="dropdown-item ai-hover">🧠 3. Aşama: Model Eğitimi (Algoritma Seçimi)</a>
                        <a href="${pathPrefix}ai/stage4/stage4.html" class="dropdown-item ai-hover">📊 4. Aşama: Kalite Kontrol</a>
                    </div>
                </div>

                <!-- AI REHBERİ DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i data-lucide="book-open" style="width: 18px; height: 18px; color: var(--neon-purple);"></i> AI Rehberi <span style="font-size: 0.8rem; margin-left: 2px; color: var(--neon-purple);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#ai-guides-section" class="dropdown-item ai-rehber-hover" style="border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; justify-content: center;"><i data-lucide="book-open" style="width: 16px; height: 16px; margin-right: 6px; color: var(--neon-purple);"></i> Tüm AI Rehberlerini Gör</a>
                        <a href="${pathPrefix}yapay-zeka/tarihce/index.html" class="dropdown-item ai-rehber-hover">⏳ Tarihçe ve Dönüm Noktaları</a>
                        <a href="${pathPrefix}yapay-zeka/kullanim-alanlari/index.html" class="dropdown-item ai-rehber-hover">🌐 Yapay Zeka Kullanım Alanları</a>
                        <a href="${pathPrefix}yapay-zeka/ajan-sistemler/index.html" class="dropdown-item ai-rehber-hover">🤖 Ajan Sistemler (Agentic AI)</a>
                        <a href="${pathPrefix}yapay-zeka/temel-bilesenler/index.html" class="dropdown-item ai-rehber-hover">🧩 Temel Bileşenler</a>
                        <a href="${pathPrefix}yapay-zeka/ileri-teknikler/index.html" class="dropdown-item ai-rehber-hover">🚀 İleri YZ Prompt Teknikleri</a>
                        <a href="${pathPrefix}yapay-zeka/prompt-debugging/index.html" class="dropdown-item ai-rehber-hover">🐛 Prompt Debugging</a>
                        <a href="${pathPrefix}yapay-zeka/rag-sistemleri/index.html" class="dropdown-item ai-rehber-hover">🧠 RAG (Retrieval-Augmented Generation)</a>
                    </div>
                </div>
            </nav>

            <div class="header-right">
                <nav class="desktop-nav" id="desktop-nav">
                </nav>
                <div class="action-buttons hide-on-mobile" style="display: flex; align-items: center; gap: 4px;">
                    <button class="nav-btn icon-btn" onclick="window.location.href = pathPrefix + 'about/about.html'" title="Hakkında">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    </button>
                    <button class="nav-btn icon-btn" onclick="openModal('theme-modal')"
                        title="Görünüm Ayarları / Tema Seç">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                            <path
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.836-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                        </svg>
                    </button>
                </div>
                <button class="hamburger-btn" id="hamburger-btn" onclick="toggleNavMenu()" aria-label="Menü">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>
`;

const MOBILE_NAV_HTML = `
    <div class="mobile-nav-menu" id="mobile-nav-menu">
        <div class="mobile-nav-panel">
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-family: var(--font-title); font-size: 1.2rem; font-weight: 800; color: var(--neon-blue);">Menü</span>
                <button onclick="closeNavMenu()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 50%; color: var(--text-main); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease;">&times;</button>
            </div>
            
            ${isIndexPage ? '' : `<button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html'" style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 12px;">
                <span style="font-weight: 800; color: var(--text-main); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="home" style="width: 18px; height: 18px; margin-right: 8px;"></i> Ana Sayfaya Dön</span>
            </button>`}

            <button class="mobile-nav-item courses-hdr" onclick="toggleMobileAccordion('courses-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-purple); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="book" style="width: 18px; height: 18px; margin-right: 8px;"></i> Dersler</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-purple);">▼</span>
            </button>
            <div id="courses-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(192, 132, 252, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/courses.html'" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="book" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Tüm Akademik Dersler</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/istatistik/istatistik.html'" style="font-size: 0.9rem; padding: 12px 16px;">📊 İstatistik</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/olasilik/olasilik.html'" style="font-size: 0.9rem; padding: 12px 16px;">🎲 Olasılık</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/matematiksel_istatistik/matematiksel_istatistik.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧮 Mat. İstatistik</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/istatistiksel_yontemler/istatistiksel_yontemler.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧪 İst. Yöntemler</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/regresyon_analizi/regresyon_analizi.html'" style="font-size: 0.9rem; padding: 12px 16px;">📈 Regresyon Analizi</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/hipotez_testleri/hipotez_testleri.html'" style="font-size: 0.9rem; padding: 12px 16px;">📉 Hipotez Testleri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/veri_yapilari/veri_yapilari.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧠 Veri Yapıları</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/yoneylem/yoneylem.html'" style="font-size: 0.9rem; padding: 12px 16px;">📈 Yöneylem Arş.</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/ysa/ysa.html'" style="font-size: 0.9rem; padding: 12px 16px;">🤖 Yapay Sinir Ağları</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/lineer_cebir/lineer_cebir.html'" style="font-size: 0.9rem; padding: 12px 16px;">📐 Lineer Cebir</button>
            </div>

            <button class="mobile-nav-item guides-hdr" onclick="toggleMobileAccordion('guides-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-blue); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="compass" style="width: 18px; height: 18px; margin-right: 8px;"></i> Rehberler</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-blue);">▼</span>
            </button>
            <div id="guides-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(56, 189, 248, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#guides-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(56, 189, 248, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="compass" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-blue);"></i> Tüm Rehberleri Gör</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/basics/basics.html'" style="font-size: 0.9rem; padding: 12px 16px;">📦 İstatistiğin Yapı Taşları (101)</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/formulas/formulas.html'" style="font-size: 0.9rem; padding: 12px 16px;">⚡ İstatistiksel Formüller Sözlüğü</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/datatypes/datatypes.html'" style="font-size: 0.9rem; padding: 12px 16px;">🏷️ Veri Türleri &amp; Ölçüm Ölçekleri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/datasets/datasets.html'" style="font-size: 0.9rem; padding: 12px 16px;">📁 Veri Seti Türleri &amp; Ekonometri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/charts/charts.html'" style="font-size: 0.9rem; padding: 12px 16px;">📊 Grafik Seçim &amp; Görselleştirme</button>
            </div>

            <button class="mobile-nav-item tools-hdr" onclick="toggleMobileAccordion('tools-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-green); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="briefcase" style="width: 18px; height: 18px; margin-right: 8px;"></i> Araçlar</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-green);">▼</span>
            </button>
            <div id="tools-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(52, 211, 153, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#tools-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(52, 211, 153, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="briefcase" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> Tüm Araçları Gör</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/python/python.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/python-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Python</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/r/r.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/r-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> R Programlama</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/sql/sql.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/sql-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SQL</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/excel/excel.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/excel-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Excel</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/powerbi/powerbi.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/powerbi-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Power BI</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/tableau/tableau.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/tableau-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Tableau</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/spss/spss.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/spss-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SPSS</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/stata/stata.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/stata-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Stata</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/eviews/eviews.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/eviews-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> EViews</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/gretl/gretl.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/gretl-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Gretl</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/sas/sas.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/sas-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> SAS</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/julia/julia.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/julia-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Julia</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/hadoop/hadoop.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/hadoop-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Hadoop</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/pyspark/pyspark.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/pyspark-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> PySpark</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/matlab/matlab.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}tools/matlab/matlab-logo.png" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> MATLAB</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}tools/git/git.html'" style="font-size: 0.9rem; padding: 12px 16px;"><img src="${pathPrefix}assets/logos/git-logo.svg" style="width:16px; height:16px; margin-right:8px; object-fit:contain; border-radius:3px; vertical-align:middle;"> Git</button>
            </div>

            <button class="mobile-nav-item ai-hdr" onclick="toggleMobileAccordion('ai-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-orange); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="cpu" style="width: 18px; height: 18px; margin-right: 8px;"></i> Yapay Zeka</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-orange);">▼</span>
            </button>
            <div id="ai-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid color-mix(in srgb, var(--neon-orange) 30%, transparent);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#ai-integration-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed color-mix(in srgb, var(--neon-orange) 30%, transparent); border-radius: 0; display: flex; align-items: center;"><i data-lucide="cpu" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-orange);"></i> AI Yol Haritasını Gör</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}ai/stage1/stage1.html'" style="font-size: 0.9rem; padding: 12px 16px;">💬 1. Aşama: Yapay Zeka Okuryazarlığı</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}ai/stage2/stage2.html'" style="font-size: 0.9rem; padding: 12px 16px;">💼 2. Aşama: Veri Mühendisliği</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}ai/stage3/stage3.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧠 3. Aşama: Model Eğitimi (Algoritma Seçimi)</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}ai/stage4/stage4.html'" style="font-size: 0.9rem; padding: 12px 16px;">📊 4. Aşama: Kalite Kontrol</button>
            </div>

            <button class="mobile-nav-item ai-rehber-hdr" onclick="toggleMobileAccordion('ai-rehberi-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-purple); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="book-open" style="width: 18px; height: 18px; margin-right: 8px;"></i> AI Rehberi</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-purple);">▼</span>
            </button>
            <div id="ai-rehberi-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(192, 132, 252, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#ai-guides-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="book-open" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Tüm AI Rehberlerini Gör</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/tarihce/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">⏳ Tarihçe ve Dönüm Noktaları</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/kullanim-alanlari/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🌐 Yapay Zeka Kullanım Alanları</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/ajan-sistemler/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🤖 Ajan Sistemler (Agentic AI)</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/temel-bilesenler/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧩 Temel Bileşenler</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/ileri-teknikler/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🚀 İleri YZ Prompt Teknikleri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/prompt-debugging/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🐛 Prompt Debugging</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}yapay-zeka/rag-sistemleri/index.html'" style="font-size: 0.9rem; padding: 12px 16px;">🧠 RAG (Retrieval-Augmented Generation)</button>
            </div>

            <!-- MOBILE: ANALİZE HAZIRLIK -->
            <button class="mobile-nav-item courses-hdr" onclick="toggleMobileAccordion('prep-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-purple); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="database" style="width: 18px; height: 18px; margin-right: 8px;"></i> Analize Hazırlık</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-purple);">▼</span>
            </button>
            <div id="prep-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(192, 132, 252, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}analize_hazirlik/index.html'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="database" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Analize Hazırlığa Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}analize_hazirlik/index.html#veriye-ilk-bakis'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="zoom-in" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Veriye İlk Bakışa Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}analize_hazirlik/index.html#veri-temizleme-1'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="trash-2" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Veri Temizleme I Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}analize_hazirlik/index.html#veri-temizleme-2'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="trash-2" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-purple);"></i> Veri Temizleme II Git</button>
            </div>

            <!-- MOBILE: TEST ÇÖZ -->
            <button class="mobile-nav-item tools-hdr" onclick="toggleMobileAccordion('quiz-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-green); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="help-circle" style="width: 18px; height: 18px; margin-right: 8px;"></i> Test Çöz</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-green);">▼</span>
            </button>
            <div id="quiz-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(52, 211, 153, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}quiz/quiz.html'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(52, 211, 153, 0.3); border-radius: 0; display: flex; align-items: center;"><i data-lucide="help-circle" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> Test Modüllerine Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}quiz/quiz.html#programlama-testleri'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="code" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> Programlama Testlerine Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}quiz/quiz.html#akademik-testler'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="graduation-cap" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> Akademik Testlere Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}quiz/quiz.html#ai-testleri'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="bot" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> AI Testlerine Git</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}quiz/quiz.html#analist-testleri'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; display: flex; align-items: center;"><i data-lucide="bar-chart-2" style="width: 16px; height: 16px; margin-right: 8px; color: var(--neon-green);"></i> Analist Testlerine Git</button>
            </div>

            <!-- MOBILE: NASIL BAŞLAYABİLİRİM? -->
            <button class="mobile-nav-item ai-hdr" onclick="window.location.href='${pathPrefix}how_to_start/how_to_start.html'" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-orange); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="navigation" style="width: 18px; height: 18px; margin-right: 8px;"></i> Nasıl Başlayabilirim?</span>
            </button>

            <!-- MOBILE: PROGRAMLAMA DERSLERİ -->
            <button class="mobile-nav-item guides-hdr" onclick="window.location.href='${pathPrefix}lessons/lessons.html'" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-blue); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="code" style="width: 18px; height: 18px; margin-right: 8px;"></i> Programlama Dersleri</span>
            </button>

            <div style="width: 100%; margin: 12px 0 4px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                <span style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;">Bağlantılar &amp; Ayarlar</span>
            </div>
            
            <a href="https://www.kaggle.com/datasets" target="_blank" class="mobile-nav-item guides-hdr" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; margin-bottom: 4px; text-decoration: none;">
                <span style="font-weight: 800; color: var(--neon-blue); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="globe" style="width: 18px; height: 18px; margin-right: 8px;"></i> Veri Setleri (Kaggle)</span>
                <i data-lucide="external-link" style="width: 16px; height: 16px; color: var(--neon-blue);"></i>
            </a>
            
            <button class="mobile-nav-item tools-hdr" onclick="window.location.href = pathPrefix + 'about/about.html'; closeNavMenu();" style="display: flex; justify-content: flex-start; align-items: center; margin-top: 4px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-green); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="info" style="width: 18px; height: 18px; margin-right: 8px;"></i> Hakkında</span>
            </button>
            
            <button class="mobile-nav-item ai-hdr" onclick="openModal('theme-modal'); closeNavMenu();" style="display: flex; justify-content: flex-start; align-items: center; margin-top: 4px; margin-bottom: 12px;">
                <span style="font-weight: 800; color: var(--neon-orange); letter-spacing: 0.5px; font-size: 0.9rem; display: flex; align-items: center;"><i data-lucide="palette" style="width: 18px; height: 18px; margin-right: 8px;"></i> Görünüm Ayarları</span>
            </button>

            <!-- MOBILE SIDEBAR FOOTER -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 20px;">
                <div style="display: flex; gap: 16px;">
                    <a href="${pathPrefix}yasal/index.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem; font-weight: 600;">Yasal</a>
                    <a href="#" onclick="event.preventDefault(); closeNavMenu(); openModal('contact-modal')" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem; font-weight: 600;">İletişim</a>
                </div>
                <div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; line-height: 1.4;">
                    &copy; 2026 Analyst Roadmap.<br>Tüm hakları saklıdır.
                </div>
            </div>
        </div>
    </div>
`;



const THEME_MODAL_HTML = `
    <div id="theme-modal" class="modal-overlay">
        <div class="modal-content glass modal-custom-pad">
            <button class="close-btn" onclick="closeModal('theme-modal')">&times;</button>
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 32px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(56, 189, 248, 0.15); border: 2px solid var(--neon-blue); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);">
                    🎨
                </div>
                <div>
                    <h2 class="modal-title gradient-text" style="margin-bottom: 4px; font-size: 2.2rem;">Görünüm Ayarları</h2>
                    <span style="color: var(--neon-blue); font-size: 0.95rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Arayüz Temasını Özelleştirin</span>
                </div>
            </div>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 24px;">
                Çalışma tarzınıza ve zevkinize en uygun renk paletini seçin. Seçiminiz tarayıcınızda kaydedilecek ve tüm sayfalarda geçerli olacaktır.
            </p>
            <div class="theme-grid">
                <!-- Tema 1: Fütüristik -->
                <div class="theme-card active" data-theme="theme-dark" onclick="setTheme('theme-dark'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #38bdf8;">
                        <span style="background: #090e17;"></span><span style="background: #38bdf8;"></span><span style="background: #34d399;"></span>
                    </div>
                    <strong>Fütüristik</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Koyu &amp; Neon</span>
                </div>
                <!-- Tema 2: Ocean -->
                <div class="theme-card" data-theme="theme-ocean" onclick="setTheme('theme-ocean'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #0ea5e9;">
                        <span style="background: #030f1a;"></span><span style="background: #0ea5e9;"></span><span style="background: #06b6d4;"></span>
                    </div>
                    <strong>Ocean</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Derin Okyanus</span>
                </div>
                <!-- Tema 3.5: Royal Purple -->
                <div class="theme-card" data-theme="theme-purple" onclick="setTheme('theme-purple'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #c084fc;">
                        <span style="background: #0f071a;"></span><span style="background: #c084fc;"></span><span style="background: #e879f9;"></span>
                    </div>
                    <strong>Kraliyet Moru</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Derin Ametist</span>
                </div>
                <!-- Tema 4: Emerald -->
                <div class="theme-card" data-theme="theme-emerald" onclick="setTheme('theme-emerald'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #10b981;">
                        <span style="background: #051611;"></span><span style="background: #10b981;"></span><span style="background: #34d399;"></span>
                    </div>
                    <strong>Emerald</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Zümrüt Yeşili</span>
                </div>
                <!-- Tema 5: Cyberpunk -->
                <div class="theme-card" data-theme="theme-cyberpunk" onclick="setTheme('theme-cyberpunk'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #ec4899;">
                        <span style="background: #150917;"></span><span style="background: #ec4899;"></span><span style="background: #eab308;"></span>
                    </div>
                    <strong>Cyberpunk</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Neon Gece</span>
                </div>
                <!-- Tema 5.5: Cyberpunk Neon -->
                <div class="theme-card" data-theme="theme-cyber-neon" onclick="setTheme('theme-cyber-neon'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #ff007f;">
                        <span style="background: #020005;"></span><span style="background: #ff007f;"></span><span style="background: #9d00ff;"></span>
                    </div>
                    <strong>Cyberpunk Neon</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Ekstra Parlak</span>
                </div>
                <!-- Tema 6: Amber -->
                <div class="theme-card" data-theme="theme-amber" onclick="setTheme('theme-amber'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #f59e0b;">
                        <span style="background: #1c1917;"></span><span style="background: #f59e0b;"></span><span style="background: #eab308;"></span>
                    </div>
                    <strong>Amber</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Altın Gece</span>
                </div>
                <!-- Tema 6.5: Gece Sakura -->
                <div class="theme-card" data-theme="theme-dark-sakura" onclick="setTheme('theme-dark-sakura'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #db2777;">
                        <span style="background: #0d060a;"></span><span style="background: #db2777;"></span><span style="background: #be185d;"></span>
                    </div>
                    <strong>Gece Sakura</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Koyu Kiraz Çiçeği</span>
                </div>
                <!-- Tema 6.7: Siyah Beyaz -->
                <div class="theme-card" data-theme="theme-mono-dark" onclick="setTheme('theme-mono-dark'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #ffffff;">
                        <span style="background: #000000;"></span><span style="background: #ffffff;"></span><span style="background: #888888;"></span>
                    </div>
                    <strong>Siyah Beyaz</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Saf Karanlık</span>
                </div>
                <!-- Tema 7: Aydınlık -->
                <div class="theme-card" data-theme="theme-light-pure" onclick="setTheme('theme-light-pure'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #0284c7;">
                        <span style="background: #f8fafc;"></span><span style="background: #0284c7;"></span><span style="background: #16a34a;"></span>
                    </div>
                    <strong>Aydınlık</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Minimalist Beyaz</span>
                </div>
                <!-- Tema 7.2: Beyaz Siyah -->
                <div class="theme-card" data-theme="theme-mono-light" onclick="setTheme('theme-mono-light'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #000000;">
                        <span style="background: #ffffff;"></span><span style="background: #000000;"></span><span style="background: #666666;"></span>
                    </div>
                    <strong>Beyaz Siyah</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Saf Aydınlık</span>
                </div>
                <!-- Tema 8: Ilık Krem -->
                <div class="theme-card" data-theme="theme-light-warm" onclick="setTheme('theme-light-warm'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #d97706;">
                        <span style="background: #fefce8;"></span><span style="background: #d97706;"></span><span style="background: #ca8a04;"></span>
                    </div>
                    <strong>Ilık Krem</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Açık Amber</span>
                </div>
                <!-- Tema 9: Sakura Pembesi -->
                <div class="theme-card" data-theme="theme-pink" onclick="setTheme('theme-pink'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #db2777;">
                        <span style="background: #fdf2f8;"></span><span style="background: #db2777;"></span><span style="background: #be185d;"></span>
                    </div>
                    <strong>Sakura</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Pembe Düşler</span>
                </div>
                <!-- Tema 10: Mint -->
                <div class="theme-card" data-theme="theme-light-emerald" onclick="setTheme('theme-light-emerald'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #059669;">
                        <span style="background: #ecfdf5;"></span><span style="background: #059669;"></span><span style="background: #10b981;"></span>
                    </div>
                    <strong>Mint</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Açık Zümrüt</span>
                </div>
                <!-- Tema 10.5: Açık Lavanta -->
                <div class="theme-card" data-theme="theme-light-purple" onclick="setTheme('theme-light-purple'); closeModal('theme-modal');">
                    <div class="theme-palette-preview" style="border-color: #9333ea;">
                        <span style="background: #faf5ff;"></span><span style="background: #9333ea;"></span><span style="background: #c084fc;"></span>
                    </div>
                    <strong>Açık Lavanta</strong>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Ferah &amp; Asil</span>
                </div>
            </div>
        </div>
    </div>
`;

const FOOTER_HTML = `
    <style>
        @media (max-width: 900px) {
            .site-footer .footer-content {
                flex-direction: column;
                gap: 16px;
                text-align: center;
            }
            .site-footer .footer-left {
                order: 2;
                text-align: center !important;
            }
            .site-footer .footer-links-group {
                order: 1;
                justify-content: center !important;
            }
        }
    </style>
    <!-- FOOTER -->
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-left">
                <span class="footer-copy">&copy; 2026 Analyst Roadmap. Tüm hakları saklıdır. İzinsiz kopyalanamaz veya çoğaltılamaz.</span>
            </div>
            <div class="footer-links-group" style="display: flex; gap: 20px; align-items: center; justify-content: flex-end;">
                <a href="${pathPrefix}yasal/index.html" class="footer-link">Yasal</a>
                <a href="#" onclick="event.preventDefault(); openModal('contact-modal')" class="footer-link">İletişim</a>
            </div>
        </div>
    </footer>
`;

const CONTACT_MODAL_HTML = `
    <div id="contact-modal" class="modal-overlay" onclick="if(event.target.id === 'contact-modal') closeModal('contact-modal')">
        <div class="modal-content" style="max-width: 400px; padding: 30px;">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--glass-border); padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="font-family: var(--font-title); font-size: 1.5rem; color: var(--text-main); margin: 0;">İletişim İçin</h2>
                <button class="close-modal-btn" onclick="closeModal('contact-modal')" style="color: #ea4335; font-size: 2rem; line-height: 1; background: transparent; border: none; cursor: pointer; transition: transform 0.2s;">&times;</button>
            </div>
            <div class="modal-body" style="display: flex; flex-direction: column; gap: 15px;">
                <!-- Mail -->
                <a href="mailto:analystroadmap0@gmail.com" style="display: flex; align-items: center; gap: 15px; text-decoration: none; padding: 15px; background: rgba(234,67,53,0.05); border-radius: 12px; border: 1px solid rgba(234,67,53,0.3); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(234,67,53,0.15)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(234,67,53,0.05)'; this.style.transform='none';">
                    <div style="width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; background: #ea4335; border-radius: 10px; flex-shrink: 0;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="color: var(--text-main); font-weight: 700; font-size: 1.1rem; line-height: 1.2;">E-Posta</span>
                        <span style="color: var(--text-muted); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; margin-top: 4px;">analystroadmap0@gmail.com</span>
                    </div>
                </a>
                
                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/in/or%C3%A7un-g%C3%BCng%C3%B6r-720327353/" target="_blank" style="display: flex; align-items: center; gap: 15px; text-decoration: none; padding: 15px; background: rgba(10,102,194,0.05); border-radius: 12px; border: 1px solid rgba(10,102,194,0.3); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(10,102,194,0.15)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(10,102,194,0.05)'; this.style.transform='none';">
                    <div style="width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; background: #0A66C2; border-radius: 10px; flex-shrink: 0;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="color: var(--text-main); font-weight: 700; font-size: 1.1rem; line-height: 1.2;">LinkedIn</span>
                        <span style="color: var(--text-muted); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; margin-top: 4px;">Orçun Güngör</span>
                    </div>
                </a>

                <!-- GitHub -->
                <a href="https://github.com/orcungungor9-creator" target="_blank" style="display: flex; align-items: center; gap: 15px; text-decoration: none; padding: 15px; background: rgba(243,79,41,0.05); border-radius: 12px; border: 1px solid rgba(243,79,41,0.3); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(243,79,41,0.15)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(243,79,41,0.05)'; this.style.transform='none';">
                    <div style="width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; background: #f34f29; border-radius: 10px; flex-shrink: 0;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="color: var(--text-main); font-weight: 700; font-size: 1.1rem; line-height: 1.2;">GitHub</span>
                        <span style="color: var(--text-muted); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; margin-top: 4px;">orcungungor9-creator</span>
                    </div>
                </a>

                <!-- Kaggle -->
                <a href="https://www.kaggle.com/orungngr" target="_blank" style="display: flex; align-items: center; gap: 15px; text-decoration: none; padding: 15px; background: rgba(32,190,255,0.05); border-radius: 12px; border: 1px solid rgba(32,190,255,0.3); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(32,190,255,0.15)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(32,190,255,0.05)'; this.style.transform='none';">
                    <div style="width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; background: #20BEFF; border-radius: 10px; flex-shrink: 0;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.825 23.859c-.022.092-.117.141-.21.141h-3.155c-.173 0-.327-.083-.432-.218l-5.698-7.391-2.906 2.76v4.613c0 .13-.105.235-.235.235H3.61c-.13 0-.236-.105-.236-.235V.235C3.374.105 3.48 0 3.61 0h2.578c.13 0 .235.105.235.235v15.228l8.286-8.243c.105-.105.253-.162.404-.162h3.195c.162 0 .264.167.194.306l-6.85 6.787 7.422 9.53c.092.12.115.283.05.424l-.299.754z"/>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="color: var(--text-main); font-weight: 700; font-size: 1.1rem; line-height: 1.2;">Kaggle</span>
                        <span style="color: var(--text-muted); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; margin-top: 4px;">orungngr</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
`;

// Insert the components into the DOM
document.addEventListener('DOMContentLoaded', () => {
    // Insert Header and Mobile Nav at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML + MOBILE_NAV_HTML);
    // Insert Footer at the end of the body
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    // Insert Modals at the end of the body
    document.body.insertAdjacentHTML('beforeend', THEME_MODAL_HTML + CONTACT_MODAL_HTML);

    // Initialize Lazy Loading for Cards
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.lazy-fade').forEach(el => fadeObserver.observe(el));

    // Load Lucide Icons
    const lucideScript = document.createElement('script');
    lucideScript.src = "https://unpkg.com/lucide@latest";
    lucideScript.onload = () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    };
    document.head.appendChild(lucideScript);
});
