// Derivative Tangent Line Visualizer Logic

let selectedFunc = 'parabola';
let currentMouseX = 275; // Initial center position

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('derivative-canvas');
    const funcSelect = document.getElementById('function-select');

    if (canvas) {
        // Initial draw
        drawDerivative(canvas);

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            // Scale clientX to canvas internal pixel width
            currentMouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
            drawDerivative(canvas);
        });

        canvas.addEventListener('mouseleave', () => {
            currentMouseX = canvas.width / 2;
            drawDerivative(canvas);
        });
    }

    if (funcSelect) {
        funcSelect.addEventListener('change', (e) => {
            selectedFunc = e.target.value;
            drawDerivative(canvas);
        });
    }
});

// Define functions and their derivatives
const mathFunctions = {
    parabola: {
        f: (x) => 0.1 * x * x,
        df: (x) => 0.2 * x,
        scale: 40,
        range: { min: -6, max: 6 }
    },
    sine: {
        f: (x) => 2 * Math.sin(x),
        df: (x) => 2 * Math.cos(x),
        scale: 40,
        range: { min: -6, max: 6 }
    },
    cubic: {
        f: (x) => 0.05 * (x * x * x - 6 * x),
        df: (x) => 0.05 * (3 * x * x - 6),
        scale: 40,
        range: { min: -6, max: 6 }
    }
};

function drawDerivative(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;

    const fnConfig = mathFunctions[selectedFunc];
    const scale = fnConfig.scale;

    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Draw main axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, centerY); ctx.lineTo(w, centerY); // X axis
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, h); // Y axis
    ctx.stroke();

    // Map canvas X to Cartesian X
    const targetCartesianX = (currentMouseX - centerX) / scale;
    const targetCartesianY = fnConfig.f(targetCartesianX);
    const targetSlope = fnConfig.df(targetCartesianX);

    // Draw function curve
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2.5;
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

    // Draw Tangent Line: y = m(x - x0) + y0
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let cx = 0; cx < w; cx++) {
        const cartX = (cx - centerX) / scale;
        // Tangent line equation
        const tangentCartY = targetSlope * (cartX - targetCartesianX) + targetCartesianY;
        const cy = centerY - tangentCartY * scale;
        
        if (cx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Draw active point dot
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(currentMouseX, centerY - targetCartesianY * scale, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Update DOM outputs
    document.getElementById('deriv-point').textContent = `x = ${targetCartesianX.toFixed(2)}, y = ${targetCartesianY.toFixed(2)}`;
    document.getElementById('deriv-slope').textContent = targetSlope.toFixed(3);
}
