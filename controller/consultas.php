<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Consultas extends Controller
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

    function usuarios(){
    } 
    function agencias(){
    } 
    function reporte_de_vtas_solo_agencia(){
    } 
    function reporte_de_vtas_global(){
    }
    function lista_por_agencias(){
    } 
    function resumen_de_ventas_x_tickets(){
    }
    function auditoria(){
    } 
    function reporte_de_ventas_x_dispositivo(){
    } 
    function graficos_premiacion_x_loteria(){
    } 
    function disponibilidad_x_nro(){
    } 
    function control_de_horarios__agencias(){
    } 
    function ventas_global_sistemas_consolidados(){
    }
    function control_topes_de_premiacion(){
    }
    
    
    

}

 ?>