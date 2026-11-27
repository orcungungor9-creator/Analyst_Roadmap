// ==========================================================================
// 7. AŞAMA: VERİ TOPLAMA KAYNAĞININ VE ARACININ SEÇİMİ — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s7-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: Kaynak & Araç Eşleştirici
    const SOURCES = {
        survey: {
            cat: 'Birincil · Anket / Mülakat',
            tools: 'Google Forms, Qualtrics, Typeform, CAPI (Tablet) / MAXQDA',
            onceAuto: 'Tek seferlik form / saha kampanyası → CSV/Parquet export',
            periodicAuto: 'Dönemsel takip dalgaları (Panel anket) + otomatik Webhook / API',
            note: 'Kontrol tamamen sendedir ve değişkenlerin hipotezine birebir uyar. Ancak hatırlama yanlılığını önlemek için soruları yönlendirmesiz ve net kurgulamalı, KVKK açık rızası almalısın.'
        },
        sensor: {
            cat: 'Birincil · Sensör & Telemetri',
            tools: 'IoT sensörleri (GPS/sıcaklık), web tıklama logları, POS tarayıcıları',
            onceAuto: 'Belirli zaman aralığı için toplu log dışa aktarımı',
            periodicAuto: 'Sürekli akış / periyodik TSDB (TimescaleDB / InfluxDB) kaydı',
            note: 'İnsan beyanına dayanmadığı için hatırlama ve gözlemci yanlılığını ortadan kaldırır. Zaman damgalarının (UTC/yerel saat) tutarlı olmasına dikkat et.'
        },
        portal: {
            cat: 'İkincil · Resmî & Açık Veri Portalı',
            tools: 'TÜİK, TCMB (EVDS), FRED, Dünya Bankası · Python (evds, wbdata)',
            onceAuto: 'Portal üzerinden manuel Excel/CSV indirme veya tek seferlik paket sorgusu',
            periodicAuto: 'Zamanlanmış Python/R betiği (cron job / Airflow) ile aylık çekim',
            note: 'Metodolojisi şeffaf ve güvenilirdir. Yine de bülten revizyonlarını (önceki ayların güncellenmesi) ve aradığın değişkenin vekil (proxy) kalıp kalmadığını kontrol et.'
        },
        api: {
            cat: 'İkincil · Resmî API Uç Noktası',
            tools: 'Python (requests, httpx), R (httr2, jsonlite), Postman',
            onceAuto: 'Sayfalamalı (pagination) tek seferlik API scripti → JSON / Parquet',
            periodicAuto: 'Rate-limit kontrollü cron job / Airflow boru hattı (ELT)',
            note: 'Dış veri almanın en temiz yoludur. API hız sınırlarına (rate limit), anahtar güvenliğine (.env) ve şema değişikliklerine karşı loglama kurmayı unutma.'
        },
        scrape_static: {
            cat: 'İkincil · Web Kazıma (Statik HTML)',
            tools: 'Python (BeautifulSoup, Scrapy), R (rvest)',
            onceAuto: 'Tek seferlik sayfa ayrıştırma + gecikmeli istek (time.sleep)',
            periodicAuto: 'Zamanlanmış Scrapy / cron job + HTML değişim alarmı',
            note: 'Sunucu veriyi doğrudan HTML içinde gönderdiği için çok hızlı ve hafiftir. Kazıma öncesi mutlaka robots.txt ve ToS kurallarını doğrula.'
        },
        scrape_js: {
            cat: 'İkincil · Web Kazıma (Dinamik JS Sayfa)',
            tools: 'Tarayıcı otomasyonu: Playwright, Selenium',
            onceAuto: 'Headless tarayıcı ile kaydırma / tıklama otomasyonu',
            periodicAuto: 'Docker içinde zamanlanmış Playwright + seçici (selector) izleme',
            note: 'Sayfa JavaScript ile yükleniyorsa BeautifulSoup boş döner; gerçek tarayıcıyı taklit eden Playwright veya Selenium şarttır. Maliyeti ve bakım yükü daha yüksektir.'
        },
        erp: {
            cat: 'İkincil · Kurumsal İç Veritabanı',
            tools: 'SQL sorguları · Python (SQLAlchemy, psycopg2), R (DBI)',
            onceAuto: 'Salt-okunur (read-only) SQL sorgusuyla Parquet/CSV dışa aktarım',
            periodicAuto: 'Gece batch ELT boru hattı (dbt / Airflow) → Analitik katman',
            note: 'Canlı üretim (OLTP) veritabanını kilitlememek için analitik çekimleri daima gece saatlerinde veya kopya (read-replica) sunucudan yap.'
        }
    };

    const srcBtns = document.querySelectorAll('.s7-src-btn');
    const freqBtns = document.querySelectorAll('.s7-freq-btn');
    const recCat = document.getElementById('s7-rec-cat');
    const recTools = document.getElementById('s7-rec-tools');
    const recAuto = document.getElementById('s7-rec-auto');
    const recNote = document.getElementById('s7-rec-note');

    if (srcBtns.length && freqBtns.length && recCat && recTools && recAuto && recNote) {
        let activeSrc = 'survey';
        let activeFreq = 'once';

        const renderRecipe = () => {
            const cfg = SOURCES[activeSrc];
            recCat.textContent = cfg.cat;
            recTools.textContent = cfg.tools;
            recAuto.textContent = activeFreq === 'once' ? cfg.onceAuto : cfg.periodicAuto;
            recNote.textContent = cfg.note;
        };

        srcBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                srcBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                activeSrc = btn.getAttribute('data-src');
                renderRecipe();
            });
        });

        freqBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                freqBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                activeFreq = btn.getAttribute('data-freq');
                renderRecipe();
            });
        });

        renderRecipe();
    }
});
