<!-- CONTENIDO WEB -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <button type="button" class="btn btn-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#modalForm">Registrar</button>
                <!-- sample modal content -->
                <div id="modalForm" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title mt-0" id="myModalLabel">Registrar Usuario</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div class="modal-body"> 
                            <form id="formUsuarios">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Nombre:</label>
                                                <input type="text" class="form-control" id="nombre_user">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Usuario:</label>
                                                <input type="text" class="form-control" id="usuario_ban">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Clave:</label>
                                                <input type="password" class="form-control" id="clave_ban">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Receptor:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">0001 Banca Principal</option>
                                                    <option id="2">002 Receptor 2</option>
                                                    <option id="3">003 Receptor 3</option>
                                                    <option id="4">004 Receptor 4</option>
                                                    <option id="5">0013 Receptor 5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Telefono:</label>
                                                <input type="text" class="form-control" id="telefono">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Dias Consulta:</label>
                                                <input type="text" class="form-control" id="dia_con">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Dias Cargo:</label>
                                                <input type="text" class="form-control" id="dia_cargo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <label for="sel1">Estado:</label>
                                            <!--div class="toggle-wrapper">
                                                <div class="mia toggle-light primary" id="estado" value=''></div>
                                            </div-->
                                            <div id="bit00_3">
                                                <label class="switch">
                                                <input type="checkbox" id="estado">
                                                <div class="slider round">
                                                    <span class="on">Activo</span>
                                                    <span class="off">Desactivo</span>
                                                </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <label for="sel1">Monitoreo:</label>
                                            <div id="bit00_4">
                                                <label class="switch">
                                                <input type="checkbox" id="monitoreo">
                                                <div class="slider round">
                                                    <span class="on">Activo</span>
                                                    <span class="off">Desactivo</span>
                                                </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div id='config'></div>
                                        <div class="col-lg-6">
                                            <label for="sel1">Permisos Pagos/Ajustes:</label>
                                            <select class="form-control" id="config2" ">
                                                <option selected id=" 0" value="0">Ninguno</option>
                                                <option id="1" value="1">Pagos</option>
                                                <option id="2" value="2">Ajustes</option>
                                                <option id="3" value="3">Pagos/Ajustes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input id="target" type="button" value="LOTERIAS">
                                </div>
                                <button type="button" id="niveles" class="btn btn-dark waves-effect waves-light" onclick="abrirPermisos()" data-bs-toggle="modal" data-bs-target="#modalNiveles">Niveles</button>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-danger waves-effect" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
                    </div>
                    </form>    
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!--- MODA DE LOS NIVELES --->
        <div class="modal fade" id="modalNiveles" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Niveles de Seguridad</h4>
                    </div>
                    <div class="modal-body">
                    <input id="search" type="text" placeholder="Buscar">
                    <button type="button" class="btn btn-brown waves-effect" onclick="limpiarJstree()">Limpiar Todo</button>
                    <button type="button" class="btn btn-success waves-effect" onclick="expandirJstree()">Expandir Todo</button>
                    <br>
                    <label>Grupo:</label>
                        <select class="form-control" id="grupo">
                        </select>
                        <br>
                    </div>
                    <div class="modal-footer">
                        <div id="lblPlanta"></div>
                        <button type="button" class="btn btn-danger waves-effect" data-bs-dismiss="modal">Cancelar</button>

                        <!-- <button type="button" id="btnNivel" data-dismiss="modal" class="btn btn-dark" onclick="guardarPermisos()"  data-bs-dismiss="modal">Guardar</button> -->
                    </div>
                </div>
            </div>
        </div>
    <!--/div-->

    </div>
    </div>
        <div class="row">
            <!--div class="container caja"-->
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                    <h4 class="card-title">Información</h4>
                    <p class="card-title-desc">Muestra la Información de los usuarios.</p>
                    <div class="table-rep-plugin">
                            <div class="table-responsive mb-0" data-bs-pattern="priority-columns">
                                <table id="tech-companies-1" class="table table-striped">
                                    <thead class="thead">
                                        <tr>
                                            <th>Id</th>
                                            <th data-priority="3">Banca</th>
                                            <th data-priority="1">Usuario Banca</th>
                                            <th data-priority="3">Estado</th>
                                            <th data-priority="3">Dias Consulta</th>
                                            <th data-priority="6">Dias Cargo</th>
                                            <th data-priority="6">Telefono</th>
                                            <th data-priority="6">Dias Clave</th>
                                            <th data-priority="6">Fecha Clave</th>
                                            <th data-priority="6">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div id=output>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>Movil</th>
                                            <th>Pepe</th>
                                            <th>Activo</th>
                                            <th>9</th>
                                            <th>32</th>
                                            <th>3104356744</th>
                                            <th>98</th>
                                            <th>2 feb</th>
                                            <th>Del</th>
                                        </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->
