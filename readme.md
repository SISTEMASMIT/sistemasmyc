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
#### Vaya https://github.com/SISTEMASMIT/sistemasmyc donde podra clonar y hacer un pull a los arhivos necesarios para poder hacer el despliegue.

### Paso 2.1
#### Como clonar o hacer pull del repositorio
#### Paso 2.1.1 Clonar
![Logs de descarga y inicio de procesos de las maquinas](./public/Captura%20de%20pantalla%202022-11-09%20145817.png "Logs de descarga y inicio de procesos de las maquinas")
### Puedes instalar git y luego de instalado dar click en la partesita amarilla en el circulo rojo, lo cual copiara en su portapapeles el enlace si tiene configurado una ssh-key hagalo con ssh sino haga lo con http lo cual le solicitara los datos de acceso. con los comandos siguientes

#### Paso 2.1.2 Abriri una terminal de git en la carpeta que quiere clonar el repositorio
#### git init
#### git clone https://github.com/SISTEMASMIT/sistemasmyc.git 
### Pull
#### git remote add master https://github.com/SISTEMASMIT/sistemasmyc.git 
#### git pull master master
#### Ingresas los datos de autenticacion

#### Descargando zip
#### Como se muestra en la imagen con la linea amarilla, podras descargar el zip necesario para hacer el despliegue con todos los archivos, luego solo descomprima y pase al siguiente

### Paso 3 

#### Abra su editor de codigo favorito y una ventana de cmd o cualquier terminal instalada, hace el pull o clone el repositorio en la carpeta que desea alojar la plataforma.  

#### posteriormente a esto puedes usar el comando docker-compose up o docker compose up, el computador va a empezar a descargar las dependencias o sistemas necesarios para hacer el lanzamiento, a continuacion se mostrara y explicara los archivos de docker y los logs que podria mostrar el docker

## Logs

![Logs de descarga y inicio de procesos de las maquinas](./public/Captura%20de%20pantalla%202022-11-09%20141253.png "Logs de descarga y inicio de procesos de las maquinas")

### Logs de descarga y inicio de procesos de las maquinas

![Logs de descarga y inicio de procesos de las maquinas](./public/Captura%20de%20pantalla%202022-11-09%20141324.png "Logs de descarga y inicio de procesos de las maquinas")

### Aqui ya podemos evidenciar que los servicios estan el linea y puedes acceder a la ruta http://localhost:8080


## Explicacion del docker compose 
```
version: '3.7'
services:
  web:
    image: nginx:1.23   
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
      - ./config/docker.conf:/etc/nginx/conf.d/default.conf
    links:
      - php-fpm

  
  php-fpm:
    build: ./phpDockerFile/
    volumes:
      - .:/var/www/html
    environment:
      - PASSPHRASE=SIStem122323233fas5f4asdf8s4df1asasfasdfa-mic.*dadmkajndkhfafldnla
```
### En las primera linea vemos *La version* esto es necesario para docker, a continuacion se declaran los servicios a usar, web es el principal en este se va alojar el **nginx** el cual va a funcionar de proxy reverso para dar le apertura al php y poder servir, en ports lo que se hace es exponer el puerto 80 del container al puerto 8080 de mi maquina local, volumenes es la seccion que va a contener las ubicaciones del codigo y del archivo de configuracion el cual remplaza al default en el contenedor  ubicacion_en_la_maquina_local:ubicacion_en_el_contenedor

### luego vemos links lo cual genera un vinculo con el servicio de php-fpm para poder ser servido y este genera una imagen con el build del phpDockerFile

### Explicacion del *phpDockerFile*
```
FROM php:8-fpm  
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip 
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER=1
CMD ["bash","-c","composer update && composer install && php-fpm"]
```
### En la primera linea vemos la imagen que usamos como base, posteriormente vemos la descarga de las dependencias necesarias para hacer la descarga del composer y la descompresion de este, posteriormente la instalacion. 

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
## Explicacion de un controlador 
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

### las vistas estan seccionadas por carpeta el nombre del controlador es el mismo nombre de la carpeta de la vista, es decir si el controlador se llama configuracion en view/configuracion vas a encontrar todas las vistas pertenecientes a este controlador, la vista en si es una sola que este compuesta de un componente en caso de una sub vista es decir si yo voy a la ruta configuracion/topes-dinamicos la vista que se va a crear esta en configuracion/condiguracion.php la cual va a llamar al componente configuracion/componentes/topes_dinamicos.php los - se cambian por _ debido a reglas de php en los archivos 

## vista general  archivo *configuracion/configuracion.php* 
```
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


</body>

</html>
```

