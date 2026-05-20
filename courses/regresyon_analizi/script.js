// OLS Regression Plotter Logic

let points = [];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('regression-canvas');
    const clearBtn = document.getElementById('clear-points-btn');

    if (canvas) {
        initCanvas(canvas);
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            // Scale click coordinates to match canvas width/height attributes
            const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
            const y = canvas.height - (((e.clientY - rect.top) / rect.height) * canvas.height);
            
            points.push({ x, y });
            updateRegression();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            points = [];
            updateRegression();
        });
    }
});

function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw coordinate axis lines at bottom/left margins
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, canvas.height - 30);
    ctx.lineTo(canvas.width, canvas.height - 30);
    ctx.stroke();

    if (points.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Grafiğe tıklayarak veri noktaları ekleyin.', canvas.width / 2, canvas.height / 2);
    }
}

function updateRegression() {
    const canvas = document.getElementById('regression-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Re-draw background structure
    initCanvas(canvas);
    
    document.getElementById('points-count').textContent = points.length;

    // Draw all points
    ctx.fillStyle = 'var(--neon-yellow)';
    points.forEach(p => {
        ctx.beginPath();
        // Convert Cartesian y back to Canvas y
        ctx.arc(p.x, canvas.height - p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 4;
        ctx.stroke();
    });

    if (points.length < 2) {
        // Reset output values
        document.getElementById('reg-equation').textContent = 'Y = b0 + b1*X';
        document.getElementById('reg-r2').textContent = '-';
        document.getElementById('reg-slope').textContent = '-';
        return;
    }

    // OLS Math
    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;

    let num = 0;
    let den = 0;
    points.forEach(p => {
        num += (p.x - meanX) * (p.y - meanY);
        den += Math.pow(p.x - meanX, 2);
    });

    // Check divide by zero (vertical line of points)
    if (den === 0) return;

    const slope = num / den;
    const intercept = meanY - slope * meanX;

    // Calculate R-Square
    let sse = 0; // sum of squared errors
    let sst = 0; // total sum of squares
    points.forEach(p => {
        const predictedY = intercept + slope * p.x;
        sse += Math.pow(p.y - predictedY, 2);
        sst += Math.pow(p.y - meanY, 2);
    });

    const r2 = sst === 0 ? 0 : 1 - (sse / sst);

    // Draw Regression Line
    ctx.strokeStyle = 'var(--neon-yellow)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    // Line starting point (x=30 is Y-axis offset)
    const startX = 30;
    const startY = intercept + slope * startX;
    
    // Line ending point (x=canvas.width)
    const endX = canvas.width - 10;
    const endY = intercept + slope * endX;

    ctx.moveTo(startX, canvas.height - startY);
    ctx.lineTo(endX, canvas.height - endY);
    ctx.stroke();

    // Update statistics elements
    const sign = intercept >= 0 ? '+' : '-';
    const absIntercept = Math.abs(intercept);
    document.getElementById('reg-equation').textContent = `Y = ${slope.toFixed(2)}*X ${sign} ${absIntercept.toFixed(2)}`;
    document.getElementById('reg-r2').textContent = r2.toFixed(3);
    document.getElementById('reg-slope').textContent = slope.toFixed(2);
}
