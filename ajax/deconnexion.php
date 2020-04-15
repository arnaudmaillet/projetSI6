<?php
session_start();
// supprimer le contenu du tableau $_SESSION
session_unset();
// supprimer le tableau $_SESSION
session_destroy();


header("location:../index.html");
