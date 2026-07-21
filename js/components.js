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
    <header class="site-header glass-header">
        <div class="header-container">
            <div class="header-left" style="display: flex; align-items: center; gap: 16px;">
                ${isIndexPage ? '' : `
                <a href="${pathPrefix}index.html" class="nav-btn back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span class="back-text">Ana Sayfaya Dön</span>
                </a>`}
                <a href="${isIndexPage ? '#' : pathPrefix + 'index.html'}" class="logo" style="color: var(--neon-blue);">Analyst Roadmap</a>
            </div>

            <nav class="desktop-main-nav">
                <!-- DERSLER DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700;">
                        📚 Dersler <span style="font-size: 0.8rem; margin-left: 4px; color: var(--neon-purple);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}courses/courses.html" class="dropdown-item purple-hover" style="border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0; justify-content: center;">📚 Tüm Akademik Dersler</a>
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
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700;">
                        🚀 Rehberler <span style="font-size: 0.8rem; margin-left: 4px; color: var(--neon-blue);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#guides-section" class="dropdown-item blue-hover" style="border-bottom: 1px dashed rgba(56, 189, 248, 0.3); border-radius: 0; justify-content: center;">🚀 Tüm Rehberleri Gör</a>
                        <a href="${pathPrefix}guides/basics/basics.html" class="dropdown-item blue-hover">📦 İstatistiğin Yapı Taşları (101)</a>
                        <a href="${pathPrefix}guides/formulas/formulas.html" class="dropdown-item blue-hover">⚡ İstatistiksel Formüller Sözlüğü</a>
                        <a href="${pathPrefix}guides/datatypes/datatypes.html" class="dropdown-item blue-hover">🏷️ Veri Türleri &amp; Ölçüm Ölçekleri</a>
                        <a href="${pathPrefix}guides/datasets/datasets.html" class="dropdown-item blue-hover">📁 Veri Seti Türleri &amp; Ekonometri</a>
                        <a href="${pathPrefix}guides/charts/charts.html" class="dropdown-item blue-hover">📊 Grafik Seçim &amp; Görselleştirme</a>
                    </div>
                </div>

                <!-- ARAÇLAR DROPDOWN -->
                <div class="nav-dropdown-container">
                    <button class="nav-btn" style="color: var(--text-main); font-weight: 700;">
                        🛠️ Araçlar <span style="font-size: 0.8rem; margin-left: 4px; color: var(--neon-green);">▼</span>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${pathPrefix}index.html#tools-section" class="dropdown-item green-hover" style="border-bottom: 1px dashed rgba(52, 211, 153, 0.3); border-radius: 0; justify-content: center;">🛠️ Tüm Araçları Gör</a>
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
            </nav>

            <div class="header-right">
                <nav class="desktop-nav" id="desktop-nav">
                    ${isFormulasPage ? `
                    <button class="nav-btn search-trigger-btn" onclick="scrollToSearch()" title="Arama Yap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>Formül Ara</span>
                    </button>` : ''}
                    <a href="https://www.kaggle.com/datasets" target="_blank" class="nav-btn external-btn">Kaggle ↗</a>
                    <button class="nav-btn icon-btn" onclick="openModal('about-modal')" title="Hakkında">
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
                </nav>
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
            
            ${isIndexPage ? '' : `<button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html'">🏠 Ana Sayfaya Dön</button>`}

            <button class="mobile-nav-item courses-hdr" onclick="toggleMobileAccordion('courses-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-purple); letter-spacing: 0.5px; text-transform: uppercase; font-size: 0.85rem;">📚 Ders Müfredatı</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-purple);">▼</span>
            </button>
            <div id="courses-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(192, 132, 252, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}courses/courses.html'" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(192, 132, 252, 0.3); border-radius: 0;">📚 Tüm Akademik Dersler</button>
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
                <span style="font-weight: 800; color: var(--neon-blue); letter-spacing: 0.5px; text-transform: uppercase; font-size: 0.85rem;">🚀 Hızlı Analitik Rehberler</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-blue);">▼</span>
            </button>
            <div id="guides-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(56, 189, 248, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#guides-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(56, 189, 248, 0.3); border-radius: 0;">🚀 Tüm Rehberleri Gör</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/basics/basics.html'" style="font-size: 0.9rem; padding: 12px 16px;">📦 İstatistiğin Yapı Taşları (101)</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/formulas/formulas.html'" style="font-size: 0.9rem; padding: 12px 16px;">⚡ İstatistiksel Formüller Sözlüğü</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/datatypes/datatypes.html'" style="font-size: 0.9rem; padding: 12px 16px;">🏷️ Veri Türleri &amp; Ölçüm Ölçekleri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/datasets/datasets.html'" style="font-size: 0.9rem; padding: 12px 16px;">📁 Veri Seti Türleri &amp; Ekonometri</button>
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}guides/charts/charts.html'" style="font-size: 0.9rem; padding: 12px 16px;">📊 Grafik Seçim &amp; Görselleştirme</button>
            </div>

            <button class="mobile-nav-item tools-hdr" onclick="toggleMobileAccordion('tools-accordion', this)" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 4px;">
                <span style="font-weight: 800; color: var(--neon-green); letter-spacing: 0.5px; text-transform: uppercase; font-size: 0.85rem;">🛠️ Analitik Araçlar Vitrini</span>
                <span class="accordion-arrow" style="transition: transform 0.3s; font-size: 0.9rem; color: var(--neon-green);">▼</span>
            </button>
            <div id="tools-accordion" style="display: none; flex-direction: column; gap: 8px; width: 100%; margin-top: -4px; margin-bottom: 8px; padding-left: 16px; border-left: 2px solid rgba(52, 211, 153, 0.3);">
                <button class="mobile-nav-item" onclick="window.location.href='${pathPrefix}index.html#tools-section'; closeNavMenu();" style="font-size: 0.9rem; padding: 12px 16px; border-bottom: 1px dashed rgba(52, 211, 153, 0.3); border-radius: 0;">🛠️ Tüm Araçları Gör</button>
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

            <div style="width: 100%; margin: 12px 0 4px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                <span style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;">Bağlantılar &amp; Ayarlar</span>
            </div>
            <a href="https://www.kaggle.com/datasets" target="_blank" class="mobile-nav-item">🌐 Veri Setleri (Kaggle) ↗</a>
            <button class="mobile-nav-item" onclick="openModal('about-modal'); closeNavMenu();">ℹ️ Hakkında</button>
            <button class="mobile-nav-item" onclick="openModal('theme-modal'); closeNavMenu();">🎨 Görünüm Ayarları</button>
        </div>
    </div>
