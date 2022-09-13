<?php
$path=$_SERVER['DOCUMENT_ROOT'];
?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Portal | Sistemas MYC</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="<? $path;?>/public/images/favicon.ico">
    <!-- App favicon -->
    <link rel="shortcut icon" href="<? $path;?>/public/images/favicon.ico">

    <!--- my css -->
    <!-- <link href="/public/css/bracket.css" rel="stylesheet" type="text/css"> -->
    <?php 
        $f = file_get_contents($path."/public/css/bracket.css");
        echo "<style>";
        echo $f;
        echo "</style>";
    ?>
    <link href="<? $path;?>/public/css/rwd-table.min.css" rel="stylesheet" type="text/css">
    <link href="<? $path;?>/public/css/main.css?1" rel="stylesheet" type="text/css"> 
    <script src="https://kit.fontawesome.com/ce19f53d03.js" crossorigin="anonymous"></script>
    <link href="//cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" rel="stylesheet">


    <link rel="stylesheet" type="text/css" href="assets/datatables/datatables.css" />
    <link rel="stylesheet" type="text/css" href="<? $path;?>/public/assets/datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="<? $path;?>/public/css/jquery.switchButton.css" rel="stylesheet">
    <link href="<? $path;?>/public/css/toggles-full.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<? $path;?>/public/jstree/dist/themes/default/style.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.12.1/af-2.4.0/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/cr-1.5.6/date-1.1.2/fc-4.1.0/fh-3.2.4/kt-2.7.0/r-2.3.0/rg-1.2.0/rr-1.2.8/sc-2.0.7/sb-1.3.4/sp-2.0.2/sl-1.4.0/sr-1.1.1/datatables.min.css"/>

    <!-- Bootstrap Css -->
    <!-- Icons Css -->
    <link href="<? $path;?>/public/css/icons.min.css" rel="stylesheet" type="text/css">
    <!-- App Css-->
    <link href="<? $path;?>/public/css/app.min.css" id="app-style" rel="stylesheet" type="text/css">
    <!-- Custom Css-->
    <link href="<? $path;?>/public/css/custom.css" rel="stylesheet" type="text/css" />
    <link href="<? $path;?>/public/css/datatables.css" rel="stylesheet" type="text/css" />
    <link href="<? $path;?>/public/css/buttons.dataTables.css" rel="stylesheet" type="text/css" />

</head>
