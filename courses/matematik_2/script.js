// Riemann Sum Simulator Logic

let numRects = 4;
const rangeA = 0;
const rangeB = 4;

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('riemann-rects');
    const valLabel = document.getElementById('rects-val');
    const canvas = document.getElementById('riemann-canvas');

    if (canvas) {
        drawRiemann(canvas);
    }

    if (slider && valLabel) {
        slider.addEventListener('input', (e) => {
            numRects = parseInt(e.target.value);
            valLabel.textContent = numRects;
            drawRiemann(canvas);
        });
    }
});

// Function to integrate: f(x) = 0.25 * x^2
function f(x) {
    return 0.25 * x * x;
}

// Exact analytical integral from 0 to 4 is 5.333...
const exactIntegral = 16 / 3;

function drawRiemann(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const paddingX = 50;
    const paddingY = 30;

    const plotWidth = w - 2 * paddingX;
    const plotHeight = h - 2 * paddingY;

    // Coordinate mapping helpers
    // Cartesian X: [0, 4.5] (margin on right)
    // Cartesian Y: [0, 4.5] (margin on top)
    function mapX(x) {
        return paddingX + (x / 4.5) * plotWidth;
    }
    function mapY(y) {
        return h - paddingY - (y / 4.5) * plotHeight;
    }

    // 1. Draw Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 4.5; x += 1) {
        ctx.beginPath(); ctx.moveTo(mapX(x), 0); ctx.lineTo(mapX(x), h); ctx.stroke();
    }
    for (let y = 0; y <= 4.5; y += 1) {
        ctx.beginPath(); ctx.moveTo(0, mapY(y)); ctx.lineTo(w, mapY(y)); ctx.stroke();
    }

    // 2. Draw Riemann Rectangles (Right-hand sum)
    const dx = (rangeB - rangeA) / numRects;
    let riemannSum = 0;

    ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
    ctx.lineWidth = 1;

    for (let i = 0; i < numRects; i++) {
        // Right point coordinate
        const rx = rangeA + (i + 1) * dx;
        const ry = f(rx);
        riemannSum += ry * dx;

        const leftCanvasX = mapX(rx - dx);
        const rightCanvasX = mapX(rx);
        const topCanvasY = mapY(ry);
        const bottomCanvasY = mapY(0);

        const rectWidth = rightCanvasX - leftCanvasX;
        const rectHeight = bottomCanvasY - topCanvasY;

        ctx.fillRect(leftCanvasX, topCanvasY, rectWidth, rectHeight);
        ctx.strokeRect(leftCanvasX, topCanvasY, rectWidth, rectHeight);
    }

    // 3. Draw Axis Lines
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(paddingX, 0);
    ctx.lineTo(paddingX, h - paddingY);
    ctx.lineTo(w - paddingX, h - paddingY);
    ctx.stroke();

    // 4. Draw Function Curve f(x) = 0.25 * x^2
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const resolution = 100;
    const step = 4.5 / resolution;
    for (let i = 0; i <= resolution; i++) {
        const x = i * step;
        const y = f(x);
        if (i === 0) ctx.moveTo(mapX(x), mapY(y));
        else ctx.lineTo(mapX(x), mapY(y));
    }
    ctx.stroke();

    // X and Y axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    for (let x = 0; x <= 4; x++) {
        ctx.fillText(x.toString(), mapX(x), h - 12);
    }

    // Update DOM values
    document.getElementById('riemann-sum-val').textContent = riemannSum.toFixed(4);
    document.getElementById('exact-integral-val').textContent = exactIntegral.toFixed(4);
}
