<?php
require '../../../class/class.database.inc.php';
$db = Database::getInstance();
$sql = <<<EOD
        Select email
        from session
        where etatSession = 'D'
        order by email;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();
echo json_encode($lesLignes);