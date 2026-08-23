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

    // Title Mapping for professional display
    const titleMap = {
        'ai_tarihcesi': 'Yapay Zeka Tarihçesi Testi',
        'kavram_bilgisi': 'Kavram Bilgisi Testi',
        'ml_temelleri': 'Makine Öğrenimi Temelleri Testi',
        'dl_temelleri': 'Derin Öğrenme Temelleri Testi',
        'ai_okuryazarligi_temelleri': 'AI Okuryazarlığı Temelleri Testi'
    };

    let mappedTitle = titleMap[test];
    if(!mappedTitle) {
        // Fallback
        mappedTitle = test.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + " Testi";
    }
    document.getElementById('main-title').innerText = mappedTitle;

    // Set Difficulty Badge Colors
    const diffBadge = document.getElementById('difficulty-badge');
    const diffText = document.getElementById('difficulty-text');
    const diffDot = document.getElementById('diff-dot');
    
    if (zorluk === 'kolay') {
        diffText.innerText = 'Kolay Seviye';
        diffDot.style.backgroundColor = '#10b981'; // Green
        diffBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else if (zorluk === 'orta') {
        diffText.innerText = 'Orta Seviye';
        diffDot.style.backgroundColor = '#f59e0b'; // Yellow
        diffBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    } else if (zorluk === 'zor') {
        diffText.innerText = 'Zor Seviye';
        diffDot.style.backgroundColor = '#ef4444'; // Red
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

        if (selectedIndex === q.correct_option) {
            btnElement.classList.add('correct');
            btnElement.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
            btnElement.style.borderColor = '#10b981';
            btnElement.style.color = '#10b981';
            
            allBtns.forEach(b => b.disabled = true);

            setTimeout(() => {
                currentIndex++;
                if (currentIndex < questions.length) {
                    renderQuestion();
                } else {
                    finishQuiz();
                }
            }, 1000);
        } else {
            btnElement.classList.add('wrong');
            btnElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            btnElement.style.borderColor = '#ef4444';
            btnElement.style.color = '#ef4444';
            btnElement.disabled = true;

            let penalty = 5; 
            if (zorluk === 'orta') penalty = 10;
            if (zorluk === 'zor') penalty = 15;
            
            score = Math.max(0, score - penalty);
            document.getElementById('success-rate').innerText = `%${score}`;
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
