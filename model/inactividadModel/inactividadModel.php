<?php

class inactividadModel{

    function comprobacion(){
        $usuario=json_decode($_SESSION["usuario"]);
        $datos=json_decode($_POST['datos']);
        if($usuario->clave == $datos->clave){
            $_SESSION["inactividad"] = "Off";
            echo "1";
        }else{
            destruir_session();
            echo "0"; 
        }

    }

}

?>