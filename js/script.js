// script.js - Global main entry point

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('analyst_theme') || 'theme-light-purple';
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
    if (savedTheme !== 'theme-dark') {
        document.body.classList.add(savedTheme);
    }
    
    // Update active state in theme cards if modal is present
    document.querySelectorAll('.theme-card').forEach(card => {
        if (card.getAttribute('data-theme') === savedTheme) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function setTheme(themeName) {
    localStorage.setItem('analyst_theme', themeName);
    initTheme();
}

// Initialize global modules after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    if (window.initNavOutsideClick) window.initNavOutsideClick();
    if (window.initModal) window.initModal();
    initFullScreenViewer();
}); // end DOMContentLoaded

// ==========================================
// FULLSCREEN LIGHTBOX & PREVIEW MANAGEMENT
// ==========================================
function initFullScreenViewer() {
    // 1. Create Modal DOM if not exists
    let modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fullscreen-viewer-modal';
        modal.className = 'fullscreen-viewer-modal';
        modal.innerHTML = `
            <div class="fullscreen-topbar">
                <div class="fullscreen-topbar-left">
                    <span id="fullscreen-modal-icon" style="font-size: 1.5rem;">🖥️</span>
                    <h3 id="fullscreen-title" class="fullscreen-topbar-title">Kod / Arayüz Önizleme</h3>
                </div>
                <div class="fullscreen-topbar-right">
                    <button id="fullscreen-copy-btn" class="fullscreen-copy-btn" onclick="copyFullScreenCode()" title="Kodu Kopyala">
                        <svg id="fullscreen-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span id="fullscreen-copy-text">Kodu Kopyala</span>
                    </button>
                    <button class="fullscreen-close-btn" onclick="closeFullScreenViewer()" title="Kapat (ESC)">&times;</button>
                </div>
            </div>
            <div class="fullscreen-content-container" onclick="if(event.target === this) closeFullScreenViewer()">
                <img id="fullscreen-img" class="fullscreen-img" alt="Fullscreen Preview">
                <div id="fullscreen-code-box" class="fullscreen-code-box">
                    <pre><code id="fullscreen-code"></code></pre>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Escape key listener for closing
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeFullScreenViewer();
            }
        });
    }

    // 2. Add Fullscreen buttons to Code Blocks (<pre>)
    document.querySelectorAll('pre').forEach((pre) => {
        // Skip if already processed or if it's inside the fullscreen modal itself
        if (pre.closest('#fullscreen-viewer-modal') || pre.hasAttribute('data-fs-init')) return;
        pre.setAttribute('data-fs-init', 'true');

        const parent = pre.parentElement; // This is the dark box with background #0d1117 and overflow-x: auto
        if (!parent || !parent.parentNode) return;

        // Create a wrapper div to hold the dark box and the absolute button
        const wrapper = document.createElement('div');
        wrapper.className = 'code-fullscreen-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        
        // Preserve any bottom margin from the parent
        const parentStyle = window.getComputedStyle(parent);
        wrapper.style.marginBottom = parentStyle.marginBottom;
        parent.style.marginBottom = '0';

        // Insert wrapper before parent, then move parent inside wrapper
        parent.parentNode.insertBefore(wrapper, parent);
        wrapper.appendChild(parent);

        const btn = document.createElement('button');
        btn.className = 'fullscreen-toggle-btn';
        btn.title = 'Tam Ekran Göster';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            <span>Tam Ekran</span>
        `;
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openFullScreenViewer({
                type: 'code',
                content: pre.querySelector('code') ? pre.querySelector('code').innerHTML : pre.innerHTML,
                title: 'Kod Sözdizimi & Kullanım Örneği',
                icon: '<>'
            });
        });

        // Append button to WRAPPER (outside the overflow-x: auto box) so it stays visible at top right
        wrapper.appendChild(btn);
    });

    // 3. Add Fullscreen buttons to Preview Images (img[src*="preview"], etc.)
    document.querySelectorAll('img[src*="preview"], img[src*="dashboard"], img[src*="interface"]').forEach((img) => {
        // Skip if already processed or inside fullscreen modal
        if (img.closest('#fullscreen-viewer-modal') || img.hasAttribute('data-fs-init')) return;
        img.setAttribute('data-fs-init', 'true');

        const parent = img.parentElement;
        if (!parent) return;

        if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        const btn = document.createElement('button');
        btn.className = 'fullscreen-toggle-btn';
        btn.title = 'Tam Ekran Göster';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            <span>Tam Ekran</span>
        `;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openFullScreenViewer({
                type: 'image',
                src: img.src,
                title: img.alt ? img.alt.replace(/^🖥️\s*/, '') : 'Arayüz & Dashboard Önizleme',
                icon: '🖥️'
            });
        });

        parent.appendChild(btn);
    });
}

function openFullScreenViewer({ type, content, src, title, icon }) {
    const modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) return;

    const titleEl = document.getElementById('fullscreen-title');
    const iconEl = document.getElementById('fullscreen-modal-icon');
    const copyBtn = document.getElementById('fullscreen-copy-btn');
    const imgEl = document.getElementById('fullscreen-img');
    const codeBox = document.getElementById('fullscreen-code-box');
    const codeEl = document.getElementById('fullscreen-code');

    if (titleEl) titleEl.textContent = title;
    if (iconEl) iconEl.textContent = icon || '🖥️';

    if (type === 'code') {
        imgEl.style.display = 'none';
        codeBox.style.display = 'block';
        codeEl.innerHTML = content;
        copyBtn.style.display = 'flex';
        const span = copyBtn.querySelector('span');
        if (span) span.textContent = 'Kodu Kopyala';
        const newIcon = copyBtn.querySelector('svg');
        if (newIcon && copyBtn.dataset.origSvg) {
            newIcon.outerHTML = copyBtn.dataset.origSvg;
        }
        copyBtn.classList.remove('copied');
    } else {
        codeBox.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = src;
        copyBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullScreenViewer() {
    const modal = document.getElementById('fullscreen-viewer-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function copyFullScreenCode() {
    const codeEl = document.getElementById('fullscreen-code');
    const copyBtn = document.getElementById('fullscreen-copy-btn');
    if (!codeEl || !copyBtn) return;

    const text = codeEl.innerText || codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const span = copyBtn.querySelector('span');
        const iconEl = copyBtn.querySelector('svg');
        if (span) span.textContent = 'Kopyalandı! ✓';
        if (iconEl) {
            if (!copyBtn.dataset.origSvg) copyBtn.dataset.origSvg = iconEl.outerHTML;
            iconEl.outerHTML = `<svg id="fullscreen-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        }
        copyBtn.classList.add('copied');
        setTimeout(() => {
            if (span) span.textContent = 'Kodu Kopyala';
            const newIcon = copyBtn.querySelector('svg');
            if (newIcon && copyBtn.dataset.origSvg) {
                newIcon.outerHTML = copyBtn.dataset.origSvg;
            }
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama başarısız:', err);
    });
}

window.setTheme = setTheme;
window.initTheme = initTheme;
window.initFullScreenViewer = initFullScreenViewer;
window.openFullScreenViewer = openFullScreenViewer;
window.closeFullScreenViewer = closeFullScreenViewer;
window.copyFullScreenCode = copyFullScreenCode;