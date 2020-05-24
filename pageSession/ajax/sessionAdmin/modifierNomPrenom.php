<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = $_POST['email'];
$prenom = $_POST['prenom'];
$nom = $_POST['nom'];


// Cas l'administrateur n'a rentré ni nom, ni prénom
if ($prenom == null && $nom == null){
    echo "0";
}
elseif ($prenom && $nom == null){
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

    echo "1";
}
elseif ($prenom == null && $nom){
    // Mise a jour du prénom dans la bd
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

    echo "1";
}
else{
    // Mise a jour du prénom dans la bd
    $sql = <<<EOD
    update session
        set prenom = :prenom, nom = :nom
    where email = :email;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->bindParam('prenom',$prenom);
    $curseur->bindParam('nom',$nom);
    $curseur->execute();
    $curseur->closeCursor();

    echo "1";
}