#### En las primeras lineas vemos el importer de otros archivos los cuales van a ir asignador segun la necesidad que haya, posteriormente a esto tenemos nuestro menu vertical de lado izquierdo en la linea *require_once($path.'/view/header.php');* luego vemos la creacion de nuestro componente *<? require_once($this->data['nombreComponente']);?>*  al final lo que vamos a encontrar regularmente son los cdn o modulos necesarios para estas vistas

## componente general configuracion/componentes/topes_dinamicos.php

```
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">

            <?php
            $pathlocal = $path . '/view' . "/" . $this->url[0] . "/componentes" . "/";
            if (file_exists($pathlocal . "modalbase.php")) {
                $modal = file_get_contents($pathlocal . "modalbase.php");
                echo $modal;
            }
            ?>


            <!-- Aqui hacemos uso un modal general para en caso de mostrar un doble click o un click derecho que venga con emergente -->

            <!-- Aqui van los receptores -->
            <div class="row divFiltro">
                    
                    
                <!-- Aqui van los receptores -->
                <?php
                        if($this->filtros!=-1){
                            $importer->crearFiltros($this->filtros[0]["jsr"]);
                        }
                    ?>
                
                
                <!-- Aqui hacemos uso del importer que ya tiene almacenado los filtros en $this->filtros[0], esto al codigo que hay en el controlador -->
                     
                </div><!-- div row  -->

<br>
<br>
<br>
<div class="col-3">
                    <input id="search" class="espaciadoB form-control" type="text" placeholder="Buscar receptor"><br>
                    <div id="folder_jstree" class="col-6">
                    </div>
                </div>
<div class="row">

    <div class="row">

<div id="tabla_res" class="espaciadoT">
    <div id="f">
        <table id="tablaf" class="cell-border nowrap" style="width:100%"></table>
    </div>
    <table id="tabla1" class="cell-border display nowrap invisible" style="width:100%">
        <thead class="thead" id="thead1">
            <tr>
                <th></th>
            </tr>
        </thead>
        <tbody id="tbody1">
            <tr>
                <td></td>
            </tr>
        </tbody>
    </table>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="menuTabla"></div>
</div>
<!-- Aqui tenemos la tabla con datatable y donde se subira toda la informacion necesaria regresada por la base de datos y el procedure bl_banca -->


</div> <!-- Row general --></div>
            
           

        </div> <!-- container-fluid -->
    </div>
    
    <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path; ?>/public/js/<?php echo str_replace("-", "_", $this->url[1]) ?>.js"></script>
<script src="<? $path; ?>/public/js/sweetalert2.js"></script>
```


# ¿Como funciona todo esto con la base de datos?

## realmente casi todo se centraliza en un archivo el cual es model/queryModel.php y model/homeModel.php donde se encuentra este codigo: 

