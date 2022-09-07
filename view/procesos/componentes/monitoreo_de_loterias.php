
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="container" style="background-color: white;border-radius:6px; padding:2em;">
                <div class="row">
                    <!-- Aqui debemos agregar un modal emergente para cuando estemos con loterias seleccionar -->
                    <div class="col-3">
                        <!-- Aqui van los receptores -->
                        <label class="form-label">Receptores</label>
                        <!-- <select class="selectpicker" data-live-search="true" data-show-subtext="true" multiple >    
                            <option>    
                                Todos Los receptores
                            </option>
                        </select> -->
                        <select class="selectpicker" data-live-search="true" >
                        <option data-tokens="ketchup mustard" selected="selected">Todos</option>
                          <option data-tokens="ketchup mustard" data-subtext="Rep Alabama">Hot Dog, Fries and a Soda</option>
                          <option data-tokens="mustard">Burger, Shake and a Smile</option>
                          <option data-tokens="frosting">Sugar, Spice and all things nice</option>
                        </select>

                    </div>
                    <div class="col-3">
                        <label class="form-label">Loterias</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="loterias" id="abiertas" checked>
                            <label class="form-check-label" for="abiertas">
                              Loterias abiertas
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="loterias" id="seleccion" >
                            <label class="form-check-label" for="seleccion">
                              Seleccionar loterias
                            </label>
                          </div>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Signo</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="signo" id="todas" checked>
                            <label class="form-check-label" for="todas">
                              Todos
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="signo" id="con_signo" >
                            <label class="form-check-label" for="con_signo">
                              Con signo
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="signo" id="sin_signo" >
                            <label class="form-check-label" for="sin_signo">
                              Sin signo
                            </label>
                          </div>
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
