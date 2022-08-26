<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once($path.'/view/header.php');
?>
<body data-sidebar="dark">
<div class="container"></div>
<div class="main-content" id="result">

        </div>
<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>
<!-- CONTENIDO WEB -->
<? require_once($this->data["nombreComponente"]); ?>
<!---Mi Js--->

<script type="module" src="<? $path;?>/public/js/main.js"></script>


<!-- JAVASCRIPT -->

<!-- App js -->
<script src="<? $path;?>/public/js/app.js"></script>
<script src="<? $path;?>/public/js/ajax.js"></script>
<script type="module" src="<? $path;?>/public/js/grupos.js" ></script>
</body>

</html>