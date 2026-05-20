// Z-Curve and p-Value Visualizer Logic

document.addEventListener('DOMContentLoaded', () => {
    const zInput = document.getElementById('z-score-input');
    const testSelect = document.getElementById('test-type');

    if (zInput && testSelect) {
        zInput.addEventListener('input', drawZCurve);
        testSelect.addEventListener('change', drawZCurve);
        // Initial run
        drawZCurve();
    }
});

// High precision Cumulative Normal Distribution Function (CDF) approximation
function normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989422804;
    const probs = 1 - d * Math.exp(-x * x / 2) * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    if (x > 0) return probs;
    return 1 - probs;
}

// Probability density function of standard normal distribution
function normalPDF(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

function drawZCurve() {
    const canvas = document.getElementById('zcurve-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const zVal = parseFloat(document.getElementById('z-score-input').value) || 0;
    const testType = document.getElementById('test-type').value;

    const w = canvas.width;
    const h = canvas.height;
    const padding = 30;
    const curveWidth = w - 2 * padding;
    const curveHeight = h - 2 * padding;

    // Normal curve bounds (from -3.5 to +3.5)
    const minZ = -3.5;
    const maxZ = +3.5;

    // Coordinate mapping helper
    function mapX(z) {
        return padding + ((z - minZ) / (maxZ - minZ)) * curveWidth;
    }
    function mapY(y) {
        // scale max height (normalPDF(0) = 0.3989) to fit inside canvas height
        return h - padding - (y / 0.45) * curveHeight;
    }

    // 1. Draw Shaded tail areas
    ctx.fillStyle = 'rgba(248, 113, 113, 0.3)';
    
    ctx.beginPath();
    const resolution = 150;
    const step = (maxZ - minZ) / resolution;

    let isShaded = (z) => false;
    let pValue = 0;

    if (testType === 'right-tailed') {
        isShaded = (z) => z >= zVal;
        pValue = 1 - normalCDF(zVal);
    } else if (testType === 'left-tailed') {
        isShaded = (z) => z <= zVal;
        pValue = normalCDF(zVal);
    } else if (testType === 'two-tailed') {
        const absZ = Math.abs(zVal);
        isShaded = (z) => z >= absZ || z <= -absZ;
        pValue = 2 * (1 - normalCDF(absZ));
    }

    // Shade path
    let firstPoint = true;
    for (let i = 0; i <= resolution; i++) {
        const z = minZ + i * step;
        const x = mapX(z);
        const y = mapY(normalPDF(z));

        if (isShaded(z)) {
            if (firstPoint) {
                ctx.moveTo(x, h - padding);
                firstPoint = false;
            }
            ctx.lineTo(x, y);
        } else {
            if (!firstPoint) {
                ctx.lineTo(x, h - padding);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                firstPoint = true;
            }
        }
    }
    if (!firstPoint) {
        ctx.lineTo(mapX(maxZ), h - padding);
        ctx.closePath();
        ctx.fill();
    }

    // 2. Draw standard normal curve line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= resolution; i++) {
        const z = minZ + i * step;
        const x = mapX(z);
        const y = mapY(normalPDF(z));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 3. Draw Z-Score line indicators
    ctx.strokeStyle = 'var(--neon-red)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    
    // Draw line at selected Z
    ctx.beginPath();
    ctx.moveTo(mapX(zVal), mapY(0));
    ctx.lineTo(mapX(zVal), mapY(normalPDF(zVal)) - 10);
    ctx.stroke();
    
    if (testType === 'two-tailed') {
        // Draw matching opposite line for two-tailed test
        ctx.strokeStyle = 'rgba(248, 113, 113, 0.5)';
        ctx.beginPath();
        ctx.moveTo(mapX(-zVal), mapY(0));
        ctx.lineTo(mapX(-zVal), mapY(normalPDF(-zVal)) - 10);
        ctx.stroke();
    }
    ctx.setLineDash([]); // reset

    // Draw main axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, h - padding);
    ctx.lineTo(w - padding, h - padding);
    ctx.stroke();

    // Draw central line (z=0)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.moveTo(mapX(0), padding);
    ctx.lineTo(mapX(0), h - padding);
    ctx.stroke();

    // Text labels along axis
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('-3', mapX(-3), h - 12);
    ctx.fillText('-2', mapX(-2), h - 12);
    ctx.fillText('-1', mapX(-1), h - 12);
    ctx.fillText('0', mapX(0), h - 12);
    ctx.fillText('1', mapX(1), h - 12);
    ctx.fillText('2', mapX(2), h - 12);
    ctx.fillText('3', mapX(3), h - 12);

    // Update stats outputs in DOM
    document.getElementById('zcurve-pvalue').textContent = pValue.toFixed(4);
    
    let decisionText = '';
    if (pValue <= 0.05) {
        decisionText = `H0 reddedilir. p-değeri (${pValue.toFixed(4)}) <= α (0.05). Sonuç ANLAMLI.`;
        document.getElementById('zcurve-decision').style.color = 'var(--neon-red)';
    } else {
        decisionText = `H0 reddedilemez. p-değeri (${pValue.toFixed(4)}) > α (0.05). Sonuç ANLAMSIZ.`;
        document.getElementById('zcurve-decision').style.color = 'var(--text-main)';
    }
    document.getElementById('zcurve-decision').textContent = decisionText;
}
