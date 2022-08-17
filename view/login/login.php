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
        <link rel="shortcut icon" href="<? $path;?>/<? $path;?>/public/images/favicon.ico">
    
        <!-- Bootstrap Css -->
        <link href="<? $path;?>/public/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css">
        <!-- Icons Css -->
        <link href="<? $path;?>/public/css/icons.min.css?ver1" rel="stylesheet" type="text/css">
        <!-- App Css-->
        <link href="<? $path;?>/public/css/app.min.css?ver1" id="app-style" rel="stylesheet" type="text/css">
    
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
                        <div class="card">
                            <div class="card-body">
                                <div class="text-center mt-4">
                                    <div class="mb-3">
                                        <a href="index.html"><img src="<? $path;?>/public/images/logo.png" height="30" alt="logo"></a>
                                    </div>
                                </div>
                                <div class="p-3">
                                    <h4 class="font-size-18 mt-2 text-center">Bienvenido!</h4>
                                    <p class="text-muted text-center mb-4">Ingresa a la Banca.</p>
    
                                    <form class="form-horizontal" action="index.html">
    
                                        <div class="mb-3">
                                            <label class="form-label" for="usuario">Usuario</label>
                                            <input type="text" class="form-control" id="usuario" placeholder="Ingrese su Usuario">
                                        </div>
    
                                        <div class="mb-3">
                                            <label class="form-label" for="userpassword">Contraseña</label>
                                            <input type="password" class="form-control" id="clave" placeholder="Ingrese su Contraseña">
                                        </div>
    
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
                                            <div class="col-sm-8 text-end">
                                                <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Entrar</button>
                                            </div>
                                        </div>
                                    </form>
    
                                </div>
    
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>

                             
        <!-- JAVASCRIPT -->
        <script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
        <script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
        <script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
        <script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>

        <script src="<? $path;?>/public/js/app.js"></script>

    </body>
</html>
