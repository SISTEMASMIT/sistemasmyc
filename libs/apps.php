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
                    $fileController="controller/login.php";
                    require_once $fileController;
                    $controller = new Login();
                }else{
                    
                    $fileController="controller/".$url[0].".php";    
                    $url[0]=str_replace("-","_",$url[0]);
                    $fileController=str_replace("-","_",$fileController);
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
                var_dump($e);
                $controller= new Fail();
            }
            
       }
    }
 
    
?>