
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <?php
                    $pathlocal=$path.'/view'."/".$this->url[0]."/componentes"."/"."modals/";
                   // Abrimos la carpeta que nos pasan como parámetro

                if(is_dir($pathlocal)){
                    $dir = opendir($pathlocal);
                    // Leo todos los ficheros de la carpeta
                    while ($elemento = readdir($dir)){
                        // Tratamos los elementos . y .. que tienen todas las carpetas
                        if( $elemento != "." && $elemento != ".."){
                            // Si es una carpeta
                            if(!is_dir($pathlocal.$elemento) ){
                                if(strpos($elemento, str_replace("-","_",$this->url[1]))!=false){
                                    $modal=file_get_contents($pathlocal.$elemento);
                                    echo $modal;
                                }  
                            } 
                        }
                    }
                }
            ?>
            <div class="row">
                <div class="row divFiltro">
                    <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->
                    
                <!-- Aqui van los receptores -->
                    <?php
                        if($this->filtros!=-1){
                            $array=json_decode($this->filtros[0]["jsr"]);
                            
                            foreach($array->filtros as $filtro){
                                if(method_exists($importer,$filtro->tipo)){
                                    echo $importer->{$filtro->tipo}($filtro->label,$filtro->datos);
                                }                        
                            }
                        }
                    ?>
                
                
                     
                </div><!-- div row  -->
                
                <div class="row">
                    <div id="carga"><div id="load"></div></div>
                
                    <div id="tabla_res" class="espaciadoT">
                        <div id="f"><table id="tablaf" class="cell-border nowrap" style="width:100%"></table></div>
                        <table id="tabla1" class="cell-border display nowrap invisible" style="width:100%">
                            <thead class="thead" id="thead1">
                                <tr><th></th></tr>
                            </thead>
                            <tbody id="tbody1">
                            <tr><td></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modal_edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-editar" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Premiar Número</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="body_modal" class="modal-body">
                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="modal_save" class="btn btn-primary">Guardar Cambios</button>
                    </div>
                    </div>
                </div>
                </div>

            </div> <!-- Row general -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path;?>/public/js/<?php echo str_replace("-","_",$this->url[1])?>.js" ></script>
<script src="<? $path;?>/public/js/dataTables.select.min.js"></script>
<script src="<? $path;?>/public/js/dataTables.editor.min.js"></script>