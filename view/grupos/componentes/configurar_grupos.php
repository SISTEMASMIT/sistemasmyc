
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
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
                                <input id="search" class="espaciadoB" type="text" placeholder="Buscar Permiso">
                                <button type="button" class="btn btn-brown waves-effect" id="limpiar">Limpiar Todo</button>
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
                <div class="col-md-6">
                    <h4 class="card-title">Grupos Existentes</h4>
                    <p class="card-title-desc">Listado de grupos existentes con sus permisos</p>
                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead class="thead">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="gruposExistentes">
                        </tbody>
                    </table>
                </div> 
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
            </div><!-- div row  -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->
