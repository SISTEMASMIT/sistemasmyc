<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Home extends Controller
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
    public  function __construct0(){
        parent::__construct();
        $this->loadModel("homeModel");
        if(isset($_SESSION["usuario"])){
            
            $this->view->data["menu"]=$this->model->niveles();
            $this->view->render("/home/home");
        }else{
            header("Location: /");
        }
     }

}

 ?>