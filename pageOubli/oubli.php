<?php
session_start();
if (isset($_SESSION['user'])){
    $question = $_SESSION['user']['question'];
    $email = $_SESSION['user']['email'];
}
else{
    header("Location:../index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Formulaire d'oubli</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" type="image/png" href="../img/logo.png">

    <link rel="stylesheet" href="../css/webfonts/all.min.css">
    <link rel="stylesheet" href="../composant/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../composant/confirm/jquery-confirm.min.css">
    <link rel="stylesheet" href="css/style.css">


    <script src="../composant/jquery.js"></script>
    <script src="../composant/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="../composant/confirm/jquery-confirm.min.js"></script>
    <script src="../composant/personnel/class.std.js"></script>

    <script src="js/index.js"></script>
</head>

<body class="px-0">
<div id="menu"></div>

<div class="container d-flex h-100">
    <div class="row align-self-center vw-100">
        <div class="form-box m-auto">
            <a href="../ajax/deconnexion.php">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
            </a>
            <h1 class="pt-3">Mot de passe oublié ?</h1>
            <p class="pt-3">Session : <?= $email ?></p>
            <p>Veuillez saisir les informations demandées :</p>
            <div class="form-group">
                <label for="nom">Nom</label>
                <input class="form-control text-center" id="nom" type="text" name="Nom"
                       onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
                <div id="msgOubli1" class="text-danger text-center"></div>
            </div>
            <div class="form-group">
                <label for="prenom">Prénom</label>
                <input class="form-control text-center" id="prenom" type="email" name="Prénom"
                       onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
                <div id="msgOubli2" class="text-danger text-center"></div>
            </div>
            <div class="form-group">
                <label for="reponse"><?= $question ?></label>
                <input class="form-control text-center" id="reponse" name="Réponse">
                <div id="msgOubli3" class="text-danger text-center"></div>
            </div>
            <button class="btn btn-primary mt-4" id="btnVerifier">Lancer la vérification</button>
        </div>

    </div>
</div>



<div id="pied"></div>

<!-- Modal changer mdp -->
<div class="modal fade" id="modalPassword" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="modalMdp" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Nouveau mot de passe de session</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group pt-1">
                        <label for="nouveauMdp" class="">Nouveau mot de passe :</label>
                        <input type="text" class="form-control text-center" id="newPassword">
                        <small class="form-text text-muted text-center">Le mot de passe doit contenir entre 8 et 15 caractères...</small>
                        <div id="msgPasswordModification1" class="text-danger text-center"></div>
                    </div>
                    <div class="form-group pt-3">
                        <label for="confirmationMdp" class="">Saisissez à nouveau le mot de passe :</label>
                        <input type="password" class="form-control text-center" id="confirmPassword">
                        <div id="msgPasswordModification2" class="text-danger text-center "></div>
                    </div>
                    <div class="text-center">
                        <div id="msgPasswordModification" class="text-danger text-center"></div>
                        <div id="msgPasswordModificationOK" class="text-success text-center"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-success" id="btnConfirmer">Confirmer</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>