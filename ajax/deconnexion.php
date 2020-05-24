<?php
session_start();
// supprimer le contenu du tableau $_SESSION
session_unset();
// supprimer le tableau $_SESSION
session_destroy();
// suppression du cookie
if (isset($_COOKIE['user'])) {
    setcookie('user', $email, time() - 4500,'/');

}
header("location:../index.php");

