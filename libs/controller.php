<?php 

/**
  * summary
  */
 class Controller 
 {
     /**
      * summary
      */
     public function __construct()
     { 
        $this->view= new View();
        if (isset($_POST)) {
            $this->data=$_POST;
        }
        if (isset($_FILES)) {
            $this->files=$_FILES;            
        }
     }

     function loadModel($model){
     	$url="model/".$model.".php";
     	if (file_exists($url)) {
     		require($url);
     		$modelName=$model;
     		$this->model= new $modelName;
     	}
     }

 } 

 ?>