`;

const ABOUT_MODAL_HTML = `
    <div id="about-modal" class="modal-overlay">
        <div class="modal-content glass modal-custom-pad">
            <button class="close-btn" onclick="closeModal('about-modal')">&times;</button>
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 32px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(56, 189, 248, 0.15); border: 2px solid var(--neon-blue); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);">
                    😇
                </div>
                <div>
                    <h2 class="modal-title gradient-text" style="margin-bottom: 4px; font-size: 2.2rem;">Hakkımda</h2>
                    <span style="color: var(--neon-blue); font-size: 0.95rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Analyst Roadmap'e Hoş Geldiniz😘</span>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 20px; font-size: 1.08rem; line-height: 1.7; color: var(--text-main);">
                <p style="color: var(--text-muted); font-size: 1.15rem; font-weight: 500; border-left: 3px solid var(--neon-green); padding-left: 16px; margin-bottom: 4px;">
                    Öncelikle sayfama geldiğiniz için teşekkür ederim.
                </p>
                <p>
                    Ben <strong style="color: var(--neon-blue); font-weight: 700;">Orçun</strong>. <strong style="color: var(--text-main);">Analyst Roadmap</strong>, istatistik ve ekonometri dünyasına dair kavramları bir araya getirdiğim, veri analistlerinin kullandığı programlama dillerini ve araçları tanıttığım kapsamlı bir dijital arşivdir.
                </p>
                <p class="about-box">
                    Karmaşık teorilerden analitik araçlara kadar birçok konuyu, sıkıcı akademik dilden uzaklaşarak <em style="color: var(--neon-green); font-style: normal; font-weight: 700;">"kendi penceremden"</em> not düşüyorum. Amacım hem kendi gelişim sürecimi bu seyir defterinde arşivlemek hem de veri dünyasına adım atan veya bu alanda çalışan diğer insanlarla bilgi dolu, ortak bir zemin yaratmak.
                </p>
                <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 12px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px;">
                    Umarım bu sayfalarda kendi analiz serüveniniz için faydalı bir şeyler bulursunuz.
                </p>
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

// Insert the components into the DOM
document.addEventListener('DOMContentLoaded', () => {
    // Insert Header and Mobile Nav at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML + MOBILE_NAV_HTML);
    // Insert Modals at the end of the body
    document.body.insertAdjacentHTML('beforeend', ABOUT_MODAL_HTML + THEME_MODAL_HTML);

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
});
