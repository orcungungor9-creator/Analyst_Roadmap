// stage2.js - İnteraktif Simülasyon Mantığı (6 Adım)

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Adım: Matrix Derleme
    ========================================= */
    const btnCompile = document.getElementById('btn-compile');
    const btnReplay1 = document.getElementById('btn-replay1');
    const termProcess = document.getElementById('term-process');
    const termOutput = document.getElementById('term-output');
    const matrixBg = document.getElementById('matrix-bg');
    const feedback1 = document.getElementById('feedback1');
    let isCompiled = false;

    if (btnCompile) {
        btnCompile.addEventListener('click', () => {
            if (isCompiled) return;
            isCompiled = true;
            
            btnCompile.style.opacity = '0.5';
            btnCompile.style.cursor = 'default';
            if(btnReplay1) btnReplay1.style.display = 'none';
            
            termProcess.style.display = 'block';
            matrixBg.classList.add('active-rain');
            
            setTimeout(() => {
                termOutput.style.display = 'block';
                feedback1.innerHTML = "✅ <strong>İşlem Başarılı:</strong> Doğal dil verisi, makine öğrenmesi modelleri için anlamlı sayısal vektör uzayına haritalandırıldı.";
                feedback1.className = 'sim-feedback feedback-success';
                if(btnReplay1) btnReplay1.style.display = 'inline-flex';
            }, 1500);
        });
    }

    if (btnReplay1) {
        btnReplay1.addEventListener('click', () => {
            isCompiled = false;
            btnCompile.style.opacity = '1';
            btnCompile.style.cursor = 'pointer';
            btnReplay1.style.display = 'none';
            
            termProcess.style.display = 'none';
            termOutput.style.display = 'none';
            matrixBg.classList.remove('active-rain');
            
            feedback1.innerHTML = "Kelime dizileri henüz modele uygun değil. İşleme (Compile) sürecini başlatın.";
            feedback1.className = 'sim-feedback';
        });
    }

    /* =========================================
       2. Adım: Drag and Drop (Veri Tipleri)
    ========================================= */
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const dragItemsPool = document.getElementById('drag-items-container');
    const feedback2 = document.getElementById('feedback2');
    const btnReplay2 = document.getElementById('btn-replay2');
    let draggedItem = null;
    let droppedCount = 0;
    const totalItems = dragItems.length;

    dragItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            draggedItem = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });

        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedItem = null;
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (draggedItem) {
                const expectedType = this.dataset.type;
                const actualType = draggedItem.dataset.type;

                if (expectedType === actualType) {
                    const zoneBody = this.querySelector('.zone-body');
                    const placeholder = zoneBody.querySelector('.drop-placeholder');
                    if (placeholder) placeholder.style.display = 'none';
                    
                    zoneBody.appendChild(draggedItem);
                    draggedItem.classList.add('dropped');
                    draggedItem.draggable = false;
                    
                    this.classList.add('success-glow');
                    setTimeout(() => this.classList.remove('success-glow'), 1000);
                    
                    droppedCount++;
                    if (droppedCount === totalItems) {
                        feedback2.innerHTML = "✅ <strong>Sınıflandırma Başarılı:</strong> Veri setleri, işlenecekleri algoritmik mimarilere (Geleneksel ML ve Derin Öğrenme) doğru şekilde atandı.";
                        feedback2.className = 'sim-feedback feedback-success';
                        if (btnReplay2) btnReplay2.style.display = 'inline-flex';
                    }
                } else {
                    draggedItem.classList.add('shake');
                    setTimeout(() => draggedItem.classList.remove('shake'), 400);
                    
                    feedback2.innerHTML = "⚠️ <strong>Mimari Uyumsuzluğu:</strong> Veri yapısı ile hedef algoritma uyumsuz. Sınıflandırmayı tekrar kontrol edin.";
                    feedback2.className = 'sim-feedback feedback-error';
                    
                    setTimeout(() => {
                        if (droppedCount < totalItems) {
                            feedback2.innerHTML = "Algoritmaların veriyi işleyebilmesi için doğru mimariye (Geleneksel ML vs Derin Öğrenme) yönlendirin.";
                            feedback2.className = 'sim-feedback';
                        }
                    }, 2500);
                }
            }
        });
    });

    if (btnReplay2) {
        btnReplay2.addEventListener('click', () => {
            droppedCount = 0;
            btnReplay2.style.display = 'none';
            
            dragItems.forEach(item => {
                item.classList.remove('dropped');
                item.draggable = true;
                dragItemsPool.appendChild(item);
            });
            
            document.querySelectorAll('.drop-placeholder').forEach(p => p.style.display = 'block');
            
            feedback2.innerHTML = "Algoritmaların veriyi işleyebilmesi için doğru mimariye (Geleneksel ML vs Derin Öğrenme) yönlendirin.";
            feedback2.className = 'sim-feedback';
        });
    }

    /* =========================================
       3. Adım: Veri Temizleme (Click to Fix)
    ========================================= */
    const clickableErrors = document.querySelectorAll('.clickable-error');
    const feedback3 = document.getElementById('feedback3');
    const premiumTable = document.querySelector('.premium-table');
    let fixedCount = 0;

    clickableErrors.forEach(err => {
        err.addEventListener('click', function() {
            if (this.classList.contains('fixed')) return;

            this.innerText = this.dataset.fix;
            this.classList.add('fixed');
            
            const row = this.closest('tr');
            row.classList.add('row-fixed');

            fixedCount++;
            
            if (fixedCount === clickableErrors.length) {
                feedback3.innerHTML = "✅ <strong>Ön İşleme Tamamlandı:</strong> Aykırı değerler giderildi ve eksik veriler imputasyon yöntemiyle doldurularak veri bütünlüğü sağlandı.";
                feedback3.className = 'sim-feedback feedback-success';
                premiumTable.classList.add('all-fixed');
            }
        });
    });

    /* =========================================
       4. Adım: Feature Engineering
    ========================================= */
    const btnExtract = document.getElementById('btn-extract');
    const btnReplay4 = document.getElementById('btn-replay4');
    const coreNode = document.getElementById('core-node');
    const pulseT = document.getElementById('pulse-t');
    const pulseB = document.getElementById('pulse-b');
    const nodeT = document.getElementById('node-t');
    const nodeB = document.getElementById('node-b');
    const feedback4 = document.getElementById('feedback4');
    let isExtracted = false;

    if (btnExtract) {
        btnExtract.addEventListener('click', () => {
            if (isExtracted) return;
            isExtracted = true;

            btnExtract.style.opacity = '0.5';
            btnExtract.style.cursor = 'default';
            if (btnReplay4) btnReplay4.style.display = 'none';

            coreNode.classList.add('spin');
            
            pulseT.style.display = 'block';
            pulseB.style.display = 'block';
            pulseT.classList.add('fire');
            pulseB.classList.add('fire');

            setTimeout(() => {
                nodeT.classList.add('active');
                nodeB.classList.add('active');
                feedback4.innerHTML = "✅ <strong>Optimizasyon Başarılı:</strong> Tek boyutlu ham veriden, modelin varyans açıklayıcılığını artıracak sentetik özellikler (features) türetildi.";
                feedback4.className = 'sim-feedback feedback-success';
                if (btnReplay4) btnReplay4.style.display = 'inline-flex';
            }, 1000);
        });
    }
    
    if (btnReplay4) {
        btnReplay4.addEventListener('click', () => {
            isExtracted = false;
            btnExtract.style.opacity = '1';
            btnExtract.style.cursor = 'pointer';
            btnReplay4.style.display = 'none';

            coreNode.classList.remove('spin');
            pulseT.style.display = 'none';
            pulseB.style.display = 'none';
            pulseT.classList.remove('fire');
            pulseB.classList.remove('fire');
            nodeT.classList.remove('active');
            nodeB.classList.remove('active');

            feedback4.innerHTML = "Ham veri seti yeterince açıklayıcı değil. Model performansını artıracak gizli örüntüleri (features) türetin.";
            feedback4.className = 'sim-feedback';
        });
    }

    /* =========================================
       5. Adım: Normalizasyon (Scatter Plot)
    ========================================= */
    const btnNormalize = document.getElementById('btn-normalize');
    const btnReplay5 = document.getElementById('btn-replay5');
    const scatterPoints = document.querySelectorAll('.scatter-point');
    const axisYLabel = document.getElementById('axis-y-label');
    const axisXLabel = document.getElementById('axis-x-label');
    const feedback5 = document.getElementById('feedback5');
    let isNormalized = false;
    
    // Store original positions
    scatterPoints.forEach(pt => {
        pt.setAttribute('data-ox', pt.style.left);
        pt.setAttribute('data-oy', pt.style.bottom);
    });

    if(btnNormalize) {
        btnNormalize.addEventListener('click', () => {
            if (isNormalized) return;
            isNormalized = true;
            
            btnNormalize.style.opacity = '0.5';
            btnNormalize.style.cursor = 'default';
            if (btnReplay5) btnReplay5.style.display = 'none';
            
            scatterPoints.forEach(pt => {
                pt.style.left = pt.getAttribute('data-nx');
                pt.style.bottom = pt.getAttribute('data-ny');
                pt.classList.add('normalized');
            });
            
            setTimeout(() => {
                axisYLabel.innerText = "Gelir [0.0 - 1.0]";
                axisYLabel.style.color = "#10b981";
                axisXLabel.innerText = "Yaş [0.0 - 1.0]";
                axisXLabel.style.color = "#10b981";
            }, 500);

            feedback5.innerHTML = "✅ <strong>Standardizasyon Tamamlandı:</strong> Değişkenler [0,1] aralığına çekildi. Varyans dengelendi ve gizli korelasyon görünür hale geldi.";
            feedback5.className = 'sim-feedback feedback-success';
            if (btnReplay5) btnReplay5.style.display = 'inline-flex';
        });
    }

    if(btnReplay5) {
        btnReplay5.addEventListener('click', () => {
            isNormalized = false;
            btnNormalize.style.opacity = '1';
            btnNormalize.style.cursor = 'pointer';
            btnReplay5.style.display = 'none';
            
            scatterPoints.forEach(pt => {
                pt.style.left = pt.getAttribute('data-ox');
                pt.style.bottom = pt.getAttribute('data-oy');
                pt.classList.remove('normalized');
            });
            
            axisYLabel.innerText = "Gelir (10k - 100k)";
            axisYLabel.style.color = "#64748b";
            axisXLabel.innerText = "Yaş (20 - 60)";
            axisXLabel.style.color = "#64748b";

            feedback5.innerHTML = "Geniş varyanslı verileri 0 ile 1 aralığına ölçeklendirerek istatistiksel dominasyonu engelleyin.";
            feedback5.className = 'sim-feedback';
        });
    }

    /* =========================================
       6. Adım: Ses Verisi Popülasyon Dengesi (Sliders)
    ========================================= */
    const sliderFemale = document.getElementById('slider-female');
    const sliderMale = document.getElementById('slider-male');
    const sliderChild = document.getElementById('slider-child');
    
    const valFemale = document.getElementById('val-female');
    const valMale = document.getElementById('val-male');
    const valChild = document.getElementById('val-child');
    
    const meterFill = document.getElementById('meter-fill');
    const meterValue = document.getElementById('meter-value');
    const feedback6 = document.getElementById('feedback6');

    function updateBiasSimulation() {
        if (!sliderFemale || !sliderMale || !sliderChild) return;

        let f = parseInt(sliderFemale.value) || 0;
        let m = parseInt(sliderMale.value) || 0;
        let c = parseInt(sliderChild.value) || 0;

        valFemale.innerText = f;
        valMale.innerText = m;
        valChild.innerText = c;

        let diff = Math.abs(f - m) + Math.abs(m - c) + Math.abs(f - c);
        
        let avg = (f + m + c) / 3;
        
        let penalty = diff / 250; 
        
        let score = Math.round(avg * (1 - penalty));
        
        if (score < 0) score = 0;
        if (score > 100) score = 100;

        meterFill.style.width = score + '%';
        meterValue.innerText = '%' + score;

        if (score === 100) {
            feedback6.innerHTML = "✅ <strong>Sınıf Dengesi Sağlandı:</strong> Model eğitim seti evrensel popülasyonu kusursuz yansıtıyor. Bias %0, Doğruluk %100!";
            feedback6.className = 'sim-feedback feedback-success';
        } else if (diff > 50) {
            feedback6.innerHTML = "⚠️ <strong>Yüksek Yanlılık (Bias):</strong> Demografik dengesizlik nedeniyle modelin bazı grupları tanıma oranı çok düşük!";
            feedback6.className = 'sim-feedback feedback-error';
        } else {
            feedback6.innerHTML = "Sistemin her kesimi doğru tanıması için veri miktarını artırın ve kusursuz dengeyi kurun!";
            feedback6.className = 'sim-feedback';
            feedback6.style.background = 'rgba(0,0,0,0.75)';
            feedback6.style.color = '#fff';
        }
    }

    if (sliderFemale) sliderFemale.addEventListener('input', updateBiasSimulation);
    if (sliderMale) sliderMale.addEventListener('input', updateBiasSimulation);
    if (sliderChild) sliderChild.addEventListener('input', updateBiasSimulation);

});
