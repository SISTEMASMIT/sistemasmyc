<!-- CONTENIDO WEB -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <button type="button" class="btn btn-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".bs-example-modal-lg">Registrar</button>

            <!--  Modal content for the above example -->
            <div class="modal fade bs-example-modal-lg" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title mt-0" id="myLargeModalLabel">Receptores</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formUsuarios">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Codigo:</label>
                                                <input type="text" class="form-control" id="codigo" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Nombre:</label>
                                                <input type="text" class="form-control" id="nombre" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Telefono:</label>
                                                <input type="text" class="form-control" id="telefono" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Dirección:</label>
                                                <textarea class="form-control" id="direccion" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Receptor:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">Activo</option>
                                                    <option id="2">Desactivado</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Receptor padre:</label>
                                                <input type="text" class="form-control" id="receptorPadre" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Nivel:</label>
                                                <input type="number" class="form-control" id="nivel" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Maxima deuda:</label>
                                                <input type="number" class="form-control" id="mdeuda" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Tiene Ag. directas:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">No</option>
                                                    <option id="2">Si</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Pasar cuentas agencia a receptor:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">No</option>
                                                    <option id="2">Si</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="sel1">Multiplos de :</label>
                                                <input type="number" class="form-control" id="multiplos" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="sel1">Minimo por Numero:</label>
                                                <input type="number" class="form-control" id="mxnumero" />
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="sel1">Minimo por ticket:</label>
                                                <input type="number" class="form-control" id="mxticket" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Envios de saldo por telefono:</label>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="sel1">Receptores:</label>
                                                            <select class="form-control" id="envios_saldos_receptores">
                                                                <option id="1">No</option>
                                                                <option id="2">Si</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="sel1">Agencias:</label>
                                                            <select class="form-control" id="envios_saldos_agencias">
                                                                <option id="1">No</option>
                                                                <option id="2">Si</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Bloqueo de jugadas repetidas:</label>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="sel1">veces:</label>
                                                            <select class="form-control" id="bloque_jugadas_veces">
                                                                <option id="1">No</option>
                                                                <option id="2">Si</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label for="sel1">Numeros:</label>
                                                            <select class="form-control" id="bloque_jugadas_numeros">
                                                                <option id="1">No</option>
                                                                <option id="2">Si</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Envios de alertas por telefono:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">No</option>
                                                    <option id="2">Si</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="sel1">Manejo de administracion:</label>
                                                <select class="form-control" id="codigo_ban">
                                                    <option id="1">No</option>
                                                    <option id="2">Si</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <button type="button" class="btn btn-primary btn-lg w-100 waves-effect waves-light">Asignar porcentajes</button>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <button type="button" class="btn btn-primary btn-lg w-100 waves-effect waves-light">Asignar maximos</button>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">% Promedio terminales:<span id="terminales" style="color:red">...</span></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">% Promedio triples:<span id="terminales" style="color:red">...</span></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">% Promedio Gan y Par:<span id="terminales" style="color:red">...</span></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">% Promedio Premios sin signo:<span id="terminales" style="color:red">...</span></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">% Promedio Premios con signo:<span id="terminales" style="color:red">...</span></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="sel1">Topes del padre:</label>
                                                            <select class="form-control" id="topes_del_padre">
                                                                <option id="1">No</option>
                                                                <option id="2">Si</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                                <div class="form-group">
                                                    <label for="sel1">Crea/Modifica receptores:</label>
                                                    <select class="form-control" id="topes_del_padre">
                                                        <option id="1">Ninguno</option>
                                                    </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <button type="button" class="btn btn-success btn-lg w-100 waves-effect waves-light">Aceptar</button>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <button aria-label="Close" data-bs-dismiss="modal" type="button" class="btn btn-danger btn-lg w-100 waves-effect waves-light">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <!-- FIN CONTENIDO WEB -->
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
