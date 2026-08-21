document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
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

    // --- Mobile Sliding Drawer Logic ---
    const body = document.body;
    
    const overlay = document.createElement('div');
    overlay.className = 'notepad-overlay';
    body.appendChild(overlay);

    const fab = document.createElement('div');
    fab.className = 'notepad-fab';
    fab.innerHTML = '<i class="ph ph-book-bookmark"></i>';
    body.appendChild(fab);

    const rightColumn = document.querySelector('.right-column');

    fab.addEventListener('click', () => {
        if(rightColumn) {
            rightColumn.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    overlay.addEventListener('click', () => {
        if(rightColumn) {
            rightColumn.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
