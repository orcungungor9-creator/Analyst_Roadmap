// matematik_1.js - Matematik 1 Dikey Akış Yönetim Scripti (V3 - Performans & Sadeleştirme)

document.addEventListener('DOMContentLoaded', () => {
    initM1Curriculum();
});

function initM1Curriculum() {
    const chaptersContainer = document.getElementById('m1-chapters-container');
    const sidebarContainer = document.getElementById('sidebar-chapters-list');
    const drawerLinksContainer = document.getElementById('mobile-drawer-links');

    if (!chaptersContainer) return;

    // data.js modülünden m1Data'yı çek
    const data = typeof window.m1Data !== 'undefined' ? window.m1Data : (typeof m1Data !== 'undefined' ? m1Data : null);
    if (!data) {
        chaptersContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);"><h3>Ders verileri yüklenemedi.</h3></div>`;
        return;
    }

    // 1. İndeks ve İçerik Alanlarını Temizle
    chaptersContainer.innerHTML = '';
    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (drawerLinksContainer) drawerLinksContainer.innerHTML = '';

    // 2. Menü Linklerini (Masaüstü Sidebar & Mobil Çekmece) Doldur
    data.forEach(chapter => {
        // Desktop Sidebar Linki
        if (sidebarContainer) {
            const sidebarItem = document.createElement('button');
            sidebarItem.className = 'm1-sidebar-item';
            sidebarItem.setAttribute('data-id', chapter.id);
            sidebarItem.innerHTML = `
                <span class="m1-item-number">${chapter.id}</span>
                <span class="m1-item-text" title="${chapter.title}">${chapter.title}</span>
            `;
            sidebarItem.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToChapter(chapter.id);
            });
            sidebarContainer.appendChild(sidebarItem);
        }

        // Mobil Bottom Sheet (Çekmece) Linki
        if (drawerLinksContainer) {
            const drawerItem = document.createElement('button');
            drawerItem.className = 'm1-drawer-item';
            drawerItem.setAttribute('data-id', chapter.id);
            drawerItem.innerHTML = `
                <span class="m1-drawer-item-num">${chapter.id}</span>
                <span>${chapter.title}</span>
            `;
            drawerItem.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToChapter(chapter.id);
                closeMobileDrawer(); // Seçince çekmeceyi kapat
            });
            drawerLinksContainer.appendChild(drawerItem);
        }
    });

    // 3. Çekmece (Drawer) Açma / Kapama Olaylarını Bağla
    initMobileDrawerEvents();

    // 4. Aşamalı DOM Yükleme (Chunked Rendering) - UI Kilitlemesini Engeller
    let currentIndex = 0;
    const chunkSize = 2; // Her seferinde 2 konu yükle

    function renderNextChunk() {
        if (currentIndex >= data.length) {
            // Yükleme tamamlandı, Lazy KaTeX dinleyicilerini başlat
            initLazyKatex();
            // Scrollspy'ı başlat
            initScrollspy(data);
            // Hash yönlendirmesini kontrol et
            checkInitialHash();
            return;
        }

        const chunk = data.slice(currentIndex, currentIndex + chunkSize);
        chunk.forEach(chapter => {
            const card = createChapterCard(chapter);
            chaptersContainer.appendChild(card);
        });

        currentIndex += chunkSize;
        // Bir sonraki frame'de çizim yapmak üzere tarayıcıyı rahat bırak
        setTimeout(renderNextChunk, 16);
    }

    // İlk parçayı yüklemeyi başlat
    renderNextChunk();
}