## model/homeModel.php
```
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Arbol{
	public $id=0;
	public $parentId=0;
	public $icono="";
	public $titulo="";
	public $link="";
	public $etiqueta=0;
	public $posicion=0;
	public $hijos=array();
	public $listahijos="";
	public $html="";

	public function __construct($id,$paretdId,$icono,$titulo,$posicion,$link,$etiqueta){
		$this->id=$id;
		$this->parentId=$paretdId;
		$this->icono=$icono;
		$this->titulo=$titulo;
		$this->posicion=$posicion;
		$this->link=$link;
		$this->etiqueta=$etiqueta;
	}
}
class homeModel{
	public function niveles(){
		$arboles=array();
		$niveles=array();
		$usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
		$sql = "CALL bl_banca(:json)";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		$data=json_encode(array("comando"=>"menu_usu","orden"=>"list","usuario"=>$usuario->user,"token"=>$usuario->token));
		$statemant->bindParam(":json",$data);
		if($statemant->execute()){
			$row2=$statemant;
			if($row2->rowCount()>1){
				while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
					if($row["item"]=="OTROS SISTEMAS"){
						$row["posicion"]=1;
					}
					array_push($arboles,new Arbol($row["id"],$row["parentid"],$row["icono"],$row["item"],$row["posicion"],$row["link"],$row["etiqueta"]));
				}
				
			}else{
				destruir_session();
				header("Location: /logout/logout");
			}
		}
		$niveles=$this->crearArbol($arboles); 
	return json_encode($niveles);
}

function crearArbol($arboles){
	$arrayAux=Array();
	foreach($arboles as $clave => $arbol){ 	
		if($arbol->etiqueta==0){
			array_push($arrayAux,$arbol);
		}else if($arbol->etiqueta==1 or $arbol->etiqueta==2){
			$padre=$arrayAux[array_search(intval($arbol->parentId), array_column($arrayAux, 'id'))];	
				$padre->listahijos=$padre->listahijos.";".strval($arbol->id);
			array_push($padre->hijos,$arbol);
		}else if($arbol->etiqueta==3 or $arbol->etiqueta==4 or $arbol->etiqueta==5 or $arbol->etiqueta==6){
			if($arbol->id=="129"){echo "hola";}
			$this->buscarEnArbol($arrayAux,$arbol,$arbol->parentId);
		}else if($arbol->etiqueta==7 or $arbol->etiqueta==8){
			$this->buscarEnArbol($arrayAux,$arbol,$arbol->parentId);
		}
	}
	return $arrayAux;
}

function buscarEnArbol(&$arboles,$nodo,$id){
	foreach($arboles as $clave => $arbol){
		$ids=explode(";",$arbol->listahijos);
		if(array_search(strval($id),$ids)!=0){
			$encontro=0;
			foreach($arbol->hijos as $hijo2){
				if($hijo2->id == $id){
					$encontro=1;
					$arboles[$clave]->listahijos=$arboles[$clave]->listahijos.";".strval($nodo->id);
					$hijo2->listahijos=$hijo2->listahijos.";".strval($nodo->id);
					array_push($hijo2->hijos,$nodo);
				}
			}
			if($encontro==0){
				$this->buscarEnArbol($arbol->hijos,$nodo,$id);
			}
		}
	}
}

function array_sort(&$array, $on, $order=SORT_ASC){
    $new_array = array();
    $sortable_array =$array;

    if (count($array) > 0) {
        foreach ($array as $k => $v) {
            if (is_array($v)) {
                foreach ($v as $k2 => $v2) {
                    if ($k2 == $on) {
                        $sortable_array[$k] = $v2;
                    }
                }
            } else {
                $sortable_array[$k] = $v;
            }
        }

        switch ($order) {
            case SORT_ASC:
                asort($sortable_array);
            break;
            case SORT_DESC:
                arsort($sortable_array);
            break;
        }

        foreach ($sortable_array as $k => $v) {
            $new_array[$k] = $array[$k];
        }
		return $new_array;
    }



	}
}


?>

```

### En este codigo podemos encontrar la seccion donde le solicitamos a la base de datos que nos regrese los permisos de este usuario con lo cual contruiremos nuestro menu lateral vertical, lo que nos regrese aqui es lo que nostros mostraremos en el menu lo cual viene organizado por posicion. inicialmente el metodo que se solicita desde el controlador es niveles() este regresa una tabla la cual sera organizado por los metodos de crear arbol que segun el nivel creara un objeto con hijos y padres en arrays


