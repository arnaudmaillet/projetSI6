<?php
include "../class/class.database.inc.php";
session_start();

$db = Database::getInstance();

// récupérer les données envoyées
$email = $_POST['email'];

// Requete permmettant de retourner la question secrete de la session
$sql = <<<EOD
    Select email, question from session
    where email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();

// Cas ou la session n'existe pas
if (!$ligne['email'])
    echo "0";
else{
    // Sinon on récupère la question dans une variable de session
    $_SESSION['user']['question'] = $ligne['question'];
    $_SESSION['user']['email'] = $ligne['email'];
    echo "1";
}



