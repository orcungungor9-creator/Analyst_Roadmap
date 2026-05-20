// Descriptive Statistics Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const dataInput = document.getElementById('data-input');

    if (calculateBtn && dataInput) {
        calculateBtn.addEventListener('click', calculateStats);
        // Initial run
        calculateStats();
    }
});

function calculateStats() {
    const inputVal = document.getElementById('data-input').value;
    
    // Parse comma separated values
    const numbers = inputVal.split(',')
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v));

    if (numbers.length === 0) {
        alert('Lütfen geçerli sayısal değerler girin (Örn: 5, 10, 15).');
        return;
    }

    const n = numbers.length;
    
    // 1. Mean (Ortalama)
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // 2. Median (Medyan)
    const sorted = [...numbers].sort((a, b) => a - b);
    let median;
    if (n % 2 === 0) {
        median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    } else {
        median = sorted[Math.floor(n / 2)];
    }

    // 3. Mode (Mod)
    const freq = {};
    let maxFreq = 0;
    let modes = [];
    numbers.forEach(num => {
        freq[num] = (freq[num] || 0) + 1;
        if (freq[num] > maxFreq) {
            maxFreq = freq[num];
        }
    });
    
    for (const key in freq) {
        if (freq[key] === maxFreq && maxFreq > 1) {
            modes.push(parseFloat(key));
        }
    }
    
    let modeText = 'Yok';
    if (modes.length > 0) {
        modeText = modes.join(', ');
        if (modes.length === numbers.length) {
            modeText = 'Yok (Tüm değerler eşit frekansta)';
        }
    }

    // 4. Variance and Std Dev (Varyans ve Standart Sapma)
    let variance = 0;
    let stdDev = 0;
    if (n > 1) {
        const sqDiffSum = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
        variance = sqDiffSum / (n - 1);
        stdDev = Math.sqrt(variance);
    }

    // Update DOM
    animateValue('res-mean', mean.toFixed(2));
    animateValue('res-median', median.toFixed(2));
    document.getElementById('res-mode').textContent = modeText;
    animateValue('res-variance', variance.toFixed(2));
    animateValue('res-stddev', stdDev.toFixed(2));
    animateValue('res-n', n);
}

function animateValue(id, targetVal) {
    const el = document.getElementById(id);
    if (!el) return;
    
    // Parse target
    const target = parseFloat(targetVal);
    if (isNaN(target)) {
        el.textContent = targetVal;
        return;
    }

    let start = 0;
    const duration = 500; // ms
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function outQuad
        const ease = progress * (2 - progress);
        const current = start + (target - start) * ease;
        
        el.textContent = Number.isInteger(target) ? Math.round(current) : current.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}
