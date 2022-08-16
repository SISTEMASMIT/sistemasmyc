<?php

    class App
    {
        public function __construct(){
            $url = $_SERVER['REQUEST_URI'];
                $url= rtrim($url,'/');
                $url=substr_replace($url,'', 0, 1);
                $url= explode('/',$url);
            try {
                if ($url[0]=="" or $url[0]=="index") {
                    $fileController="controller/home.php";
                    require_once $fileController;
                    $controller = new Home();
                }else{
                    $fileController="controller/".$url[0].".php";    
                if (file_exists($fileController)) {
                    require_once $fileController;
                    if (isset($url[1])) {
                        $controller = new $url[0]($url);
                    }else{
                        $controller = new $url[0]();
                        }
                    }else{
                         $controller= new Fail();
                    }
                }
            } catch (Exception $e) {
                $controller= new Fail();
            }
            
       }
    }
 
    
?>