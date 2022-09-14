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
<? require_once($this->data["nombreComponente"]); ?>
<!---Mi Js--->
<script src="<? $path;?>/public/js/app.js"></script>
<script src="<? $path;?>/public/js/ajax.js"></script>
<script type="module" src="<? $path;?>/public/js/main.js"></script>


<!-- JAVASCRIPT -->


<script type="module" src="<? $path;?>/public/js/monitoreo_de_loterias.js" ></script>
<script type="module" src="<? $path;?>/public/js/agencias_en_linea.js" ></script>
</body>

</html>