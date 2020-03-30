<?php

include "../class/class.database.inc.php";
$db = Database::getInstance();
$sql = <<<EOD
    select password, email, nom, prenom, avatar
    from Connexion;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();
// envoi du résultat vers le client du résultat
echo json_encode($lesLignes);