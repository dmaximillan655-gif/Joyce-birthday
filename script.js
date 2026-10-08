const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.querySelector('.slider-dots');
const prevButton = document.querySelector('.slider-btn.prev');
const nextButton = document.querySelector('.slider-btn.next');

const confettiLayer = document.querySelector('.confetti-layer');
if (confettiLayer) {
    const colors = ['#ffd166', '#ff7eb6', '#78f2d1', '#ba8cff', '#fdf2a6', '#ff9ed7'];

    for (let i = 0; i < 80; i += 1) {
        const piece = document.createElement('span');
        piece.className = 'confetti';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
        piece.style.animationDuration = `${4 + Math.random() * 5}s`;
        piece.style.animationDelay = `${Math.random() * 4}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiLayer.appendChild(piece);
    }
}

if (slides.length > 0) {
    let currentIndex = 0;

    const renderDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'slider-dot' + (index === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', `Show photo ${index + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const updateSlider = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    prevButton?.addEventListener('click', showPrev);
    nextButton?.addEventListener('click', showNext);

    renderDots();
    updateSlider();
    setInterval(showNext, 3500);
}
