<?php
$path=$_SERVER['DOCUMENT_ROOT'];
?>
<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>LOGIN | Sistemas MYC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Themesbrand" name="author">
        <!-- App favicon -->
        <link rel="shortcut icon" href="<? $path;?>/public/images/favicon.ico">
    
        <!-- Bootstrap Css -->
        <link href="<? $path;?>/public/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css">
        <!-- Icons Css -->
        <link href="<? $path;?>/public/css/icons.min.css?ver1" rel="stylesheet" type="text/css">
        <!-- App Css-->
        <link href="<? $path;?>/public/css/app.min.css?ver1" id="app-style" rel="stylesheet" type="text/css">
        <link href="<? $path;?>/public/css/main.css" id="app-style" rel="stylesheet" type="text/css">
    </head>

    <body>
        <!-- Loader -->
        <div id="preloader"><div id="status"><div class="spinner"></div></div></div>

        <!-- Begin page -->
        <div class="accountbg" style="background: url('<? $path;?>/public/images/bg-loteria.jpg');background-size: cover;background-position: center;"></div>
        <div class="account-pages mt-5 pt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-5 col-xl-4">
                        <div class="card login">
                            <div class="card-body">
                                <div class="text-center mt-4">
                                    <div class="mb-3">
                                        <a href="#"><img src="<? $path;?>/public/images/SIAM.png" height="120" alt="logo"></a>
                                    </div>
                                </div>
                                <div class="p-3">
                                    <h4 class="font-size-18 mt-2 text-center">Bienvenido!</h4>
                                    <p class="text-muted text-center mb-4">Ingresa a la Banca.</p>
                                    <form class="form-horizontal" action="" id="formLogin">
    
                                        <div class="mb-3">
                                            <label class="form-label" for="usuario">Usuario</label>
                                            <input type="text" class="form-control" id="usuario" placeholder="Ingrese su Usuario" required>
                                        </div>
    
                                        <div class="mb-3">
                                            <label class="form-label" for="userpassword">Contraseña</label>
                                            <input type="password" class="form-control" id="clave" placeholder="Ingrese su Contraseña" required>
                                        </div>
                                    
                                        <div class="row mt-4">
                                            <div class="">
                                                <label for="" id="invalido"></label><br>
                                                <input type="hidden" id="token_gen" name="token_gen">
                                                <button class="btn btn-primary w-md waves-effect waves-light"  type="submit">Entrar</button>
                                            </div>
                                            <label id="recuperarC" for="">Recuperar Contraseña</label>
                                        </div>
                                    </form>
                                </div>                       
                            </div>    
                        </div>
                    </div>
                </div>
            </div>

<!-- ALERTAS DE AQUÍ PARA ABAJO --->


            <!--- Alerta Navegador Registro -->
            <div class="modal fade bs-example-modal-sm" id="alertaModal" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title mt-0" id="mySmallModalLabel"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> 
                            <div id="msgRegNav"></div>                                        
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->


            <!--- Alerta Sesion -->
            <div class="modal fade bs-example-modal-sm" id="sesionAlerta" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title mt-0" id="mySmallModalLabel"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> 
                            <div id="msgSesion"></div>                                        
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            
            <!--- Alerta Clave -->
            <div class="modal fade bs-example-modal-sm" id="claveAlerta" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title mt-0" id="mySmallModalLabel"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> 
                            <div id="msgClaveCard"></div>                                        
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->



        </div> <!--- cierre de web-->

