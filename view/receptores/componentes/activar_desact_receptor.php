<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
            $pathlocal = $path . '/view' . "/" . $this->url[0] . "/componentes" . "/";
            $modal = file_get_contents($pathlocal . "modalbase.php");
            echo $modal;
            ?>
            <div class="row">
                <div class="col-3">
                    <input id="search" class="espaciadoB form-control" type="text" placeholder="Buscar receptor"><br>
                    <div id="folder_jstree" class="col-6">
                    </div>
                </div>
                </div> <!-- Row general -->
            </div> <!-- container-fluid -->
        </div>
        <!--- page-content --->
    </div><!-- FIN CONTENIDO WEB -->
    <script type="module" src="<? $path; ?>/public/js/<?php echo str_replace("-", "_", $this->url[1]) ?>.js"></script>
    <script src="<? $path; ?>/public/js/sweetalert2.js"></script>