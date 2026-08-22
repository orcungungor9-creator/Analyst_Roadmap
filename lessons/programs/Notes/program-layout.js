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

    // Local Storage & Rich Text Notepad Logic
    const editor = document.querySelector('.notepad-textarea');
    if (editor) {
        const pageId = window.location.pathname.split('/').pop().replace('.html', '');
        const storageKey = 'analyst_notes_' + pageId;
        
        // Load saved html
        const savedHtml = localStorage.getItem(storageKey);
        if (savedHtml) {
            editor.innerHTML = savedHtml;
        }

        // Save on input
        editor.addEventListener('input', () => {
            localStorage.setItem(storageKey, editor.innerHTML);
        });

        // Pen Colors - using document.execCommand and keeping focus
        const penBtns = document.querySelectorAll('.pen-color-btn');
        
        penBtns.forEach(btn => {
            // mousedown prevents the editor from losing focus
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                
                penBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                let color = btn.getAttribute('data-color');
                if (color.includes('var(--theme-color)')) {
                    color = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
                } else if (color.includes('var(--text-main)')) {
                    color = '#ffffff'; 
                }
                
                document.execCommand('styleWithCSS', false, true);
                document.execCommand('foreColor', false, color);
            });
            
            // click just saves the state after mousedown
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem(storageKey, editor.innerHTML);
            });
        });

        // Font Size Logic (H1, H3, P)
        const fontBtns = document.querySelectorAll('.font-btn');
        fontBtns.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                fontBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const action = btn.getAttribute('data-action');
                document.execCommand('styleWithCSS', false, false);
                document.execCommand('fontSize', false, action);
            });
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem(storageKey, editor.innerHTML);
            });
        });

        // Clear button
        const clearBtn = document.querySelector('.notepad-clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Notları temizlemek istediğinize emin misiniz?')) {
                    editor.innerHTML = '';
                    localStorage.removeItem(storageKey);
                }
            });
        }
    }

    // Notepad Copy Functionality
    const copyBtns = document.querySelectorAll('.notepad-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const editor = document.querySelector('.notepad-textarea');
            if(editor) {
                const textToCopy = editor.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = 'Kopyalandı! <i class="ph ph-check"></i>';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            }
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



