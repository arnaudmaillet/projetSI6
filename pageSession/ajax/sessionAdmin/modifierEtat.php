<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = $_POST['email'];


$sql = <<<EOD
    Select *
    from session
    where email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->execute();
$lignes = $curseur->fetch(PDO::FETCH_ASSOC);
$curseur->closeCursor();

if ($lignes['etatSession'] == "E"){
    $sql = <<<EOD
    update session
        set etatSession = "D", nbEssai = 0
    where email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();
}
else{
    $sql = <<<EOD
    update session
        set etatSession = "E", nbEssai = 3
    where email = :email;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $curseur->execute();
    $curseur->closeCursor();
}

echo "1";