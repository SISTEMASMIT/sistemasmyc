# Estructura

### La estructura de esta aplicación está con un patrón MVC el cual consta de diferentes partes, su parte principal es que tiene un archivo index el cual sirve de importador principal, es decir él solo llama a los archivos que construyen toda la aplicación, por ende en la configuración siempre se debe redireccionar a este index ( Esta configuración se evidenciara más adelante en la configuración del nginx).
```
<?php
require_once("libs/apps.php");
require_once("libs/view.php");
require_once("libs/controller.php");
require_once("controller/fail.php");
require_once("libs/conexion.php");
require_once("config/config.php");
require_once("view/importer.php");
require_once('vendor/autoload.php');

require_once("libs/sesion.php");

 $app = new App();  

?>
```
### Como se evidencia el código solo llama a apps (El cual es el encargado de llamar a los diferentes controladores o más bien de crearlos, view: el cual es una base para generar las vistas, controller: realiza el mismo trabajo de view, fail: es una vista que se muestra cada vez que hay un error de código, conexion: es el archivo que establece una conexión a la base de datos, config: es el archivo de configuración para las constantes , importer: es un archivo que está generalizado en todas las vistas con el fin de que se puedan crear las vistas de forma dinámica (Este es el archivo que genera los filtros), autoload vendor es un archivo de composer que permite cargar dependencias de forma rápida y práctica

## app.php

```
<?php

    class App
    {
        public function __construct(){
            $url = $_SERVER['REQUEST_URI'];  // url del usuario
            $url= rtrim($url,'/'); // se descomope
            $url=substr_replace($url,'', 0, 1);
            $url= explode('/',$url);
            try {
                if ($url[0]=="" or $url[0]=="index") { // sí es index 
                    $fileController="controller/login.php"; 
                    require_once $fileController; //solicitamos el archivo
                    $controller = new Login(); // creamos el controller inicial
                }else{
//Si no creamos un controller dependiendo la posición 1 de la url descompuesta
 
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
// Captura los errores de cualquier controllador
                var_dump($e);
                $controller= new Fail();
            }
            
       }
    }
 
    
?>
```
### Explicacion de un controlador 
```
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Estas tres primeras lineas muestra de forma explicita los errores en el codigo

class Configuracion extends Controller
{
   /**
     * este es el controlador par los productos de inicio y el contenido plano
     * summary
     */
    public function __construct(){
        $params = func_get_args();
        $num_params = func_num_args();
        $funcion_constructor ='__construct'.$num_params;
        if (method_exists($this,$funcion_constructor)) {
            call_user_func_array(array($this,$funcion_constructor),$params);
        }
    }
    /**
    En el codigo anterior realizo una sobrecarga de constructores con lo cual puedo generar constructores a mi gusto dependiendo la cantidad de parametrs recibidos en este caso solo cremos uno con un parametro
    **/
 

    public  function __construct1($url){
        parent::__construct(); 
        if(isset($_SESSION["usuario"])){
            if($this->loadModel($url[0]."Model")){
                $url2=str_replace("-","_",$url[1]);
                if(method_exists($this,$url2)){
                    $this->view->url=$url;
                    $this->{$url2}();
                    $this->loadModel("homeModel");
                    $this->view->data["menu"]=$this->model->niveles();
                    $this->loadModel("queryModel");
                    $this->view->filtros=$this->model->getFiltros($url[0]."/".$url[1]);
                    $this->view->data["nombreComponente"] = "view/".$url[0]."/componentes"."/".$url2.".php";
                    $this->view->title = strtoupper(str_replace("_"," ",$url2));
                    $this->view->render($url[0]."/".$url[0]);
                }else{
                    $this->loadModel("homeModel");
                    $this->view->data["menu"]=$this->model->niveles();
                    $this->view->data["nombreComponente"] = "view/".$url[0]."/componentes"."/".$url2.".php";
                    $this->view->render($url[0]."/".$url[0]);
                }
            }
        }else{
            header("Location:/");
        }
     }
     
     function topes_dinamicos(){}
     function cobradores(){}
     function tapados_y_topes(){}
     function zonas(){}
     function loterias(){}

}

 ?>
```
####  parent::__construct();  
*Hacemos uso del constructor general el cual nos crea un model dependiendo como se llame el controlador o el parametro que se pase en loadModel*
