
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="row">
                    <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->
                    <div class="col-3">
                <!-- Aqui van los receptores -->
                    <label class="form-label">Receptores</label>
                    <select class="selectpicker" data-live-search="true" id="receptores">
                    <?php try{
                    $receptores=json_decode($this->data["receptores"]);
                    if ($receptores->estado==200){
                        foreach($receptores->receptores as $key => $receptor)
                        if($key==0){
                            echo "<option value=".$receptor->receptor." data-subtext=".$receptor->receptor." selected>".$receptor->receptor."</option>";
                        }else{
                            echo "<option value=".$receptor->receptor." data-subtext=".$receptor->receptor.">".$receptor->nombre."</option>";
                        }
                    }
                        }catch(Exception $e){
                        echo `<option>Todas</option>`;
                        }
                    ?>
                    </select>
                </div>
                <div class="col-3">
                    <label class="form-label">Loterias</label>
                    <select class="selectpicker" id="loterias" data-live-search="true" multiple>
                    <?php 
                    try{
                        $lote = "Abiertas";
                        $loterias=json_decode($this->data["loterias"]);
                        if ($loterias->estado==200){
                        foreach($loterias->loterias as $key => $loteria)
                            if($key==0){
                            echo "<option value='Abiertas' selected>Abiertas</option>";
                            }else{
                            echo "<option value=".$loteria->loteria.">".$loteria->nombre."</option>";
                            }    
                        }
                        }catch(Exception $e){
                        echo `<option>Todas</option>`;
                        }
                    ?>
                    </select>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Signo</label>
                        <select class="selectpicker" id="signo">
                        <option value="N" Selected>Todos</option>
                        <option value="Con_signo">Con signo</option>
                        <option value="Sin_signo">Sin Signo</option>
                        </select>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Cifras</label>
                        <select class="selectpicker" id="cifras">
                        <option value="Todos" Selected>Todos</option>
                        <option value="triples">Triples</option>
                        <option value="terminales">Terminales</option>
                        <option value="cuadruples">Cuadruples</option>
                        </select>
                    </div>   
                </div><!-- div row  -->
                <div class="row">
                    <button type="button" id="monitorear" class="btn btn-success btn-lg btn-block">Monitorear</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block">Detener</button>
                </div>
                <div class="row">
                    <div id="tabla_res">
                        <div class="table-rep-plugin">
                            <div class="table-responsive mb-0" data-bs-pattern="priority-columns">
                                <table id="tabla1" class="table table-striped">
                                    <thead class="thead" id="head">
                                    </thead>
                                    <tbody id="body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- Row general -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->