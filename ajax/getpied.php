<footer class="page-footer font-small fixed-bottom bg-dark text-white px-0" style="z-index: 10; height: 40px">
    <div class="container-fluid">
        <div class="row justify-content-end">
            <div class="col-8 text-center footer-copyright py-3 my-auto copyright" style="height: 100%">© 2020 Copyright:
                Lycée Saint Rémi, Amiens 80000
            </div>
            <div class="col-2 footer-copyright text-center py-3 bg-primary date">
                Date du jour :
                <?php
                date_default_timezone_set('UTC');
                echo date('d/m/Y');
                ?>
            </div>
        </div>
    </div>
</footer>
