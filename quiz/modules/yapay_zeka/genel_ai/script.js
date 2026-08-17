document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Eğer tıklanan zaten açıksa kapat
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Diğer tüm akordiyonları kapat
                document.querySelectorAll('.accordion-item').forEach(accItem => {
                    accItem.classList.remove('active');
                });
                // Tıklananı aç
                item.classList.add('active');
            }
        });
    });
});
