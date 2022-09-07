
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="container" style="background-color: white;border-radius:6px; padding:2em;">
                <div class="row">
                    <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->
                    <div class="col-12">
                        <!-- Aqui van los receptores -->
                        <label class="form-label">Receptores</label>
                        <select class="form-select" aria-label="Default select example">    
                            <option>    
                                Todos Los receptores
                            </option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Lista de loterias</label>
                        <select class="form-select" aria-label="Default select example">    
                            <option>    
                                Todos Los receptores
                            </option>
                        </select>
                    </div>

                    <div class="col-6">
                        <label class="form-label">Fecha De Jugadas</label>

                    </div>

                    <div class="col-3">
                        <label class="form-label">Cifras</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="cifras" id="todos1" checked>
                            <label class="form-check-label" for="todos1">
                              Todos
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="cifras" id="triples2" >
                            <label class="form-check-label" for="triples2">
                              Triples
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="cifras" id="terminales2" >
                            <label class="form-check-label" for="terminales2">
                              Terminales
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="cifras" id="cuadruples2" >
                            <label class="form-check-label" for="cuadruples2">
                              Cuadruples
                            </label>
                          </div>
                    </div>
                    
                </div><!-- div row  -->
                <div class="row">
                    <div class="d-grid" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-success">Monitorear</button>
                        <button type="button" class="btn btn-danger">Detener</button>
                      </div>
                </div>
            </div>
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->
