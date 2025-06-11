document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Optionally, show the home section by default
    if (sections.length > 0) {
        sections[0].classList.add('active'); // Show the home section initially
    }
});

function openRatingModal(id) {
    document.getElementById('history-rating-modal').style.display = 'block';
}

function closeRatingModal() {
    document.getElementById('history-rating-modal').style.display = 'none';
}

function submitRating() {
    closeRatingModal();
    alert('The rating has been sent');
}

// Star rating logic
const stars = document.querySelectorAll('.history-rating-stars .star');
stars.forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = this.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('active'));
        for (let i = 0; i < ratingValue; i++) {
            stars[i].classList.add('active');
        }
    });
});