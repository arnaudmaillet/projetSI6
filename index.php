<?php
session_start();
require 'include/controleracces.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Formulaire de connexion</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="icon" type="image/png" href="img/logo.png">

    <link rel="stylesheet" href="css/webfonts/all.min.css">
    <link rel="stylesheet" href="composant/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="composant/confirm/jquery-confirm.min.css">
    <link rel="stylesheet" href="css/style.css">

    <script src="composant/jquery.js"></script>
    <script src="composant/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="composant/confirm/jquery-confirm.min.js"></script>
    <script src="composant/ckeditor/ckeditor.js"></script>
    <script src="js/index.js?ver=1"></script>

    <script src="composant/personnel/class.std.js"></script>
    <script src="composant/personnel/horloge.js"></script>

    <script src="js/index.js"></script>
</head>

<body class="px-0">

<div id="menu"></div>

<div class="container d-flex h-100">
    <div class="row align-self-center vw-100">
        <div class="col-lg-4 offset-lg-2 col-md-6 col-sm-6 cadreTitre rounded text-white">
            <div class="title">
                Administration<br>
                des<br>
                comptes
            </div>
            <p class="d-flex justify-content-end creator">By MAILLET Arnaud & MARTIN Aurélien</p>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 p-5 shadow-sm bg-white rounded cadreForm">
            <div>
                <div class="text-center">
                    <div id="horloge" data-size="150"></div>
                </div>
                <div class="form text-center">
                    <div class="form-group input-group-md mt-2">
                        <label for="email"></label>
                        <input type="email" name="email" id="email" class="form-control text-center" placeholder="Adresse email" pattern="^[A-Za-z][A-Za-z ]*[A-Za-z]$">
                    </div>
                    <div class="form-group input-group-md mt-3">
                        <label for="password"></label>
                        <input type="password" class="form-control text-center" id="password" placeholder="Mot de passe" autocomplete="off">
                    </div>
                    <div id="msgConnexion" class="text-danger"></div>
                    <button id="btnConnexion" class="btn btn-lg btn-block btn-primary mt-5">Se connecter</button>
                    <div class="form-group text-left mt-3 text-center">
                        <input type="checkbox" id="memoriser" />
                        <label for="memoriser">Se Souvenir de moi</label>
                    </div>
                </div>
            </div>
            <a href="#" class="float-right" data-toggle="modal" data-target="#modalPasswordOubli">Mot de passe oublié ?</a>
            <a href="pageCreation/creationSession.php" class="text-center">Créer son compte ici</a>
        </div>
    </div>
</div>


<!-- Modal mot de passe oublié -->
<div class="modal fade" id="modalPasswordOubli" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalPasswordOubli" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <label for="inputPasswordOubli">Entrez l'adresse email reliée à votre compte :</label>
                <input type="email" class="form-control text-center" id="inputPasswordOubli">
                <div id="msgPasswordOubli" class="text-danger text-center"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" id="btnFormPasswordOubli" class="btn btn-success">Valider</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal message session bloquée -->
<div class="modal fade" id="modalMsgSessionBloque" data-backdrop="static" tabindex="-1" role="dialog"
     aria-labelledby="modalMsgSessionBloque" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <label for="msgSessionBloque" class="modal-title" style="font-size: 1.5em">Ecrivez votre message</label>
                </div>
                <div class="modal-body">
                    <textarea id="msgSessionBloque"></textarea>
                    <div id="confirmationSessionBloque" class="text-success text-center"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                    <button type="button" id="btnMsgSessionBloque" class="btn btn-success">Envoyer</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="pied"></div>

</body>
</html>