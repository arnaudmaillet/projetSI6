<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

session_start();
$nom =  $_POST["nom"];

$sql = <<<EOD
	insert into theme (nom) values 
		(:nom);
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('nom', $nom);
$curseur->execute();
echo "1";