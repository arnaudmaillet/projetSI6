let inputEmail;
let inputPassword;
let inputConfirmation;
let question;
let inputReponse;

$(function () {
    inputEmail = document.getElementById('email');
    inputPassword = document.getElementById('password');
    inputConfirmation = document.getElementById('confirmation');
    question = document.getElementById('question');
    inputReponse = document.getElementById('reponse');


    // si on appuie sur la touche Enter dans le champ email on lance la fonction confirmationAjout
    inputEmail.onkeypress = function(e) {
        if(e.key === "Enter") {
            controlerAjout();
        }
    };

    inputPassword.onkeypress = function(e) {
        if(e.key === "Enter") {
            controlerAjout();
        }
    };

    inputConfirmation.onkeypress = function(e) {
        if(e.key === "Enter") {
            controlerAjout();
        }
    };

    reponse.onkeypress = function(e){
        if(e.key === "Enter") {
            controlerAjout();
        }
    };


    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');
    $('#btnAjouter').click(controlerAjout);
});

// Ajout
function controlerAjout() {
    let emailOK = controler(inputEmail);
    let passwordOK = controler(inputPassword);
    let confirmOK = controler(inputConfirmation);
    let reponseOK = controler(inputReponse);
    if (emailOK == false)
        Std.afficherMessage('msgAjout1', 'Champ requis !', 'rouge', 2);
    else if (passwordOK == false)
        Std.afficherMessage('msgAjout2', 'Champ requis !', 'rouge', 2);
    else if (confirmOK == false)
        Std.afficherMessage('msgAjout3', 'Champ requis !', 'rouge', 2);
    else if (reponseOK == false)
        Std.afficherMessage('msgAjout4', 'Champ requis !', 'rouge', 2);
    else
        ajouter();
}

function ajouter() {


    $.ajax({
        url: 'ajax/ajouter.php',
        type: 'POST',
        data: {
            email: inputEmail.value,
            password: inputPassword.value,
            confirmation: inputConfirmation.value,
            question: question.value,
            reponse: inputReponse.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data == -3){
                Std.afficherMessage('msg', 'Adresse mail non valide !', 'rouge', 3);
            }
            else if(data == -2)
                Std.afficherMessage('msg', 'Un compte utilisant cette adresse existe déjà !', 'rouge', 3);
            else if (data == -1)
                Std.afficherMessage('msg', 'Le mot de passe doit contenir entre 8 et 15 caractères !', 'rouge', 3);
            else if (data == 0)
                Std.afficherMessage('msg', 'Les mots de passe ne correspondent pas !', 'rouge', 3);
            else{
                // mise à jour de l'interface
                Std.afficherMessage('msg', 'Le compte a bien été créé ! Vous allez être redirigé vers la page d\'accueil !', 'vert', 4);
                setTimeout(redirection, 4000);
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
