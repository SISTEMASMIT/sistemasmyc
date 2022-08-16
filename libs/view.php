<?php 

/**
 * summary
 */
class View 
{
    /**
     * summary
     */
    public function __construct()
    {
        
    }

    public function render($nombre){
    		require 'view/'.$nombre.'.php';
    }

    public function subValid($sub){
            if(file_exists('view/'.$sub.'.php')){

                return 1;
            }else{
                return 0;
            }
    }
}

 ?>