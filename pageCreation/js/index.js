$(function () {
    $('#menu').load('../ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');
    $('#btnAjouter').click(ajouter);
});



// Ajout

function ajouter() {
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('confirmation');

    $.ajax({
        url: 'ajax/ajouter.php',
        type: 'POST',
        data: {
            email: inputEmail.value,
            password: inputPassword.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data >= 1) {
                // mise à jour de l'interface
                Std.afficherMessage('msg', 'Compte Créé !', 'vert', 5)
            } else {
                Std.afficherMessage('msg', 'Compte non Créé !', 'rouge', 5)
            }
        }
    })
}

