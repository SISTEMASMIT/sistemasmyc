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

        if($jwt!="Error"){
            $usuario=json_decode($_POST['usuario']);
            $urlGoogle = "https://www.google.com/recaptcha/api/siteverify";
            $keyGoogle = "6Le_9MYhAAAAAGMWxPfsWOgHhYyeMoZmGkiwcJJY";
            $tokenGoogle = $usuario->token_google;
            $ip = $_SERVER["REMOTE_ADDR"];
            $request = file_get_contents($urlGoogle.'?secret='.$keyGoogle.'&response='.$tokenGoogle);
            $result = json_decode($request);
            if(count((array)$result)<=3){
                $score=0.5;
            }else{
                    $score=$result->score;
            }
            if($score >= 0.5){
                $consulta_login = array(
                    "comando" => "usu_login",
                    "orden" => "login",
                    "usuario" => $usuario->username,
                    "clave" => $usuario->clave,
                    "jwt" => $jwt
                );
                $consulta_login = json_encode($consulta_login);
                $sql = "CALL bl_banca(:consulta_login)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":consulta_login",$consulta_login);
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
                                $consulta_list_google = array(
                                    "comando" => "usu_login",
                                    "orden" => "list_google",
                                    "usuario" => $usuario->username
                                );
                                $consulta_list_google = json_encode($consulta_list_google);
                                $sql = "CALL bl_banca(:consulta_list_google)";
                                $this->conexion=conexion::getConexion();
                                $statemant=$this->conexion->prepare($sql);
                                $statemant->bindParam(":consulta_list_google",$consulta_list_google);
                                if($statemant->execute()){
                                    $dataG=$statemant->fetchAll(PDO::FETCH_ASSOC);
                                }
                                if(count($dataG)>0){
                                    $_SESSION["secret"] = $dataG[0]["m"];
                                }
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
                            $consulta_list_google = array(
                                "comando" => "usu_login",
                                "orden" => "list_google",
                                "usuario" => $usuario->username
                            );
                            $consulta_list_google = json_encode($consulta_list_google);
                            $sql = "CALL bl_banca(:consulta_list_google)";
                            $this->conexion=conexion::getConexion();
                            $statemant=$this->conexion->prepare($sql);
                            $statemant->bindParam(":consulta_list_google",$consulta_list_google);
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
                            $consulta_list_google = array(
                                "comando" => "usu_login",
                                "orden" => "list_google",
                                "usuario" => $usuario->username
                            );
                            $consulta_list_google = json_encode($consulta_list_google);
                            $sql = "CALL bl_banca(:consulta_list_google)";
                            $this->conexion=conexion::getConexion();
                            $statemant=$this->conexion->prepare($sql);
                            $statemant->bindParam(":consulta_list_google",$consulta_list_google);
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
    
    
            }else{
                $data2 = array(
                    "e" => "0",
                    "mensaje" => "Eres un bot"
                );
                echo json_encode($data2);
            }
        }else{
            $data2 = array(
                "e" => "0",
                "mensaje" => "Error tecnico"
            );
            echo json_encode($data2);
        }

        
    }


    public function registrarEquipo($jwt){
        $g = new \Google\Authenticator\GoogleAuthenticator();
        $secret = $_SESSION["secret"];
        $usuario=json_decode($_POST['usuario']);
        if($g->checkCode($secret, $usuario->codigo)){
            //Si pasa google

            if($usuario->temporalidad=="On"){
                $consulta_registrar_equipo = array(
                    "comando" => "usu_login",
                    "orden" => "register_perm",
                    "jwt" => $jwt,
                    "usuario" => $usuario->username,
                    "nombre_equipo" => $usuario->equipo
                );
            }else{
                $consulta_registrar_equipo = array(
                    "comando" => "usu_login",
                    "orden" => "register_temp",
                    "jwt" => $jwt,
                    "usuario" => $usuario->username,
                    "nombre_equipo" => $usuario->equipo
                );
            }
            $consulta_registrar_equipo = json_encode($consulta_registrar_equipo);
            $sql = "CALL bl_banca(:consulta_registrar_equipo)";
            $this->conexion=conexion::getConexion();
            $statemant=$this->conexion->prepare($sql);
            $statemant->bindParam(":consulta_registrar_equipo",$consulta_registrar_equipo);
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
                        $consulta_login = array(
                            "comando" => "usu_login",
                            "orden" => "login",
                            "usuario" => $usuario->username,
                            "clave" => $usuario->clave,
                            "jwt" => $jwt
                        );
                        $consulta_login = json_encode($consulta_login);
                        $sql = "CALL bl_banca(:consulta_login)";
                        $this->conexion=conexion::getConexion();
                        $statemant=$this->conexion->prepare($sql);
                        $statemant->bindParam(":consulta_login",$consulta_login);
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
                $consulta_register_google = array(
                "comando" => "usu_login",
                "orden" => "register_google",
                "usuario" => $usuario->username,
                "google_aut" => $secret
                );
                $consulta_register_google = json_encode($consulta_register_google);
                $sql = "CALL bl_banca(:consulta_register_google)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":consulta_register_google",$consulta_register_google);
                if($statemant->execute()){
                    $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $datos["google"] = '1'.$data[0]["m"];
                }

                //Cambiar la Clave
                $consulta_cambiar_clave = array(
                    "comando" => "usu_login",
                    "orden" => "cla_cambia",
                    "usuario" => $usuario->username,
                    "clave" => $usuario->clave,
                    "clave_nueva" => $usuario->claveNueva
                );
                $consulta_cambiar_clave = json_encode($consulta_cambiar_clave);
                $sql = "CALL bl_banca(:consulta_cambiar_clave)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":consulta_cambiar_clave",$consulta_cambiar_clave);
                if($statemant->execute()){
                    $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                    $datos["clave"] = '1'.$data[0]["m"];
                }
    
                //Registrar el navegador
                if($usuario->temporalidad=="On"){
                    $consulta_registrar_equipo = array(
                        "comando" => "usu_login",
                        "orden" => "register_perm",
                        "jwt" => $jwt,
                        "usuario" => $usuario->username,
                        "nombre_equipo" => $usuario->equipo
                    );
                }else{
                    $consulta_registrar_equipo = array(
                        "comando" => "usu_login",
                        "orden" => "register_temp",
                        "jwt" => $jwt,
                        "usuario" => $usuario->username,
                        "nombre_equipo" => $usuario->equipo
                    );
                }
                $consulta_registrar_equipo = json_encode($consulta_registrar_equipo);
                $sql = "CALL bl_banca(:consulta_registrar_equipo)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":consulta_registrar_equipo",$consulta_registrar_equipo);
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
            $consulta_activar_usuario  = array(
                "comando" => "usu_login",
                "orden" => "active_user",
                "usuario" => $usuario->username
            );
            $consulta_activar_usuario = json_encode($consulta_activar_usuario);
            $sql = "CALL bl_banca(:consulta_activar_usuario)";
            $this->conexion=conexion::getConexion();
            $statemant=$this->conexion->prepare($sql);
            $statemant->bindParam(":consulta_activar_usuario",$consulta_activar_usuario);
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

    function validarUsuario($jwt){
        $usuario=json_decode($_POST['usuario']);
        $consulta_list_google = array(
            "comando" => "usu_login",
            "orden" => "list_google",
            "usuario" => $usuario->username
        );
        $consulta_list_google = json_encode($consulta_list_google);
        $sql = "CALL bl_banca(:consulta_list_google)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_list_google",$consulta_list_google);
        if($statemant->execute()){
            $dataG=$statemant->fetchAll(PDO::FETCH_ASSOC);
            if(count($dataG)>0){
                $_SESSION["secret"] = $dataG[0]["m"];
            }else{
                $_SESSION["secret"] = "ARRAYOFBYTESGG";
            }
            $data2 = array(
                "e" => "1",
                "mensaje" => "correcto"
            );
        }else{
            $data2 = array(
                "e" => "0",
                "mensaje" => "error"
            );
        }
        echo json_encode($data2);
                       
    }


    public function recuperarClave($jwt){
        $g = new \Google\Authenticator\GoogleAuthenticator();
        $secret = $_SESSION["secret"];
        $usuario=json_decode($_POST['usuario']);
        if($g->checkCode($secret, $usuario->codigo)){
            //Si pasa google

            $usuario=json_decode($_POST['usuario']);
            $consulta_recuperar_clave = array(
                "comando" => "usu_login",
                "orden" => "cla_recup",
                "usuario" => $usuario->username,
                "clave_nueva" => $usuario->clave
            );
            $consulta_recuperar_clave = json_encode($consulta_recuperar_clave);
            $sql = "CALL bl_banca(:consulta_recuperar_clave)";
            $this->conexion=conexion::getConexion();
            $statemant=$this->conexion->prepare($sql);
            $statemant->bindParam(":consulta_recuperar_clave",$consulta_recuperar_clave);
            if($statemant->execute()){
                $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
                if($data[0]["e"]=="1"){
                    $data2 = array(
                        "e" => $data[0]["e"],
                        "mensaje" => $data[0]["m"]
                    );
                }else{
                    $data2 = array(
                        "e" => "0",
                        "mensaje" => "Error en la consulta"
                    );
                }
            //Si no pasa lo de google
            }
        }else{
            $data2 = array(
                "e" => "0",
                "mensaje" => "Código Inválido"
            );
        }

        $dataJson=json_encode($data2);
        echo $dataJson;
    }



}
    
        

?>
