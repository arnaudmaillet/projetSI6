
// Initialisation variables de session
let session;
let inputNomAdmin;
let inputPrenomAdmin;

window.onload = initAdmin;
function initAdmin() {
    // Chargement du menu et du pied
    $('#menu').load('ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');

    // Chargement des données sur les session activées
    $.getJSON("ajax/sessionAdmin/getLesSessionsD.php", afficherSessionsD);
    $.getJSON("ajax/sessionAdmin/getLesSessions.php", remplirLesSessions);

    // Attibutions variables de session
    session = document.getElementById('sessions');
    inputPrenomAdmin= document.getElementById('inputPrenom');
    inputNomAdmin = document.getElementById('inputNom');

    // Attribution de la touche entrée
    inputNomAdmin.onkeypress = function (e) {
        if (e.key === "Enter") {
            // Enleve le focus du champ
            $("#inputNom").blur();
            controlerNomPrenom();
        }
        if (!/[A-Za-z]/.test(e.key)) return false
    };

    inputPrenomAdmin.onkeypress = function (e) {
        if (e.key === "Enter") {
            // Enleve le focus du champ
            $("#inputPrenom").blur();
            controlerNomPrenom();
        }
        if (!/[A-Za-z]/.test(e.key)) return false
    };

    // Mises à jour des informations
    session.onchange = getLesDonnees;

    // Attribution du btn ModifierType
    $('#typeSession').click(modifierType);

    // Attribution du btn ModifierType
    $('#etatSession').click(modifierEtat);

    // Attribution du btn ModifierType
    $('#confirmerNomPrenom').click(modifierNomPrenom);

    document.getElementById('btnAjouterTheme').onclick = ajouterTheme;
}

// ----------------------------------------------------------------------------------
// Gestion de la session Admin
// ----------------------------------------------------------------------------------


function afficherSessionsD(data) {
    $('#sessionsD').empty();
    for (const session of data){
        let sessionsD = $('<p>',{style: "line-height: 50%"}).text(session.email);
        $('#sessionsD').append(sessionsD);
    }
}

function modifierType() {
    $.ajax({
        url: 'ajax/sessionAdmin/modifierType.php',
        type: 'POST',
        data: {
            email: session.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data === 1)
                getLesDonnees();
        }
    })
}

function modifierEtat() {
    $.ajax({
        url: 'ajax/sessionAdmin/modifierEtat.php',
        type: 'POST',
        data: {
            email: session.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data === 1)
                // Mise a jour de l'interface
                getLesDonnees();
                $.post("ajax/sessionAdmin/getLesSessionsD.php", afficherSessionsD, 'json').fail(erreurAjax);
        }
    })
}

//function controlerNomPrenom() {
//    let nomOK = controler(inputNomAdmin);
//    let prenomOK = controler(inputPrenomAdmin);
//    if (nomOK === false || prenomOK === false )
//        Std.afficherMessage('msgNomPrenomModification', 'Il faut rentrer un nom et un prénom !', 'rouge', 2);
//    else
//        modifierNomPrenom();
//}

function modifierNomPrenom() {
    $.ajax({
        url: 'ajax/sessionAdmin/modifierNomPrenom.php',
        type: 'POST',
        data: {
            email: session.value,
            nom: inputNomAdmin.value,
            prenom: inputPrenomAdmin.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data === 1){
                Std.afficherMessage('msgNomPrenomModificationOK', 'Modification appliquée !', 'vert', 2);
                setTimeout(modalClose, 2000);
                getLesDonnees();
            }
            else
                Std.afficherMessage('msgNomPrenomModification', 'Il faut rentrer au moins un nom ou un prénom !', 'rouge', 2);
        }
    })
}

function remplirLesSessions(data) {
    // alimentation de la zone de liste des sessions
    for (const element of data) {
        session.add(new Option(element.email));
    }
    getLesDonnees();
}



function getLesDonnees() {
    $.post("ajax/sessionAdmin/getLesDonnees.php", {email: session.value}, afficherDonnees, 'json').fail(erreurAjax);
}


function afficherDonnees(data) {
    // Mise a jour de l'interface
    $('#sessionEmail, #sessionNom, #sessionPrenom, #sessionType, #sessionEtat, #textArea').empty();
    for (const session of data){

        // Affichage des données
        let email = $('<p>',{class:"text-center"}).text("Session : " + session.email);
        $('#sessionEmail').append(email);

        if(session.nom === ""){
            let content = $('<div>').html("<p>Nom : <span class='text-danger'>Non renseigné</span></p>");
            $('#sessionNom').append(content);
        }
        else {
            let content = $('<p>').text("Nom : " + session.nom);
            $('#sessionNom').append(content);
        }

        if(session.prenom === ""){
            let content = $('<div>').html("<p>Prénom : <span class='text-danger'>Non renseigné</span></p>");
            $('#sessionPrenom').append(content);
        }
        else {
            let content = $('<p>').text("Prénom : " + session.prenom);
            $('#sessionPrenom').append(content);
        }

        if(session.typeSession === "U"){
            let content = $('<p>',{class:"m-auto"}).text("Type de session : Utilisateur");
            $('#sessionType').append(content);
        }
        else{
            let content = $('<p>',{class:"m-auto"}).text("Type de session : Administrateur");
            $('#sessionType').append(content);
        }


        if(session.etatSession === "E"){
            let content = $('<p>',{class:"pt-3"}).html("<p>Etat de la session : <span class='text-success'>Activée</span></p>");
            $('#sessionEtat').append(content);
        }
        else{
            let content = $('<p>',{class:"pt-3"}).html("<p>Etat de la session : <span class='text-warning'>Désactivée</span></p>");
            $('#sessionEtat').append(content);
        }

        let content = $('<p>',{class: "p-2"}).html(session.msgSessionbloque);
        $('#textArea').append(content);

    }
}


// Autres fonctions
function modalClose() {
    $('#modalNomPrenom').modal('hide');
}

function erreurAjax(request) {
    $.dialog({title: '', content: request.responseText, type: 'red',});
}

function controler(input) {
    input.value = input.value.trim();
    let valeur = input.value;
    if (valeur.length === 0)
        return false;
}