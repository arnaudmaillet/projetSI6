<?php
if (session_status() === PHP_SESSION_NONE)
    session_start();
if(isset($_SESSION['user'])) {
    if (isset($_COOKIE['user'])) {
        $valeur = explode('~', $_COOKIE['user']);
        require 'class/class.database.inc.php';
        $db = Database::getInstance();
        $sql = <<<EOD
            SELECT *
            FROM session 
            WHERE email = :email;
EOD;
        $curseur = $db->prepare($sql);
        $curseur->bindParam('email', $valeur[0]);
        $curseur->execute();
        $ligne = $curseur->fetch(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        if (!$ligne) {
            exit;
        } else {
            // le cookie est il fiable ?
            $emprunte = sha1($ligne['id'] .$ligne['email'] .$ligne['nom'] .$ligne['prenom'] .$_SERVER['REMOTE_ADDR']);
            if ($emprunte == $valeur[1]) {
                setcookie('user', '', time() - 4500, '/');
                exit;
            } else {
                $_SESSION['user']['prenom'] = $ligne['prenom'];
                $_SESSION['user']['nom'] = $ligne['nom'];
                $_SESSION['user']['email'] = $ligne['email'];
                $_SESSION['user']['id'] = $ligne['id'];
                setcookie('user', $ligne['email'], time() + 3600 * 24 * 3, '/');
                if ($ligne['typeSession'] == 'A')
                    header('location:pageSession/sessionAdmin.php');
                else
                    header('location:pageSession/sessionUser.php');
            }
        }
    }
}