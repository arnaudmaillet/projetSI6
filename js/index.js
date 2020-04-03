let email;
let password;
let messageConnexion;

$(function () {
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('ajax/getpied.php');

    email = document.getElementById('email');
    password = document.getElementById('password');
    messageConnexion = document.getElementById('messageConnexion');


    // si on appuie sur la touche Enter dans le champ pseudo on lance la fonction connexion
    // les touches appuyés autre que les lettres et l'espace ne sont pas affiché dans le champ pseudo
    password.onkeypress = function(e) {
        if(e.key === "Enter") {
            connexion();
        }
        else if(!/[A-Za-z ]/.test(e.key)) {
            return false;
        }
    };

    // le clic sur le bouton btnValider doir lancer la fonction connexion
    document.getElementById('btnValider').onclick = connexion;
});

function connexion() {
    let emailOk = controler(email, messageConnexion);
    let passwordOk = controler(password, messageConnexion)
    if (emailOk && passwordOk) {
        connecter();
    }
}

function controler(input, message) {
    input.value = input.value.trim();
    let valeur = input.value;
    if (valeur.length === 0) {
        message.innerText = "Champ requis ";
        return false;
    }
    else {
        return true;
    }
}

// Appel du script secret.php en lui passant la valeur de l'email
// si la réponse vaut 1 il faut charger la page session.html
// sinon il faut afficher "email ou mdp non valide" dans la balise 'messageEmail"

function connecter() {
    $.ajax({
        url: "ajax/secret.php",
        type: 'post',
        data: {
            email : email.value,
            password : password.value,
        },
        dataType : "json",
        success : function (data) {
            if (data == 1)
                document.location.href = "pageSession/session.html";
            else
                messageConnexion.innerText("Email ou mot de passe non valide");
        }
    })
}

/*function verifier() {
    let password = document.getElementById('password');
    $('#reponse').load("ajax/secret.php", {password : password.value});

}*/