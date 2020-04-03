<?php
session_start();
require '../../class/class.database.inc.php';
$db = Database::getInstance();

$email = $_SESSION['user']['email'];
$password = $_POST['password'];

//vérification du mdp
$sql = <<<EOD
    Select 1 from utilisateur
    where password = :password
    and email = :email;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->bindParam('password', $password);
echo $curseur->execute();
$ligne = $curseur->ftech(PDO::FETCH_ASSOC);
$ok = $ligne ? 0 : 1;

if ($ok == 0) {
    // requete sql suppression
    $sql = <<<EOD
        delete from utilisateur
        where email = :email;
EOD;

    $curseur = $db->prepare($sql);
    $curseur->bindParam('email', $email);
    $ok = $curseur->execute() ? 0: 2;

    // maj des variables de sessions
    if ($ok == 0){
        session_unset();
        session_destroy();
        // supprimer le cookie si il existe
        if (isset($_COOKIE['user'])){
            setcookie('user', '', time() - 3600, '/');
        }
    }
}
echo $ok;