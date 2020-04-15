<?php
session_start();
if (isset($_SESSION['user'])){
    $prenom = $_SESSION['user']['prenom'];
    $nom = $_SESSION['user']['nom'];
}
else{
    header("Location:../index.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Session</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" type="image/png" href="../img/logo.png">

    <link rel="stylesheet" href="../css/webfonts/all.min.css">
    <link rel="stylesheet" href="../composant/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../composant/confirm/jquery-confirm.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="../composant/noty/animate.css">

    <script src="../composant/jquery.js"></script>
    <script src="../composant/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="../composant/confirm/jquery-confirm.min.js"></script>

    <link rel="stylesheet" href="../composant/noty/noty.css">
    <link rel="stylesheet" href="../composant/noty/sunset.css">
    <script src="../composant/noty/noty.min.js"></script>

    <script src="../composant/personnel/class.std.js"></script>

    <script src="js/index.js"></script>
</head>

<body>
<div id="menu"></div>

<div class="container d-flex h-100">
    <div class="row align-self-center vw-100">
        <div class="cadre m-auto">
            <img src="../img/imgProfil.png">
            <div class="title pt-4">Bienvenue sur votre session <?= $prenom?> <?= $nom?> !</div>
            <hr/>
            <p>Cette page vous permet de gérer votre compte</p>
            <hr/>

            <div class="row text-center pt-4">
                <div class="col-12 col-xl-6 col-md-12 col-sm-6 pt-1">

                    <!-- Si la Session ne contient pas de nom ou prénom, le bouton "modifier" se transforme en "ajouter"-->
                    <?php
                    if ($prenom == null) {
                        ?>
                        <button type="button" class="btn btn-secondary btn-lg case" data-toggle="modal"
                                data-target="#modalPrenom">Ajouter un prénom
                        </button>
                        <?php
                    }
                    else {
                        ?>
                        <button type="button" class="btn btn-secondary btn-lg case" data-toggle="modal"
                                data-target="#modalPrenom">Modifier votre prénom
                        </button>
                        <?php
                    }
                    ?>
                </div>
                <div class="col-12 col-xl-6 col-md-12 col-sm-6 pt-1">
                    <?php
                    if ($nom == null) {
                        ?>
                        <button type="button" class="btn btn-secondary btn-lg case" data-toggle="modal"
                                data-target="#modalNom">Ajouter un nom
                        </button>
                        <?php
                    }
                    else {
                        ?>
                        <button type="button" class="btn btn-secondary btn-lg case" data-toggle="modal"
                                data-target="#modalNom">Modifier votre nom
                        </button>
                        <?php
                    }
                    ?>

                </div>
            </div>
            <div class="row text-center pt-4">
                <div class="col-12 col-xl-6 col-md-12 col-sm-6 pt-1">
                    <button type="button" class="btn btn-warning btn-lg case" data-toggle="modal" data-target="#modalPassword">Changer le mot de passe</button>
                </div>
                <div class="col-12 col-xl-6 col-md-12 col-sm-6 pt-1">
                    <button type="button" class="btn btn-danger btn-lg case" data-toggle="modal" data-target="#modalSuppression">Supprimer le compte</button>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal changer prenom -->
<div class="modal fade" id="modalPrenom" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalPrenom" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <label>Entrez un prénom :</label>
                <input type="text" class="form-control text-center" id="inputPrenom" placeholder="<?= $prenom?>" onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
                <div id="msgPrenomModification" class="text-danger text-center"></div>
                <div id="msgPrenomModificationOK" class="text-success text-center"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="confirmerPrenom" class="btn btn-success">Valider
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal changer nom -->
<div class="modal fade" id="modalNom" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalNom" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p>Entrez un nom :</p>
                <input type="text" class="form-control text-center" id="inputNom" placeholder="<?= $nom?>" onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
                <div id="msgNomModification" class="text-danger text-center"></div>
                <div id="msgNomModificationOK" class="text-success text-center"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="confirmerNom" class="btn btn-success">Valider
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal changer mdp -->
<div class="modal fade" id="modalPassword" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="modalMdp" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form>
                    <div class="form-group p-3">
                        <div class="row">
                            <label for="nouveauMdp" class="pt-1">Nouveau mot de passe :</label>
                            <input type="text" class="form-control text-center" id="newPassword">
                            <small class="form-text text-muted">Le mot de passe doit contenir entre 8 et 15 caractères...</small>
                            <div id="msgPasswordModification1" class="text-center text-danger w"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="confirmationMdp" class="pt-1">Saisissez à nouveau le mot de passe :</label>
                            <input type="password" class="form-control text-center" id="confirmPassword">
                            <div id="msgPasswordModification2" class="text-center text-danger w"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="confirmationMdp">Pour confirmer, Saisissez l'ancien mot de passe :</label>
                            <input type="password" class="form-control text-center" id="inputPasswordModification">
                            <div id="msgPasswordModification3" class="text-center text-danger w"></div>
                        </div>
                    </div>
                    <div id="msgPasswordModification" class="text-center text-danger"></div>
                    <div id="msgPasswordModificationOK" class="text-center text-success"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-success" id="btnPassword">Confirmer</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal suppression -->
<div class="modal fade" id="modalSuppression" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalSuppression" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p>Entrez votre mot de passe :</p>
                <input type="password" class="form-control text-center" id="inputPasswordSuppression">
                <div id="msgSuppression" class="text-danger text-center"></div>
                <div id="msgSuppressionOK" class="text-success text-center"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="confirmerSuppression" class="btn btn-success">Valider
                </button>
            </div>
        </div>
    </div>
</div>


<div id="pied"></div>


</body>
</html>