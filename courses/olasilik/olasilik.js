// Probability Coin Toss Simulator Logic

let total = 0;
let heads = 0;
let tails = 0;
let isFlipping = false;

document.addEventListener('DOMContentLoaded', () => {
    const btn1 = document.getElementById('flip-1');
    const btn10 = document.getElementById('flip-10');
    const btn100 = document.getElementById('flip-100');
    const btn1000 = document.getElementById('flip-1000');
    const resetBtn = document.getElementById('reset-btn');

    if (btn1) btn1.addEventListener('click', () => simulateFlips(1));
    if (btn10) btn10.addEventListener('click', () => simulateFlips(10));
    if (btn100) btn100.addEventListener('click', () => simulateFlips(100));
    if (btn1000) btn1000.addEventListener('click', () => simulateFlips(1000));
    if (resetBtn) resetBtn.addEventListener('click', resetSimulator);
});

function simulateFlips(amount) {
    if (isFlipping) return;

    if (amount === 1) {
        // Run full 3D coin animation
        isFlipping = true;
        const coin = document.getElementById('coin');
        const rand = Math.random();
        const outcome = rand < 0.5 ? 'heads' : 'tails';

        // Clear previous animations
        coin.className = 'coin';
        void coin.offsetWidth; // Reflow

        // Apply new animation class
        if (outcome === 'heads') {
            coin.classList.add('flip-heads-anim');
            setTimeout(() => {
                heads++;
                total++;
                updateUI();
                isFlipping = false;
            }, 1200);
        } else {
            coin.classList.add('flip-tails-anim');
            setTimeout(() => {
                tails++;
                total++;
                updateUI();
                isFlipping = false;
            }, 1200);
        }
    } else {
        // Fast calculation for multiple trials (simulate LLN)
        for (let i = 0; i < amount; i++) {
            if (Math.random() < 0.5) {
                heads++;
            } else {
                tails++;
            }
            total++;
        }
        updateUI();
    }
}

function updateUI() {
    document.getElementById('total-flips').textContent = total;
    
    let headsPctVal = 0;
    let tailsPctVal = 0;

    if (total > 0) {
        headsPctVal = (heads / total) * 100;
        tailsPctVal = (tails / total) * 100;
    }

    document.getElementById('heads-pct').textContent = headsPctVal.toFixed(1) + '%';
    document.getElementById('tails-pct').textContent = tailsPctVal.toFixed(1) + '%';

    const headsBar = document.getElementById('heads-bar');
    const tailsBar = document.getElementById('tails-bar');

    if (total > 0) {
        headsBar.style.width = headsPctVal + '%';
        tailsBar.style.width = tailsPctVal + '%';
        headsBar.textContent = headsPctVal > 15 ? `Y: ${headsPctVal.toFixed(0)}%` : '';
        tailsBar.textContent = tailsPctVal > 15 ? `T: ${tailsPctVal.toFixed(0)}%` : '';
    } else {
        headsBar.style.width = '50%';
        tailsBar.style.width = '50%';
        headsBar.textContent = '';
        tailsBar.textContent = '';
    }
}

function resetSimulator() {
    if (isFlipping) return;
    total = 0;
    heads = 0;
    tails = 0;
    const coin = document.getElementById('coin');
    if (coin) coin.className = 'coin';
    updateUI();
}
