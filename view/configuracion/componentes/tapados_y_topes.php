<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div style="
    width: 100%;
    padding: 1em;
    display: flex;
    justify-content: end;
"><button id="receptores_btn" style="
    padding: 1em;
    border-radius: 6px;
    border: 0px;
    box-shadow: 5px 5px 5px #9aa8b7;
    background: white;
">
<i class="fa-solid fa-arrows-down-to-people" style="color:red"></i>
                <span  style="color:red">Receptores</span>      
            </button>
            </div>
            <?php
            $pathlocal = $path . '/view' . "/" . $this->url[0] . "/componentes" . "/";
            if (file_exists($pathlocal . "modalbase.php")) {
                $modal = file_get_contents($pathlocal . "modalbase.php");
                echo $modal;
            }
            ?>

            <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->

            <!-- Aqui van los receptores -->
            <div class="row divFiltro">
                <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->

                <!-- Aqui van los receptores -->
                <?php
                if ($this->filtros != -1) {
                    $importer->crearFiltros($this->filtros[0]["jsr"]);
                }
                ?>




            </div><!-- div row  -->

            <br>
            <br>
            <br>
            <!-- <div class="col-3">
                <input id="search" class="espaciadoB form-control" type="text" placeholder="Buscar receptor"><br>
                <div id="folder_jstree" class="col-6">
                </div>
            </div> -->
            <div class="row">


                <div class="row">
                    <div id="moneda"></div>
                </div>

                <!-- Row general -->
            </div>



        </div> <!-- container-fluid -->
    </div>

    <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path; ?>/public/js/<?php echo str_replace("-", "_", $this->url[1]) ?>.js"></script>
<script src="<? $path; ?>/public/js/sweetalert2.js"></script>