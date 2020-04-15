<?php
session_start();
require '../../class/class.database.inc.php';
$db = Database::getInstance();

$email = $_SESSION['user']['email'];



// Construction de la requete sql
$sql = <<<EOD
delete from session
where email = :email;
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$ok = $curseur->execute() ? 0 : 1;
$curseur->closeCursor();

// Maj des variables de sessionq
if ($ok == 0){
    // Supprimer le coockie si il existe
    if (isset($_COOKIE['user'])){
            setcookie('user', '', time() - 3600, '/');
    }
}
echo $ok;