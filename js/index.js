let email;
let password;
let messageConnexion;
let emailPasswordOubli;


$(function () {
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('ajax/getpied.php');

    email = document.getElementById('email');
    password = document.getElementById('password');
    emailPasswordOubli = document.getElementById('inputPasswordOubli');

    // Balise message de connexion
    messageConnexion = document.getElementById('msgConnexion');


    // si on appuie sur la touche Enter dans le champ email on lance la fonction controlerConnexion
    email.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerConnexion();
        }
    };

    // si on appuie sur la touche Enter dans le champ password on lance la fonction controlerConnexion
    password.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerConnexion();
        }
    };

    // si on appuie sur la touche Enter dans le champ inputPasswordOubli on lance la fonction passwordOubli
    emailPasswordOubli.onkeypress = function (e) {
        if (e.key === "Enter") {
            controlerPasswordOubli();
        }
    };


    // le clic sur le bouton btnValider doir lancer la fonction controlerConnexion
    $('#btnValider').click(controlerConnexion);
    // le clic sur le bouton btnFormPasswordOubli doir lancer la fonction controlerPasswordOubli
    $('#btnFormPasswordOubli').click(controlerPasswordOubli);


});


// Connexion
function controlerConnexion() {
    let emailOk = controler(email);
    let passwordOk = controler(password);
    if (emailOk == false || passwordOk == false)
        messageConnexion.innerText = "Champ requis !";
    else
        connecter();
}

// Appel du script connexion.php en lui passant la valeur de l'email
// si data vaut -3 la session est inexistante
// si data vaut -2 la session a été suspendue
// si data vaut -1 la session est une session admin
// si data vaut 0 la session est une session user
// si data > 0  les nbEssai
function connecter() {
    $.ajax({
        url: "ajax/connexion.php",
        type: 'post',
        data: {
            email: email.value,
            password: password.value,
        },
        dataType: "json",
        success: function (data) {
            if (data == -3)
                messageConnexion.innerText = "Compte inexistant ! Veuillez créer votre compte en cliquant sur 'Créer son compte ici'";
            else if (data == 3)
                messageConnexion.innerText = "Email ou mot de passe non valide ! il vous reste 3 essais";
            else if (data == 2)
                messageConnexion.innerText = "Email ou mot de passe non valide ! il vous reste 2 essais";
            else if (data == 1)
                messageConnexion.innerText = "Email ou mot de passe non valide ! il vous reste 1 essai";
            else if (data == -2)
                messageConnexion.innerText = "Le compte a été suspendu, Veuillez contacter l'administrateur !";
            else if (data == -1)
                document.location.href = "pageSession/sessionAdmin.php";
            else
                document.location.href = "pageSession/sessionUser.php";
        },
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        }
    })
}

// PasswordOubli
function controlerPasswordOubli() {
    let emailPasswordOubliOK = controler(emailPasswordOubli);
    if (emailPasswordOubliOK == false)
        Std.afficherMessage('msgPasswordOubli', 'Champ requis !', 'rouge', 2);
    else
        passwordOubli();
}

// Si data = 0 la session n'existe pas
// Sinon l'hôte est redirigé vers la page passwordOubli
function passwordOubli() {
    $.ajax({
        url: "ajax/passwordOubli.php",
        type: 'post',
        data: {
            email: emailPasswordOubli.value,
        },
        dataType: "json",
        success: function (data) {
            if (data == 0)
                Std.afficherMessage('msgPasswordOubli', 'Le compte n\'existe pas !', 'rouge', 2);
            else
                document.location.href = "pageOubli/oubli.php";
        },
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        }
    })
}

// autres fonctions
function controler(input) {
    input.value = input.value.trim();
    let valeur = input.value;
    if (valeur.length === 0)
        return false;
}