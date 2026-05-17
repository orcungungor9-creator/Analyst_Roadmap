// modal.js - Modal handling module
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close mobile nav when modal opens
    if (window.closeNavMenu) window.closeNavMenu();

    // If formulas modal, reset search panel state
    if (modalId === 'formulas-modal') {
        const panel = document.getElementById('search-panel');
        const btn = document.getElementById('search-toggle-btn');
        panel?.classList.remove('collapsed');
        btn?.classList.remove('collapsed');
        // Attach scroll listener once
        const body = document.getElementById('formula-list');
        if (body && !body._searchScrollBound) {
            body._searchScrollBound = true;
            let lastScroll = 0;
            body.addEventListener('scroll', () => {
                const curr = body.scrollTop;
                if (curr > lastScroll && curr > 60) {
                    panel?.classList.add('collapsed');
                    btn?.classList.add('collapsed');
                }
                lastScroll = curr;
            });
        }
        // Lazy load formulas data if not already loaded
        if (typeof window.formulasData === 'undefined') {
            const script = document.createElement('script');
            script.src = 'data.js';
            script.onload = () => {
                if (window.initFormulas) window.initFormulas();
            };
            document.head.appendChild(script);
        } else {
            if (window.initFormulas) window.initFormulas();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initOverlayClicks() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', event => {
            if (event.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

function initEscClose() {
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const active = document.querySelector('.modal-overlay.active');
            if (active) {
                active.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

function initModal() {
    initOverlayClicks();
    initEscClose();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.initModal = initModal;
