document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kategori = urlParams.get('kategori');
    const modul = urlParams.get('modul');
    const test = urlParams.get('test');
    const zorluk = urlParams.get('zorluk');

    if (!kategori || !modul || !test || !zorluk) {
        document.getElementById('question-text').innerText = "Hata: Test parametreleri eksik.";
        return;
    }

    const titleMap = {
        'ai_tarihcesi': 'Yapay Zeka Tarihçesi Testi',
        'kavram_bilgisi': 'Kavram Bilgisi Testi',
        'ml_temelleri': 'Makine Öğrenimi Temelleri Testi',
        'dl_temelleri': 'Derin Öğrenme Temelleri Testi',
        'ai_okuryazarligi_temelleri': 'AI Okuryazarlığı Temelleri Testi'
    };

    let mappedTitle = titleMap[test];
    if(!mappedTitle) {
        mappedTitle = test.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + " Testi";
    }
    document.getElementById('main-title').innerText = mappedTitle;

    const diffBadge = document.getElementById('difficulty-badge');
    const diffText = document.getElementById('difficulty-text');
    const diffDot = document.getElementById('diff-dot');
    
    if (zorluk === 'kolay') {
        diffText.innerText = 'Kolay Seviye';
        diffDot.style.backgroundColor = '#10b981'; 
        diffBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else if (zorluk === 'orta') {
        diffText.innerText = 'Orta Seviye';
        diffDot.style.backgroundColor = '#f59e0b'; 
        diffBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    } else if (zorluk === 'zor') {
        diffText.innerText = 'Zor Seviye';
        diffDot.style.backgroundColor = '#ef4444'; 
        diffBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    }

    let questions = [];
    let currentIndex = 0;
    let score = 100;

    const jsonPath = `questions_data/${kategori}/${modul}/${zorluk}/${test}.json`;
    
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) throw new Error('Test verisi bulunamadı.');
            return response.json();
        })
        .then(data => {
            questions = data;
            if (questions.length === 0) {
                document.getElementById('question-text').innerText = "Bu test için henüz soru eklenmemiş.";
                document.getElementById('options-container').innerHTML = "";
                return;
            }
            renderQuestion();
        })
        .catch(err => {
            console.error(err);
            document.getElementById('question-text').innerText = "Sorular yüklenirken bir hata oluştu: " + err.message;
            document.getElementById('options-container').innerHTML = "";
        });

    function renderQuestion() {
        const q = questions[currentIndex];
        document.getElementById('question-text').innerText = q.question;
        
        document.getElementById('questions-left').innerText = `${currentIndex + 1} / ${questions.length}`;
        document.getElementById('success-rate').innerText = `%${score}`;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        q.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = optText;
            btn.onclick = () => handleAnswer(index, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex, btnElement) {
        const q = questions[currentIndex];
        const optionsContainer = document.getElementById('options-container');
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        allBtns.forEach(b => b.disabled = true);

        if (selectedIndex === q.correct_option) {
            btnElement.classList.add('blink-correct');
            
            if(window.confetti) {
                const duration = 2000;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 270,
                        spread: 120,
                        origin: { x: Math.random(), y: -0.1 },
                        colors: ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9'],
                        zIndex: 9999,
                        disableForReducedMotion: true
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }

            setTimeout(() => {
                currentIndex++;
                if (currentIndex < questions.length) {
                    renderQuestion();
                } else {
                    finishQuiz();
                }
            }, 2000);
            
        } else {
            btnElement.style.backgroundColor = 'rgba(248, 113, 113, 0.15)';
            btnElement.style.borderColor = '#f87171';
            btnElement.style.color = '#f87171';

            let penalty = 5; 
            if (zorluk === 'orta') penalty = 10;
            if (zorluk === 'zor') penalty = 15;
            score = Math.max(0, score - penalty);
            document.getElementById('success-rate').innerText = `%${score}`;
            
            const correctBtn = allBtns[q.correct_option];
            if(correctBtn) {
                correctBtn.classList.add('blink-correct');
            }

            setTimeout(() => {
                currentIndex++;
                if (currentIndex < questions.length) {
                    renderQuestion();
                } else {
                    finishQuiz();
                }
            }, 2000);
        }
    }

    function finishQuiz() {
        document.getElementById('question-text').innerText = "Tebrikler, testi tamamladınız!";
        document.getElementById('options-container').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: var(--neon-blue); font-size: 2.5rem; margin-bottom: 10px;">Skorunuz: %${score}</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px; font-size: 1.2rem;">Tüm soruları yanıtladınız.</p>
                <button class="option-btn" style="background: var(--neon-blue); color: white; border: none; padding: 15px 30px; font-weight: bold; border-radius: 12px; cursor: pointer;" onclick="window.location.href = '../modules/${kategori}/${modul}/index.html'">Test Seçimine Dön</button>
            </div>
        `;
    }
});