// Tek bir konu kartını üreten yardımcı fonksiyon
function createChapterCard(chapter) {
    const card = document.createElement('section');
    card.className = 'm1-chapter-card glass-card';
    card.id = `chapter-${chapter.id}`;

    // Matematiksel Özellikler listesini oluştur
    let propertiesHtml = '';
    if (chapter.properties && chapter.properties.length > 0) {
        chapter.properties.forEach(prop => {
            propertiesHtml += `
                <div class="m1-property-item">
                    <span class="m1-property-title">🔹 ${prop.name}</span>
                    <div class="m1-property-desc">${prop.description}</div>
                    <div class="m1-example-item">
                        <div class="m1-example-question">📋 Soru Örneği: ${prop.example_question}</div>
                        <div class="m1-example-solution"><b>Çözüm Adımları:</b>\n${prop.example_solution}</div>
                    </div>
                </div>
            `;
        });
    }

    // Sözel Kavramlar ile Anlatımı birleştiren "Nedir?" kutusu (V3 - Kurumsal Çerçeve kaldırıldı)
    card.innerHTML = `
        <div class="m1-content-header">
            <span class="m1-chapter-number">Bölüm ${chapter.id}</span>
            <h2>${chapter.title}</h2>
        </div>
        
        <!-- Sözel Kavramlar & Konu Anlatımı (Birleştirilmiş Akış) -->
        <div class="m1-section-block m1-concept-box">
            <h4><span class="m1-block-icon">💡</span> ${chapter.title} Nedir?</h4>
            <p>${chapter.concept}</p>
            <div style="margin-top: 16px; border-top: 1px dashed var(--glass-border); padding-top: 16px;">
                ${chapter.theory}
            </div>
        </div>

        <!-- Matematiksel Özellikler ve Örnekleri -->
        <div class="m1-section-block m1-properties-box">
            <h4><span class="m1-block-icon">⚡</span> Matematiksel Kurallar ve Uygulamalar</h4>
            <div class="m1-properties-list">
                ${propertiesHtml}
            </div>
        </div>

        <!-- Veri Biliminde Yeri Ne? -->
        <div class="m1-section-block m1-guide-box">
            <h4><span class="m1-block-icon">🚀</span> Veri Biliminde Yeri Ne?</h4>
            <div>${chapter.guide}</div>
        </div>
    `;

    // Bölüm 9 ise İnteraktif Simülatörü enjekte et
    if (chapter.id === 9) {
        injectDerivativeSimulator(card);
    }

    return card;
}

// Gecikmeli KaTeX Tetikleyici (Lazy KaTeX) - Ekrandakileri veya ekrana yaklaşanları render eder
function initLazyKatex() {
    if (typeof renderMathInElement === 'undefined') return;

    const observerOptions = {
        root: null, // Tarayıcı penceresi
        rootMargin: '250px 0px 250px 0px', // Ekrana 250px kala render etmeye başla
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                renderMathInElement(card, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\\(', right: '\\)', display: false }
                    ],
                    throwOnError: false
                });
                obs.unobserve(card); // Render yapıldıktan sonra dinlemeyi bırak (FPS dostu)
            }
        });
    }, observerOptions);

    // Tüm konu kartlarını izle
    document.querySelectorAll('.m1-chapter-card').forEach(card => {
        observer.observe(card);
    });
}

// Belirli bir bölüme pürüzsüz kaydırma fonksiyonu
function scrollToChapter(chapterId) {
    const target = document.getElementById(`chapter-${chapterId}`);
    if (target) {
        // Hedef karta kadar olan tüm kartları (ve hedefi) anında render edelim.
        // Bu, yukarıdaki kartların KaTeX render edildikçe genişleyip hedef kartı aşağı itmesini (Layout Shift) engeller.
        if (typeof renderMathInElement !== 'undefined') {
            for (let i = 1; i <= chapterId; i++) {
                const card = document.getElementById(`chapter-${i}`);
                if (card) {
                    renderMathInElement(card, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '\\(', right: '\\)', display: false }
                        ],
                        throwOnError: false
                    });
                }
            }
        }

        const offset = 90; // Header yüksekliği
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const targetPosition = targetRect - bodyRect;
        const offsetPosition = targetPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Hash'i güncelle
        history.pushState(null, null, `#chapter-${chapterId}`);
    }
}

