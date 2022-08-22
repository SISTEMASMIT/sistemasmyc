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
                                            <input type="text" class="form-control" id="usuario" placeholder="Ingrese su Usuario">
                                        </div>
    
                                        <div class="mb-3">
                                            <label class="form-label" for="userpassword">Contraseña</label>
                                            <input type="password" class="form-control" id="clave" placeholder="Ingrese su Contraseña">
                                        </div>
                                        <? $token="tokenl";?>
                                        <input type="text" id="token" value="<? echo $token; ?>">
                                        <div class="row mt-4">
                                            <!---
                                            <div class="col-sm-6">
                                                
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="customControlInline">
                                                    
                                                    <label class="form-check-label" for="customControlInline">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>--->
                                            <div class="">
                                                <label for="" id="invalido"></label><br>
                                                <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Entrar</button>
                                            </div>
                                        </div>
                                    </form>
    
                                </div>

                                <!-- sample modal content -->
                <div id="modalNav" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title mt-0" id="myModalLabel">Recordar Navegador?</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div class="modal-body"> 
                            <form id="navegador">
                                <div class="modal-body">
                                    <label for="">¿Este es su equipo de confianza? Marque sí para no pedirle más confirmaciones en el futuro.</label>
                                    <br><div id="bit00_3">
                                                <label class="switch">
                                                <input type="checkbox" id="recordar">
                                                <div class="slider round">
                                                    <span class="on">Si</span>
                                                    <span class="off">No</span>
                                                </div>
                                                </label>
                                            </div>
                                            <br>
                                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Entrar</button>
                                </div>
                             </form>    
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
            

                


                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>


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
                                    <div id="usuarioA"></div>
                                    <label for="">Ingrese el Código que le fue enviado a su medio de comunicación para reactivar su usuario</label>
                                    <br><div id="bit00_3">
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="codigo">
                                                <input type="text" class="invisible" id="host" value="<? echo $_SERVER['HOSTNAME'];?>">
                                            </div>
                                            </div>
                                            <label for="" id="msgAct"></label>
                                            <br>
                                    <button id="activarUser" class="btn btn-primary w-md waves-effect waves-light" type="submit">Activar</button>
                                    <button id="cancelarActivarUser" type="button" class="btn btn-danger waves-effect" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                             </form>    
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->

                             
        <!-- JAVASCRIPT -->
        <script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
        <script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
        <script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
        <script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>
        <script src="<? $path;?>/public/js/login.js"></script>
        <script src="<? $path;?>/public/js/app.js"></script>
    </body>
</html>
