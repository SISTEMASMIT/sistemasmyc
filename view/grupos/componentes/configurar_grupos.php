
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9" id="p1">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Grupos Existentes</h4>
                            <p class="card-title-desc">Listado de grupos existentes con sus permisos</p>
                            <div class=" text-center">
                                    <button type="button" class="btn btn-primary waves-effect waves-light"
                                        data-bs-toggle="modal" data-bs-target="#agregarGrupo">Agregar</button>
                                </div>
                            <table id="tablaGrupos" class="table table-bordered dt-responsive" tabindex="1">
                                <thead class="thead">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody id="gruposExistentes">
                                    <label id="loading">Cargando...</label>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Division -->
                <div class="col-md-3" id="p2">
                    <div class="invisible" id="panelGrupo">
                        <div class="card">
                            <div class="card-body">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item pest">
                                        <a href="#" class="tab active" data-id="info">
                                        <span class="icon"><i class="fas fa-info"></i></span>
                                        <span class="text">Info</span>
                                        </a>
                                    </li>
                                    <li class="nav-item pest">
                                        <a href="#" class="tab active" data-id="editar" id="editarG">
                                        <span class="icon"><i class="fas fa-user-pen"></i></span>
                                        <span class="text">Editar</span>
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="info">
                                        <div class="card">
                                            <div class="card-body">
                                                <div id="infoGrupo"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="editar">
                                        <div id="editarGrupo">
                                            <br>
                                            <h4 class="card-title">Editar Permisos</h4>
                                            <form class="row g-3 needs-validation" id="formEditarGrupos">
                                                <div class="col-md-9">
                                                    <label for="" class="form-label">Nombre del Grupo:</label>
                                                    <input type="text" class="form-control espaciadoB" id="editarNombre" placeholder="Grupo" required />
                                                    <label for="" class="form-label">Descripción:</label>
                                                    <input class="invisible" id="editarPermisos"/>
                                                    <input type="text" class="form-control espaciadoB" id="editarDescripcion" placeholder="Descripción" required />
                                                    <button type="button" class="btn btn-brown waves-effect" id="editarLimpiar">Limpiar Todo</button><br>
                                                    <button type="button" class="btn btn-success waves-effect" id="editarExpandir">Expandir Todo</button>
                                                    <br>
                                                    <label>Grupo:</label>
                                                    <select class="form-control espaciadoB" id="grupoEditar"></select>
                                                    <!-- Initialize jsTree -->
                                                    <input id="searchEditar" class="espaciadoB" type="text" placeholder="Buscar Permiso">
                                                    <label for="">Asignar Permisos</label>
                                                    <div id="editar_folder_jstree"></div>
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary" type="submit" >Guardar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>

                <!-- sample modal content -->
                <div id="agregarGrupo" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title mt-0" id="myModalLabel">Agregar Nuevo Grupo de Seguridad</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body-c">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h4 class="card-title">Crear un grupo Nuevo</h4>
                                                        <p class="card-title-desc">Rellena el formulario para crear un nuevo grupo.</p>
                                                        <form class="row g-3 needs-validation" id="formGrupos">
                                                        <div class="col-md-9">
                                                            <label for="" class="form-label">Nombre del Grupo:</label>
                                                            <input type="text" class="form-control espaciadoB" id="nombre" placeholder="Grupo" required />
                                                            <label for="" class="form-label">Descripción:</label>
                                                            <input type="text" class="form-control espaciadoB" id="descripcion" placeholder="Descripción" required />
                                                            <input id="search" class="espaciadoB" type="text" placeholder="Buscar Permiso"><br>
                                                            <button type="button" class="btn btn-brown waves-effect" id="limpiar">Limpiar Todo</button><br>
                                                            <button type="button" class="btn btn-success waves-effect" id="expandir">Expandir Todo</button>
                                                            <br>
                                                            <label>Grupo:</label>
                                                        <select class="form-control" id="grupo">
                                                        </select>
                                                            <!-- Initialize jsTree -->
                                                            <label for="">Asignar Permisos</label>
                                                        <div id="folder_jstree"></div>
                                                    </div>
                                                            <div class="col-12">
                                                                <button class="btn btn-primary" type="submit" >Aceptar</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div><!-- /.modal-content -->
                                    </div><!-- /.modal-dialog -->
                                </div><!-- /.modal -->


                                <div class="modal fade bs-example-modal-sm" id="alertaModal" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title mt-0" id="mySmallModalLabel"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div class="modal-body"> 
                                <div id="msgGrupo"></div>                                        
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->





                <div class="modal fade bs-example-modal-sm" id="alertaModalEditarGrupo" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title mt-0" id="mySmallModalLabel"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div class="modal-body"> 
                                <div id="msgGrupoEditar"></div>                                        
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
            </div><!-- div row  -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->
