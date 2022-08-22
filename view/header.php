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
<link href="<? $path;?>/public/css/bracket.css" rel="stylesheet" type="text/css">
<link href="<? $path;?>/public/css/rwd-table.min.css" rel="stylesheet" type="text/css">
<link href="<? $path;?>/public/css/main.css" rel="stylesheet" type="text/css">
<script src="https://kit.fontawesome.com/ce19f53d03.js" crossorigin="anonymous"></script>


<link rel="stylesheet" type="text/css" href="assets/datatables/datatables.css" />
    <link rel="stylesheet" type="text/css"
        href="assets/datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/bracket.css">
    <link href="css/jquery.switchButton.css" rel="stylesheet">
    <link href="css/toggles-full.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="jstree/dist/themes/default/style.min.css">



<!-- Bootstrap Css -->
<link href="<? $path;?>/public/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css">
<!-- Icons Css -->
<link href="<? $path;?>/public/css/icons.min.css" rel="stylesheet" type="text/css">
<!-- App Css-->
<link href="<? $path;?>/public/css/app.min.css" id="app-style" rel="stylesheet" type="text/css">
<!-- Custom Css-->
<link href="<? $path;?>/public/css/custom.css" rel="stylesheet" type="text/css" />

</head>


<!-- Loader -->
<div id="preloader"><div id="status"><div class="spinner"></div></div></div>


