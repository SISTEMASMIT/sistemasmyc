<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class loginModel{
	public function iniciarSesion(){
        
        $usuario=json_decode($_POST['usuario']);
        $sql = "CALL bl_banca(:username, '0001', '', 'login', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '',:token, '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->username);
        $statemant->bindParam(":clave",$usuario->clave);
        $statemant->bindParam(":token",$usuario->jwt);
		if($statemant->execute()){
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        if(count($data[0])<=2){
            $e = $data[0]["e"];
            $mensaje = $data[0]["m"];
            $data2[] = array(
                "e" => $e,
                "mensaje" => $mensaje
            );
            $dataJson=json_encode($data2[0]);
            echo $dataJson;
        }else{
            if(!isset($_SESSION)) {
                session_start();
           }
            $data2[] = array(
                /*
                "e" => $data[0]["e"],
                "receptor" => $data[0]["rec"],
                "banca" => $data[0]["nomban"],
                "usuario" => $data[0]["nomusu"],
                "token" => $data[0]["token"],
                "empresa" => $data[0]["lg"],
                "componentes" =>  $data[0]["compo"]
                */
                "e" => $data[0]["e"],
                "user" => $usuario->username,
                "clave" => $usuario->clave,
                "token" => $usuario->jwt
            );
            $dataJson=json_encode($data2[0]);
            $_SESSION["usuario"] = $dataJson;
            echo $dataJson;
            }
	    }

	}


    public function activarUsuario(){
        $usuario=json_decode($_POST['usuario']);
        $sql = "CALL bl_banca(:username, '0001', '', 'active_user', 'fsql', 'usu_login', :clave, :host, :codigo, '', '', '', '', '',:token, '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->username);
        $statemant->bindParam(":clave",$usuario->clave);
        $statemant->bindParam(":codigo",$usuario->codigo);
        $statemant->bindParam(":token",$usuario->token);
        $statemant->bindParam(":host",$usuario->host);
		if($statemant->execute()){
            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
            $dataJson=json_encode($data[0]);
            echo $dataJson;
        }else{
           
        }
    }



}


?>