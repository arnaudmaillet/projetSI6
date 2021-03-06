<?php
require '../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = $_POST["email"];
$password = $_POST["password"];
$confirmation = $_POST["confirmation"];
$question = $_POST["question"];
$reponse = $_POST["reponse"];

$passwordHash = hash('sha256', $password);
$reponseHash = hash('sha256', $reponse);


//contôle de l'email
$emailOK = preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $email);

//contôle du mdp
$passwordOK = preg_match("#^[a-zA-Z0-9]{8,15}$#", $password);


// verification Session existante par l'email
$sql = <<<EOD
    Select 1 from session
    where email = :email;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();


if(!$emailOK)
    echo "-3";
elseif ($ligne)
    echo "-2";
elseif (!$passwordOK)
    echo "-1";
elseif ($password != $confirmation)
    echo "0";
else{
    // requêtre d'ajout
    // on rentre un champ vide pour le nom et prénom si l'utilisateur souhaite récupérer son mdp sans avoir renseigné son nom ou prénom
    $sql = <<<EOD
    insert into session(email, password, nom, prenom, typeSession, etatSession, nbEssai, question, reponse)
           values (:email, :password, "", "", "U", "E", 3, :question, :reponse);
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->bindParam('password', $passwordHash);
    $curseur->bindParam('question', $question);
    $curseur->bindParam('reponse', $reponseHash);
    $curseur->execute();
    $curseur->closeCursor();
    echo "1" ;
}

