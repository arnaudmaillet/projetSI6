<?php

session_start();
$db = Database::getInstance();

// récupérer les données envoyées
$email = htmlspecialchars($_POST['email']);
$password = $_POST['password'];


//vérification de l'email et du mdp
$sql = <<<EOD
    Select 1 from utilisateur
    where password = :passwordSession
    and email = :emailSession;
EOD;

$curseur = $db->prepare($sql);
$curseur->bindParam('email', $emailSession);
$curseur->bindParam('password', $passwordSession);
echo $curseur->execute();
$ligne = $curseur->ftech(PDO::FETCH_ASSOC);
//$ok = $ligne ? 0 : 1;

//contôle des données
$emailOK = preg_match(" /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $email);

if ($email == $emailSession && $emailOK && $password == $passwordSession){
    $_SESSION['user']['email'] = $email;
    $_SESSION['user']['password'] = $password;
    echo "1";
}
else
    echo "0";








/*if (isset($_POST['password']) AND $_POST['password'] ==  "kangourou") // Si le mot de passe est bon
{
    require "../pageSession/session.html";
}
else // Sinon, on affiche un message d'erreur
{
    echo '<p>Mot de passe incorrect</p>';
}*/
