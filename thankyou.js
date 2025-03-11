document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
});

document.querySelector('.bg-modal .btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the anchor tag
    document.querySelector('.bg-modal').style.display = 'none';
});
