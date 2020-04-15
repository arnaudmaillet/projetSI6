let inputNom;
let inputPrenom;
let inputPasswordModification;
let inputPasswordSuppression;
let inputNewPassword;
let inputConfirmPassword;

$(function () {
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');

    inputNom = document.getElementById('inputNom');
    inputPrenom = document.getElementById('inputPrenom');

    inputPasswordModification = document.getElementById('inputPasswordModification');
    inputNewPassword = document.getElementById('newPassword');
    inputConfirmPassword = document.getElementById('confirmPassword');

    inputPasswordSuppression = document.getElementById('inputPasswordSuppression');

    //Touche entrée
    inputNom.onkeypress = function(e){
      if (e.key === "Enter"){
          $("#inputNom").blur();
          controlerNomModification();
      }
    };

    inputPrenom.onkeypress = function(e){
        if (e.key === "Enter"){
            $("#inputPrenom").blur();
            controlerPrenomModification();
        }
    };

    inputPasswordModification.onkeypress = function(e){
        if (e.key === "Enter"){
            controlerPasswordModification();
        }
    };
    inputNewPassword.onkeypress = function(e){
        if (e.key === "Enter"){
            controlerPasswordModification();
        }
    };
    inputConfirmPassword.onkeypress = function(e){
        if (e.key === "Enter"){
            controlerPasswordModification();
        }
    };

    // On ne peut pas supprimer un compte en validant par la touche entrer
    inputPasswordSuppression.onkeypress = function(e){
        if (e.key === "Enter"){
            Std.afficherMessage('msgSuppression', 'Veuillez cliquer sur le bouton \'Valider\' pour confirmer la suppression', 'rouge', 2);
        }
    };

    $('#btnPassword').click(controlerPasswordModification);
    $('#confirmerSuppression').click(controlerSuppression);
    $('#confirmerNom').click(controlerNomModification);
    $('#confirmerPrenom').click(controlerPrenomModification);
});

// ModificationPrenom
function controlerPrenomModification(){
    let prenomOK = controler(inputPrenom);
    if (prenomOK == false)
        Std.afficherMessage('msgPrenomModification', 'Champ requis !', 'rouge', 2);
    else
        PrenomModifier();
}

function PrenomModifier() {
    $.ajax({
        url: 'ajax/modifierPrenom.php',
        type: 'POST',
        data: {
            prenom: inputPrenom.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data == 0){
                Std.afficherMessage('msgPrenomModificationOK', 'Ce nom est déjà votre Prenom actuel !', 'vert', 2);
            }
            else {
                Std.afficherMessage('msgPrenomModificationOK', 'Modification appliquée !', 'vert', 2);
                setTimeout(reload, 2000);
            }

        }
    })
}

// ModificationNom
function controlerNomModification(){
    let nomOK = controler(inputNom);
    if (nomOK == false)
        Std.afficherMessage('msgNomModification', 'Champ requis !', 'rouge', 2);
    else
        NomModifier();
}

function NomModifier() {
    $.ajax({
        url: 'ajax/modifierNom.php',
        type: 'POST',
        data: {
            nom: inputNom.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data == 0){
                Std.afficherMessage('msgNomModificationOK', 'Ce nom est déjà votre nom actuel !', 'vert', 2);
            }
            else {
                Std.afficherMessage('msgNomModificationOK', 'Modification appliquée !', 'vert', 2);
                setTimeout(reload, 2000);
            }

        }
    })
}

// ModificationPassword
function controlerPasswordModification() {
    let newPasswordOK = controler(inputNewPassword);
    let confirmPasswordOK = controler(inputConfirmPassword);
    let inputPasswordOK = controler(inputPasswordModification);
    if (newPasswordOK == false)
        Std.afficherMessage('msgPasswordModification1', 'Champ requis !', 'rouge', 2);
    else if(confirmPasswordOK == false)
        Std.afficherMessage('msgPasswordModification2', 'Champ requis !', 'rouge', 2);
    else if(inputPasswordOK == false)
        Std.afficherMessage('msgPasswordModification3', 'Champ requis !', 'rouge', 2);
    else
        PasswordModifier();
}

function PasswordModifier() {
    $.ajax({
        url: 'ajax/modifierPassword.php',
        type: 'POST',
        data: {
            passwordNew: inputNewPassword.value,
            passwordConfirm: inputConfirmPassword.value,
            password: inputPasswordModification.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if(data == -3)
                Std.afficherMessage('msgPasswordModification', 'Le mot de passe doit contenir entre 8 et 15 caractères !', 'red', 3);
            else if(data == -2)
                Std.afficherMessage('msgPasswordModification', 'Les mots de passe de correspondent pas !', 'red', 3);
            else if(data == -1)
                Std.afficherMessage('msgPasswordModification', 'Votre nouveau mot de passe doit être différent de l\'ancien !', 'red', 3);
            else if(data == 0)
                Std.afficherMessage('msgPasswordModification', 'Mot de passe incorrect !', 'red', 3);
            else{
                Std.afficherMessage('msgPasswordModificationOK', 'Votre mot de passe a bien été changé, Il faudra rentrer le nouveau mot de passe lors de la prochaine connexion !', 'vert', 5);
                setTimeout(reload, 5000);
            }

        }
    })
}

// Suppression
function controlerSuppression() {
    let passwordOK = controler(inputPasswordSuppression);
    if (passwordOK == false){
        Std.afficherMessage('msgSuppression', 'Champ requis !', 'rouge', 2);
    }
    else
        controlerSuppressionPassword();
}

function controlerSuppressionPassword() {
    $.ajax({
        url: 'ajax/controlerSupprimer.php',
        type: 'POST',
        data: {
            password: inputPasswordSuppression.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data == 1){
                confirmerSuppression();
            }
            else {
                Std.afficherMessage('msgSuppression', 'Mot de passe incorrect !', 'rouge', 2)
            }

        }
    })
}

function confirmerSuppression() {
    let n = new Noty({
        text: 'Êtes vous sur de vouloir supprimer votre compte? Après cette action, Vous ne pourrez plus revenir en arrière !',
        layout: 'center',
        theme: 'sunset',
        modal: true,
        type: 'info',
        animation: {
            open: 'animated lightSpeedIn',
            close: 'animated lightSpeedOut'
        },
        buttons: [
            Noty.button('Supprimer définitivement ce compte', 'btn btn-sm btn-success marge', function () {
                supprimer();
                n.close();
            }),
            Noty.button('Revenir en arrière', 'btn btn-sm btn-danger mt-3', function () {
                // On ferme le modal et on met a jour la valeur de l'input à ""
                document.getElementById('inputPasswordSuppression').value = "";
                $('#modalSuppression').modal('hide');
                n.close();
            })
        ]
    }).show();
}

function supprimer() {
    $.ajax({
        url: 'ajax/supprimer.php',
        type: 'POST',
        data: {},
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if(data == 0){
                Std.afficherMessage('msgSuppressionOK', 'Suppression effectué, Veuillez patienter vous allez être redirigé vers la page d\'accueil !', 'vert', 5);
                setTimeout(redirection, 5000);
            }
            else
                $.dialog({title: '', content: request.responseText, type: 'red'});
        }
    })
}


// Autres fonctions

function controler(input) {
    input.value = input.value.trim();
    let valeur = input.value;
    if (valeur.length === 0)
        return false;
}

function redirection() {
    document.location.href = "../ajax/deconnexion.php";
}

function reload(){
    location.reload();
}