<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class loginModel{
	public function iniciarSesion($jwt){
        $usuario=json_decode($_POST['usuario']);
        $sql = "CALL bl_banca(:username, '', '', 'login', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '',:jwt, '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->username);
        $statemant->bindParam(":clave",$usuario->clave);
        $statemant->bindParam(":jwt",$jwt);
		if($statemant->execute()){
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        if($data[0]["e"]=='0'){
            $e = $data[0]["e"];
            $mensaje = $data[0]["m"];
            $data2[] = array(
                "e" => $e,
                "mensaje" => $mensaje
            );
            $dataJson=json_encode($data2[0]);
            echo $dataJson;
        }else{
            if($data[0]["e"]=="2"){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "user" => $usuario->username,
                    "clave" => $usuario->clave,
                    "jwt" => $jwt
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }else{ 
                if(!isset($_SESSION)) {
                    session_start();
                }
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "user" => $usuario->username,
                    "clave" => $usuario->clave,
                    "jwt" => $jwt,
                    "banca" => $data[0]["rec"],
                    "token" => $data[0]["token"]
                );
                $dataJson=json_encode($data2[0]);
                $_SESSION["usuario"] = $dataJson;
                echo $dataJson;
                }
            
            }
	    }

	}


    public function registrarEquipo($jwt){
        $usuario=json_decode($_POST['usuario']);
        if($usuario->temporalidad=="On"){
            $sql = "CALL bl_banca(:username, '', '', 'register_perm', 'fsql', 'usu_login', '',:equipo, :codigo, '', '', '', '', '',:jwt, '')";
        }else{
            $sql = "CALL bl_banca(:username, '', '', 'register_temp', 'fsql', 'usu_login', '',:equipo, :codigo, '', '', '', '', '',:jwt, '')";
        }
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->username);
        $statemant->bindParam(":codigo",$usuario->codigo);
        $statemant->bindParam(":equipo",$usuario->equipo);
        $statemant->bindParam(":jwt",$jwt);

        
		if($statemant->execute()){
            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
            if($data[0]["e"]=='0'){
                $e = $data[0]["e"];
                $mensaje = $data[0]["m"];
                $data2[] = array(
                    "e" => $e,
                    "mensaje" => $mensaje
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }else{
                if($data[0]["e"]=="2"){
                    $data2[] = array(
                        "e" => $data[0]["e"],
                        "user" => $usuario->username,
                        "clave" => $usuario->clave,
                        "jwt" => $jwt
                    );
                    $dataJson=json_encode($data2[0]);
                    echo $dataJson;
                }else{ 
                    if(!isset($_SESSION)) {
                        session_start();
                    }
                    $data2[] = array(
                        "e" => $data[0]["e"],
                        "user" => $usuario->username,
                        "clave" => $usuario->clave,
                        "jwt" => $jwt
                    );
                    $dataJson=json_encode($data2[0]);
                    $_SESSION["usuario"] = $dataJson;
                    echo $dataJson;
                }
            
            }
	    }

	}




    public function activarUsuario(){
        $usuario=json_decode($_POST['usuario']);
        $sql = "CALL bl_banca(:username, '', '', 'active_user', 'fsql', 'usu_login', '', '', :codigo, '', '', '', '', '','', '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->username);
        $statemant->bindParam(":codigo",$usuario->codigo);
		if($statemant->execute()){
            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        }else{
        }

        if($data[0]["e"]=="0"){
            $data2[] = array(
                "e" => $data[0]["e"],
                "mensaje" => $data[0]["m"]
            );
            $dataJson=json_encode($data2[0]);
            echo $dataJson;
        }else if($data[0]["e"]=="1"){
            $data2[] = array(
                "e" => $data[0]["e"],
                "mensaje" => $data[0]["m"]
            );
            $dataJson=json_encode($data2[0]);
            echo $dataJson;

        }
    }



}


?>