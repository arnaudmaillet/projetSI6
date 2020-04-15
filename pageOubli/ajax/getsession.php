<?php
include "../../class/class.database.inc.php";
session_start();

$db = Database::getInstance();

// récupérer les données envoyées
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$reponse = $_POST['reponse'];
$email = $_SESSION['user']['email'];

// Requete des informations a comparer
$sql = <<<EOD
    Select nom, prenom, reponse from session
    where email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();


if ($ligne['nom'] !== $nom)
    echo "-2";
elseif ($ligne['prenom'] !== $prenom)
    echo "-1";
elseif ($ligne['reponse'] !== $reponse)
    echo "0";
else
    echo "1";