document.addEventListener("DOMContentLoaded", () => {
    // Lazy load observer for images and cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's an image, we can also handle src swapping if we were using data-src
                // But since we use loading="lazy" in HTML natively, just the fade effect is enough
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with lazy-fade class
    const lazyElements = document.querySelectorAll('.lazy-fade');
    lazyElements.forEach(el => {
        observer.observe(el);
    });
});
