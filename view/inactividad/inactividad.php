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
         <div class="accountbg" style=""></div>

        <div class="account-pages mt-5 pt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-5 col-xl-4">
    

                       
                    <div class="col-md-3 mt-4">
                        <!--  Modal content for the above example -->
                        <div id="modalInactividad" class="modal fade bs-example-modal-lg" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title mt-0" id="myLargeModalLabel">INACTIVIDAD DETECTADA</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <p>Tu periodo de inactividad se cumplió, vuelve a ingresar tu clave para continuar.</p>
                                        <form id="confirmacion">
                                            <input type="password" class="form-control espaciadoB" id="clave" required placeholder="Ingresa tu contraseña.">
                                            <label for="" id="msgReg"></label><br>
                                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Enviar</button>
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
        

                             
        <!-- JAVASCRIPT -->
        <script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
        <script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
        <script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
        <script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>
        <script type="module" src="<? $path;?>/public/js/inactividad.js"></script>
        <script src="<? $path;?>/public/js/app.js"></script>
    </body>
</html>