<!-- MODALES DE AQUÍ PARA ABAJO --->


        <!--- Modal para primer inicio -->
        <div id="modalQR" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="myModalLabel">¡Este es su primer inicio de sesión! Por favor siga los pasos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"> 
                        <form id="registroP">
                            <div class="modal-body">
                                <input type="password" autocomplete="off" class="form-control" id="nuevaClave" required placeholder="Nueva Contraseña">
                                <div class="progress">
                                            <div class="progress-bar" id="progresoClave2">
                                                <span class="progress-bar-text" id="txt-clave2"></span>
                                            </div>
                                        </div>
                                <input type="password" autocomplete="off" class="form-control" id="nuevaClave2" required placeholder="Repita la Contraseña">
                                <label for="" id="msgClaveNueva"></label><br>
                                <span id="passstrengthN2"></span><br>
                                <br><label for="">¿Desea registrar este equipo de manera permanente? Si no marca "Si" se registrará temporalmente.</label><br>
                                <br>
                                <div id="bit00_3">
                                    <label class="switch">
                                        <input type="checkbox" id="recordar2">
                                        <div class="slider round">
                                            <span class="on_login">Si</span>
                                            <span class="off_login">No</span>
                                        </div>
                                    </label>
                                </div>
                                <br>
                                <label class="labelQr" for="">Tenga a la mano, su celular con la Aplicación "Google Authenticator", de clic en siguiente cuando esté listo.</label>
                                <button class="btn btn-primary w-md waves-effect waves-light invisible" id="mostrarQr">Siguiente</button>
                                <img id="imgQr" class="imgQr espaciadoB" src="" />
                                <label class="labelCodeQr espaciadoB" for="">Escanee este QR y digite el número de 6 digitos que le da Google Authenticator: </label>
                                <input class="inputCodeQr espaciadoB" id="inputCodeQr" type="text" autocomplete="off" class="form-control" required placeholder="Ingrese el código"><br>
                                <label for="" id="msgQr"></label><br>
                                <button id="primerInicio" class="btn btn-primary w-md waves-effect waves-light invisible" type="submit">Enviar</button>
                            </div>
                        </form>   
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->




        <!--- Modal para reactivar Usuario -->
        <div id="modalActivar" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="myModalLabel">Reactivar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"> 
                        <form id="reactivar">
                            <div class="modal-body">
                                <div id="usuarioA" class="espaciadoB"></div>
                                    <label class="espaciadoB" for="">Ingrese el Código que le da Google Authenticator</label>
                                    <div id="bit00_3">
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="codigoActivar" required>
                                        </div>
                                    </div>
                                    <label for="" id="msgAct"></label>
                                    <br>
                                    <button id="activarUser" class="btn btn-primary w-md waves-effect waves-light" type="submit">Activar</button>
                                    <button id="cancelarActivarUser" type="button" class="btn btn-danger waves-effect" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </form>    
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->



        <!--- Modal para cambiar Clave  -->
        <div id="modalClave" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="myModalLabel">Recuperar Clave</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"> 
                        <form id="recuperarCl">
                            <div class="modal-body">
                                <div id="usuarioA" class="espaciadoB"></div>
                                    <label class="espaciadoB" for="">Ingrese su usuario</label><br>
                                    <input class="espaciadoB" type="text" class="form-control" id="nombreUser" placeholder="Nombre de Usuario" required><br>
                                    <button class="btn btn-primary validarUser" type="button"  id="validarUser">Siguiente</button>
                                    <div class="invisible" id="mostrarCl">
                                        <input class="espaciadoB" type="password" class="form-control" id="claveN1" placeholder="Ingrese la nueva Contraseña" required><br>
                                        <div class="progress">
                                            <div class="progress-bar" id="progresoClave">
                                                <span class="progress-bar-text" id="txt-clave"></span>
                                            </div>
                                        </div>
                                        <span id="passstrength"></span><br>
                                        <input class="espaciadoB" type="password" class="form-control" id="claveN2" placeholder="Repita la contraseña" required><br>
                                        <span id="passstrength2"></span><br>
                                        <label class="espaciadoB" for="">Ingrese el Código de 6 Dígitos que le da Google Authenticator</label>
                                        <input class="espaciadoB" type="text" class="form-control" id="codigoClave" required>
                                    </div>
                                    <label for="" id="msgClave"></label>
                                    <br>
                                    <button id="recuperarClave" class="btn btn-primary w-md waves-effect waves-light invisible" type="submit">Cambiar</button>
                                    <button id="cancelarRecuperarClave" type="button" class="btn btn-danger waves-effect" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </form>    
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    
    

         <!-- Modal para registrar Eqiopo -->
         <div id="modalNav" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title mt-0" id="myModalLabel">Es necesario registrar el equipo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> 
                    <form id="navegador">
                        <div class="modal-body">
                            <br><label for="">¿Este es su equipo de confianza? Marque sí para no pedirle más confirmaciones en el futuro.</label><br>
                            <br><div id="bit00_3">
                                    <label class="switch">
                                    <input type="checkbox" id="recordar">
                                    <div class="slider round">
                                        <span class="on_login">Si</span>
                                        <span class="off_login">No</span>
                                    </div>
                                    </label>
                                    <br>
                                </div>
                            <label for="">Ingrese el código que le indica Google Authenticator.</label>
                            <input type="text" class="form-control espaciadoB" id="codigo" required placeholder="Código recibido">
                            <label for="" id="msgReg"></label><br>
                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Enviar</button>
                        </div>
                    </form>    
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        


                             
        <!-- JAVASCRIPT -->
        <script src="https://www.google.com/recaptcha/api.js?render=6Le_9MYhAAAAAHdY3ed_NDcWwDk43Cf-IsbYQ0LL"></script>
        <script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
        <script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
        <script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
        <script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>
        <script type="module" src="<? $path;?>/public/js/login.js"></script>
        <script src="<? $path;?>/public/js/app.js"></script>
        <script src="<? $path;?>/public/js/validar.js"></script>
    </body>
</html>
