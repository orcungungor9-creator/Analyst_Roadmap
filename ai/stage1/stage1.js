// stage1.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. YAPAY ZEKA NASIL ÇALIŞIR ---
    const btnSend = document.getElementById('wf-btn-send');
    const inputIncome = document.getElementById('wf-income-input');
    const processArea = document.getElementById('ai-processing-area');
    const spinner = document.getElementById('wf-spinner');
    const statusText = document.getElementById('wf-status-text');
    const paramIncomeBox = document.getElementById('param-income-box');
    const paramIncomeVal = document.getElementById('param-income-val');
    const resultText = document.getElementById('wf-result-text');

    btnSend.addEventListener('click', () => {
        let incomeValue = parseInt(inputIncome.value);
        
        if (isNaN(incomeValue) || incomeValue < 0) {
            // Show brief error if empty/invalid
            statusText.innerText = 'Lütfen geçerli bir gelir girin!';
            statusText.style.color = 'var(--neon-red)';
            setTimeout(() => {
                statusText.innerText = 'Model Beklemede...';
                statusText.style.color = 'var(--neon-blue)';
            }, 1500);
            return;
        }
        
        // Show processing area and reset states
        statusText.style.color = 'var(--neon-blue)';
        processArea.classList.add('show');
        spinner.classList.add('active');
        statusText.innerText = 'Veritabanı Taranıyor...';
        
        paramIncomeBox.classList.remove('highlight');
        paramIncomeVal.innerText = 'Taranıyor...';
        paramIncomeVal.style.color = 'var(--text-main)';
        
        resultText.classList.remove('show');
        resultText.innerText = '?';

        // Fake processing delay: Step 1 (Finding the parameter)
        setTimeout(() => {
            statusText.innerText = 'Gelir Parametresi Okundu!';
            paramIncomeBox.classList.add('highlight');
            
            // Show the user's input as the discovered income
            paramIncomeVal.innerText = incomeValue.toLocaleString('tr-TR') + ' TL';
            paramIncomeVal.style.color = 'var(--neon-orange)';
            
            // Step 2 (Decision Making)
            setTimeout(() => {
                spinner.classList.remove('active');
                statusText.innerText = 'Analiz Tamamlandı.';
                
                // Machine logic: Approve if income > 28000
                const isApproved = incomeValue > 28000;
                resultText.innerText = isApproved ? 'ONAY (EVET)' : 'RED (HAYIR)';
                resultText.style.color = isApproved ? 'var(--neon-green)' : 'var(--neon-red)';
                resultText.style.textShadow = isApproved ? '0 0 20px rgba(52, 211, 153, 0.4)' : '0 0 20px rgba(239, 68, 68, 0.4)';
                resultText.classList.add('show');
            }, 1500);

        }, 1200);
    });





});
