
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="row">
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
                    <div id="countdown"></div>
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
            </div> <!-- Row general -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