// Kaydırma Takibi (Scrollspy) Mekanizması
function initScrollspy(data) {
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || window.pageYOffset;
        const offset = 150; // Aktiflik eşiği
        
        // Eğer sayfanın en üstündeysek (Giriş kartındaysak) aktifliği temizle
        if (scrollPos < 100) {
            document.querySelectorAll('.m1-sidebar-item').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.m1-drawer-item').forEach(item => item.classList.remove('active'));
            return;
        }

        data.forEach(chapter => {
            const section = document.getElementById(`chapter-${chapter.id}`);
            if (section) {
                const top = section.offsetTop - offset;
                const bottom = top + section.offsetHeight;
                
                if (scrollPos >= top && scrollPos < bottom) {
                    // 1. Masaüstü Sidebar Aktifliği Güncelle
                    document.querySelectorAll('.m1-sidebar-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    const activeItem = document.querySelector(`.m1-sidebar-item[data-id="${chapter.id}"]`);
                    if (activeItem) {
                        activeItem.classList.add('active');
                        // Sidebar içinde aktif olan elemanı görünür alana taşı (otomatik kaydırma)
                        const listContainer = document.getElementById('sidebar-chapters-list');
                        if (listContainer) {
                            const activeTop = activeItem.offsetTop;
                            const containerHeight = listContainer.offsetHeight;
                            listContainer.scrollTo({
                                top: activeTop - (containerHeight / 2) + (activeItem.offsetHeight / 2),
                                behavior: 'smooth'
                            });
                        }
                    }

                    // 2. Mobil Çekmece (Drawer) Aktifliği Güncelle
                    document.querySelectorAll('.m1-drawer-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    const activeDrawerItem = document.querySelector(`.m1-drawer-item[data-id="${chapter.id}"]`);
                    if (activeDrawerItem) {
                        activeDrawerItem.classList.add('active');
                        // Çekmece listesi içinde aktif olanı ortala
                        const drawerContent = document.getElementById('mobile-drawer-links');
                        if (drawerContent) {
                            const activeTop = activeDrawerItem.offsetTop;
                            const containerHeight = drawerContent.offsetHeight;
                            drawerContent.scrollTo({
                                top: activeTop - (containerHeight / 2) + (activeDrawerItem.offsetHeight / 2),
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }
        });
    }, { passive: true }); // passive: true FPS düşüşünü engeller
}

// Başlangıçta hash varsa kaydırma yap, yoksa en üste konumlandır (giriş yazısının görünmesi için)
function checkInitialHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#chapter-')) {
        const parsedId = parseInt(hash.replace('#chapter-', ''));
        if (parsedId >= 1 && parsedId <= 12) {
            setTimeout(() => {
                scrollToChapter(parsedId);
            }, 300);
            return;
        }
    }
    
    // Hash yoksa veya geçersizse, tarayıcı restorasyonunu ezerek en üste kaydırır (Giriş kartı görünür kalır)
    window.scrollTo(0, 0);
}

// Mobil Sol Yan Çekmece Olay Kontrolleri
function initMobileDrawerEvents() {
    const pullTab = document.getElementById('m1-edge-pull-tab');
    const overlay = document.getElementById('m1-drawer-overlay');
    const drawer = document.getElementById('m1-mobile-drawer');
    const closeBtn = document.getElementById('m1-drawer-close-btn');

    if (!pullTab || !overlay || !drawer) return;

    // Çekmece Aç
    pullTab.addEventListener('click', () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
        pullTab.style.opacity = '0';
        pullTab.style.pointerEvents = 'none';
        document.body.style.overflow = 'hidden'; // Arka plan kaydırmasını engelle
    });

    // Çekmece Kapat
    function closeMobileDrawerInternal() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        pullTab.style.opacity = '1';
        pullTab.style.pointerEvents = 'auto';
        document.body.style.overflow = ''; // Kaydırmayı geri aç
    }

    overlay.addEventListener('click', closeMobileDrawerInternal);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawerInternal);

    // Dışarı aktaralım
    window.closeMobileDrawer = closeMobileDrawerInternal;
}

function closeMobileDrawer() {
    if (window.closeMobileDrawer) window.closeMobileDrawer();
}

