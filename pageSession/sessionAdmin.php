<?php
session_start();
if (isset($_SESSION['user'])){
    $prenom = $_SESSION['user']['prenom'];
    $nom = $_SESSION['user']['nom'];
    $email = $_SESSION['user']['email'];
}
else{
    header("Location:../index.php");
    exit;
}

// Gravatar
$default = "https://". $email ."/homestar.jpg";
$size = 1000;
$grav_url = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;

?>
<!DOCTYPE html>
<html lang="fr" id="admin">
<head>
    <title>Session Administrateur</title>
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

    <script src="../composant/ckeditor/ckeditor.js"></script>

    <script src="../composant/personnel/class.std.js"></script>

    <script src="../composant/md5.min.js"></script>

    <script src="js/index.js"></script>
    <script src="js/indexAdmin.js"></script>
    <script src="js/indexForum.js"></script>

</head>

<body class="px-0" onload="init(); initAdmin(); initForum()">
<div id="menu"></div>

<div class="container d-flex h-100">
    <div class="row align-self-center cadre vw-100">
        <div class="col-12 col-sm-6">
            <div class="container border p-4">
                <div class="row">
                    <div class="col-4 col-sm-12 col-md-4">
                        <div class="text-center"
                             data-toggle='tooltip'
                             data-placement = "right"
                             data-html="true"
                             title='Configurez votre image de profil sur gravatar.com'
                        >
                            <img src="<?php echo $grav_url; ?>" class="rounded-circle"/>
                        </div>
                    </div>
                    <div class="col-8 col-sm-12 col-md-8">
                        <div class="text-center">
                            <div class="title pt-5">Bienvenue sur votre session <?= $prenom ?> <?= $nom ?> !</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h3 class="pt-4">Forum du site</h3>
                        <div class="input-group pt-3"> <!--style="z-index: 0"-->
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="idTheme">Thème</label>
                            </div>
                            <select class="form-control col-12" id="idTheme"></select>
                            <?php
                            if ($prenom != null || $nom != null) {
                                ?>
                                <div class="input-group-append">
                                    <a class="btn btn-sm btn-outline-dark pt-2" data-toggle="modal"
                                       data-target="#fenAjoutTheme" href="#" style="height: 27px">
                                        Nouveau theme
                                    </a>
                                    <a class="btn btn-sm btn-outline-primary pt-2" data-toggle="modal"
                                       data-target="#fenAjoutQuestion" href="#" style="height: 27px">
                                        Nouvelle question
                                    </a>
                                </div>
                                <?php
                            }
                            ?>
                        </div>
                        <div class="forum pt-3">
                            <table class='table table-sm table-borderless'>
                                <tbody id="lesQuestions"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card-header bg-info">Paramétrage de la session</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <button class="h-100 btn btn-outline-secondary" data-toggle="modal" data-target="#modalPassword">Modifier le mot de passe</button>
                        </div>
                        <div class="col-6">
                            <button class="h-100 btn btn-outline-danger" data-toggle="modal" data-target="#modalSuppression">Supprimer le compte</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-4">
                <div class="card-header bg-warning">Tableau de bord des sessions</div>
                <div class="card-body">
                    <div class="form-row">
                        <div class="form-group col-6 col-sm-12 col-md-6">
                            <label for="sessions">Sessions :</label>
                            <select id="sessions" class="form-control"></select>
                        </div>
                        <div class="form-group col-6 col-sm-12 col-md-6">
                            <label for="sessionsD">Sessions désactivées :</label>
                            <div id="sessionsD" class="w-100 border pt-3 pl-2"></div>
                        </div>
                    </div>
                    <hr/>
                    <div id="sessionEmail"></div>
                    <div class="form-row pt-4">
                        <div class="form-group col-4 col-sm-6 col-md-4 my-auto">
                            <div id="sessionNom"></div>
                        </div>
                        <div class="form-group col-4 col-sm-6 col-md-4 my-auto">
                            <div id="sessionPrenom"></div>
                        </div>
                        <div class="form-group col-4 col-sm-12 col-md-4">
                            <button data-toggle="modal" data-target="#modalNomPrenom">Modifier</button>
                        </div>
                    </div>
                    <div class="form-row mt-4">
                        <div class="form-group col-8 m-auto">
                            <div id="sessionType"></div>
                        </div>
                        <div class="form-group col-4 m-auto">
                            <button id="typeSession" class="m-auto">Modifier</button>
                        </div>
                    </div>
                    <div class="form-row mt-4">
                        <div class="form-group col-8 m-auto">
                            <div id="sessionEtat"></div>
                        </div>
                        <div class="form-group col-4 m-auto">
                            <button id="etatSession" class="m-auto">Modifier</button>
                        </div>
                    </div>
                    <div class="form-row mt-4">
                        <div class="col-12">
                            <p>Message session bloquée :</p>
                            <div class="w-100 border">
                                <div id="textArea" class="p-2"></div>
                            </div>
                        </div>
                    </div>
                    <div id="gestionSession"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal changer nomPrenom -->
