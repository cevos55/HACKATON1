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
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Toggle de la visibilité des mots de passe
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            // On recherche l'input dans le conteneur parent du bouton
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

    // Récupération des formulaires et affectation des événements submit
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});

/**
 * Gestion de la soumission du formulaire de connexion.
 * Appel d'une API simulée redirigeant vers le tableau de bord après traitement.
 */
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

    // Préparation des données à envoyer
    const formData = new URLSearchParams();
    formData.append('email', email.value);
    formData.append('password', password.value);

    // Envoi des données via fetch()
    fetch('http://localhost/votre-projet/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion au serveur : ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Réinitialiser l'état du bouton
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');

        if (data.success) {
            alert('Connexion réussie');
            // Rediriger vers la page d'accueil ou le tableau de bord
            window.location.href = '../index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');
        alert('Une erreur est survenue lors de la connexion au serveur : ' + error.message);
    });
}

/**
 * Gestion de la soumission du formulaire d'inscription.
 * Les données sont envoyées via fetch() au script PHP pour l'enregistrement.
 */
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

    // Préparation des données à envoyer
    const formData = new URLSearchParams();
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('email', email.value);
    formData.append('password', password.value);

    fetch('http://localhost/votre-projet/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion au serveur : ' + response.status);
        }
        return response.text(); // On lit la réponse en texte
    })
    .then(text => {
        try {
            return JSON.parse(text); // Tenter de parser le JSON
        } catch (err) {
            throw new Error('La réponse n\'est pas un JSON valide: ' + text);
        }
    })
    .then(data => {
        // Réinitialiser l'état du bouton
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');

        if (data.success) {
            // Redirection vers la page de connexion en cas d'inscription réussie
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        spinner.classList.add('d-none');
        alert('Une erreur est survenue lors de la connexion au serveur: ' + error.message);
    });
}

/**
 * Vérifie que l'adresse email est valide.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

/**
 * Affiche un message d'erreur en ajoutant la classe 'is-invalid' à l'input concerné.
 * @param {HTMLElement} input
 * @param {string} message
 */
function showError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

/**
 * Réinitialise les validations en supprimant la classe 'is-invalid' de tous les inputs du formulaire.
 * @param {HTMLFormElement} form
 */
function resetValidation(form) {
    form.querySelectorAll('.is-invalid').forEach(input => {
        input.classList.remove('is-invalid');
    });
}
