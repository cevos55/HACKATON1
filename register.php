<?php
// Ajouter les en-têtes CORS pour autoriser les requêtes cross-origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Indiquer que la réponse est au format JSON
header("Content-Type: application/json");

// Configuration de la connexion à la base de données
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "users_db";

// Connexion à MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    echo json_encode([
      'success' => false,
      'message' => 'Échec de la connexion à la base de données : ' . $conn->connect_error
    ]);
    exit;
}

// Récupération des données envoyées par la méthode POST
$firstName     = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$lastName      = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$email         = isset($_POST['email']) ? trim($_POST['email']) : '';
$passwordInput = isset($_POST['password']) ? $_POST['password'] : '';

// Validation minimale (vous pouvez renforcer la validation côté serveur)
if (empty($firstName) || empty($lastName) || empty($email) || empty($passwordInput)) {
    echo json_encode([
      'success' => false,
      'message' => 'Tous les champs sont requis.'
    ]);
    exit;
}

// Vérifier que l'email n'existe pas déjà
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode([
      'success' => false,
      'message' => 'Cet email est déjà utilisé.'
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Hachage du mot de passe
$hashedPassword = password_hash($passwordInput, PASSWORD_DEFAULT);

// Préparation et exécution de l'insertion avec une requête préparée
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($stmt->execute()){
    echo json_encode([
      'success' => true,
      'message' => 'Inscription réussie.'
    ]);
} else {
    echo json_encode([
      'success' => false,
      'message' => 'Une erreur est survenue lors de l\'inscription.'
    ]);
}

$stmt->close();
$conn->close();
?>
