<?php
error_reporting(0);
class Logout extends Controller
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

    public  function __construct1(){
        parent::__construct();
        $this->view->render("logout/logout");
        if(isset($_SESSION['usuario'])) {
            destruir_session();        
        }
    }
}

 ?>