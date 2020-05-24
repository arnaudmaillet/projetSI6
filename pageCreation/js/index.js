// Initialisation des variables
let inputEmail;
let inputPassword;
let inputConfirmation;
let question;
let inputReponse;



$(function () {
    // Chargement du menu et du pied
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');

    // Attibutions des variables
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
        if (!/[A-Za-z0-9@_.-]/.test(e.key)) return false
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

    inputReponse.onkeypress = function(e){
        if(e.key === "Enter") {
            controlerAjout();
        }
    };

    // Attribution du btnAjouter
    $('#btnAjouter').click(controlerAjout);
});

// ----------------------------------------------------------------------------------
// Gestion du formulaire d'ajout
// ----------------------------------------------------------------------------------

function controlerAjout() {
    let emailOK = controler(inputEmail);
    let passwordOK = controler(inputPassword);
    let confirmOK = controler(inputConfirmation);
    let reponseOK = controler(inputReponse);
    if (emailOK === false)
        Std.afficherMessage('msgAjout1', 'Champ requis !', 'rouge', 2);
    else if (passwordOK === false)
        Std.afficherMessage('msgAjout2', 'Champ requis !', 'rouge', 2);
    else if (confirmOK === false)
        Std.afficherMessage('msgAjout3', 'Champ requis !', 'rouge', 2);
    else if (reponseOK === false)
        Std.afficherMessage('msgAjout4', 'Champ requis !', 'rouge', 2);
    else
        ajouter();
}

function ajouter() {
    let msgPassword = document.getElementById('msgAjout2');

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
            if (data === -3){
                Std.afficherMessage('msgAjout1', 'Adresse email non valide !', 'rouge', 3);
            }
            else if(data === -2)
                Std.afficherMessage('msgAjout1', 'Un compte utilisant cette adresse existe déjà !', 'rouge', 3);
            else if (data === -1){
                // On retire la classe text-muted et on ajoute les classes text-danger, text-uppercase et font-weight-bold à l'élément
                msgPassword.classList.remove("text-muted");
                msgPassword.classList.add("text-danger");
                msgPassword.classList.add("text-uppercase");
                msgPassword.classList.add("font-weight-bold");
            }
            else if (data === 0)
                Std.afficherMessage('msgAjout3', 'Les mots de passe ne correspondent pas !', 'rouge', 3);
            else{
                // mise à jour de l'interface
                msgAjout();
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

function msgAjout() {
    let n = new Noty({
        text: 'Le compte a bien été enregistré ! Nous vous conseillons de vous connecter sur votre session afin d\'y renseigner votre nom ainsi que votre prénom !',
        layout: 'center',
        theme: 'sunset',
        modal: true,
        type: 'info',
        animation: {
            open: 'animated lightSpeedIn',
            close: 'animated lightSpeedOut'
        },
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-success marge', function () {
                n.close();
                redirection();
            }),
        ]
    }).show();
}
