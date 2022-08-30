<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once 'vendor/sonata-project/google-authenticator/src/FixedBitNotation.php';
include_once 'vendor/sonata-project/google-authenticator/src/GoogleAuthenticatorInterface.php';
include_once 'vendor/sonata-project/google-authenticator/src/GoogleAuthenticator.php';
include_once 'vendor/sonata-project/google-authenticator/src/GoogleQrUrl.php';


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
                    if($data[0]["m"]=="Google Aut"){
                        $g = new \Google\Authenticator\GoogleAuthenticator();
                        $secret = $g->generateSecret();
                        $_SESSION["secret"] = $secret;
                        $url = $g->getURL($usuario->username, 'sistemasmyc.com', $secret);
                        $data2[] = array(
                            "e" => $data[0]["e"],
                            "mensaje" => $data[0]["m"],
                            "url" => $url
                        );
                    }else{
                        //para traer el Gauth Secret
                        $sql = "CALL bl_banca(:username, '', '', 'list_google', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '','', '')";
                        $this->conexion=conexion::getConexion();
                        $statemant=$this->conexion->prepare($sql);
                        $statemant->bindParam(":username",$usuario->username);
                        $statemant->bindParam(":clave",$usuario->clave);
                        if($statemant->execute()){
                            $dataG=$statemant->fetchAll(PDO::FETCH_ASSOC);
                        }
                        $_SESSION["secret"] = $dataG[0]["m"];
                        $data2[] = array(
                            "e" => $data[0]["e"],
                            "mensaje" => $data[0]["m"]
                        );
                    }
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }else{
                if($data[0]["e"]=="2"){
                    //para traer el Gauth Secret
                    $sql = "CALL bl_banca(:username, '', '', 'list_google', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '','', '')";
                    $this->conexion=conexion::getConexion();
                    $statemant=$this->conexion->prepare($sql);
                    $statemant->bindParam(":username",$usuario->username);
                    $statemant->bindParam(":clave",$usuario->clave);
                    $statemant->execute();
                    $dataG=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $_SESSION["secret"] = $dataG[0]["m"];
                    $data2[] = array(
                        "e" => $data[0]["e"],
                        "user" => $usuario->username,
                        "clave" => $usuario->clave,
                        "jwt" => $jwt,
                        "secret" => $dataG[0]["m"]
                    );
                    $dataJson=json_encode($data2[0]);
                    echo $dataJson;
                }else{ 
                    if(!isset($_SESSION)) {
                        session_start();
                    }
                    //Consulta para recibir el Gauth si existe
                    $sql = "CALL bl_banca(:username, '', '', 'list_google', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '','', '')";
                    $this->conexion=conexion::getConexion();
                    $statemant=$this->conexion->prepare($sql);
                    $statemant->bindParam(":username",$usuario->username);
                    $statemant->bindParam(":clave",$usuario->clave);
                    $statemant->execute();
                    $dataG=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $data2[] = array(
                        "e" => $data[0]["e"],
                        "user" => $usuario->username,
                        "clave" => $usuario->clave,
                        "jwt" => $jwt,
                        "banca" => $data[0]["rec"],
                        "token" => $data[0]["token"],
                        "secret" => $dataG[0]["m"]

                    );
                    $dataJson=json_encode($data2[0]);
                    $_SESSION["usuario"] = $dataJson;
                    $_SESSION["inactividad"] = "Off";
                    echo $dataJson;
                }
            }
        }
    }


    public function registrarEquipo($jwt){
        $g = new \Google\Authenticator\GoogleAuthenticator();
        $secret = $_SESSION["secret"];
        $usuario=json_decode($_POST['usuario']);

        if($g->checkCode($secret, $usuario->codigo)){
            //Si pasa google

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
                        //Inicia sesion de nuevo
                        $sql = "CALL bl_banca(:username, '', '', 'login', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '',:jwt, '')";
                        $this->conexion=conexion::getConexion();
                        $statemant=$this->conexion->prepare($sql);
                        $statemant->bindParam(":username",$usuario->username);
                        $statemant->bindParam(":clave",$usuario->clave);
                        $statemant->bindParam(":jwt",$jwt);
                        if($statemant->execute()){
                            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                            if(!isset($_SESSION)) {
                                session_start();
                            }
                            $data2[] = array(
                                "e" => "3",
                                "user" => $usuario->username,
                                "clave" => $usuario->clave,
                                "jwt" => $jwt,
                                "banca" => $data[0]["rec"],
                                "token" => $data[0]["token"]
                            );
                            $dataJson=json_encode($data2[0]);
                            $_SESSION["usuario"] = $dataJson;
                            $_SESSION["inactividad"] = "Off";
                            echo $dataJson;
                        }       
                }
            }
            
            }
	    }else{
            $data2[] = array(
                "e" => "0",
                "mensaje" => "Codigo Inválido"
            );
            $dataJson=json_encode($data2[0]);
            echo $dataJson;
        }

	}


    public function confirmarQr($jwt){
        $g = new \Google\Authenticator\GoogleAuthenticator();
        $secret = $_SESSION["secret"];
        $usuario=json_decode($_POST['usuario']);
        $datos = array();
            if($g->checkCode($secret, $usuario->codigo)){       
                //Primero registramos el secreto del QR
                $sql = "CALL bl_banca(:username, '', '', 'register_google', 'fsql', 'usu_login', '', '', '', '', '', '', '', '','', :secret)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":username",$usuario->username);
                $statemant->bindParam(":secret",$secret);
                if($statemant->execute()){
                    $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $datos["google"] = '1'.$data[0]["m"];
                }

                //Cambiar la Clave
                $sql = "CALL bl_banca(:username, :banca, :token, 'cla_cambia', 'fsql', 'usu_login', :clave, '', '', '', '', '', '', '','', :claveNueva)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":username",$usuario->username);
                $statemant->bindParam(":banca",$usuario->banca);
                $statemant->bindParam(":token",$usuario->token);
                $statemant->bindParam(":clave",$usuario->clave);
                $statemant->bindParam(":claveNueva",$usuario->claveNueva);
                if($statemant->execute()){
                    $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $datos["clave"] = '1'.$data[0]["m"];
                }
    
                //Registrar el navegador
                if($usuario->temporalidad=="On"){
                    $sql = "CALL bl_banca(:username, :banca, :token, 'register_perm', 'fsql', 'usu_login', '',:equipo, '1234', '', '', '', '', '',:jwt, '')";
                }else{
                    $sql = "CALL bl_banca(:username, :banca, :token, 'register_temp', 'fsql', 'usu_login', '',:equipo, '1234', '', '', '', '', '',:jwt, '')";
                }
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":username",$usuario->username);
                $statemant->bindParam(":equipo",$usuario->equipo);
                $statemant->bindParam(":banca",$usuario->banca);
                $statemant->bindParam(":token",$usuario->token);
                $statemant->bindParam(":jwt",$jwt);

                if($statemant->execute()){
                    $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $datos["equipo"] = '1'.$data[0]["m"];
                }

        }
        else{
            $datos[] = array(
                "e" => "0",
                "mensaje" => "Error"
            );
        }

        $dataJson=json_encode($datos);
        echo $dataJson;

    }

    public function activarUsuario(){

        $g = new \Google\Authenticator\GoogleAuthenticator();
        $secret = $_SESSION["secret"];
        $usuario=json_decode($_POST['usuario']);

        if($g->checkCode($secret, $usuario->codigo)){
            //Si pasa google

            $usuario=json_decode($_POST['usuario']);
            $sql = "CALL bl_banca(:username, '', '', 'active_user', 'fsql', 'usu_login', '', '', :codigo, '', '', '', '', '','', '')";
            $this->conexion=conexion::getConexion();
            $statemant=$this->conexion->prepare($sql);
            $statemant->bindParam(":username",$usuario->username);
            $statemant->bindParam(":codigo",$usuario->codigo);
            if($statemant->execute()){
                $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
            }
            if($data[0]["e"]=="0"){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );
            }else if($data[0]["e"]=="1"){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );

            }
            //Si no pasa lo de google
        }else{
            $data2[] = array(
                "e" => "0",
                "mensaje" => "Código Inválido"
            );
        }

        $dataJson=json_encode($data2[0]);
        echo $dataJson;
        

        
    }



}


?>