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

            // Seçilen kategori başlığına pürüzsüz (smooth) şekilde kaydır
            const activeSection = Array.from(chartSections).find(sec => sec.getAttribute('data-category') === categoryName);
            if (activeSection) {
                const navHeight = 90; // Üstteki sabit menü için boşluk payı
                const sectionTop = activeSection.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
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

        // ------------------------------------------
        // KATEGORİ 4: İLİŞKİ GRAFİKLERİ
        // ------------------------------------------

        // 1. Scatter Plot
        renderChart('preview-scatter', {
            grid: { left: 15, right: 15, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                type: 'scatter',
                symbolSize: 8,
                itemStyle: { color: '#38bdf8', opacity: 0.8 },
                data: [
                    [10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33],
                    [14, 9.96], [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82], [5, 5.68]
                ]
            }]
        });

        // 2. Bubble Chart
        renderChart('preview-bubble', {
            grid: { left: 15, right: 15, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false },
            series: [{
                type: 'scatter',
                itemStyle: { color: 'rgba(52,211,153,0.7)', borderColor: '#34d399', borderWidth: 1 },
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) * 4;
                },
                data: [
                    [10, 8, 10], [8, 5, 25], [13, 9, 15], [9, 7, 40], [11, 8, 20],
                    [14, 11, 35], [6, 5, 10], [4, 3, 50], [12, 10, 30], [7, 6, 12]
                ]
            }]
        });

        // 3. Heatmap
        renderChart('preview-heatmap', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'category', data: ['A','B','C','D'], show: false },
            yAxis: { type: 'category', data: ['1','2','3','4'], show: false },
            visualMap: { show: false, min: 0, max: 10, inRange: { color: ['#f1f5f9', '#c084fc', '#7e22ce'] } },
            series: [{
                type: 'heatmap',
                data: [
                    [0,0,2],[0,1,5],[0,2,8],[0,3,3],
                    [1,0,6],[1,1,1],[1,2,9],[1,3,4],
                    [2,0,9],[2,1,7],[2,2,2],[2,3,6],
                    [3,0,4],[3,1,3],[3,2,5],[3,3,10]
                ],
                itemStyle: { borderColor: '#fff', borderWidth: 2 }
            }]
        });

        // 4. Korelasyon Matrisi (Correlogram)
        renderChart('preview-corr-matrix', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'category', data: ['V1','V2','V3','V4'], show: false },
            yAxis: { type: 'category', data: ['V1','V2','V3','V4'], show: false },
            visualMap: { show: false, min: -1, max: 1, inRange: { color: ['#f43f5e', '#f1f5f9', '#38bdf8'] } },
            series: [{
                type: 'heatmap',
                data: [
                    [0,0,1], [0,1,0.8], [0,2,-0.5], [0,3,0.2],
                    [1,0,0.8], [1,1,1], [1,2,-0.7], [1,3,0.4],
                    [2,0,-0.5], [2,1,-0.7], [2,2,1], [2,3,-0.1],
                    [3,0,0.2], [3,1,0.4], [3,2,-0.1], [3,3,1]
                ],
                itemStyle: { borderColor: '#fff', borderWidth: 2 }
            }]
        });

        // 5. Hexbin Plot
        renderChart('preview-hexbin', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false },
            visualMap: { show: false, min: 0, max: 10, inRange: { color: ['#e0f2fe', '#0ea5e9'] } },
            series: [{
                type: 'scatter',
                symbol: 'path://M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z', // Hexagon SVG
                symbolSize: 18,
                itemStyle: { borderColor: '#fff', borderWidth: 1 },
                data: [
                    // Simulated hex grid coordinates [x, y, count]
                    [10, 17, 2], [25, 17, 5], [40, 17, 3],
                    [17.5, 30, 8], [32.5, 30, 10],
                    [10, 43, 4], [25, 43, 9], [40, 43, 6],
                    [17.5, 56, 7], [32.5, 56, 3]
                ]
            }]
        });

        // 6. Network Graph
        renderChart('preview-network', {
            series: [{
                type: 'graph',
                layout: 'force',
                roam: false,
                force: { repulsion: 100, edgeLength: 30, layoutAnimation: false },
                itemStyle: { color: '#fbbf24', borderColor: '#fff', borderWidth: 2 },
                lineStyle: { color: '#cbd5e1', width: 2 },
                data: [
                    { id: '0', symbolSize: 15 }, { id: '1', symbolSize: 10 }, 
                    { id: '2', symbolSize: 20 }, { id: '3', symbolSize: 12 }, 
                    { id: '4', symbolSize: 18 }, { id: '5', symbolSize: 8 }
                ],
                edges: [
                    { source: '0', target: '1' }, { source: '0', target: '2' },
                    { source: '1', target: '3' }, { source: '2', target: '3' },
                    { source: '2', target: '4' }, { source: '4', target: '5' },
                    { source: '0', target: '4' }
                ]
            }]
        });

        // 7. Chord Diagram (Simulated with Circular Graph)
        renderChart('preview-chord', {
            series: [{
                type: 'graph',
                layout: 'circular',
                symbolSize: 0, // Düğümleri gizle
                circular: { rotateLabel: true },
                lineStyle: { color: 'source', curveness: 0.4, opacity: 0.7, width: 4 },
                data: [
                    { name: 'A', itemStyle: { color: '#38bdf8' } },
                    { name: 'B', itemStyle: { color: '#34d399' } },
                    { name: 'C', itemStyle: { color: '#c084fc' } },
                    { name: 'D', itemStyle: { color: '#fbbf24' } }
                ],
                edges: [
                    { source: 'A', target: 'B', lineStyle: { width: 8 } },
                    { source: 'A', target: 'C', lineStyle: { width: 4 } },
                    { source: 'B', target: 'D', lineStyle: { width: 6 } },
                    { source: 'C', target: 'D', lineStyle: { width: 3 } },
                    { source: 'D', target: 'A', lineStyle: { width: 5 } },
                    { source: 'B', target: 'A', lineStyle: { width: 2 } }
                ]
            }]
        });

        // 8. Scatter Matrix (Pairs Plot)
        renderChart('preview-pairs', {
            grid: [
                { left: '5%', right: '55%', top: '5%', bottom: '55%' },   // Top-Left
                { left: '55%', right: '5%', top: '5%', bottom: '55%' },   // Top-Right
                { left: '5%', right: '55%', top: '55%', bottom: '5%' },   // Bottom-Left
                { left: '55%', right: '5%', top: '55%', bottom: '5%' }    // Bottom-Right
            ],
            xAxis: [
                { gridIndex: 0, show: false }, { gridIndex: 1, show: false },
                { gridIndex: 2, show: false }, { gridIndex: 3, show: false }
            ],
            yAxis: [
                { gridIndex: 0, show: false }, { gridIndex: 1, show: false },
                { gridIndex: 2, show: false }, { gridIndex: 3, show: false }
            ],
            series: [
                // Top-Left: V1 vs V1 (Distribution/Histogram simulated with bar)
                { type: 'bar', xAxisIndex: 0, yAxisIndex: 0, itemStyle: { color: '#cbd5e1' }, data: [[1,2],[2,5],[3,3],[4,1]] },
                // Top-Right: V1 vs V2 (Scatter)
                { type: 'scatter', xAxisIndex: 1, yAxisIndex: 1, symbolSize: 4, itemStyle: { color: '#38bdf8' }, data: [[1,4],[2,3],[3,2],[4,1],[1.5,3.5],[2.5,2.5]] },
                // Bottom-Left: V2 vs V1 (Scatter)
                { type: 'scatter', xAxisIndex: 2, yAxisIndex: 2, symbolSize: 4, itemStyle: { color: '#34d399' }, data: [[4,1],[3,2],[2,3],[1,4],[3.5,1.5],[2.5,2.5]] },
                // Bottom-Right: V2 vs V2 (Distribution/Histogram)
                { type: 'bar', xAxisIndex: 3, yAxisIndex: 3, itemStyle: { color: '#cbd5e1' }, data: [[1,1],[2,4],[3,4],[4,2]] }
            ]
        });

        // ------------------------------------------
        // KATEGORİ 5: PARÇA-BÜTÜN GRAFİKLERİ
        // ------------------------------------------

        // 1. Pasta Grafiği
        renderChart('preview-pie', {
            series: [{
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                itemStyle: { borderColor: '#fff', borderWidth: 2 },
                label: { show: false },
                data: [
                    { value: 40, name: 'A', itemStyle: { color: '#38bdf8' } },
                    { value: 30, name: 'B', itemStyle: { color: '#34d399' } },
                    { value: 20, name: 'C', itemStyle: { color: '#c084fc' } },
                    { value: 10, name: 'D', itemStyle: { color: '#fbbf24' } }
                ]
            }]
        });

        // 2. Halka Grafiği (Donut)
        renderChart('preview-donut', {
            series: [{
                type: 'pie',
                radius: ['45%', '75%'],
                center: ['50%', '50%'],
                itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 5 },
                label: { show: false },
                data: [
                    { value: 45, name: 'A', itemStyle: { color: '#c084fc' } },
                    { value: 25, name: 'B', itemStyle: { color: '#38bdf8' } },
                    { value: 20, name: 'C', itemStyle: { color: '#f43f5e' } },
                    { value: 10, name: 'D', itemStyle: { color: '#fbbf24' } }
                ]
            }],
            graphic: {
                type: 'text',
                left: 'center',
                top: 'center',
                style: { text: '100%', fontSize: 20, fontWeight: 'bold', fill: '#1e293b' }
            }
        });

        // 3. Treemap
        renderChart('preview-treemap', {
            series: [{
                type: 'treemap',
                roam: false,
                nodeClick: false,
                breadcrumb: { show: false },
                itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2 },
                data: [
                    { name: 'A', value: 40, itemStyle: { color: '#38bdf8' } },
                    { name: 'B', value: 30, itemStyle: { color: '#34d399' } },
                    { name: 'C', value: 20, itemStyle: { color: '#c084fc' } },
                    { name: 'D', value: 10, itemStyle: { color: '#fbbf24' } }
                ]
            }]
        });

        // 4. Waterfall Chart
        renderChart('preview-waterfall', {
            grid: { left: 10, right: 10, top: 15, bottom: 20 },
            xAxis: { type: 'category', data: ['Baş', 'Gelir', 'Gider', 'Son'], show: false },
            yAxis: { type: 'value', show: false },
            series: [
                {
                    type: 'bar', stack: 'total',
                    itemStyle: { borderColor: 'transparent', color: 'transparent' },
                    data: [0, 100, 70, 0] // Görünmez destek sütunları
                },
                {
                    type: 'bar', stack: 'total',
                    label: { show: true, position: 'top', formatter: '{c}', fontSize: 10 },
                    data: [
                        { value: 100, itemStyle: { color: '#94a3b8' } }, // Başlangıç
                        { value: 40, itemStyle: { color: '#34d399' } },  // Gelir (Artış)
                        { value: 70, itemStyle: { color: '#f43f5e' } },  // Gider (Düşüş)
                        { value: 70, itemStyle: { color: '#94a3b8' } }   // Sonuç
                    ]
                }
            ]
        });

        // 5. Sunburst Chart
        renderChart('preview-sunburst', {
            series: [{
                type: 'sunburst',
                center: ['50%', '50%'],
                radius: ['20%', '80%'],
                itemStyle: { borderColor: '#fff', borderWidth: 1 },
                label: { show: false },
                data: [
                    {
                        name: 'A', itemStyle: { color: '#38bdf8' },
                        children: [{ value: 20, itemStyle: { color: '#7dd3fc' } }, { value: 10, itemStyle: { color: '#bae6fd' } }]
                    },
                    {
                        name: 'B', itemStyle: { color: '#c084fc' },
                        children: [{ value: 15, itemStyle: { color: '#d8b4fe' } }, { value: 25, itemStyle: { color: '#e9d5ff' } }]
                    },
                    { name: 'C', value: 20, itemStyle: { color: '#34d399' } }
                ]
            }]
        });

        // 6. %100 Yığılmış Bar Grafiği
        renderChart('preview-100-stacked', {
            grid: { left: 10, right: 10, top: 15, bottom: 15 },
            xAxis: { type: 'value', show: false, max: 100 },
            yAxis: { type: 'category', data: ['X', 'Y', 'Z'], show: false },
            series: [
                {
                    type: 'bar', stack: 'total', barWidth: '50%',
                    itemStyle: { color: '#38bdf8' },
                    data: [40, 30, 20]
                },
                {
                    type: 'bar', stack: 'total', barWidth: '50%',
                    itemStyle: { color: '#34d399' },
                    data: [35, 50, 40]
                },
                {
                    type: 'bar', stack: 'total', barWidth: '50%',
                    itemStyle: { color: '#c084fc' },
                    data: [25, 20, 40]
                }
            ]
        });

        // 7. Waffle Chart (Scatter grid ile simülasyon)
        const waffleData = Array.from({length: 100}, (_, i) => [
            i % 10, // X 
            Math.floor(i / 10), // Y
            i < 65 ? 1 : 0 // %65'i dolu
        ]);
        
        renderChart('preview-waffle', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: -0.5, max: 9.5 },
            yAxis: { type: 'value', show: false, min: -0.5, max: 9.5 },
            visualMap: { show: false, min: 0, max: 1, inRange: { color: ['#e2e8f0', '#38bdf8'] } },
            series: [{
                type: 'scatter',
                symbol: 'roundRect',
                symbolSize: 12,
                data: waffleData
            }]
        });

        // 8. Marimekko / Mozaik Chart (Treemap ile kare düzen simülasyonu)
        renderChart('preview-marimekko', {
            series: [{
                type: 'treemap',
                roam: false,
                nodeClick: false,
                breadcrumb: { show: false },
                itemStyle: { borderColor: '#fff', borderWidth: 2 },
                label: { show: false },
                // Marimekko hissi vermek için genişlik/yükseklik matrisi gibi yapılandırıldı
                data: [
                    { name: 'Sektör 1', value: 60, children: [
                        { name: 'Ürün A', value: 40, itemStyle: { color: '#38bdf8' } },
                        { name: 'Ürün B', value: 20, itemStyle: { color: '#7dd3fc' } }
                    ]},
                    { name: 'Sektör 2', value: 40, children: [
                        { name: 'Ürün A', value: 10, itemStyle: { color: '#34d399' } },
                        { name: 'Ürün B', value: 30, itemStyle: { color: '#6ee7b7' } }
                    ]}
                ]
            }]
        });

        // ------------------------------------------
        // KATEGORİ 6: AKIŞ GRAFİKLERİ
        // ------------------------------------------

        // 1. Sankey Diyagramı
        renderChart('preview-sankey', {
            series: [{
                type: 'sankey',
                layout: 'none',
                nodeAlign: 'left',
                data: [
                    { name: 'A', itemStyle: { color: '#38bdf8' } },
                    { name: 'B', itemStyle: { color: '#34d399' } },
                    { name: 'C', itemStyle: { color: '#c084fc' } },
                    { name: 'D', itemStyle: { color: '#fbbf24' } }
                ],
                links: [
                    { source: 'A', target: 'C', value: 5 },
                    { source: 'A', target: 'D', value: 3 },
                    { source: 'B', target: 'C', value: 2 },
                    { source: 'B', target: 'D', value: 6 }
                ],
                lineStyle: { color: 'source', curveness: 0.5, opacity: 0.4 }
            }]
        });

        // 2. Huni Grafiği (Funnel)
        renderChart('preview-funnel', {
            series: [{
                type: 'funnel',
                left: '10%', top: 10, bottom: 10, width: '80%',
                sort: 'descending',
                gap: 2,
                label: { show: false },
                itemStyle: { borderColor: '#fff', borderWidth: 1 },
                data: [
                    { value: 100, name: 'Ziyaret', itemStyle: { color: '#38bdf8' } },
                    { value: 75, name: 'Sepet', itemStyle: { color: '#34d399' } },
                    { value: 50, name: 'Ödeme', itemStyle: { color: '#fbbf24' } },
                    { value: 25, name: 'Satın Alma', itemStyle: { color: '#f43f5e' } }
                ]
            }]
        });

        // 3. Alüvyal Diyagram (Sankey 'justify' hizalaması ile)
        renderChart('preview-alluvial', {
            series: [{
                type: 'sankey',
                layout: 'none',
                nodeAlign: 'justify', // Alüvyal görünüm için sütunları iki uca yaslar
                data: [
                    { name: 'Grup 1 (Yıl 1)', itemStyle: { color: '#38bdf8' } },
                    { name: 'Grup 2 (Yıl 1)', itemStyle: { color: '#c084fc' } },
                    { name: 'A Sınıfı (Yıl 2)', itemStyle: { color: '#34d399' } },
                    { name: 'B Sınıfı (Yıl 2)', itemStyle: { color: '#f43f5e' } }
                ],
                links: [
                    { source: 'Grup 1 (Yıl 1)', target: 'A Sınıfı (Yıl 2)', value: 4 },
                    { source: 'Grup 1 (Yıl 1)', target: 'B Sınıfı (Yıl 2)', value: 2 },
                    { source: 'Grup 2 (Yıl 1)', target: 'A Sınıfı (Yıl 2)', value: 1 },
                    { source: 'Grup 2 (Yıl 1)', target: 'B Sınıfı (Yıl 2)', value: 5 }
                ],
                lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.5 }
            }]
        });

        // 4. Bağlantı Ağacı (Dendrogram)
        renderChart('preview-dendrogram', {
            series: [{
                type: 'tree',
                data: [{
                    name: 'Kök',
                    children: [
                        { name: 'A', children: [{ name: 'A1' }, { name: 'A2' }] },
                        { name: 'B', children: [{ name: 'B1' }, { name: 'B2' }] }
                    ]
                }],
                top: '5%', left: '10%', bottom: '5%', right: '15%',
                symbolSize: 8,
                label: { show: false },
                itemStyle: { color: '#38bdf8', borderColor: '#0284c7' },
                lineStyle: { color: '#cbd5e1', width: 2, curveness: 0.5 } // Kavisli kollar (Dendrogram özelliği)
            }]
        });

        // 5. Kümülatif Akış Diyagramı (CFD)
        renderChart('preview-cfd', {
            grid: { left: 10, right: 10, top: 15, bottom: 15 },
            xAxis: { type: 'category', data: ['Pzt','Sal','Çar','Per','Cum'], show: false },
            yAxis: { type: 'value', show: false },
            series: [
                { type: 'line', stack: 'Total', areaStyle: {}, symbol: 'none', itemStyle: { color: '#f43f5e' }, lineStyle: {width:0}, data: [20, 18, 15, 10, 5] }, // Yapılacaklar
                { type: 'line', stack: 'Total', areaStyle: {}, symbol: 'none', itemStyle: { color: '#fbbf24' }, lineStyle: {width:0}, data: [5, 10, 12, 8, 5] },  // Devam Eden
                { type: 'line', stack: 'Total', areaStyle: {}, symbol: 'none', itemStyle: { color: '#34d399' }, lineStyle: {width:0}, data: [5, 7, 13, 27, 35] }  // Biten
            ]
        });

        // 6. Akış Şeması (Flowchart - Özel Koordinatlı Graph)
        renderChart('preview-flowchart', {
            series: [{
                type: 'graph',
                layout: 'none',
                symbol: 'rect',
                symbolSize: [40, 20],
                itemStyle: { color: '#38bdf8', borderRadius: 4 },
                label: { show: false },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 8],
                lineStyle: { color: '#94a3b8', width: 2 },
                data: [
                    { id: '1', x: 50, y: 10 },  // Başla
                    { id: '2', x: 50, y: 40, symbol: 'diamond', symbolSize: [30, 30], itemStyle: { color: '#fbbf24' } }, // Koşul
                    { id: '3', x: 20, y: 70 },  // Hayır
                    { id: '4', x: 80, y: 70 },  // Evet
                    { id: '5', x: 50, y: 90, itemStyle: { color: '#f43f5e' } }   // Bitir
                ],
                edges: [
                    { source: '1', target: '2' },
                    { source: '2', target: '3' },
                    { source: '2', target: '4' },
                    { source: '3', target: '5' },
                    { source: '4', target: '5' }
                ]
            }]
        });

        // 7. Karar Ağacı (Decision Tree)
        renderChart('preview-decision', {
            series: [{
                type: 'tree',
                orient: 'TB', // Yukarıdan aşağıya (Top to Bottom)
                data: [{
                    name: 'Koşul 1',
                    children: [
                        { name: 'Evet', children: [{ name: 'Sonuç A' }, { name: 'Sonuç B' }] },
                        { name: 'Hayır', children: [{ name: 'Sonuç C' }, { name: 'Sonuç D' }] }
                    ]
                }],
                top: '15%', left: '10%', bottom: '15%', right: '10%',
                symbol: 'roundRect',
                symbolSize: [25, 15],
                label: { show: false },
                itemStyle: { color: '#10b981', borderColor: '#059669' },
                lineStyle: { color: '#cbd5e1', width: 2 },
                edgeShape: 'polyline' // Keskin köşeli kollar (Karar ağacı özelliği)
            }]
        });

        // 8. Durum Geçiş Diyagramı (State Transition)
        renderChart('preview-state', {
            series: [{
                type: 'graph',
                layout: 'circular',
                symbol: 'circle',
                symbolSize: 30,
                itemStyle: { color: '#c084fc', borderColor: '#9333ea', borderWidth: 2 },
                label: { show: true, color: '#fff', fontSize: 10, formatter: '{b}' },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 10],
                lineStyle: { color: '#94a3b8', width: 2, curveness: 0.2 },
                data: [
                    { id: '1', name: 'S1' },
                    { id: '2', name: 'S2' },
                    { id: '3', name: 'S3' }
                ],
                edges: [
                    { source: '1', target: '2' },
                    { source: '2', target: '3' },
                    { source: '3', target: '1' },
                    { source: '2', target: '1', lineStyle: { curveness: 0.4 } } // Geri dönüş oku
                ]
            }]
        });

        // ------------------------------------------
        // KATEGORİ 7: HARİTA GRAFİKLERİ (Geospatial Simülasyonları)
        // ------------------------------------------

        // 1. Koroplet Harita (Choropleth - Grid Simülasyonu)
        renderChart('preview-choropleth', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'category', show: false },
            yAxis: { type: 'category', show: false },
            visualMap: { show: false, min: 0, max: 100, inRange: { color: ['#e0f2fe', '#0369a1'] } },
            series: [{
                type: 'heatmap',
                itemStyle: { borderColor: '#fff', borderWidth: 2 },
                data: [
                    [1,3,20], [2,3,80], [3,3,50], [4,3,10],
                    [1,2,90], [2,2,40], [3,2,70], [4,2,30],
                    [2,1,60], [3,1,95],
                    [3,0,15]
                ] // Rastgele bir coğrafi sınır (harita) izlenimi veren bloklar
            }]
        });

        // 2. Nokta Yoğunluk Haritası (Dot Density)
        // Rastgele bir alanda (örneğin iki ana küme) noktalar oluşturalım
        const dotDensityData = [];
        for (let i = 0; i < 150; i++) {
            dotDensityData.push([
                Math.random() * 20 + 20 + (Math.random() > 0.5 ? 40 : 0), // İki küme
                Math.random() * 20 + 20 + (Math.random() > 0.5 ? 20 : -10)
            ]);
        }
        renderChart('preview-dot-density', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            series: [{
                type: 'scatter',
                symbolSize: 3,
                itemStyle: { color: '#f43f5e', opacity: 0.7 },
                data: dotDensityData
            }]
        });

        // 3. Kartogram (Cartogram)
        renderChart('preview-cartogram', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            visualMap: { show: false, min: 10, max: 50, inRange: { color: ['#d8b4fe', '#7e22ce'] } },
            series: [{
                type: 'scatter',
                symbol: 'roundRect',
                itemStyle: { borderColor: '#fff', borderWidth: 1 },
                symbolSize: function (val) { return val[2]; },
                data: [
                    [30, 70, 40], [50, 75, 20], [70, 65, 50],
                    [25, 45, 15], [50, 40, 45], [75, 45, 25],
                    [40, 15, 30], [60, 20, 35]
                ] // Şişirilmiş / Küçültülmüş bölgeler
            }]
        });

        // 4. Bağlantı Haritası (Flow Map)
        renderChart('preview-connection-map', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            series: [
                {
                    type: 'scatter',
                    symbolSize: 8,
                    itemStyle: { color: '#fbbf24' },
                    data: [[20, 50], [50, 80], [80, 40], [60, 20]] // Şehirler
                },
                {
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    lineStyle: { color: '#38bdf8', width: 2, curveness: 0.3, opacity: 0.6 },
                    effect: { show: false, symbol: 'arrow', symbolSize: 6, trailLength: 0 },
                    data: [
                        { coords: [[20, 50], [50, 80]] },
                        { coords: [[50, 80], [80, 40]] },
                        { coords: [[20, 50], [60, 20]] },
                        { coords: [[60, 20], [80, 40]] }
                    ]
                }
            ]
        });

        // 5. Oransal Sembol Haritası (Proportional Symbol)
        renderChart('preview-prop-symbol', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            series: [
                {
                    type: 'scatter', // Arka plan (kıta sınırları gibi)
                    symbol: 'polygon',
                    itemStyle: { color: '#f1f5f9' },
                    data: [/* Basit bir arka plan da eklenebilir, şimdilik sade tutuyoruz */]
                },
                {
                    type: 'scatter',
                    itemStyle: { color: 'rgba(52,211,153,0.6)', borderColor: '#10b981', borderWidth: 2 },
                    symbolSize: function(val) { return val[2]; },
                    data: [
                        [30, 60, 15], [50, 70, 40], [70, 50, 25],
                        [40, 30, 50], [70, 20, 10]
                    ]
                }
            ]
        });

        // 6. Coğrafi Isı Haritası (Spatial Heatmap)
        renderChart('preview-spatial-heatmap', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            series: [{
                type: 'custom',
                renderItem: function (params, api) {
                    return {
                        type: 'circle',
                        shape: { cx: api.coord([api.value(0), api.value(1)])[0], cy: api.coord([api.value(0), api.value(1)])[1], r: api.value(2) },
                        style: {
                            fill: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                                { offset: 0, color: 'rgba(244,63,94,1)' },
                                { offset: 0.5, color: 'rgba(251,191,36,0.6)' },
                                { offset: 1, color: 'rgba(56,189,248,0)' }
                            ])
                        }
                    };
                },
                data: [
                    [40, 60, 40], [60, 40, 50], [75, 70, 30], [30, 30, 35] // Isı merkezleri
                ]
            }]
        });

        // 7. Altıgen Kutu Haritası (Hexbin Map)
        renderChart('preview-hexbin-map', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false },
            yAxis: { type: 'value', show: false },
            visualMap: { show: false, min: 0, max: 10, inRange: { color: ['#dcfce7', '#16a34a'] } },
            series: [{
                type: 'scatter',
                symbol: 'path://M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z',
                symbolSize: 16,
                itemStyle: { borderColor: '#fff', borderWidth: 1 },
                data: [
                    // Coğrafi bir bölge (harita) şeklini andıran petek dizilimi
                    [20, 20, 2], [35, 20, 8], [50, 20, 6],
                    [27.5, 33, 4], [42.5, 33, 10], [57.5, 33, 5],
                    [20, 46, 3], [35, 46, 9], [50, 46, 7], [65, 46, 2],
                    [27.5, 59, 1], [42.5, 59, 4], [57.5, 59, 3]
                ]
            }]
        });

        // 8. İzolin / Kontur Haritası (Isoline / Contour Map)
        renderChart('preview-contour', {
            grid: { left: 10, right: 10, top: 10, bottom: 10 },
            xAxis: { type: 'value', show: false, min: 0, max: 100 },
            yAxis: { type: 'value', show: false, min: 0, max: 100 },
            series: [
                { type: 'scatter', symbol: 'circle', symbolSize: 120, itemStyle: { color: 'none', borderColor: '#bae6fd', borderWidth: 1 }, data: [[50, 50]] },
                { type: 'scatter', symbol: 'circle', symbolSize: 90, itemStyle: { color: 'none', borderColor: '#7dd3fc', borderWidth: 1.5 }, data: [[48, 52]] },
                { type: 'scatter', symbol: 'circle', symbolSize: 60, itemStyle: { color: 'none', borderColor: '#38bdf8', borderWidth: 2 }, data: [[45, 55]] },
                { type: 'scatter', symbol: 'circle', symbolSize: 30, itemStyle: { color: 'none', borderColor: '#0284c7', borderWidth: 2.5 }, data: [[45, 58]] },
                
                // İkinci bir tepe noktası
                { type: 'scatter', symbol: 'circle', symbolSize: 80, itemStyle: { color: 'none', borderColor: '#bae6fd', borderWidth: 1 }, data: [[80, 30]] },
                { type: 'scatter', symbol: 'circle', symbolSize: 40, itemStyle: { color: 'none', borderColor: '#7dd3fc', borderWidth: 1.5 }, data: [[78, 28]] }
            ]
        });

    }
});

// En Başa Dön Butonu İşlevi
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Lucide ikonlarını yeniden tetikle (eğer daha önceden yüklenmediyse)
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});
