<?php
session_start();
if (isset($_SESSION['user'])) {
    $prenom = $_SESSION['user']['prenom'];
    $nom = $_SESSION['user']['nom'];
    $email = $_SESSION['user']['email'];
} else {
    header("Location:../index.php");
    exit;
}

// Gravatar
$default = "https://". $email ."/homestar.jpg";
$size = 1000;
$grav_url = "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;

?>

<!DOCTYPE html>
<html lang="fr" id="user">
<head>
    <title>Session</title>
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

    <script src="../composant/noty/noty.min.js"></script>

    <script src="../composant/ckeditor/ckeditor.js"></script>

    <script src="../composant/personnel/class.std.js"></script>

    <script src="../composant/md5.min.js"></script>

    <script src="js/index.js"></script>
    <script src="js/indexForum.js"></script>


    <script>
        const mode = <?=isset($_SESSION['user']) ? 1 : 0;?>
    </script>
</head>

<body class="px-0" onload="init(); initForum()">
<div id="menu"></div>


<div class="container d-flex h-100">
    <div class="row align-self-center cadre vw-100">
        <div class="col-12 col-sm-6 profil">
            <div class="container border p-4">
                <div class="row">
                    <div class="col-4 col-sm-12">
                        <div class="text-center w-25 m-auto"
                             data-toggle='tooltip'
                             data-placement = "right"
                             data-html="true"
                             title='Configurez votre image de profil sur gravatar.com'
                        >
                            <img src="<?php echo $grav_url; ?>" class="rounded-circle"/>
                        </div>
                    </div>
                    <div class="col-8 col-sm-12">
                        <div class="text-center">
                            <div class="title pt-4">Bienvenue sur votre session <?= $prenom ?> <?= $nom ?> !</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-6 col-sm-12">
                        <div class="container">
                            <div class="row text-center d-flex h-50">
                                <div class="col-sm-12 col-lg-6 justify-content-center align-self-center pt-1">

                                    <!-- Si la Session ne contient pas de nom ou prénom, le bouton "modifier" est remplacé par "ajouter"-->
                                    <?php
                                    if ($prenom == null) {
                                        ?>
                                        <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal"
                                                data-target="#modalPrenom">Ajouter un prénom
                                        </button>
                                        <?php
                                    } else {
                                        ?>
                                        <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal"
                                                data-target="#modalPrenom">Modifier votre prénom
                                        </button>
                                        <?php
                                    }
                                    ?>
                                </div>
                                <div class="col-sm-12 col-lg-6 justify-content-center align-self-center pt-1">
                                    <?php
                                    if ($nom == null) {
                                        ?>
                                        <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal"
                                                data-target="#modalNom">Ajouter un nom
                                        </button>
                                        <?php
                                    } else {
                                        ?>
                                        <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal"
                                                data-target="#modalNom">Modifier votre nom
                                        </button>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="row text-center d-flex h-50 mt-3">
                                <div class="col-sm-12 col-lg-6 pt-1">
                                    <button type="button" class="btn btn-warning btn-lg" data-toggle="modal"
                                            data-target="#modalPassword">Modifier le mot de passe
                                    </button>
                                </div>
                                <div class="col-sm-12 col-lg-6 pt-1">
                                    <button type="button" class="btn btn-danger btn-lg h-100" data-toggle="modal"
                                            data-target="#modalSuppression">Supprimer le compte
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div class="col-6 col-sm-12">
                        <p>Cette page vous permet de gérer votre compte</p>
                        <!-- Si la Session ne contient pas de nom ou prénom, le message a afficher est changé-->
                        <?php
                        if ($prenom != null || $nom != null) {
                            ?>
                            <p>Votre nom et votre prénom vous permettent de vous identifier sur le forum.</p>
                            <?php
                        } else {
                            ?>
                            <p>Pour participer sur le forum, il faut tout d'abord renseignez votre nom ou votre prénom.
                                Ils
                                vous
                                permetterons de vous identifier</p>
                            <?php
                        }
                        ?>
                        <p>Ils ne doivent pas être non-significatifs car ils sont nécessaires lors d'une procédure de
                            récupération
                            de mot de passe</p>
                        <p>Utiliser la molette de la souris pour faire défiler les questions et les réponses du
                            forum</p>
                        <p>Les posts les plus récents seront toujours en tête sur le forum</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 m-auto">
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


<!-- Modal changer prenom -->
<div class="modal fade" id="modalPrenom" data-backdrop="static" tabindex="-1" role="dialog"
     aria-labelledby="modalPrenom" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <label for="inputPrenom">Entrez un prénom :</label>
                <input type="text" class="form-control text-center" id="inputPrenom" placeholder="<?= $prenom ?>"
                       onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
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
<div class="modal fade" id="modalNom" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalNom"
     aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <label for="inputNom">Entrez un nom :</label>
                <input type="text" class="form-control text-center" id="inputNom" placeholder="<?= $nom ?>"
                       onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);">
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
<div class="modal fade" id="modalPassword" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalMdp"
     aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <form>
                    <div class="form-group p-3">
                        <div class="row">
                            <label for="newPassword">Nouveau mot de passe :</label>
                            <input type="text" class="form-control text-center" id="newPassword">
                            <small class="form-text text-muted">Le mot de passe doit contenir entre 8 et 15
                                caractères...</small>
                            <div id="msgPasswordModification1" class="text-center text-danger w-100"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="confirmPassword" class="pt-1">Saisissez à nouveau le mot de passe :</label>
                            <input type="password" class="form-control text-center" id="confirmPassword">
                            <div id="msgPasswordModification2" class="text-center text-danger w-100"></div>
                        </div>
                        <div class="row pt-3">
                            <label for="inputPasswordModification">Pour confirmer, Saisissez l'ancien mot de passe
                                :</label>
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
<div class="modal fade" id="modalSuppression" data-backdrop="static" tabindex="-1" role="dialog"
     aria-labelledby="modalSuppression" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <label for="inputPasswordSuppression">Entrez votre mot de passe :</label>
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

<!-- Modal ajout question -->
<div class="modal fade" id="fenAjoutQuestion" tabindex="-1" role="dialog" aria-labelledby="fenAjoutQuestion"
     aria-hidden="true" data-backdrop="true" data-keyboard="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group text-left">
                    <input id="question" type="text" class="form-control text-center" placeholder="Entrez votre question ici">
                </div>
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