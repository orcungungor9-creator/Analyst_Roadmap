// modal.js - Modal handling module
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close mobile nav when modal opens
    if (window.closeNavMenu) window.closeNavMenu();
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
