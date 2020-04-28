<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

$idTheme = $_POST['idTheme'];

$sql = <<<EOD
   Select *
   from affichageQuestionForum
   where idTheme = :idTheme
   order by date_maj desc;

EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam("idTheme", $idTheme);
$curseur->execute();
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($lesLignes);