
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Gestión y Configuración de Grupos</h4>
                            <p class="card-title-desc">Aquí podrá visualizar, crear o eliminar grupos.</p>
                            <form class="row g-3 needs-validation" id="formGrupos" novalidate>
                            <div class="col-md-4">
                                <label for="validationCustom01" class="form-label">Nombre del Grupo:</label>
                                <input type="text" class="form-control espaciadoB" id="nombre" placeholder="Grupo"
                                    required>
                                <div class="valid-feedback">
                                    Correcto!
                                </div>
                                <input id="search" class="espaciadoB" type="text" placeholder="Buscar Permiso">
                                <button type="button" class="btn btn-brown waves-effect" onclick="limpiarJstree()">Limpiar Todo</button>
                                <button type="button" class="btn btn-success waves-effect" onclick="expandirJstree()">Expandir Todo</button>
                                <br>
                                <!-- Initialize jsTree -->
                                <label for="">Asignar Permisos</label>
                            <div id="folder_jstree"></div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Grupos Existentes</h4>
                            <p class="card-title-desc">Listado de grupos existentes con sus permisos</p>
                            <div id="gruposExistentes"></div>
                    </div>
                </div>
            </div>
        </div>
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div>
<!-- FIN CONTENIDO WEB -->
<script src="<? $path;?>/public/js/grupos.js"></script>