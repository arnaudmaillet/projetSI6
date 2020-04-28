<?php
include "../class/class.database.inc.php";
session_start();

$db = Database::getInstance();

$email = $_SESSION['user']['email'];
$msgSessionBloque = $_POST["msgSessionBloque"];

$sql = <<<EOD
    update session
        set msgSessionBloque = :msgSessionBloque
    where email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->bindParam('msgSessionBloque', $msgSessionBloque);
$curseur->execute();
$curseur->closeCursor();
echo "1" ;