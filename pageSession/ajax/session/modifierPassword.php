<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données

$email = $_SESSION['user']['email'];
$password = $_POST['password'];
$passwordNew = $_POST['passwordNew'];
$passwordConfirm = $_POST['passwordConfirm'];

//contôle du mdp -> entre 8 et 15 caractères
$passwordOK = preg_match("#^[a-zA-Z0-9]{8,15}$#", $passwordNew);

//vérification du mdp
$sql = <<<EOD
    Select password from session
    where password = :password
    and email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->bindParam('password', $password);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();

// Cas ou le 8 < mdp > 15 caractères
if (!$passwordOK)
    echo "-3";
// Cas ou le nouveau mdp et le mdp de confirmation ne correspondent pas
elseif ($passwordNew !== $passwordConfirm)
    echo "-2";
// Cas ou le nouveau mot de passe est le même que l'ancien
elseif ($passwordNew == $ligne['password'])
    echo "-1";
// Cas ou le mot de passe de vérification est incorrect
elseif (!$ligne['password'])
    echo "0";
// Si toutes les conditions auparavant ne sont pas validées alors on lance la requête du changement de mdp --> tout est bon
else{
    // requêtre d'ajout
    $sql = <<<EOD
        update session
            set password = :passwordNew
        where email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->bindParam('passwordNew', $passwordNew);
    $curseur->execute();
    $curseur->closeCursor();
    echo "1";
}