let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides(n) {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'inactive');
        if (index === n) {
            slide.classList.add('active');
        } else {
            slide.classList.add('inactive');
        }
    });
    const endButton = document.getElementById('endButton');
    if (n === slides.length - 1) {
        endButton.style.display = 'block';
    } else {
        endButton.style.display = 'none';
    }
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = slides.length - 1; // Prevent looping forward
    } else if (slideIndex < 0) {
        slideIndex = 0; // Prevent looping backward
    }
    showSlides(slideIndex);
}

// Initialize the first slide
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

