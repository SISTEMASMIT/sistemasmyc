<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

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
                        if($this->filtros!=-1){
                            $importer->crearFiltros($this->filtros[0]["jsr"]);
                        }
                    ?>
                
                
                
                     
                </div><!-- div row  -->

<br>
<br>
<br>
<div class="col-3">
                    <input id="search" class="espaciadoB form-control" type="text" placeholder="Buscar receptor"><br>
                    <div id="folder_jstree" class="col-6">
                    </div>
                </div>
<div class="row">

    <div class="row">

<div id="tabla_res" class="espaciadoT">
    <div id="f">
        <table id="tablaf" class="cell-border nowrap" style="width:100%"></table>
    </div>
    <table id="tabla1" class="cell-border display nowrap invisible" style="width:100%">
        <thead class="thead" id="thead1">
            <tr>
                <th></th>
            </tr>
        </thead>
        <tbody id="tbody1">
            <tr>
                <td></td>
            </tr>
        </tbody>
    </table>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="menuTabla"></div>
</div>

</div> <!-- Row general --></div>
            
           

        </div> <!-- container-fluid -->
    </div>
    
    <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path; ?>/public/js/<?php echo str_replace("-", "_", $this->url[1]) ?>.js"></script>
<script src="<? $path; ?>/public/js/sweetalert2.js"></script>