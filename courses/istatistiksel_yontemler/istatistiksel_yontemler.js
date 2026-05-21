// t-Test Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-ttest-btn');
    if (runBtn) {
        runBtn.addEventListener('click', calculateTTest);
        // Initial run
        calculateTTest();
    }
});

function calculateTTest() {
    const groupAVal = document.getElementById('group-a-input').value;
    const groupBVal = document.getElementById('group-b-input').value;

    const groupA = groupAVal.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    const groupB = groupBVal.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

    if (groupA.length < 2 || groupB.length < 2) {
        alert('Lütfen her iki grup için de en az 2 sayısal değer girin.');
        return;
    }

    const n1 = groupA.length;
    const n2 = groupB.length;

    // Means
    const mean1 = groupA.reduce((a,b)=>a+b, 0) / n1;
    const mean2 = groupB.reduce((a,b)=>a+b, 0) / n2;

    // Variances
    const ss1 = groupA.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0);
    const ss2 = groupB.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0);

    const var1 = ss1 / (n1 - 1);
    const var2 = ss2 / (n2 - 1);

    // Pooled Variance
    const df = n1 + n2 - 2;
    const pooledVar = ((n1 - 1) * var1 + (n2 - 1) * var2) / df;

    // Standard Error and t-stat
    const se = Math.sqrt(pooledVar * (1/n1 + 1/n2));
    const tStat = (mean1 - mean2) / se;

    // Decision
    const critT = getCriticalT(df);
    const absT = Math.abs(tStat);
    
    let decisionText = '';
    if (absT > critT) {
        decisionText = `H0 reddedilir. Gruplar arasındaki fark istatistiksel olarak ANLAMLI (t = ${tStat.toFixed(3)}, Kritik t = ${critT.toFixed(3)}).`;
    } else {
        decisionText = `H0 reddedilemez. Gruplar arasındaki fark istatistiksel olarak ANLAMSIZ (t = ${tStat.toFixed(3)}, Kritik t = ${critT.toFixed(3)}).`;
    }

    // Update DOM
    document.getElementById('mean-a').textContent = mean1.toFixed(2);
    document.getElementById('mean-b').textContent = mean2.toFixed(2);
    document.getElementById('t-stat').textContent = tStat.toFixed(3);
    document.getElementById('df-val').textContent = df;
    document.getElementById('ttest-decision').textContent = decisionText;
}

function getCriticalT(df) {
    if (df <= 1) return 12.706;
    if (df === 2) return 4.303;
    if (df === 3) return 3.182;
    if (df === 4) return 2.776;
    if (df === 5) return 2.571;
    if (df === 6) return 2.447;
    if (df === 7) return 2.365;
    if (df === 8) return 2.306;
    if (df === 9) return 2.262;
    if (df === 10) return 2.228;
    if (df === 11) return 2.201;
    if (df === 12) return 2.179;
    if (df === 13) return 2.160;
    if (df === 14) return 2.145;
    if (df === 15) return 2.131;
    if (df === 20) return 2.086;
    if (df === 25) return 2.060;
    if (df === 30) return 2.042;
    if (df > 30) return 1.96 + (1.96 / df);
    return 2.0;
}
