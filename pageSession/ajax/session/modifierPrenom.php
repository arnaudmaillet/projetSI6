<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = $_SESSION['user']['email'];
$prenom = $_POST['prenom'];


// Cas ou le prénom est le même
if ($_SESSION['user']['prenom'] == $prenom){
    echo "0";
}
else{
    // Mise a jour du prénom dans la bd
    $sql = <<<EOD
    update session
        set prenom = :prenom
    where email = :email;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->bindParam('prenom',$prenom);
    $curseur->execute();
    $curseur->closeCursor();

    // Mise a jour du prénom dans la variable de session
    $_SESSION['user']['prenom'] = $prenom;
    echo "1";
}

