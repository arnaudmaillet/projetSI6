$(function () {
    $('#menu').load('../ajax/getmenu.php');
    $('#pied').load('../ajax/getpied.php');
    document.getElementById('btnValider').onclick = verifier;
});

function verifier() {
    let password = document.getElementById('password');
    $('#reponse').load("ajax/secret.php", {password : password.value});
}