// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Animation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize particles.js on home page
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 6
            }
        }
    });
}

// Page specific initializations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page specific features based on current page
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('about.html')) {
        initializeAboutPage();
    } else if (currentPage.includes('events.html')) {
        initializeEventsPage();
    } else if (currentPage.includes('projects.html')) {
        initializeProjectsPage();
    } else if (currentPage.includes('blog.html')) {
        initializeBlogPage();
    } else if (currentPage.includes('contact.html')) {
        initializeContactPage();
    }
});

// Page specific functions
function initializeAboutPage() {
    // Add any specific about page animations or functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
}

function initializeEventsPage() {
    // Events page specific functionality
}

function initializeProjectsPage() {
    // Projects page specific functionality
}

function initializeBlogPage() {
    // Blog page specific functionality
}

function initializeContactPage() {
    // Contact page specific functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Message envoyé avec succès!');
        form.reset();
        submitBtn.innerHTML = 'Envoyer';
        submitBtn.disabled = false;
    }, 1500);
}