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
                    // Eşleşmiyorsa gizle
                    section.style.display = 'none'; 
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
    // 3. ECHARTS İLE GRAFİK ÖNİZLEMELERİNİ ÇİZME (RESIZEOBSERVER)
    // ==========================================
    if (typeof echarts !== 'undefined') {
        const commonOptions = {
            animation: false, // Performans için küçük önizlemelerde animasyon kapalı
            tooltip: { show: false },
            grid: { left: 5, right: 5, top: 5, bottom: 5 }
        };

        const renderChart = (id, option) => {
            const el = document.getElementById(id);
            if (!el || el.getAttribute('_echarts_instance_')) return;
            
            const chart = echarts.init(el);
            chart.setOption(Object.assign({}, commonOptions, option));
            
            // ÇÖZÜM 2: ResizeObserver ile tam otomatik boyutlandırma
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver(() => {
                    chart.resize();
                });
                resizeObserver.observe(el);
            } else {
                window.addEventListener('resize', () => chart.resize());
            }
        };

        // KATEGORİ 1: SIRALAMA GRAFİKLERİ
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
                        itemStyle: { color: '#cbd5e1' }
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
                    { type: 'bar', data: [100], barWidth: 26, itemStyle: { color: '#f1f5f9' }, barGap: '-100%', animation: false },
                    { type: 'bar', data: [75], barWidth: 26, itemStyle: { color: '#e2e8f0' }, barGap: '-100%', animation: false },
                    { type: 'bar', data: [45], barWidth: 26, itemStyle: { color: '#cbd5e1' }, barGap: '-100%', animation: false },
                    { type: 'bar', data: [65], barWidth: 10, itemStyle: { color: '#38bdf8' }, barGap: '-100%', z: 10 },
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
                        min: 0, max: 100,
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
                            itemStyle: { color: 'auto' } 
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

        // ------------------------------------------
        // KATEGORİ 2: ZAMAN İÇİNDEKİ DEĞİŞİM (TREND)
        // ------------------------------------------
        
            // 1. Çizgi Grafiği
            renderChart('preview-line', {
                grid: { left: 15, right: 15, top: 25, bottom: 25 },
                xAxis: { type: 'category', data: ['O', 'Ş', 'M', 'N', 'M', 'H'], show: false },
                yAxis: { type: 'value', show: false },
                series: [{ 
                    data: [15, 30, 22, 45, 35, 60], 
                    type: 'line', 
                    smooth: true, 
                    symbolSize: 8,
                    itemStyle: { color: '#38bdf8' }, 
                    lineStyle: { width: 3 } 
                }]
            });

            // 2. Alan Grafiği
            renderChart('preview-area', {
                grid: { left: 10, right: 10, top: 25, bottom: 25 },
                xAxis: { type: 'category', data: ['O', 'Ş', 'M', 'N', 'M', 'H'], boundaryGap: false, show: false },
                yAxis: { type: 'value', show: false },
                series: [{ 
                    data: [15, 30, 22, 45, 35, 60], 
                    type: 'line', 
                    smooth: true, 
                    showSymbol: false,
                    itemStyle: { color: '#c084fc' }, 
                    lineStyle: { width: 2 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(192,132,252,0.6)' },
                            { offset: 1, color: 'rgba(192,132,252,0.05)' }
                        ])
                    }
                }]
            });

            // 3. Mum Grafiği
            renderChart('preview-candlestick', {
                grid: { left: 15, right: 15, top: 15, bottom: 15 },
                xAxis: { type: 'category', data: ['1', '2', '3', '4', '5'], show: false },
                yAxis: { type: 'value', show: false, scale: true },
                series: [{
                    type: 'candlestick',
                    data: [
                        [20, 34, 10, 38],
                        [40, 35, 30, 50],
                        [31, 38, 33, 44],
                        [38, 15, 5, 42],
                        [15, 25, 10, 30]
                    ],
                    itemStyle: { 
                        color: '#34d399', color0: '#f43f5e', 
                        borderColor: '#34d399', borderColor0: '#f43f5e',
                        borderWidth: 2
                    }
                }]
            });

            // 4. Otokorelasyon (Correlogram)
            renderChart('preview-autocorr', {
                grid: { left: 15, right: 15, top: 20, bottom: 20 },
                xAxis: { 
                    type: 'category', data: ['1','2','3','4','5','6','7','8'], 
                    axisTick: {show: false}, axisLabel: {show: false}, 
                    axisLine: {lineStyle:{color:'#94a3b8'}} 
                },
                yAxis: { type: 'value', show: false },
                series: [
                    {
                        type: 'bar',
                        barWidth: 6,
                        itemStyle: { color: '#38bdf8', borderRadius: 2 },
                        data: [1, 0.8, 0.4, 0.1, -0.3, -0.6, -0.2, 0.3]
                    },
                    // Güven aralıkları (Confidence bands)
                    { type: 'line', data: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35], symbol: 'none', lineStyle: {type: 'dashed', color: '#cbd5e1', width: 2} },
                    { type: 'line', data: [-0.35, -0.35, -0.35, -0.35, -0.35, -0.35, -0.35, -0.35], symbol: 'none', lineStyle: {type: 'dashed', color: '#cbd5e1', width: 2} }
                ]
            });

            // 5. Kıvılcım Çizgileri (Sparkline)
            renderChart('preview-sparkline', {
                grid: { left: 5, right: 5, top: 25, bottom: 25 },
                xAxis: { type: 'category', data: [1,2,3,4,5,6,7,8,9,10], show: false },
                yAxis: { type: 'value', show: false, scale: true },
                series: [{
                    data: [12, 14, 18, 15, 22, 28, 25, 30, 35, 32],
                    type: 'line',
                    smooth: false,
                    symbol: 'none',
                    lineStyle: { color: '#fbbf24', width: 3 },
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max', symbolSize: 24, itemStyle: {color: '#34d399'} }, 
                            { type: 'min', name: 'Min', symbolSize: 24, itemStyle: {color: '#f43f5e'} }
                        ],
                        label: { show: false }
                    }
                }]
            });

            // 6. Akış Grafiği (Streamgraph)
            renderChart('preview-stream', {
                grid: { left: 5, right: 5, top: 20, bottom: 20 },
                tooltip: { show: false },
                singleAxis: { type: 'time', show: false },
                series: [{
                    type: 'themeRiver',
                    data: [
                        ['2023-01-01', 15, 'A'], ['2023-01-02', 25, 'A'], ['2023-01-03', 20, 'A'], ['2023-01-04', 35, 'A'],
                        ['2023-01-01', 20, 'B'], ['2023-01-02', 15, 'B'], ['2023-01-03', 30, 'B'], ['2023-01-04', 10, 'B'],
                        ['2023-01-01', 5, 'C'], ['2023-01-02', 10, 'C'], ['2023-01-03', 15, 'C'], ['2023-01-04', 25, 'C']
                    ],
                    color: ['#c084fc', '#38bdf8', '#34d399']
                }]
            });

            // 7. Gantt Şeması
            renderChart('preview-gantt', {
                grid: { left: 15, right: 15, top: 20, bottom: 20 },
                xAxis: { type: 'value', show: false, max: 100 },
                yAxis: { type: 'category', data: ['3', '2', '1'], show: false },
                series: [
                    {
                        type: 'bar',
                        stack: 'total',
                        itemStyle: { color: 'rgba(0,0,0,0)' },
                        data: [60, 30, 10] // Başlangıç noktaları (alttan üste)
                    },
                    {
                        type: 'bar',
                        stack: 'total',
                        barWidth: 16,
                        itemStyle: { borderRadius: 4, color: function(params) {
                            return ['#34d399', '#c084fc', '#38bdf8'][params.dataIndex];
                        }},
                        data: [35, 40, 30] // Süreler
                    }
                ]
            });

            // 8. Gecikme Grafiği (Lag Plot)
            renderChart('preview-lag', {
                grid: { left: 20, right: 20, top: 20, bottom: 20 },
                xAxis: { type: 'value', show: false, scale: true },
                yAxis: { type: 'value', show: false, scale: true },
                series: [{
                    type: 'scatter',
                    symbolSize: 10,
                    itemStyle: { color: 'rgba(56,189,248,0.7)' },
                    data: [
                        [1,2], [1.5, 2.5], [2, 1.8], [2.2, 3], [3, 2.5], [3.5, 3.2], 
                        [4, 4.5], [4.2, 3.8], [4.8, 5], [5.5, 4.9], [6, 6.2], [6.5, 5.8]
                    ]
                }]
            });

        // ------------------------------------------
        // KATEGORİ 3: İSTATİSTİKSEL DAĞILIM VE AYKIRILIKLAR
        // ------------------------------------------
        
        // 1. Histogram
        renderChart('preview-hist', {
            grid: { left: 15, right: 15, top: 20, bottom: 20 },
            xAxis: { type: 'category', data: ['1','2','3','4','5','6','7'], show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                type: 'bar',
                barWidth: '99.5%',
                data: [5, 12, 25, 40, 22, 10, 4],
                itemStyle: { color: '#c084fc', borderColor: '#fff', borderWidth: 1 }
            }]
        });

        // 2. Kutu Grafiği (Box Plot)
        renderChart('preview-box', {
            grid: { left: 20, right: 20, top: 20, bottom: 20 },
            xAxis: { type: 'category', data: ['A', 'B', 'C'], show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                type: 'boxplot',
                data: [
                    [10, 20, 30, 45, 60],
                    [5, 15, 25, 35, 50],
                    [15, 25, 35, 50, 70]
                ],
                itemStyle: { color: 'rgba(56,189,248,0.3)', borderColor: '#38bdf8', borderWidth: 2 }
            }]
        });

        // 3. Violin Grafiği (Simülasyon)
        renderChart('preview-violin', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: -30, max: 30 },
            yAxis: { type: 'category', show: false, data: ['1','2','3','4','5','6','7','8','9'] },
            series: [
                // Sağ yarı (Pozitif alan)
                {
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 1.5, color: '#34d399' },
                    areaStyle: { color: 'rgba(52,211,153,0.5)' },
                    data: [0, 2, 8, 15, 25, 20, 10, 3, 0]
                },
                // Sol yarı (Negatif alan)
                {
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 1.5, color: '#34d399' },
                    areaStyle: { color: 'rgba(52,211,153,0.5)' },
                    data: [0, -2, -8, -15, -25, -20, -10, -3, 0]
                },
                // Merkezdeki kalın siyah çizgi (Çeyreklik açıklık - IQR)
                {
                    type: 'line',
                    symbol: 'none',
                    lineStyle: { width: 6, color: '#1e293b', cap: 'round' },
                    data: [null, null, 0, 0, 0, 0, null, null, null],
                    z: 3
                },
                // İnce sap çizgisi
                {
                    type: 'line',
                    symbol: 'none',
                    lineStyle: { width: 2, color: '#1e293b' },
                    data: [null, 0, 0, 0, 0, 0, 0, 0, null],
                    z: 2
                },
                // Medyan beyaz noktası
                {
                    type: 'scatter',
                    symbolSize: 6,
                    itemStyle: { color: '#ffffff' },
                    data: [null, null, null, null, 0, null, null, null, null],
                    z: 4
                }
            ]
        });

        // 4. Sırt Hattı Grafiği (Ridgeline)
        renderChart('preview-ridge', {
            grid: { left: 10, right: 10, top: 15, bottom: 15 },
            xAxis: { type: 'category', data: ['1','2','3','4','5','6','7','8'], show: false },
            yAxis: { type: 'value', show: false, max: 70 },
            series: [
                { type: 'line', smooth: true, symbol: 'none', areaStyle: { color: 'rgba(244,63,94,0.7)' }, lineStyle: { color: '#fff', width: 1 }, data: [5, 15, 35, 20, 10, 5, 2, 0], z: 3 },
                { type: 'line', smooth: true, symbol: 'none', areaStyle: { color: 'rgba(56,189,248,0.7)' }, lineStyle: { color: '#fff', width: 1 }, data: [15, 25, 45, 30, 20, 15, 12, 10], z: 2 },
                { type: 'line', smooth: true, symbol: 'none', areaStyle: { color: 'rgba(192,132,252,0.7)' }, lineStyle: { color: '#fff', width: 1 }, data: [25, 35, 55, 40, 30, 25, 22, 20], z: 1 }
            ]
        });

        // 5. Q-Q Grafiği
        renderChart('preview-qq', {
            grid: { left: 15, right: 15, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false, scale: true },
            yAxis: { type: 'value', show: false, scale: true },
            series: [
                {
                    type: 'scatter',
                    symbolSize: 6,
                    itemStyle: { color: '#fbbf24' },
                    data: [[1,1.2], [2,1.9], [3,3.1], [4,3.8], [5,5.2], [6,6.1], [7,6.8]]
                },
                {
                    type: 'line',
                    symbol: 'none',
                    lineStyle: { type: 'dashed', color: '#94a3b8', width: 2 },
                    data: [[1,1], [7,7]]
                }
            ]
        });

        // 6. Arı Sürüsü (Beeswarm)
        renderChart('preview-beeswarm', {
            grid: { left: 15, right: 15, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false, min: -10, max: 10 },
            series: [{
                type: 'scatter',
                symbolSize: 8,
                itemStyle: { color: '#38bdf8' },
                data: [
                    [1, 0], [1.5, 2], [1.5, -2], 
                    [2, 4], [2, 0], [2, -4],
                    [2.5, 6], [2.5, 2], [2.5, -2], [2.5, -6],
                    [3, 8], [3, 4], [3, 0], [3, -4], [3, -8],
                    [3.5, 6], [3.5, 2], [3.5, -2], [3.5, -6],
                    [4, 4], [4, 0], [4, -4],
                    [4.5, 2], [4.5, -2], [5, 0]
                ]
            }]
        });

        // 7. Marjinal Yoğunluk Grafiği
        renderChart('preview-marginal', {
            grid: [
                { left: '10%', right: '20%', top: '20%', bottom: '10%' }, // Scatter
                { left: '10%', right: '20%', top: '5%', bottom: '82%' },  // Top Hist
                { left: '82%', right: '5%', top: '20%', bottom: '10%' }   // Right Hist
            ],
            xAxis: [
                { gridIndex: 0, type: 'value', show: false, scale: true },
                { gridIndex: 1, type: 'category', show: false },
                { gridIndex: 2, type: 'value', show: false }
            ],
            yAxis: [
                { gridIndex: 0, type: 'value', show: false, scale: true },
                { gridIndex: 1, type: 'value', show: false },
                { gridIndex: 2, type: 'category', show: false }
            ],
            series: [
                { type: 'scatter', xAxisIndex: 0, yAxisIndex: 0, symbolSize: 6, itemStyle: { color: '#c084fc' }, data: [[2,2],[3,4],[4,3],[5,5],[6,4],[7,6],[8,5]] },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1, barWidth: '100%', itemStyle: { color: 'rgba(192,132,252,0.5)' }, data: [1,2,3,4,3,2,1] },
                { type: 'bar', xAxisIndex: 2, yAxisIndex: 2, barWidth: '100%', itemStyle: { color: 'rgba(192,132,252,0.5)' }, data: [1,2,3,4,3,2,1] }
            ]
        });

        // 8. ECDF (Kümülatif Dağılım)
        renderChart('preview-ecdf', {
            grid: { left: 15, right: 15, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false, min: 0, max: 1 },
            series: [{
                type: 'line',
                step: 'end',
                symbolSize: 6,
                itemStyle: { color: '#34d399' },
                lineStyle: { width: 3 },
                data: [
                    [1, 0.1], [2, 0.25], [3, 0.45], [4, 0.65], [5, 0.85], [6, 1]
                ]
            }]
        });

    }
});
