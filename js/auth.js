document.addEventListener('DOMContentLoaded', () => {
    // Initialisation d'AOS (si défini)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Gestion de la navbar lors du scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle de la visibilité des mots de passe
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (!input || !icon) return;

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Gestion de la validation des formulaires
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});

function handleLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');

    // Réinitialiser les validations précédentes
    resetValidation(form);

    // Validation de l'email
    if (!validateEmail(email.value)) {
        showError(email, 'Veuillez entrer une adresse email valide');
        email.focus();
        return;
    }

    // Validation de la longueur du mot de passe
    if (password.value.length < 8) {
        showError(password, 'Le mot de passe doit contenir au moins 8 caractères');
        password.focus();
        return;
    }

    // Passage en mode chargement
    submitBtn.disabled = true;
    btnText.classList.add('d-none');
    spinner.classList.remove('d-none');

    // Simulation d'un appel API
    setTimeout(() => {
        // Réinitialiser l'état du bouton
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');

        // Redirection vers le tableau de bord (exemple)
        window.location.href = '../index.html';
    }, 2000);
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirmPassword');
    const terms = form.querySelector('#terms');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');

    // Réinitialiser les validations précédentes
    resetValidation(form);

    let isValid = true;

    if (!firstName.value.trim()) {
        showError(firstName, 'Le prénom est requis');
        isValid = false;
    }

    if (!lastName.value.trim()) {
        showError(lastName, 'Le nom est requis');
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Veuillez entrer une adresse email valide');
        isValid = false;
    }

    if (password.value.length < 8) {
        showError(password, 'Le mot de passe doit contenir au moins 8 caractères');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Les mots de passe ne correspondent pas');
        isValid = false;
    }

    if (!terms.checked) {
        showError(terms, 'Vous devez accepter les conditions d\'utilisation');
        isValid = false;
    }

    if (!isValid) return;

    // Passage en mode chargement
    submitBtn.disabled = true;
    btnText.classList.add('d-none');
    spinner.classList.remove('d-none');

    // Simulation d'un appel API
    setTimeout(() => {
        // Réinitialiser l'état du bouton
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');

        // Redirection vers la page de connexion
        window.location.href = 'login.html';
    }, 2000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

function resetValidation(form) {
    form.querySelectorAll('.is-invalid').forEach(input => {
        input.classList.remove('is-invalid');
    });
}
