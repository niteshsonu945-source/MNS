// Simple lightbox for the gallery
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    const lb = document.getElementById('lightbox');
    const lbImage = document.getElementById('lbImage');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    let index = 0;

    function openLightbox(i) {
        index = i;
        lbImage.src = thumbs[index].src;
        lbImage.alt = thumbs[index].alt || '';
        lb.classList.remove('hidden');
        lb.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lb.classList.add('hidden');
        lb.setAttribute('aria-hidden', 'true');
        lbImage.src = '';
    }

    function showPrev() { index = (index - 1 + thumbs.length) % thumbs.length;
        openLightbox(index); }

    function showNext() { index = (index + 1) % thumbs.length;
        openLightbox(index); }

    thumbs.forEach((t, i) => t.addEventListener('click', () => openLightbox(i)));
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', showPrev);
    lbNext.addEventListener('click', showNext);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (lb.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});