<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

$idQuestion = $_POST['idQuestion'];

$sql = <<<EOD
   Select *
   from affichageReponseForum
   where idQuestion = :idQuestion
   order by date_ajout;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam("idQuestion", $idQuestion);
$curseur->execute();
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($lesLignes);