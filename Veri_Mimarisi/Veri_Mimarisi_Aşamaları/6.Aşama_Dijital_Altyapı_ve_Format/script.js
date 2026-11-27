// ==========================================================================
// 6. AŞAMA: DİJİTAL ALTYAPI VE FORMATIN SEÇİLMESİ — ETKİLEŞİM BETİĞİ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Üst bar yüksekliğini ölçerek Hero Banner'ı hizala
    const syncHeaderHeight = () => {
        const header = document.querySelector('.site-header');
        if (header && header.offsetHeight > 0) {
            const h = header.offsetHeight;
            document.documentElement.style.setProperty('--s6-header-h', `${h}px`);
            document.body.style.paddingTop = `${h}px`;
        }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    // 2. Mini Laboratuvar: 5 Katmanlı Altyapı Önerici
    const btns = document.querySelectorAll('.s6-pick-btn');
    const bpFormat = document.getElementById('s6-bp-format');
    const bpStorage = document.getElementById('s6-bp-storage');
    const bpPipe = document.getElementById('s6-bp-pipe');
    const bpHost = document.getElementById('s6-bp-host');
    const bpGov = document.getElementById('s6-bp-gov');
    const bpWhy = document.getElementById('s6-bp-why');

    if (btns.length && bpFormat && bpStorage && bpPipe && bpHost && bpGov && bpWhy) {
        const state = { size: 'small', speed: 'batch', host: 'local' };

        const updateBlueprint = () => {
            // Format
            if (state.size === 'small') {
                bpFormat.textContent = 'Parquet veya temiz CSV / Feather';
            } else if (state.size === 'big') {
                bpFormat.textContent = 'Parquet / ORC (Sütun Bazlı)';
            } else {
                bpFormat.textContent = 'JSON (API) + PDF/Ham → Parquet';
            }

            // Depolama
            if (state.speed === 'stream') {
                bpStorage.textContent = state.size === 'mixed'
                    ? 'Kafka + MongoDB / TimescaleDB'
                    : 'TimescaleDB / InfluxDB + Lakehouse';
            } else if (state.size === 'small') {
                bpStorage.textContent = 'SQLite / DuckDB veya PostgreSQL';
            } else if (state.size === 'big') {
                bpStorage.textContent = state.host === 'local'
                    ? 'DuckDB / PostgreSQL (Parquet üzerinde)'
                    : 'Veri Ambarı veya Data Lakehouse';
            } else {
                bpStorage.textContent = 'Data Lake (Ham) + MongoDB / Lakehouse';
            }

            // Aktarım / Pipeline
            if (state.speed === 'stream') {
                bpPipe.textContent = 'Stream (Kafka) + ELT / Sürekli İşleme';
            } else if (state.size === 'small') {
                bpPipe.textContent = 'Periyodik Batch + ETL (Python / SQL)';
            } else {
                bpPipe.textContent = 'Zamanlanmış Batch + ELT (Schema-on-Read)';
            }

            // Barındırma
            if (state.host === 'local') {
                bpHost.textContent = 'Yerel (Local / Kurum İçi Sunucu)';
            } else if (state.host === 'cloud') {
                bpHost.textContent = 'Bulut (AWS / GCP / Azure)';
            } else {
                bpHost.textContent = 'Hibrit (Hassas Yerel + Analiz Bulut)';
            }

            // Yönetişim
            bpGov.textContent = state.size === 'small'
                ? 'Veri Sözlüğü + DVC / Git + 3-2-1 Yedek'
                : 'Otomatik Metadata Kataloğu + Lakehouse Time Travel + RBAC';

            // Açıklama
            const notes = [];
            if (state.size === 'small') {
                notes.push('Veri seti 100 MB altında olduğu için tek makinede SQLite/DuckDB ile Parquet kullanmak kurulum maliyetini sıfırlar ve yüksek hız verir.');
            } else if (state.size === 'big') {
                notes.push('10 GB üzeri analitik veride CSV yerine Sütun Bazlı Parquet seçmek depolamayı %80 küçültür ve ekonometri/ML sorgularını onlarca kat hızlandırır.');
            } else {
                notes.push('API JSON ve ham PDF verilerini önce kayıpsız şekilde Schema-on-Read (Data Lake / ELT) katmanına indirip ardından özellik çıkarımıyla tablolaştırmak en güvenilir yoldur.');
            }

            if (state.speed === 'stream') {
                notes.push('Anlık akış seçtiğin için Apache Kafka ile veriyi yakalayıp zaman serisi tabanlı (TSDB) bir depoya yönlendirmen gerekir.');
            }
            if (state.host === 'hybrid') {
                notes.push('KVKK kapsamındaki ham kimlik verileri kurum içinde kilitli kalırken, yalnızca maskelenmiş Parquet çıktıları bulut işlem gücüne çıkar.');
            }

            bpWhy.textContent = notes.join(' ');
        };

        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const dim = btn.getAttribute('data-dim');
                const val = btn.getAttribute('data-val');
                state[dim] = val;

                document.querySelectorAll(`.s6-pick-btn[data-dim="${dim}"]`).forEach((b) => {
                    b.classList.remove('is-active');
                });
                btn.classList.add('is-active');
                updateBlueprint();
            });
        });

        updateBlueprint();
    }
});
