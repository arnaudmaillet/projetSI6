let inputNom;
let inputPrenom;
let inputReponse;
let inputNewPassword;
let inputConfirmPassword;


$(function () {
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');

    inputNom = document.getElementById('nom');
    inputPrenom = document.getElementById('prenom');
    inputReponse = document.getElementById('reponse');
    inputNewPassword = document.getElementById('newPassword');
    inputConfirmPassword = document.getElementById('confirmPassword');

    // si on appuie sur la touche Enter dans le champ nom on lance la fonction controlerOubli
    inputNom.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerOubli();
        }
    };

    // si on appuie sur la touche Enter dans le champ prenom on lance la fonction controlerOubli
    inputPrenom.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerOubli();
        }
    };

    // si on appuie sur la touche Enter dans le champ reponse on lance la fonction controlerOubli
    inputReponse.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerOubli();
        }
    };

    // si on appuie sur la touche Enter dans le champ newPassword on lance la fonction controlerPasswordModification
    inputNewPassword.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerPasswordModification();
        }
    };

    // si on appuie sur la touche Enter dans le champ confirmPassword on lance la fonction controlerPasswordModification
    inputConfirmPassword.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerPasswordModification();
        }
    };


    // le clic sur le bouton btnValider doir lancer la fonction controlerConnexion
    $('#btnVerifier').click(controlerOubli);
    $('#btnConfirmer').click(controlerPasswordModification);
});


// vérification
function controlerOubli() {
    let nomOK = controler(inputNom);
    let prenomOK = controler(inputPrenom);
    let reponseOK = controler(inputReponse);
    if (nomOK == false)
        Std.afficherMessage('msgOubli1', 'Champ requis !', 'rouge', 2);
    else if (prenomOK == false)
        Std.afficherMessage('msgOubli2', 'Champ requis !', 'rouge', 2);
    else if (reponseOK == false)
        Std.afficherMessage('msgOubli3', 'Champ requis !', 'rouge', 2);
    else
        oubli();
}

function oubli() {
    $.ajax({
        url: "ajax/getsession.php",
        type: 'post',
        data: {
            nom: inputNom.value,
            prenom: inputPrenom.value,
            reponse: inputReponse.value,
        },
        dataType: "json",
        success: function (data) {
            if (data == -2){
                Std.afficherMessage('msgOubli1', 'Le nom renseigné est incorrect !', 'rouge', 2);
            }
            else if(data == -1)
                Std.afficherMessage('msgOubli2', 'Le prenom renseigné est incorrect !', 'rouge', 2);
            else if(data == 0)
                Std.afficherMessage('msgOubli3', 'La réponse à la question est incorrect !', 'rouge', 2);
            else
                $('#modalPassword').modal('show');
        },
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        }
    })
}

// ModificationPassword
function controlerPasswordModification() {
    let newPasswordOK = controler(inputNewPassword);
    let confirmPasswordOK = controler(inputConfirmPassword);
    if (newPasswordOK == false)
        Std.afficherMessage('msgPasswordModification1', 'Champ requis !', 'rouge', 2);
    else if(confirmPasswordOK == false)
        Std.afficherMessage('msgPasswordModification2', 'Champ requis !', 'rouge', 2);
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
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if(data == -2)
                Std.afficherMessage('msgPasswordModification', 'Le mot de passe doit contenir entre 8 et 15 caractères !', 'red', 3);
            else if(data == -1)
                Std.afficherMessage('msgPasswordModification', 'Les mots de passe de correspondent pas !', 'red', 3);
            else if(data == 0)
                Std.afficherMessage('msgPasswordModification', 'Votre nouveau mot de passe doit être différent de l\'ancien !', 'red', 3);
            else{
                Std.afficherMessage('msgPasswordModificationOK', 'La modification a bien été prise en compte, Vous allez être redirigé vers la page d\'accueil. Pour vous connecter, Veuillez saisir le nouveau mot de passe !', 'vert', 6);
                setTimeout(redirection, 6000);
            }
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
