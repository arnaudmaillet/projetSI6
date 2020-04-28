<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

session_start();
$idSession = $_SESSION['user']['id'];
$reponse =  $_POST["reponse"];
$idQuestion = $_POST['idQuestion'];

$sql = <<<EOD
	insert into reponseForum (idSession, date_ajout, libelle, idquestionForum) values 
		(:idSession, NOW(), :reponseForum, :idQuestionForum)
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('idSession', $idSession);
$curseur->bindParam('reponseForum', $reponse);
$curseur->bindParam('idQuestionForum', $idQuestion);
$curseur->execute();
$curseur->closeCursor();

// date_maj question
$sql = <<<EOD
        update questionForum
            set date_maj = NOW()
        where id = :id;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('id', $idQuestion);
$curseur->execute();
$curseur->closeCursor();


echo "1";