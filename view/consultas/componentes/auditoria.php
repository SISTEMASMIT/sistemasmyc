
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
        
        <?php
                $pathlocal=$path.'/view'."/".$this->url[0]."/componentes"."/";
                if(file_exists($pathlocal."modalbase.php")){
                    $modal=file_get_contents($pathlocal."modalbase.php");
                    echo $modal;
                }
            ?>
            <div class="row">
                <div class="row divFiltro">
                    <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->
                    
                <!-- Aqui van los receptores -->
                <?php
                        if($this->filtros!=-1){
                            $importer->crearFiltros($this->filtros[0]["jsr"]);
                        }
                    ?>
                
                
                     
                </div><!-- div row  -->
                
                <div class="row">
                    <div id="moneda">

                    </div>
                </div>
            </div> <!-- Row general -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path;?>/public/js/<?php echo str_replace("-","_",$this->url[1])?>.js" ></script> 
<script src="<? $path;?>/public/js/sweetalert2.js"></script>
