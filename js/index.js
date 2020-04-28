// Initialisation des variables
let email;
let password;
let messageConnexion;
let emailPasswordOubli;
let msgSessionBloque;
let editor;


$(function () {
    // Chargement du menu et du pied
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('ajax/getpied.php');

    // Attibutions des variables
    email = document.getElementById('email');
    password = document.getElementById('password');
    emailPasswordOubli = document.getElementById('inputPasswordOubli');
    msgSessionBloque = document.getElementById('msgSessionBloque');

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
    // le clic sur le bouton btnMsgSessionBloque doir lancer la fonction ajouterMsgSessionBloque
    $('#btnMsgSessionBloque').click(ajouterMsgSessionBloque);

    // configuration ckEditor
    let parametre = {
        toolbar: {
            items: [ 'heading', '|', 'bold', 'italic', 'fontBackgroundColor',
                'fontColor',  'fontSize',  'fontFamily', 'link', 'bulletedList', 'numberedList',
                '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote',  'insertTable',  'undo',  'redo' ] },
        language: 'fr',
        image: {
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
            styles: ['full', 'alignLeft', 'alignRight']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow','mergeTableCells' ]
        },
    };
    ClassicEditor.create(msgSessionBloque, parametre).then(newEditor =>{editor = newEditor;});

});

// ----------------------------------------------------------------------------------
// Gestion du formulaire de connexion
// ----------------------------------------------------------------------------------

function controlerConnexion() {
    let emailOk = controler(email);
    let passwordOk = controler(password);
    if (emailOk === false || passwordOk === false)
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
            if (data === -4)
                messageConnexion.innerHTML = "Compte inexistant ! Veuillez créer votre compte en cliquant <a href='pageCreation/creationSession.html'>ici </a>";
            else if (data === 3)
                messageConnexion.innerText = "Mot de passe non valide ! il vous reste 3 essais";
            else if (data === 2)
                messageConnexion.innerText = "Mot de passe non valide ! il vous reste 2 essais";
            else if (data === 1)
                messageConnexion.innerText = "Mot de passe non valide ! il vous reste 1 essai";
            else if (data === -3)
                messageConnexion.innerText = "Le compte est suspendu et vous avez déjà envoyé un message à l'administrateur. Vous allez bientôt recevoir une réponse dans votre boite mail !";
            else if (data === -2)
                messageConnexion.innerHTML = "Le compte a été suspendu, Vous pouvez contacter l'administrateur <a href='#' data-toggle=\"modal\" data-target=\"#modalMsgSessionBloque\">ici</a> !";
            else if (data === -1)
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
    if (emailPasswordOubliOK === false)
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
            if (data === 0)
                Std.afficherMessage('msgPasswordOubli', 'Le compte n\'existe pas !', 'rouge', 2);
            else
                document.location.href = "pageOubli/oubli.php";
        },
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        }
    })
}

function ajouterMsgSessionBloque() {
    msgSessionBloque.value = editor.getData();
    if (msgSessionBloque.value.length > 0){
        $.ajax({
            url: "ajax/msgSessionBloque.php",
            type: 'post',
            data: {
                msgSessionBloque: msgSessionBloque.value,
            },
            dataType: "json",
            success: function (data) {
                if (data === 1)
                    Std.afficherMessage('confirmationSessionBloque', 'Le message à bien été envoyé, vous allez bientôt recevoir une réponse sur votre boite mail !', 'vert', 4);
                setTimeout(redirection, 4000);
            },
            error: function (request) {
                $.dialog({title: '', content: request.responseText, type: 'red'});
            }
        })
    }
}

// autres fonctions
function controler(input) {
    input.value = input.value.trim();
    let valeur = input.value;
    if (valeur.length === 0)
        return false;
}

function redirection() {
    document.location.href = "ajax/deconnexion.php";
}