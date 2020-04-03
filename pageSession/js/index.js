$(function () {
    $('#menu').load('../ajax/getmenuSession.php');
    $('#pied').load('../ajax/getpied.php');
    $('#btnSupprimer').click(confirmerSuppression);
});


// Suppression

function confirmerSuppression() {
    let n = new Noty({
        text: 'Confirmer la suppression du compte ',
        layout: 'center',
        theme: 'sunset',
        modal: true,
        type: 'info',
        animation: {
            open: 'animated lightSpeedIn',
            close: 'animated lightSpeedOut'
        },
        buttons: [
            Noty.button('Oui', 'btn btn-sm btn-success marge ', function () {
                supprimer();
                n.close();
            }),
            Noty.button('Non', 'btn btn-sm btn-danger', function () {
                n.close();
            })
        ]
    }).show();
}

function supprimer() {
    let readPassword = document.getElementById('passwordConfirm');
    $.ajax({
        url: 'ajax/supprimer.php',
        type: 'POST',
        data: {
            email : readEmail.value,
            password: readPassword.value,
        },
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            afficherMessage("Le compte a été supprimé", 'info');
        }
    })
}
function afficherMessage(message, type) {
    new Noty({
        text: message,
        type: type,
        modal: true,
        layout: 'center',
        theme: 'sunset',
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut',
        },
    }).show().setTimeout(500);
}