<!-- Begin page -->
<div id="layout-wrapper">
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <a href="index.html" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="<? $path;?>/public/images/logo.png" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="<? $path;?>/public/images/logo-dark.png" alt="" height="17">
                        </span>
                    </a>

                    <a href="index.html" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="<? $path;?>/public/images/logo-light.png" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="<? $path;?>/public/images/logo-light.png" alt="" height="36">
                        </span>
                    </a>
                </div>

                <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect"
                    id="vertical-menu-btn">
                    <i class="mdi mdi-menu"></i>
                </button>
                
                <div class="d-none d-sm-block ms-2">
                    <h4 class="page-title"></h4>
                </div>
            </div>

            <!-- Search input -->
            <div class="search-wrap" id="search-wrap">
                <div class="search-bar">
                    <input class="search-input form-control" placeholder="Search">
                    <a href="#" class="close-search toggle-search" data-target="#search-wrap">
                        <i class="mdi mdi-close-circle"></i>
                    </a>
                </div>
            </div>

            <div class="d-flex">

                <div class="dropdown d-none d-lg-inline-block me-2">
                    <button type="button" class="btn header-item toggle-search noti-icon waves-effect"
                        data-target="#search-wrap">
                        <i class="mdi mdi-magnify"></i>
                    </button>
                </div>

                <div class="dropdown d-none d-lg-inline-block me-2">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        data-bs-toggle="fullscreen">
                        <i class="mdi mdi-fullscreen"></i>
                    </button>
                </div>

                <div class="dropdown d-none d-md-block me-2">
                    <button type="button" class="btn header-item waves-effect" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <span class="font-size-16"> English </span> <img class="ms-2"
                            src="<? $path;?>/public/images/flags/us_flag.jpg" alt="Header Language" height="16">
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <img src="<? $path;?>/public/images/flags/germany_flag.jpg" alt="user-image" height="12"> <span
                                class="align-middle"> German </span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <img src="<? $path;?>/public/images/flags/italy_flag.jpg" alt="user-image" height="12"> <span
                                class="align-middle"> Italian </span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <img src="<? $path;?>/public/images/flags/french_flag.jpg" alt="user-image" height="12"> <span
                                class="align-middle"> French </span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <img src="<? $path;?>/public/images/flags/spain_flag.jpg" alt="user-image" height="12"> <span
                                class="align-middle"> Spanish </span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <img src="<? $path;?>/public/images/flags/russia_flag.jpg" alt="user-image" height="12"> <span
                                class="align-middle"> Russian </span>
                        </a>
                    </div>
                </div>

                <div class="dropdown d-inline-block me-2">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="ion ion-md-notifications"></i>
                        <span class="badge bg-danger rounded-pill">3</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h5 class="m-0 font-size-16"> Notification (3) </h5>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style="max-height: 230px;">
                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-success rounded-circle font-size-16">
                                            <i class="mdi mdi-cart-outline"></i>
                                        </span>
                                    </div>
                                    <div class="flex-1">
                                        <h6 class="mt-0 font-size-15 mb-1">Your order is placed</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">Dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-warning rounded-circle font-size-16">
                                            <i class="mdi mdi-message-text-outline"></i>
                                        </span>
                                    </div>
                                    <div class="flex-1">
                                        <h6 class="mt-0 font-size-15 mb-1">New Message received</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">You have 87 unread messages</p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-info rounded-circle font-size-16">
                                            <i class="mdi mdi-glass-cocktail"></i>
                                        </span>
                                    </div>
                                    <div class="flex-1">
                                        <h6 class="mt-0 font-size-15 mb-1">Your item is shipped</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">It is a long established fact that a reader will</p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </div>
                        <div class="p-2 border-top">
                            <div class="d-grid">
                                <a class="btn btn-sm btn-link font-size-14  text-center" href="javascript:void(0)">
                                    View all
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="rounded-circle header-profile-user" src="<? $path;?>/public/images/users/avatar-1.jpg"
                            alt="Header Avatar">
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <!-- item-->
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">My Wallet</a>
                        <a class="dropdown-item d-block" href="#"><span
                                class="badge bg-success float-end">11</span>Settings</a>
                        <a class="dropdown-item" href="#">Lock screen</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </header>



    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100">
            
            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title">Main</li>
                    <?php 

                     function recorrer($arboles){
                        $arboles=json_decode($arboles);
                        $html="";
                        if(is_array($arboles)){
                            foreach($arboles as $arbol){
                                    if(count($arbol->hijos)>0){
                                        $html=$html."<li class='mm-active'>
                                                <a href='javascript: void(0);' class='has-arrow waves-effect'>
                                                <i class='dripicons-network-1'></i>
                                                <span>".$arbol->titulo."</span>
                                                </a>";
                                        $html=$html."<ul class='sub-menu mm-collapse mm-show' aria-expanded='false' >";
                                        #primer nivel
                                        foreach($arbol->hijos as $hijos1){
                                            if(count($hijos1->hijos)>0){
                                                $html=$html."<li class='mm-active'><a href='javascript: void(0);'  class='has-arrow' aria-expanded='true'>".$hijos1->titulo."</a>";
                                                $html=$html."<ul class='sub-menu mm-collapse mm-show' aria-expanded='true' style=''>";
                                                foreach($hijos1->hijos as $hijos2){
                                                    if(count($hijos2->hijos)>0){
                                                        $html=$html."<li class='mm-active'><a href='javascript: void(0);' class='has-arrow' aria-expanded='false'>".$hijos2->titulo."</a>";
                                                        $html=$html."<ul class='sub-menu mm-collapse mm-show' aria-expanded='false' style='margin-left: 15px;'>";
                                                        foreach($hijos2->hijos as $hijos3){
                                                            $url=str_replace(" ","-",strtolower(trim($hijos2->titulo)))."/".str_replace(" ","-",strtolower(trim($hijos3->titulo)));
                                                            $html=$html."<li><a href='javascript: void(0);' id='redirect' data-url='$url'>".$hijos3->titulo."</a></li>";        
                                                        }
                                                        $html=$html."</ul></li>";
                                                    }else{
                                                        $url=str_replace(" ","-",strtolower(trim($hijos1->titulo)))."/".str_replace(" ","-",strtolower(trim($hijos2->titulo)));
                                                        $html=$html."<li><a href='javascript: void(0);' aria-expanded='false' id='redirect' data-url='$url'>".$hijos2->titulo."</a></li>";
                                                    }                                                  
                                                    
                                                }
                                                $html=$html."</ul></li>";
                                }else{  
                                    $url=str_replace(" ","-",strtolower(trim($arbol->titulo)))."/".str_replace(" ","-",strtolower(trim($hijos1->titulo)));
                                                $html=$html."<li><a href='javascript: void(0);' aria-expanded='false' id='redirect' data-url='$url' >".$hijos1->titulo."</a></li>";   
                                            }
                                        }
                                        $html=$html."</ul>";
                                        $html=$html."</li>";
                                        // return $html;
                                    }else{
                                        return $html;
                                    }
                            }
                            return $html;
                        }else{
                            return "<li><a href=".$arboles->link.">".$arboles->titulo."</a></li>";
                        }
                    }
                    echo  recorrer($this->data["menu"]);
                ?>
                    <!-- <li class="mm-active">
                        <a href="javascript: void(0);" class="has-arrow waves-effect" aria-expanded="true">
                            <i class="dripicons-network-1"></i>
                            <span>Multi Level</span>
                        </a>
                        <ul class="sub-menu mm-collapse mm-show" aria-expanded="true" style="">
                            <li><a href="javascript: void(0);" aria-expanded="false">Level 1.1</a></li>
                            <li class="mm-active"><a href="javascript: void(0);" class="has-arrow" aria-expanded="true">Level 1.2</a>
                                <ul class="sub-menu mm-collapse mm-show" aria-expanded="true" style="">
                                    <li><a href="javascript: void(0);">Level 2.1</a></li>
                                    <li><a href="javascript: void(0);">Level 2.2</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li> -->

                </ul>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
    <!-- Left Sidebar End -->
     <!-- ============================================================== -->
            

                
                <footer class="footer">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                <script>document.write(new Date().getFullYear())</script> © Admiria.
                            </div>
                            <div class="col-sm-6">
                                <div class="text-sm-end d-none d-sm-block">
                                    Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <!-- end main content-->

    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <script>document.write(new Date().getFullYear())</script> © BANCA.
                </div>
                <div class="col-sm-6">
                    <div class="text-sm-end d-none d-sm-block">
                        Crafted with <i class="mdi mdi-heart text-danger"></i> by sumadre
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>

<!-- END layout-wrapper -->


<!--- CARGA DE JS --->
<script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
<script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
<script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
<script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCtSAR45TFgZjOs4nBFFZnII-6mMHLfSYI"></script>
<script src="<? $path;?>/public/js/rwd-table.min.js"></script>
<script src="<? $path;?>/public/js/table-responsive.init.js"></script>
<script type="text/javascript" src="<? $path;?>/public/js/jstree.min.js"></script>