// Bölüm 9 için İnteraktif Simülatörü enjekte eden fonksiyon
function injectDerivativeSimulator(cardElement) {
    const conceptBox = cardElement.querySelector('.m1-concept-box');
    if (!conceptBox) return;

    const simulatorHtml = `
        <div style="margin-top: 24px; border-top: 1px dashed var(--glass-border); padding-top: 24px;">
            <h4 style="color: var(--m1-accent); margin-bottom: 8px; font-family: var(--font-title); font-weight: 800;">📐 İnteraktif Grafik ve Teğet Simülatörü</h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">
                Grafik üzerinde farenizi gezdirerek karesel fonksiyonların (parabol) ve diğer eğrilerin anlık değişim oranını (teğet eğimi / türev) görsel olarak analiz edin.
            </p>
            <div class="derivative-layout">
                <div class="canvas-wrapper">
                    <canvas id="derivative-canvas" width="400" height="250" style="background: rgba(0,0,0,0.15); border-radius: 12px; max-width: 100%;"></canvas>
                </div>
                <div class="derivative-controls">
                    <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; margin-bottom: 6px; display: block;">Fonksiyon Eğrisi Seçin:</label>
                    <select id="function-select" class="derivative-select-field" style="margin-bottom: 20px;">
                        <option value="parabola">Karesel (Parabol): y = 0.1x²</option>
                        <option value="sine">Sinüzoidal Dalga: y = 2sin(x)</option>
                        <option value="cubic">Kübik Fonksiyon: y = 0.05(x³ - 6x)</option>
                    </select>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="result-card">
                            <span class="result-label">Nokta Koordinatı (x, y)</span>
                            <span id="deriv-point" class="result-value" style="font-size: 1.05rem;">x = 0.00, y = 0.00</span>
                        </div>
                        <div class="result-card">
                            <span class="result-label">Teğet Eğim Değeri</span>
                            <span id="deriv-slope" class="result-value" style="font-size: 1.2rem;">0.000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    conceptBox.appendChild(document.createRange().createContextualFragment(simulatorHtml));

    // Canvas çizim mekanizması (DOMContentLoaded sonrası çalışacak şekilde kuyruğa alınır)
    setTimeout(() => {
        const canvas = document.getElementById('derivative-canvas');
        const funcSelect = document.getElementById('function-select');
        if (!canvas) return;

        let selectedFunc = 'parabola';
        let currentMouseX = canvas.width / 2;

        const mathFunctions = {
            parabola: {
                f: (x) => 0.1 * x * x,
                df: (x) => 0.2 * x,
                scale: 22,
                range: { min: -8, max: 8 }
            },
            sine: {
                f: (x) => 2 * Math.sin(x),
                df: (x) => 2 * Math.cos(x),
                scale: 22,
                range: { min: -8, max: 8 }
            },
            cubic: {
                f: (x) => 0.05 * (x * x * x - 6 * x),
                df: (x) => 0.05 * (3 * x * x - 6),
                scale: 22,
                range: { min: -8, max: 8 }
            }
        };

        function drawDerivative() {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;
            const centerX = w / 2;
            const centerY = h / 2;

            const fnConfig = mathFunctions[selectedFunc];
            const scale = fnConfig.scale;

            // Arka Plan Izgarası
            ctx.strokeStyle = 'rgba(255,255,255,0.02)';
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 22) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += 22) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            // Kartezyen Koordinat Eksenleri
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, centerY); ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0); ctx.lineTo(centerX, h);
            ctx.stroke();

            // Fare kartezyen koordinatı
            const targetCartesianX = (currentMouseX - centerX) / scale;
            const targetCartesianY = fnConfig.f(targetCartesianX);
            const targetSlope = fnConfig.df(targetCartesianX);

            // Fonksiyon Grafiğini Çiz
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            let firstPoint = true;
            for (let cx = 0; cx < w; cx++) {
                const cartX = (cx - centerX) / scale;
                const cartY = fnConfig.f(cartX);
                const cy = centerY - cartY * scale;

                if (firstPoint) {
                    ctx.moveTo(cx, cy);
                    firstPoint = false;
                } else {
                    ctx.lineTo(cx, cy);
                }
            }
            ctx.stroke();

            // Teğet Doğrusunu Çiz
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let cx = 0; cx < w; cx++) {
                const cartX = (cx - centerX) / scale;
                const tangentCartY = targetSlope * (cartX - targetCartesianX) + targetCartesianY;
                const cy = centerY - tangentCartY * scale;
                
                if (cx === 0) ctx.moveTo(cx, cy);
                else ctx.lineTo(cx, cy);
            }
            ctx.stroke();

            // Teğet Kesim Noktasını Çiz
            ctx.fillStyle = '#06b6d4';
            ctx.beginPath();
            ctx.arc(currentMouseX, centerY - targetCartesianY * scale, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Koordinat ve Eğim Bilgilerini Güncelle
            document.getElementById('deriv-point').textContent = `x = ${targetCartesianX.toFixed(2)}, y = ${targetCartesianY.toFixed(2)}`;
            document.getElementById('deriv-slope').textContent = targetSlope.toFixed(3);
        }

        drawDerivative();

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            currentMouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
            requestAnimationFrame(drawDerivative);
        });

        canvas.addEventListener('mouseleave', () => {
            currentMouseX = canvas.width / 2;
            requestAnimationFrame(drawDerivative);
        });

        if (funcSelect) {
            funcSelect.addEventListener('change', (e) => {
                selectedFunc = e.target.value;
                drawDerivative();
            });
        }
    }, 100);
}
