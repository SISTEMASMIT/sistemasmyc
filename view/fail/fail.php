<?php
$path=$_SERVER['DOCUMENT_ROOT'];
?>
<html lang="en">
  <head>
  <meta charset="UTF-8">
        <title>404 | Sistemas MYC</title>
         <!-- App favicon -->
         <link rel="shortcut icon" href="<? $path;?>/public/images/favicon.ico">
         <link  rel="stylesheet" type="text/css" href="<?$path;?>/public/css/fail.css">
</head>

<body translate="no">
  <div class="number">404</div>
<div class="text"><span>Oops...</span><br>Pagina no encontrada</div>
</br>
<a href='<?php echo isset($_SESSION["usuario"])?"/home":"/"; ?>' class="btn-stile-fail"><?php echo isset($_SESSION["usuario"])?"Regresar a home":"Regresar a login"; ?> </a>
</body>
</html>