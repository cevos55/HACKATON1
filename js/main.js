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

    loadBlogPosts();
    loadRecommendedPosts();
    
    // Search and filter functionality
    const searchInput = document.getElementById('searchInput');
    const filterCategory = document.getElementById('filterCategory');
    const filterDate = document.getElementById('filterDate');

    searchInput.addEventListener('input', filterBlogPosts);
    filterCategory.addEventListener('change', filterBlogPosts);
    filterDate.addEventListener('change', filterBlogPosts);
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
    setupInfiniteScroll();
    setupCTAMicroInteractions();
    setupPostClickAnimation();
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
        form.reset();
        submitBtn.innerHTML = 'Envoyer mon message';
        submitBtn.disabled = false;
        
        const thankYouMessage = document.getElementById('thankYouMessage');
        thankYouMessage.style.display = 'block';
        thankYouMessage.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            thankYouMessage.style.display = 'none';
            thankYouMessage.classList.remove('animate__animated', 'animate__fadeIn');
        }, 5000);
    }, 1500);
}

// Blog Posts Data
const blogPosts = {
    articles: [
        {
            title: "L'avenir de la Tech en Afrique",
            excerpt: "Découvrez les innovations technologiques qui transforment l'Afrique",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            date: "2024-02-15",
            author: "Jean Dupont",
            video: "https://www.youtube.com/embed/ScMzIvxBSi4"
        },
        {
            title: "Intelligence Artificielle",
            excerpt: "Comment l'IA révolutionne le développement en Afrique",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            date: "2024-02-10",
            author: "Marie Claire",
            infographic: "path/to/infographic-intelligence-artificielle.jpg"
        }
    ],
    tutorials: [
        {
            title: "Développement Web",
            excerpt: "Les meilleures pratiques pour le développement web moderne",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            date: "2024-02-05",
            author: "Paul Martin"
        }
    ],
    guides: [
        {
            title: "Guide de la cybersécurité",
            excerpt: "Protégez vos données avec ces conseils",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            date: "2024-02-01",
            author: "Alice Johnson"
        }
    ],
    caseStudies: [
        {
            title: "Étude de cas: Smart City",
            excerpt: "Comment nous avons transformé une ville avec la technologie",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            date: "2024-01-25",
            author: "John Doe"
        }
    ]
};

// Load Blog Posts with Animation
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = ''; // Clear existing posts
    Object.keys(blogPosts).forEach(category => {
        blogPosts[category].forEach((post, index) => {
            const postHTML = `
                <div class="blog-card" data-aos="fade-up" data-aos-delay="${index * 200}">
                    <div class="blog-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="blog-content">
                        <div class="d-flex justify-content-between mb-2">
                            <small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
                            <small class="text-muted">${post.author}</small>
                        </div>
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                        ${post.video ? `<div class="video-container"><iframe src="${post.video}" frameborder="0" allowfullscreen></iframe></div>` : ''}
                        ${post.infographic ? `<img src="${post.infographic}" alt="Infographic" class="img-fluid mt-3">` : ''}
                        <a href="#" class="btn btn-outline-primary cta-btn">Lire plus</a>
                    </div>
                </div>
            `;
            blogGrid.innerHTML += postHTML;
        });
    });
}

// Load Recommended Posts with Animation
function loadRecommendedPosts() {
    const recommendedGrid = document.getElementById('recommendedGrid');
    recommendedGrid.innerHTML = ''; // Clear existing posts
    const recommendedPosts = [
        blogPosts.articles[0],
        blogPosts.tutorials[0],
        blogPosts.guides[0]
    ];
    recommendedPosts.forEach((post, index) => {
        const postHTML = `
            <div class="recommended-card" data-aos="fade-up" data-aos-delay="${index * 200}">
                <div class="recommended-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="recommended-content">
                    <div class="d-flex justify-content-between mb-2">
                        <small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
                        <small class="text-muted">${post.author}</small>
                    </div>
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.excerpt}</p>
                    ${post.video ? `<div class="video-container"><iframe src="${post.video}" frameborder="0" allowfullscreen></iframe></div>` : ''}
                    ${post.infographic ? `<img src="${post.infographic}" alt="Infographic" class="img-fluid mt-3">` : ''}
                    <a href="#" class="btn btn-outline-light cta-btn">Lire plus</a>
                </div>
            </div>
        `;
        recommendedGrid.innerHTML += postHTML;
    });
}

function filterBlogPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('filterCategory').value;
    const selectedDate = document.getElementById('filterDate').value;

    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = ''; // Clear existing posts

    Object.keys(blogPosts).forEach(category => {
        if (selectedCategory && category !== selectedCategory) return;

        blogPosts[category].forEach((post, index) => {
            const postDate = new Date(post.date).toISOString().split('T')[0];
            if (
                (searchTerm && !post.title.toLowerCase().includes(searchTerm) && !post.excerpt.toLowerCase().includes(searchTerm)) ||
                (selectedDate && postDate !== selectedDate)
            ) {
                return;
            }

            const postHTML = `
                <div class="blog-card" data-aos="fade-up" data-aos-delay="${index * 200}">
                    <div class="blog-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="blog-content">
                        <div class="d-flex justify-content-between mb-2">
                            <small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
                            <small class="text-muted">${post.author}</small>
                        </div>
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                        ${post.video ? `<div class="video-container"><iframe src="${post.video}" frameborder="0" allowfullscreen></iframe></div>` : ''}
                        ${post.infographic ? `<img src="${post.infographic}" alt="Infographic" class="img-fluid mt-3">` : ''}
                        <a href="#" class="btn btn-outline-primary cta-btn">Lire plus</a>
                    </div>
                </div>
            `;
            blogGrid.innerHTML += postHTML;
        });
    });
}

function setupInfiniteScroll() {
    let page = 1;
    const loadMorePosts = () => {
        // Simulate loading more posts
        setTimeout(() => {
            loadBlogPosts();
            page++;
        }, 1000);
    };

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadMorePosts();
        }
    });
}

function setupCTAMicroInteractions() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.classList.add('hovered');
        });
        button.addEventListener('mouseout', () => {
            button.classList.remove('hovered');
        });
    });
}

function setupPostClickAnimation() {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            setTimeout(() => {
                window.location.href = post.querySelector('a').href;
            }, 500);
        });
    });
}