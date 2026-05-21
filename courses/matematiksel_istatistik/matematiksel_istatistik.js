// Central Limit Theorem Simulator Logic

let sampleMeans = [];
let sampleSize = 10;
let distType = 'uniform';

document.addEventListener('DOMContentLoaded', () => {
    const sizeSlider = document.getElementById('sample-size');
    const nValLabel = document.getElementById('n-val');
    const distSelect = document.getElementById('dist-select');
    const draw1Btn = document.getElementById('draw-1');
    const draw500Btn = document.getElementById('draw-500');
    const resetBtn = document.getElementById('reset-clt');

    // Canvas setup
    const canvas = document.getElementById('clt-canvas');
    if (canvas) {
        initCanvas(canvas);
    }

    if (sizeSlider) {
        sizeSlider.addEventListener('input', (e) => {
            sampleSize = parseInt(e.target.value);
            nValLabel.textContent = sampleSize;
            resetCLT();
        });
    }

    if (distSelect) {
        distSelect.addEventListener('change', (e) => {
            distType = e.target.value;
            resetCLT();
        });
    }

    if (draw1Btn) draw1Btn.addEventListener('click', () => drawSamples(1));
    if (draw500Btn) draw500Btn.addEventListener('click', () => drawSamples(500));
    if (resetBtn) resetBtn.addEventListener('click', resetCLT);
});

function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw placeholder
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Henüz veri yok. Örnek çekmek için butonlara tıklayın.', canvas.width / 2, canvas.height / 2);
}

function drawSamples(count) {
    for (let i = 0; i < count; i++) {
        let sum = 0;
        for (let j = 0; j < sampleSize; j++) {
            sum += getRandomValue(distType);
        }
        sampleMeans.push(sum / sampleSize);
    }
    
    document.getElementById('samples-count').textContent = sampleMeans.length;
    renderHistogram();
}

function getRandomValue(type) {
    if (type === 'uniform') {
        // Uniform distribution [0, 100]
        return Math.random() * 100;
    } else if (type === 'exponential') {
        // Exponential distribution (mean = 20)
        const lambda = 1 / 20;
        return -Math.log(1 - Math.random()) / lambda;
    } else if (type === 'dice') {
        // Dice roll [1, 6]
        return Math.floor(Math.random() * 6) + 1;
    }
    return 0;
}

function renderHistogram() {
    const canvas = document.getElementById('clt-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const padding = 30;

    // Determine range
    let min = 0;
    let max = 100;
    if (distType === 'dice') {
        min = 1;
        max = 6;
    } else if (distType === 'exponential') {
        min = 0;
        max = 80; // Truncate long tail for display
    }

    // Binning
    const numBins = 30;
    const bins = new Array(numBins).fill(0);
    const binWidth = (max - min) / numBins;

    sampleMeans.forEach(val => {
        let binIdx = Math.floor((val - min) / binWidth);
        if (binIdx < 0) binIdx = 0;
        if (binIdx >= numBins) binIdx = numBins - 1;
        bins[binIdx]++;
    });

    const maxBinCount = Math.max(...bins, 1);

    // Draw grid lines and labels
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
        const gridY = padding + (h - 2 * padding) * (i / 4);
        ctx.beginPath();
        ctx.moveTo(padding, gridY);
        ctx.lineTo(w - padding, gridY);
        ctx.stroke();
    }

    // Draw bars
    const barWidth = (w - 2 * padding) / numBins;
    ctx.fillStyle = 'rgba(192, 132, 252, 0.4)';
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.8)';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < numBins; i++) {
        const binHeight = (bins[i] / maxBinCount) * (h - 2 * padding);
        const x = padding + i * barWidth;
        const y = h - padding - binHeight;

        if (binHeight > 0) {
            ctx.beginPath();
            // Rounded corners on top of bars
            ctx.roundRect(x + 1, y, barWidth - 2, binHeight, [4, 4, 0, 0]);
            ctx.fill();
            ctx.stroke();
        }
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, h - padding);
    ctx.lineTo(w - padding, h - padding);
    ctx.stroke();

    // Draw min / max labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(min.toFixed(1), padding, h - 10);
    ctx.textAlign = 'right';
    ctx.fillText(max.toFixed(1), w - padding, h - 10);
}

function resetCLT() {
    sampleMeans = [];
    document.getElementById('samples-count').textContent = 0;
    const canvas = document.getElementById('clt-canvas');
    if (canvas) {
        initCanvas(canvas);
    }
}
