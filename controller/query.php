<?php

class Query extends Controller
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
        if($this->loadModel("permisosModel")){
            return $this->view->data=$this->model->permisos();
        }else{
            echo "No existe";
        }
    }

    public function __construct1($url){
        parent::__construct();
        if($this->loadModel($url[0]."Model")){
            if(method_exists($this->model,$url[1])){
                $this->model->{$url[1]}();
            }else{
                echo "Método Inexistente";
            }
        }
        else{
            echo "No existe";
        }
    }

}

 ?>