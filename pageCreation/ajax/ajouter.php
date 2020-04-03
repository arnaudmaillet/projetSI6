<?php
require '../../class/class.database.inc.php';
$db = Database::getInstance();

// récupération des données
$email = ($_POST["email"]);
$password = ($_POST["password"]);

// requêtre d'ajout
$sql = <<<EOD
    insert into utilisateur(email, password, typeCompte, etatCompte)
           values (:email, :password, "U", "E");
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('email', $email);
$curseur->bindParam('password', $password);
echo $curseur->execute() ? 1 : 0;