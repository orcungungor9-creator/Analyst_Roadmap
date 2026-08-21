document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-item.active').forEach(other => {
                    other.classList.remove('active');
                    other.querySelector('.accordion-content').style.maxHeight = null;
                });
                
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

    // Notepad Copy Functionality
    const copyBtns = document.querySelectorAll('.notepad-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textarea = btn.previousElementSibling;
            textarea.select();
            document.execCommand('copy');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Kopyalandı! <i class="ph ph-check"></i>';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        });
    });
