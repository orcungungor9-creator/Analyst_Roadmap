// how_to_start Page Scripts

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.ecosystem-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.ecosystem-card');
    
    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    const maxIndex = cards.length - 1;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 40;
        const moveAmount = (cardWidth + gap) * currentIndex;
        
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(updateCarousel, 250);
    });
    
    // Resize Observer for robust dynamic calculation
    const resizeObserver = new ResizeObserver(() => {
        updateCarousel();
    });
    resizeObserver.observe(track);
    
    updateCarousel();
});

// Genel Bilgiler Toggle Function
window.toggleGIContent = function() {
    const content = document.getElementById('giHiddenContent');
    const btn = document.getElementById('giReadMoreBtn');
    const span = btn.querySelector('span');
    
    if (content.style.display === 'none') {
        // Expand
        content.style.display = 'block';
        btn.classList.add('open');
        span.textContent = 'Daha Az Göster';
    } else {
        // Collapse
        content.style.display = 'none';
        btn.classList.remove('open');
        span.textContent = 'Devamýný Oku';
        
        // Scroll back to top of the card smoothly if the user is far down
        const cardTop = document.getElementById('genel').getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: cardTop - 120, behavior: 'smooth' });
    }
};

