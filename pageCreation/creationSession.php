<?php
session_start();
if (isset($_SESSION['user'])) {
    $email = $_SESSION['user']['email'];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Formulaire d'inscription</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" type="image/png" href="../img/logo.png">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="../css/webfonts/all.min.css">

    <link rel="stylesheet" href="../composant/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../composant/confirm/jquery-confirm.min.css">

    <link rel="stylesheet" href="../composant/noty/animate.css">
    <link rel="stylesheet" href="../composant/noty/noty.css">
    <link rel="stylesheet" href="../composant/noty/sunset.css">

    <script src="../composant/jquery.js"></script>

    <script src="../composant/bootstrap/bootstrap.bundle.min.js"></script>

    <script src="../composant/confirm/jquery-confirm.min.js"></script>

    <script src="../composant/personnel/class.std.js"></script>

    <script src="../composant/noty/noty.min.js"></script>

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
            <h1>Création d'une session</h1>
            <div class="form-group mt-5">
                <label for="email">Adresse email</label>
                <?php
                if (empty($_SESSION['user'])) {
                    ?>
                    <input class="form-control text-center" id="email" type="text" name="Email">
                    <?php
                } else {
                    ?>
                    <input class="form-control text-center" id="email" type="text" name="Email" value="<?= $email ?>">
                    <?php
                }
                ?>
                <div id="msgAjout1" class="text-danger text-center"></div>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input class="form-control text-center" id="password" type="password" name="Password">
                <small class="form-text text-muted text-center" id="msgAjout2">Le mot de passe doit contenir entre 8 et 15 caractères...</small>
            </div>
            <div class="form-group">
                <label for="confirmation">Confirmation du mot de passe</label>
                <input class="form-control text-center" type="password" id="confirmation" name="Confirmation">
                <div id="msgAjout3" class="text-danger text-center"></div>
            </div>
            <div class="form-group">
                <label for="question">Question secrète :</label>
                <div class="row">
                    <div class="col-6">
                        <div class="input-group" style="font-size: 0.8em">
                            <select class="custom-select" id="question">
                                <option selected>Quelle est votre deuxième prénom ?</option>
                                <option selected>Quelle est votre couleur préférée ?</option>
                                <option selected>Quelle est votre le nom de votre ville natale ?</option>
                                <option selected>Quelle est votre sport favoris ?</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <input type="text" name="question" id="reponse" class="form-control text-center" placeholder="Réponse">
                        <div id="msgAjout4" class="text-danger text-center"></div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary btn-lg pt-1 mt-5 d-block mx-auto" id="btnAjouter">S'inscrire</button>
        </div>
    </div>
</div>

<div id="pied"></div>

</body>
</html>