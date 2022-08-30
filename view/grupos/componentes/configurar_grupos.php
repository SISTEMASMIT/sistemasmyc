
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9" id="p1">
                    <h4 class="card-title">Grupos Existentes</h4>
                    <p class="card-title-desc">Listado de grupos existentes con sus permisos</p>
                    <table id="tablaGrupos" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead class="thead">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody id="gruposExistentes">
                        </tbody>
                    </table>
                </div>
                <!-- Division -->
                <div class="col-md-3" id="p2">
                    <div class="card">
                        <div class="card-body">
                            <div id="infoGrupo"></div>
                            
                        </div>
                    </div>
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
