<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = $_SESSION['user']['email'];
$nom = $_POST['nom'];


// Cas ou le nom est le même
if ($_SESSION['user']['nom'] == $nom){
    echo "0";
}
else{
    // Mise a jour du nom dans la bd
    $sql = <<<EOD
    update session
        set nom = :nom
    where email = :email;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->bindParam('nom',$nom);
    $curseur->execute();
    $curseur->closeCursor();

    // Mise a jour du nom dans la variable de session
    $_SESSION['user']['nom'] = $nom;
    echo "1";
}



