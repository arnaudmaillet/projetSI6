<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

$email = $_POST['email'];

$sql = <<<EOD
   Select email, nom, prenom, typeSession, etatSession, msgSessionbloque
   from session 
   where email = :email;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam("email", $email);
$curseur->execute();
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($lesLignes);