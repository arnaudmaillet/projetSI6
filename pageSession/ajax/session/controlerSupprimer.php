<?php
session_start();
require '../../../class/class.database.inc.php';
$db = Database::getInstance();

$email = $_SESSION['user']['email'];
$password = hash('sha256', $_POST['password']);

//vérification du mdp
$sql = <<<EOD
    Select 1 from session
    where password = :password
    and email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->bindParam('password', $password);
$curseur->execute();
$ligne = $curseur->fetch(PDO::FETCH_ASSOC);
$ok = $ligne ? 1 : 0;
$curseur->closeCursor();

echo $ok;