# model/queryModel.php
```
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class QueryModel{   
    
    public $fecha=Array(
        "current_day"=>"y-m-d"
        );


    function getFiltros($url){
        $url=trim($url,"");
        $usuario=json_decode($_SESSION["usuario"]);
        $filtros_consulta=Array(
            "comando"=>$url,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        $consulta_filtros = json_encode($filtros_consulta,JSON_UNESCAPED_SLASHES);
        $sql = "CALL bl_parametros(:consulta_filtros)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_filtros",$consulta_filtros);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            return $response;
        }else{
            return -1;
        }
    }

    function standard_query(){
        $datos_extra=[];
        $usuario = json_decode($_SESSION["usuario"]);
        $data_inicial = json_decode($_POST["data"]);
        $comando = $data_inicial->comando;
        $data_inicial->usuario = $usuario->user;
        $data_inicial->banca= $usuario->banca;
        $data_inicial->token = $usuario->token;
        if(!isset($data_inicial->orden)){
            $orden="";
        }else{
            $orden=$data_inicial->orden;
        }
        if(isset($_SESSION[$comando])){
            $this->comando_orden($data_inicial,$comando,$orden);
        }else{
            if(isset($data_inicial->orden)){
                $orden=$data_inicial->orden;
            }
        }
        $consulta = json_encode($data_inicial);
        
        $sql = "CALL bl_banca(:consulta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta",$consulta);
        // var_dump($consulta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < $statemant->columnCount(); $i++) {
                $col = $statemant->getColumnMeta($i);
                $head[] = $col['name'];
            }
            
            if(!isset($response[0]["resp"])){
                $data = array(
                    "head" => $head,
                    "data" => $response
                );
            }else{
                $data = array(
                    "head" => "",
                    "data" => "",
                    "mensaje"=>$response[0]["resp"]
                );
            }
        }else{
            $data = array(
                "e" => "0",
                "mensaje" => "Error en la consulta"
            );
        }
        $statemant->closeCursor();
        //Sacando los 2dos resultado
        $segunda_respuesta=Array(
            "comando"=>$comando.",".$orden,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        
        $segunda_respuesta = json_encode($segunda_respuesta);
        $sql = "CALL bl_parametros(:segunda_respuesta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":segunda_respuesta",$segunda_respuesta);
        // var_dump($segunda_respuesta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            $settings = $response[0];
        }else{
            $settings = "0";
        }
        $statemant->closeCursor();
        //Aqui subimos los botones o las acciones a la sesion
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $key => &$r){
            if(!str_contains($r->tipo,"formulario_emergente")){
                
                if(!isset($r->datos->id)){
                    $r->datos->id=$r->label;
                }
                if($r->tipo=="dclick"){
                    $_SESSION[$r->datos->id]=$r;
                }else if($r->tipo=="rclick"){
                    foreach($r->datos->items as $key => $item){
                        // var_dump($item);
                        if(!isset($item->id)){
                            $item->id=$item->label;
                        }
                        $_SESSION[$item->id]=$r->datos->items[$key];
                    }
                }else if($r->tipo=="execute"){
                    $data_inicial->comando=$r->datos->comando;
                    $data_inicial->orden=$r->datos->orden;
                    $consulta_datos_extra= json_encode($data_inicial);
                    $sql_extra = "CALL bl_banca(:consulta)";
                    $statemant_extra=$this->conexion->prepare($sql_extra);
                    $statemant_extra->bindParam(":consulta",$consulta_datos_extra);
                    if($statemant_extra->execute()){
                        $datos_extra=$statemant_extra->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                }else if($r->tipo=="button_emergente"){

                    if(!empty($datos_extra)){
                        $_SESSION[$r->datos->id]=$r;
                    $condicion=explode(",",$r->datos->condicion,);
                    foreach($condicion as $c){
                        if(isset($r->datos->{$c})){
                            if(isset($this->{$c})){
                                if($c=="fecha"){
                                    $r->datos->{$c}=date($this->{$c}[$r->datos->$c]);
                                }
                            }
                        }
                    }
                    
                    $valor_condicion="1";
                    foreach($condicion as $c){
                        if(!$r->datos->{$c}==$datos_extra[0][$c]){
                            $valor_condicion="0";
                            break;
                        }
                    }
                    $r->datos->condicion=$valor_condicion;
                    }else{
                        $_SESSION[$r->datos->id]=$r;
                    }
                    
                }
            }
        }
        $settings=json_decode($settings["jsr"]);
        $settings->filtros=$segunda_r;
        $settings_finales["jsr"]=json_encode($settings->filtros);
        $info = array(
            "data"=> $data,
            "settings" => $settings_finales,
            "datos_extra"=>$datos_extra,
        );

        echo json_encode($info);

    }


    //funcion para modular y configurar el comando y la orden sacandola de la sesion
    public function comando_orden(&$data_inicial,&$comando,&$orden){
        if(isset($_SESSION[$comando]->comando)){
            $data_inicial->comando = $_SESSION[$comando]->comando;
            if($orden==""){
                $data_inicial->orden = $_SESSION[$comando]->orden;
                $orden=$_SESSION[$comando]->orden;
            }
            $comando=$_SESSION[$comando]->comando;
        }else{
            $data_inicial->comando = $_SESSION[$comando]->datos->comando;
            $orden=$_SESSION[$comando]->datos->orden;
            $comando=$_SESSION[$comando]->datos->comando;
        }
    }
    

}
```
### Este archivo contiene el peso de toda transaccion dentro de la plataforma, Aqui hacemos la solicitud a bl_banca el cual segun la orden y el comando hace todas las operaciones necesarias para extraer, guardar, eliminar o actualizar datos en la banca.

## Explicacion del codigo, El metodo princiopal standar query

