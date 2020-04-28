// Initialisation variables du forum
let idTheme;
let idQuestion;
let inputTheme;
let question;
let reponse;
let editor;
let editor2;

$(function () {
    // Chargement des themes
    $.getJSON("ajax/forum/getlesthemes.php", remplirLesThemes);


    //  Attibutions variables du Forum
    idTheme = document.getElementById('idTheme');
    inputTheme = document.getElementById('ajoutTheme');
    question = document.getElementById('question');
    reponse = document.getElementById('reponse');
    idTheme.onchange = getLesQuestions;
    document.getElementById('btnAjouterQuestion').onclick = ajouterQuestion;
    document.getElementById('btnAjouterReponse').onclick = ajouterReponse;




    // configuration ckEditor
    let parametre = {
        toolbar: {
            items: ['heading', '|', 'bold', 'italic', 'fontBackgroundColor',
                'fontColor', 'fontSize', 'fontFamily', 'link', 'bulletedList', 'numberedList',
                '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'undo', 'redo']
        },
        language: 'fr',
        image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
            styles: ['full', 'alignLeft', 'alignRight']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
    };
    ClassicEditor.create(question, parametre).then(newEditor => {
        editor = newEditor;
    });
    ClassicEditor.create(reponse, parametre).then(newEditor => {
        editor2 = newEditor;
    });
});

// ----------------------------------------------------------------------------------
// Gestion du forum
// ----------------------------------------------------------------------------------

// Gestion des questions
function remplirLesThemes(data) {
    for (const element of data) {
        idTheme.add(new Option(element.nom, element.id));
    }
    idTheme.selectedIndex = 0;
    getLesQuestions();
}

function ajouterTheme() {
    if (inputTheme.value.length > 0) {
        $.post("ajax/forum/ajouterTheme.php",
            {
                nom: inputTheme.value,
            }, 'json'
        ).fail(erreurAjax);
        $('#idTheme').empty();
        $.getJSON("ajax/forum/getlesthemes.php", remplirLesThemes);
        $('#fenAjoutTheme').modal("hide");
   }
}

function getLesQuestions() {
    $.post("ajax/forum/getLesQuestions.php", {idTheme: idTheme.value}, afficherQuestion, 'json').fail(erreurAjax);
}

// appeler le script ajax/forum/ajouterquestion.php si le champ est renseigné
function ajouterQuestion() {
    question.value = editor.getData();
    if (question.value.length > 0) {
        $.post("ajax/forum/ajouterQuestion.php",
            {
                question: question.value,
                idTheme: idTheme.value
            }, fermerQuestion, 'json').fail(erreurAjax);
    }
}

//effacer le champ de saisie, fermer la fenêtre modale et appeler la fonction getLesQuestions.
function fermerQuestion() {
    editor.setData("");
    $('#fenAjoutQuestion').modal("hide");
    getLesQuestions();
}

function afficherQuestion(data) {
    $('#lesQuestions').empty();
    for (const affichageQuestionForum of data) {
        let a = $('<a>', {class: "list-group-item", role: "tab"});
        a.click(function () {
            getLesReponses(affichageQuestionForum.idQuestion);
            idQuestion = affichageQuestionForum.idQuestion;
        });
        let tr = $('<tr>', {width: "100%", style: "box-sizing: border-box"});
        let td = $('<td>', {class: 'text-left align-middle', width: "10%"});
        let baliseI = $('<img>', {class: "mr-3 h-50 rounded"}).attr({src: 'http://www.gravatar.com/avatar/' + md5(affichageQuestionForum.email)});
        td.append(baliseI);
        tr.append(td);
        td = $('<td>', {
            class: 'text-left align-middle border-right border-left text-center pt-3',
            width: "30%"
        }).html(affichageQuestionForum.nom + " " + affichageQuestionForum.prenom + "<p style='font-size: 0.8em'>" + affichageQuestionForum.date_maj + "</p>");
        tr.append(td);
        td = $('<td>', {
            class: 'text-left align-middle pl-3',
            width: "60%"/*, style:"background-color: red"*/
        }).html(affichageQuestionForum.libelle);
        tr.append(td);
        a.append(tr);
        $('#lesQuestions').append(a);
    }
}

// Gestion des réponse
function ajouterReponse() {
    reponse.value = editor2.getData();
    if (reponse.value.length > 0) {
        $.post("ajax/forum/ajouterreponse.php",
            {
                idQuestion: idQuestion,
                reponse: reponse.value
            }, fermerReponse, 'json').fail(erreurAjax);
    }
}

function fermerReponse() {
    editor2.setData("");
    $('#fenReponse').modal('hide');
    getLesQuestions();
}

function getLesReponses(idQuestion) {
    $.post("ajax/forum/getLesReponses.php", {idQuestion: idQuestion}, afficherReponse, 'json').fail(erreurAjax);
}

function afficherReponse(data) {
    let $lesReponses = $('#lesReponses');
    $lesReponses.empty();
    for (const affichageReponseForum of data) {
        let tr = $('<tr>', {height: "10px"});
        let td = $('<td>', {class: 'text-left pt-3'});
        let baliseI = $('<img>', {class: "mr-3 h-25 rounded-circle mb-1"}).attr({src: 'http://www.gravatar.com/avatar/' + md5(affichageReponseForum.email)});
        td.append(baliseI).append(affichageReponseForum.nom.toUpperCase() + " " + affichageReponseForum.prenom + " " + "<span style='font-size: 0.8em'>" + affichageReponseForum.date_ajout + "</span>");
        tr.append(td);
        $lesReponses.append(tr);
        tr = $('<tr>', {height: "10px"});
        td = $('<td>', {class: 'text-left border-bottom'}).html(affichageReponseForum.libelle);
        tr.append(td);
        $lesReponses.append(tr);
    }
    $("#fenReponse").modal("show");
}
