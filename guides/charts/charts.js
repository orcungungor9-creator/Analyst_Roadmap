document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('chartSearch');
    const filterBtns = document.querySelectorAll('.charts-category-btn');
    const chartItems = document.querySelectorAll('.chart-item');
    const chartSections = document.querySelectorAll('.chart-section'); // For future sections

    // 1. Arama İşlevi
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Tüm kartları filtrele
            chartItems.forEach(item => {
                const title = item.getAttribute('data-title') || '';
                const textContent = item.textContent.toLowerCase();
                
                if (title.includes(searchTerm) || textContent.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Eğer bölüm içindeki tüm kartlar gizlendiyse başlığı da gizle (opsiyonel geliştirmeler için)
            chartSections.forEach(section => {
                const visibleCards = section.querySelectorAll('.chart-item[style="display: flex;"], .chart-item:not([style*="display: none"])');
                if (visibleCards.length === 0) {
                    section.style.display = 'none';
                } else {
                    section.style.display = 'block';
                }
            });
        });
    }

    // 2. Kategori Filtreleme (Butonlara Tıklama)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif butonu değiştir
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoryName = btn.textContent.trim();
            
            // Eğer "Tümü" gibi bir mantık eklenecekse burası genişletilebilir.
            // Şimdilik, sadece tıklanan kategori ile eşleşen bölümü göstereceğiz.
            
            chartSections.forEach(section => {
                // Burada data-category özelliği ile kontrol yapıyoruz
                const sectionCat = section.getAttribute('data-category');
                
                // Eğer bölümün kategorisi tıklanan butona eşitse göster
                if (sectionCat === categoryName) {
                    section.style.display = 'block';
                } else if (sectionCat) {
                    // Eşleşmiyorsa gizle (Diğer kategorileri eklediğimizde çalışır)
                    // Şimdilik sadece Sıralama Grafikleri olduğu için, diğerleri eklenince çalışacak.
                    // section.style.display = 'none'; 
                }
            });
            
            // Filtre tıklandığında aramayı sıfırla
            if(searchInput) {
                searchInput.value = '';
                chartItems.forEach(item => item.style.display = 'flex');
            }
        });
    });

    // ==========================================
    // 3. ECHARTS İLE GRAFİK ÖNİZLEMELERİNİ ÇİZME
    // ==========================================
    if (typeof echarts !== 'undefined') {
        const commonOptions = {
            animation: false, // Performans için küçük önizlemelerde animasyon kapalı
            tooltip: { show: false },
            grid: { left: 5, right: 5, top: 5, bottom: 5 }
        };

        const renderChart = (id, option) => {
            const el = document.getElementById(id);
            if (el) {
                const chart = echarts.init(el);
                chart.setOption(Object.assign({}, commonOptions, option));
                // Responsive davranış
                window.addEventListener('resize', () => chart.resize());
            }
        };

        // 1. Bar / Sütun Grafiği
        renderChart('preview-bar', {
            xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'], show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                data: [120, 200, 150, 80, 70],
                type: 'bar',
                itemStyle: { color: '#38bdf8', borderRadius: [4, 4, 0, 0] }
            }]
        });

        // 2. Gruplu / Yığılmış Bar
        renderChart('preview-grouped-bar', {
            xAxis: { type: 'category', data: ['X', 'Y', 'Z'], show: false },
            yAxis: { type: 'value', show: false },
            series: [
                { data: [120, 132, 101], type: 'bar', itemStyle: { color: '#38bdf8' }, barGap: '20%' },
                { data: [220, 182, 191], type: 'bar', itemStyle: { color: '#34d399' } }
            ]
        });

        // 3. Radar Grafiği
        renderChart('preview-radar', {
            radar: {
                indicator: [
                    { name: '', max: 100 }, { name: '', max: 100 }, { name: '', max: 100 },
                    { name: '', max: 100 }, { name: '', max: 100 }, { name: '', max: 100 }
                ],
                splitArea: { show: false },
                axisLine: { lineStyle: { color: 'rgba(192, 132, 252, 0.3)' } },
                splitLine: { lineStyle: { color: 'rgba(192, 132, 252, 0.3)', type: 'dashed' } }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [60, 73, 85, 40, 90, 50],
                    areaStyle: { color: 'rgba(192, 132, 252, 0.4)' },
                    lineStyle: { color: '#c084fc', width: 2 },
                    itemStyle: { color: '#c084fc' }
                }]
            }]
        });

        // 4. Lollipop Grafiği (Bar + Scatter)
        renderChart('preview-lollipop', {
            grid: { left: 10, right: 10, top: 15, bottom: 10 },
            xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'], show: false },
            yAxis: { type: 'value', show: false },
            series: [
                {
                    type: 'bar',
                    data: [80, 50, 95, 35],
                    barWidth: 3,
                    itemStyle: { color: '#cbd5e1' } // Görünür sağlam bir gri çubuk
                },
                {
                    type: 'scatter',
                    data: [80, 50, 95, 35],
                    symbolSize: 16,
                    itemStyle: {
                        color: function(params) {
                            var colors = ['#38bdf8', '#c084fc', '#34d399', '#fbbf24'];
                            return colors[params.dataIndex];
                        }
                    }
                }
            ]
        });

        // 5. Kurşun Grafiği (Bullet)
        renderChart('preview-bullet', {
            grid: { left: 10, right: 10, top: 30, bottom: 30 },
            xAxis: { type: 'value', show: false, max: 100 },
            yAxis: { type: 'category', data: ['Metrik'], show: false },
            series: [
                // Arka plan performans aralıkları (Kötü, Orta, İyi)
                { type: 'bar', data: [100], barWidth: 26, itemStyle: { color: '#f1f5f9' }, barGap: '-100%', animation: false },
                { type: 'bar', data: [75], barWidth: 26, itemStyle: { color: '#e2e8f0' }, barGap: '-100%', animation: false },
                { type: 'bar', data: [45], barWidth: 26, itemStyle: { color: '#cbd5e1' }, barGap: '-100%', animation: false },
                // İç Bar (Gerçekleşen Değer)
                { type: 'bar', data: [65], barWidth: 10, itemStyle: { color: '#38bdf8' }, barGap: '-100%', z: 10 },
                // Hedef Çizgisi (Target Marker)
                { type: 'scatter', data: [[85, 0]], symbol: 'rect', symbolSize: [5, 36], itemStyle: { color: '#1e293b' }, z: 20 }
            ]
        });

        // 6. Eğim Grafiği (Slope)
        renderChart('preview-slope', {
            grid: { left: 25, right: 25, top: 20, bottom: 20 },
            xAxis: { 
                type: 'category', 
                data: ['2023', '2024'], 
                boundaryGap: false, 
                show: true,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#94a3b8', fontWeight: '600', margin: 4 },
                splitLine: { show: true, lineStyle: { color: '#e2e8f0', width: 2 } }
            },
            yAxis: { type: 'value', show: false },
            series: [
                {
                    type: 'line', data: [85, 30], symbolSize: 10,
                    lineStyle: { width: 3, color: '#f43f5e' }, itemStyle: { color: '#f43f5e' }
                },
                {
                    type: 'line', data: [40, 75], symbolSize: 10,
                    lineStyle: { width: 3, color: '#38bdf8' }, itemStyle: { color: '#38bdf8' }
                },
                {
                    type: 'line', data: [55, 60], symbolSize: 10,
                    lineStyle: { width: 3, color: '#34d399' }, itemStyle: { color: '#34d399' }
                }
            ]
        });

        // 7. Paralel Koordinatlar
        renderChart('preview-parallel', {
            parallelAxis: [
                { dim: 0, name: '' },
                { dim: 1, name: '' },
                { dim: 2, name: '' }
            ],
            parallel: { left: 10, right: 10, top: 10, bottom: 10, axisExpandable: false },
            series: {
                type: 'parallel',
                lineStyle: { width: 2, opacity: 0.7 },
                data: [
                    [1, 5, 3],
                    [2, 3, 6],
                    [4, 2, 4]
                ],
                // ECharts parallel doesn't easily support color per line via itemStyle in basic setup
                // We'll apply a single solid color that looks good for preview
                color: ['#38bdf8', '#c084fc', '#34d399'] 
            }
        });

        // 8. Gösterge Grafiği (Gauge)
        renderChart('preview-gauge', {
            series: [
                {
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    center: ['50%', '80%'],
                    radius: '100%',
                    min: 0,
                    max: 100,
                    splitNumber: 1,
                    axisLine: {
                        lineStyle: {
                            width: 15,
                            color: [
                                [0.3, '#f87171'],
                                [0.7, '#fbbf24'],
                                [1, '#34d399']
                            ]
                        }
                    },
                    pointer: {
                        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        length: '70%',
                        width: 10,
                        offsetCenter: [0, '-10%'],
                        itemStyle: { color: 'auto' } // ibre rengi alan rengine uyar
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    title: { show: false },
                    detail: { show: false },
                    data: [{ value: 65 }]
                }
            ]
        });
    }
});
