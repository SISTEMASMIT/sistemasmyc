<!doctype html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="<? $path;?>/public/images/favicon.ico">

    <!-- Bootstrap Css -->
    


</head>

<body data-sidebar="dark" data-keep-enlarged="true" class="vertical-collpsed">

    <!-- Loader -->
    <!-- <div id="preloader">
        <div id="status">
            <div class="spinner"></div>
        </div>
    </div> -->

    <!-- Begin page -->
    <div id="layout-wrapper">

        <header id="page-topbar">
            <div class="navbar-header">
                <div class="d-flex">
                    <!-- Reemplazo Logo -->
                    <div class="navbar-brand-box">
                        <a href="/home" class="logo logo-dark">
                            <span class="logo-sm">
                                <img src="<? $path;?>/public/images/logo.png" alt="" height="22">
                            </span>
                            <span class="logo-lg">
                                <img src="<? $path;?>/public/images/logo-dark.png" alt="" height="17">
                            </span>
                        </a>

                        <a href="/home" class="logo logo-light">
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
                        <i class="fa-solid fa-bars"></i>
                    </button>

                    <div class="d-none d-sm-block ms-2">
                        <h4 class="page-title"><? echo isset($this->title)?$this->title:"";  ?></h4>
                    </div>
                </div>          
                <div class="d-flex" id="idUs"><label><i class="fa-solid fa-user"></i> Usuario: <? echo json_decode($_SESSION["usuario"])->user;  ?></label></div>
                <div class="d-flex" id="idEq"></div>
                <div class="d-flex">

                    <!-- <div class="dropdown d-none d-lg-inline-block me-2">
                        <button type="button" class="btn header-item toggle-search noti-icon waves-effect"
                            data-target="#search-wrap">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div> -->

                    <div class="dropdown d-none d-lg-inline-block me-2">
                        <button type="button" class="btn header-item noti-icon waves-effect"
                            data-bs-toggle="fullscreen">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                    </div>

                    <div class="dropdown d-inline-block me-2">
                        <button type="button" class="btn header-item noti-icon waves-effect"
                            id="page-header-notifications-dropdown" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bell"></i>
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
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle header-profile-user" src="<? $path;?>/public/images/users/avatar-3.jpg"
                                alt="Header Avatar">
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <!-- item-->
                            <a class="dropdown-item" href="<? $path;?>perfil/">Perfil</a>
                            <a class="dropdown-item d-block" href="<? $path;?>config/">Configuraciones</a>
                            <a class="dropdown-item" href="#">Bloquear Pantalla</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="<? $path; ?>/logout/logout">Cerrar Sesión</a>
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
                        <?php 
                            function recorrer($arboles){
                                $arboles=json_decode($arboles);
                                $html="";
                                if(is_array($arboles)){
                                    foreach($arboles as $arbol){
                                            if(count($arbol->hijos)>0){
                                                $html=$html."<li class='item-menu'>
                                                        <a href='javascript: void(0);' class='has-arrow waves-effect'>
                                                        <i class='".$arbol->icono."'></i>
                                                        <span>".$arbol->titulo."</span>
                                                        </a>";
                                                $html=$html."<ul class='sub-menu mm-collapse ' aria-expanded='false' >";
                                                #primer nivel
                                                foreach($arbol->hijos as $hijos1){
                                                    if(count($hijos1->hijos)>0){
                                                        $html=$html."<li class=''><a href='javascript: void(0);'  class='has-arrow' aria-expanded='false'><i class='".$hijos1->icono."'></i>".$hijos1->titulo."</a>";
                                                        $html=$html."<ul class='sub-menu mm-collapse ' aria-expanded='false' style=''>";
                                                        foreach($hijos1->hijos as $hijos2){
                                                            if(count($hijos2->hijos)>0){
                                                                $html=$html."<li class=''><a href='javascript: void(0);' class='has-arrow' aria-expanded='false'><i class='".$hijos2->icono."'></i>".$hijos2->titulo."</a>";
                                                                $html=$html."<ul class='sub-menu mm-collapse ' aria-expanded='false' style='margin-left: 15px;'>";
                                                                foreach($hijos2->hijos as $hijos3){
                                                                    $url=str_replace(" ","-",strtolower(trim($hijos3->titulo)));
                                                                    $html=$html."<li><a href='javascript: void(0);' id='redirect' data-url='$url'><i class='".$hijos3->icono."'></i>".$hijos3->titulo."</a></li>";        
                                                                }
                                                                $html=$html."</ul></li>";
                                                            }else{
                                                                $url=str_replace(" ","-",strtolower(trim($hijos2->link)));
                                                                $html=$html."<li><a href='javascript: void(0);' aria-expanded='false' id='redirect' data-url='$url'><i class='".$hijos2->icono."'></i>".$hijos2->titulo."</a></li>";
                                                            }                                                  
                                                            
                                                        }
                                                        $html=$html."</ul></li>";
                                        }else{  
                                            $url=str_replace(" ","-",strtolower(trim($hijos1->link)));
                                                        $html=$html."<li><a href='javascript: void(0);' aria-expanded='false' id='redirect' data-url='$url' ><i class='".$hijos1->icono."'></i>".$hijos1->titulo."</a></li>";   
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
                    </ul>
                    <!-- Fin del menú -->
                </div>
                <!-- Sidebar -->

            </div>
        </div>
        <!-- Left Sidebar End -->

        <div class="main-content" id="result">

        </div>

        
    </div>
    <!-- END layout-wrapper -->

    

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>

    
</body>

</html>