<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

session_start();
$idSession = $_SESSION['user']['id'];
$question =  $_POST["question"];
$idTheme =  $_POST["idTheme"];

$sql = <<<EOD
	insert into questionForum (idSession, date_maj, libelle, idTheme) values 
		(:idSession, NOW(), :questionForum, :idTheme)
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('idSession', $idSession);
$curseur->bindParam('questionForum', $question);
$curseur->bindParam('idTheme', $idTheme);
$curseur->execute();
echo "1";