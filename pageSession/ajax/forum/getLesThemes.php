<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

$sql = <<<EOD
   Select id, nom from theme
  order by nom;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($lesLignes);