```
  function standard_query(){
        $datos_extra=[];
        $usuario = json_decode($_SESSION["usuario"]);
        $data_inicial = json_decode($_POST["data"]);
        $comando = $data_inicial->comando;
        $data_inicial->usuario = $usuario->user;
        $data_inicial->banca= $usuario->banca;
        $data_inicial->token = $usuario->token;
        if(!isset($data_inicial->orden)){
            $orden="";
        }else{
            $orden=$data_inicial->orden;
        }
        if(isset($_SESSION[$comando])){
            $this->comando_orden($data_inicial,$comando,$orden);
        }else{
            if(isset($data_inicial->orden)){
                $orden=$data_inicial->orden;
            }
        }
        $consulta = json_encode($data_inicial);
        
        $sql = "CALL bl_banca(:consulta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta",$consulta);
        // var_dump($consulta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < $statemant->columnCount(); $i++) {
                $col = $statemant->getColumnMeta($i);
                $head[] = $col['name'];
            }
            
            if(!isset($response[0]["resp"])){
                $data = array(
                    "head" => $head,
                    "data" => $response
                );
            }else{
                $data = array(
                    "head" => "",
                    "data" => "",
                    "mensaje"=>$response[0]["resp"]
                );
            }
        }else{
            $data = array(
                "e" => "0",
                "mensaje" => "Error en la consulta"
            );
        }
        $statemant->closeCursor();
        //Sacando los 2dos resultado
        $segunda_respuesta=Array(
            "comando"=>$comando.",".$orden,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        
        $segunda_respuesta = json_encode($segunda_respuesta);
        $sql = "CALL bl_parametros(:segunda_respuesta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":segunda_respuesta",$segunda_respuesta);
        // var_dump($segunda_respuesta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            $settings = $response[0];
        }else{
            $settings = "0";
        }
        $statemant->closeCursor();
        //Aqui subimos los botones o las acciones a la sesion
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $key => &$r){
            if(!str_contains($r->tipo,"formulario_emergente")){
                
                if(!isset($r->datos->id)){
                    $r->datos->id=$r->label;
                }
                if($r->tipo=="dclick"){
                    $_SESSION[$r->datos->id]=$r;
                }else if($r->tipo=="rclick"){
                    foreach($r->datos->items as $key => $item){
                        // var_dump($item);
                        if(!isset($item->id)){
                            $item->id=$item->label;
                        }
                        $_SESSION[$item->id]=$r->datos->items[$key];
                    }
                }else if($r->tipo=="execute"){
                    $data_inicial->comando=$r->datos->comando;
                    $data_inicial->orden=$r->datos->orden;
                    $consulta_datos_extra= json_encode($data_inicial);
                    $sql_extra = "CALL bl_banca(:consulta)";
                    $statemant_extra=$this->conexion->prepare($sql_extra);
                    $statemant_extra->bindParam(":consulta",$consulta_datos_extra);
                    if($statemant_extra->execute()){
                        $datos_extra=$statemant_extra->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                }else if($r->tipo=="button_emergente"){

                    if(!empty($datos_extra)){
                        $_SESSION[$r->datos->id]=$r;
                    $condicion=explode(",",$r->datos->condicion,);
                    foreach($condicion as $c){
                        if(isset($r->datos->{$c})){
                            if(isset($this->{$c})){
                                if($c=="fecha"){
                                    $r->datos->{$c}=date($this->{$c}[$r->datos->$c]);
                                }
                            }
                        }
                    }
                    
                    $valor_condicion="1";
                    foreach($condicion as $c){
                        if(!$r->datos->{$c}==$datos_extra[0][$c]){
                            $valor_condicion="0";
                            break;
                        }
                    }
                    $r->datos->condicion=$valor_condicion;
                    }else{
                        $_SESSION[$r->datos->id]=$r;
                    }
                    
                }
            }
        }
        $settings=json_decode($settings["jsr"]);
        $settings->filtros=$segunda_r;
        $settings_finales["jsr"]=json_encode($settings->filtros);
        $info = array(
            "data"=> $data,
            "settings" => $settings_finales,
            "datos_extra"=>$datos_extra,
        );

        echo json_encode($info);

    }
```
### Aqui hacemos uso de conexion el cual nos provee de un objeto conexion este tiene un patron singleton, con esto me refiero a que se tiene una unica conexion para reducir gastos frente a la db y el php, posteriormenete cuadro la orden y el comando en lo cual si vienen estos datos en la peticion los dejo tal cual sino los busco en la session, porque cada vez que hago un get filtros yo almaceno en la session los id de cada boton, esto para posteriormente solicitar lo y hacer las operaciones pertinentes.

### Luego de tener la orden y el comando hago el llamdo a bl_banca con lo cual podre recibir el resultado de la operacion, ya sea una tabla o mensaje ademas de esto con los mismos datos de comando y orden los uno para poder extraer bl_parametros donde tendre almacenado si hay o no un dclick,rclick, sumatoria, invisible etc. ya que con estos datos en el frontend se hacen operaciones de parte de los javascript. Ademas de lo anterior mensionado si viene algun dato de tipo ejecucion se realizara un tercer llamado donde se solventara estos datos requeridos, los cuales seran asignados como datos extra.




