<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once($path.'/view/head.php');
require_once($path.'/view/header.php');
require_once($path.'/view/footer.php');

?>
<body data-sidebar="dark">
<div class="container"></div>
<div class="main-content" id="result">

        </div>
<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>
<!-- CONTENIDO WEB -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
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
                        <!-- Initialize jsTree -->
                        <div class="padre">
                            <div id="folder_jstree" class="hijo"></div>
                        </div>
                        <br>
                    </div>
                    <div class="modal-footer">
                        <div id="lblPlanta"></div>
                        <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Cancelar</button>
                        <button type="button" id="btnNivel" data-dismiss="modal" class="btn btn-dark" onclick="guardarPermisos()"  data-dismiss="modal">Guardar</button>
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
                            <div class="table-responsive mb-0" data-pattern="priority-columns">
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
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="menuTabla">
                                    
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->

<!---Mi Js--->


<script  type="module" src="<? $path;?>/public/js/main.js"></script>


<!-- JAVASCRIPT -->

<!-- App js -->
<script src="<? $path;?>/public/js/app.js"></script>
<script src="<? $path;?>/public/js/ajax.js"></script>

</body>

</html>