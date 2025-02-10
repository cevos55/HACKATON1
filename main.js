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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Projects Data
const projects = [
    {
        title: "Innovation Hub",
        description: "Centre d'innovation technologique de pointe",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        category: "Innovation"
    },
    {
        title: "Tech Academy",
        description: "Formation intensive en développement",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        category: "Education"
    },
    {
        title: "Smart City",
        description: "Solutions urbaines intelligentes",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        category: "Infrastructure"
    }
];

// Load Projects with Animation
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projects.forEach((project, index) => {
        const projectHTML = `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${index * 200}">
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" class="img-fluid">
                        <div class="project-overlay">
                            <div class="project-details text-center">
                                <span class="badge bg-primary mb-2">${project.category}</span>
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectHTML;
    });
}

// Blog Posts Data
const blogPosts = [
    {
        title: "L'avenir de la Tech en Afrique",
        excerpt: "Découvrez les innovations technologiques qui transforment l'Afrique",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        date: "15 Feb 2024",
        author: "Jean Dupont"
    },
    {
        title: "Intelligence Artificielle",
        excerpt: "Comment l'IA révolutionne le développement en Afrique",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        date: "10 Feb 2024",
        author: "Marie Claire"
    },
    {
        title: "Développement Web",
        excerpt: "Les meilleures pratiques pour le développement web moderne",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        date: "5 Feb 2024",
        author: "Paul Martin"
    }
];

// Load Blog Posts with Animation
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogPosts');
    blogPosts.forEach((post, index) => {
        const postHTML = `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${index * 200}">
                <div class="blog-card">
                    <div class="blog-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <small class="text-muted">${post.date}</small>
                            <small class="text-muted">${post.author}</small>
                        </div>
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                        <a href="#" class="btn btn-outline-primary">Lire plus</a>
                    </div>
                </div>
            </div>
        `;
        blogGrid.innerHTML += postHTML;
    });
}

// Contact Form with Animation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Animation de soumission
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Message envoyé avec succès!');
        form.reset();
        submitBtn.innerHTML = 'Envoyer';
        submitBtn.disabled = false;
    }, 1500);
});

// Initialize content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadBlogPosts();
    
    // Add scroll reveal animations
    ScrollReveal().reveal('.section-title', {
        delay: 200,
        distance: '50px',
        origin: 'bottom'
    });
});

// Cursor animation
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Particle background animation
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