<div class="modal fade" id="modalNomPrenom" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalPrenom" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <input type="text" class="form-control text-center" id="inputNom" onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);" placeholder="Entrez un nom">
                <input type="text" class="form-control text-center mt-3" id="inputPrenom" onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);" placeholder="Entrez un prénom">
                <div id="msgNomPrenomModification" class="text-danger text-center"></div>
                <div id="msgNomPrenomModificationOK" class="text-success text-center"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="confirmerNomPrenom" class="btn btn-success">Valider</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal changer mdp -->
<div class="modal fade" id="modalPassword" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalMdp" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <form>
                    <div class="form-group p-3">
                        <div class="row">
                            <label for="newPassword">Nouveau mot de passe :</label>
                            <input type="text" class="form-control text-center" id="newPassword">
                            <small class="form-text text-muted">Le mot de passe doit contenir entre 8 et 15 caractères...</small>
                            <div id="msgPasswordModification1" class="text-center text-danger w-100"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="confirmPassword" class="pt-1">Saisissez à nouveau le mot de passe :</label>
                            <input type="password" class="form-control text-center" id="confirmPassword">
                            <div id="msgPasswordModification2" class="text-center text-danger w-100"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="inputPasswordModification">Pour confirmer, Saisissez l'ancien mot de passe :</label>
                            <input type="password" class="form-control text-center" id="inputPasswordModification">
                            <div id="msgPasswordModification3" class="text-center text-danger w-100"></div>
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
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <input type="password" class="form-control text-center" id="inputPasswordSuppression" placeholder="Entrez votre mot de passe">
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

<!-- Modal ajout theme -->
<div class="modal fade" id="fenAjoutTheme" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="fenAjoutTheme" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <input type="text" class="form-control text-center" id="ajoutTheme" placeholder="Entrez le titre du nouveau theme" onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="btnAjouterTheme" class="btn btn-success">Valider
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal ajout question -->
<div class="modal fade" id="fenAjoutQuestion" tabindex="-1" role="dialog" aria-labelledby="fenAjoutQuestion"
     aria-hidden="true" data-backdrop="true" data-keyboard="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <input id="question" type="text" class="form-control text-center"
                       placeholder="Ecrivez votre question">
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button id='btnAjouterQuestion' class="btn btn-success">Ajouter</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal ajout reponse -->
<div class="modal fade" id="fenReponse" tabindex="-1" role="dialog" aria-labelledby="fenReponse" aria-hidden="true"
     data-backdrop="true" data-keyboard="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="forumReponses">
                    <table class="w-100">
                        <tbody id="lesReponses"></tbody>
                    </table>
                </div>

                <!-- On peut répondre sur le forum que si l'utilisateur a rentré un nom ou un prénom-->
                <?php
                if ($prenom != null || $nom != null) {
                    ?>
                    <div class="form-group text-left mt-5">
                        <textarea id="reponse"></textarea>
                    </div>
                    <?php
                }
                ?>
            </div>
            <div class="modal-footer">
                <?php
                if ($prenom == null || $nom == null) {
                    ?>
                    <button class="btn btn-danger" data-dismiss="modal">Fermer</button>
                    <?php
                } else {
                    ?>
                    <button class="btn btn-danger" data-dismiss="modal">Annuler</button>
                    <?php
                }
                ?>
                <?php
                if ($prenom != null || $nom != null) {
                    ?>
                    <button id='btnAjouterReponse' class="btn btn-success">Envoyer</button>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
</div>

<div id="pied"></div>
</body>
</html>