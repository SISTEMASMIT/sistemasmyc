<?php
$path=$_SERVER['DOCUMENT_ROOT'];
$importer=new Importer();
require_once($path.'/view/head.php');
require_once($path.'/view/footer.php');
require_once($path.'/view/header.php');

?>
<body data-sidebar="dark" data-keep-enlarged="true" class="vertical-collpsed">
<div class="container"></div>
<div class="main-content" id="result">

        </div>
<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>
<!-- CONTENIDO WEB -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                        <label for="nombre_usuario">Nombre usuario</label>
                        <input type="text" class="form-control form-control-lg" value="<?php echo json_decode($_SESSION["usuario"])->user?>" disabled>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                        <label for="nombre_usuario">Identificador equipo</label>
                        <input type="text" id="id_equipo"class="form-control form-control-lg" value="" disabled >
                </div>
            </div>
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path;?>/public/js/perfil.js" ></script>
<!---Mi Js--->
<script src="<? $path;?>/public/js/app.js"></script>
<script src="<? $path;?>/public/js/ajax.js"></script>
<script type="module" src="<? $path;?>/public/js/main.js"></script>


<!-- JAVASCRIPT -->


</body>

</html>