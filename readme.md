# Estructura

### La estructura de esta aplicación está con un patrón MVC el cual consta de diferentes partes, su parte principal es que tiene un archivo index el cual sirve de importador principal, es decir él solo llama a los archivos que construyen toda la aplicación, por ende en la configuración siempre se debe redireccionar a este index ( Esta configuración se evidenciara a continuacion).

```
server {
  index index.php index.html;
  server_name phpfpm.local;
  error_log  /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;
  root /var/www/html;
 
  location / {
    try_files $uri $uri/ /index.php;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    fastcgi_param REMOTE_ADDR $http_x_forwarded_for;
  }

  location ~ \.php$ {
    try_files $uri = 404;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass php-fpm:9000;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param PATH_INFO $fastcgi_path_info;
  }
}
```
*Aqui tenemos un bloque de servidor donde se configura los logs y la redireccion al archivo index con cualquier peticion*

# Como desplegar de forma local

### Para desplegar la aplicacion es necesario que tengas instalado de forma local docker, o en su defecto puedes desplegar lo haciendo las configuraciones pertinentes con php-fpm y un nginx o configurando tu propio servidor aqui hablaremos de una etapa de desarrollo donde se uso docker. docker compose para ser más explicito

## Windows 
### Paso 1: 
#### Instlación de docker https://www.docker.com/ aqui podras descargar docker desktop el cual te permitira lanzar contenedores, explicación: docker desktop genera un entorno virtual con un subsistema de linux.

### Paso 2
#### Vaya https://github.com/SISTEMASMIT/sistemasmyc donde podra clonar y hacer un pill a los arhivos necesarios para poder hacer el despliegue.

### Paso 3 

#### Abra su editor de codigo favorito y una ventana de cmd o cualquier terminal instalada, hace el pull o clone el repositorio en la carpeta que desea alojar la plataforma.  

#### posteriormente a esto puedes usar el comando docker-compose up o docker compose up, el computador va a empezar a descargar las dependencias o sistemas necesarios para hacer el lanzamiento, a continuacion se mostrara y explicara los archivos de docker y los logs que podria mostrar el docker

## Logs

![Logs de descarga y inicio de procesos de las maquinas](./public/Captura%20de%20pantalla%202022-11-09%20141253.png "Logs de descarga y inicio de procesos de las maquinas")

### Logs de descarga y inicio de procesos de las maquinas

![Logs de descarga y inicio de procesos de las maquinas](./public/Captura%20de%20pantalla%202022-11-09%20141324.png "Logs de descarga y inicio de procesos de las maquinas")

### Aqui ya podemos evidenciar que los servicios estan el linea y puedes acceder a la ruta http://localhost:8080



# expliacion del codigo

## index.php
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

### Posteriormente en el código vemos el filtro de sesión, el proceso para la creación del menú y la extracción de los filtros para su posterior pintado **En caso de tener subrutas es decir cuando no solo tienes la ruta configuración si no tienes configuracion/topes-dinamicos se debe crear un método para que la función pueda enviar este ultimo parametro a la base de datos y hacer la respectiva extracción de filtros,  Aquí se le da uso a la función  bl_parametros la cual usa la tabla links_orders para crear los filtros, cada fila de esta tabla puede ser un filtro o puede ser un dclick, rclikc, sumatoria, invisibles, o ejecución que es cuando se necesitan valores de una consulta en una emergente esto será explicado más adelante** posteriormente, estos datos son transmitidos a las vistas gracias al controller general que tiene estos atributos.