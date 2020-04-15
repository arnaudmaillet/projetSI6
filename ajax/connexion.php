<?php
include "../class/class.database.inc.php";
session_start();

$db = Database::getInstance();

// récupérer les données envoyées
$email = $_POST['email'];
$password = $_POST['password'];



// Requete de la session
$sql = <<<EOD
    Select * from session
    where email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();

// Comparaison des mdp -> si vrai, $passwordOK = 1 sinon = 0
if ($password == $ligne['password'])
    $passwordOK = 1;
else
    $passwordOK = 0;

// Cas ou la session n'existe pas
if(!$ligne['email']){
    echo "-3";
}
// Cas ou le mdp est faux et que le nombre d'essai récupéré dans $ligne['nbEssai'] est > à 0
// On décrémente donc nbEssai dans la bd
elseif ($passwordOK == 0 && $ligne['nbEssai'] > 0){
    $sql = <<<EOD
    UPDATE session
    SET nbEssai = nbEssai - 1
    WHERE email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();

    // On initialise $nbEssai qui retourne le nombre d'essais restant dans $ligne['nbEssai']
    // Chaque valeur retourné par $nbEssai correspond à un message dans index.js
    $nbEssai = $ligne['nbEssai'];
    echo $nbEssai;
}
// Cas ou le nombre d'essai à été dépassé
// Mise a jour de etatSession dans la bd
elseif ($passwordOK == 0 && $ligne['nbEssai'] == 0){
    $sql = <<<EOD
    UPDATE session
    SET etatSession = 'D'
    WHERE email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();
    echo "-2";
}
// Cas ou la session est désactivé. Je n'ai pas mis cette condition en || dans celle du dessus car la requete update sur l'etat session
// ne s'execute qu'une seule fois
elseif ($ligne['etatSession'] == 'D'){
    echo "-2";
}
// Si toutes les conditions précédentes n'ont pas été validées --> Cas ou tout est bon
// Le nombre d'essai retourne à "3"
// Cas ou la session est un user
elseif ($ligne['typeSession'] == 'U'){
    $_SESSION['user']['prenom'] = $ligne['prenom'];
    $_SESSION['user']['nom'] = $ligne['nom'];
    $_SESSION['user']['email'] = $email;

    $sql = <<<EOD
    UPDATE session
    SET nbEssai = 3
    WHERE email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();
    echo "0";
}
// Cas ou la session est un Admin
else{
    $_SESSION['admin']['prenom'] = $ligne['prenom'];
    $_SESSION['admin']['nom'] = $ligne['nom'];
    $_SESSION['admin']['email'] = $email;

    $sql = <<<EOD
    UPDATE session
    SET nbEssai = 3
    WHERE email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();
    echo "-1";
}
