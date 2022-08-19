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
            $dataJson=json_encode($data2);
            echo $dataJson;
        }else{
            $dataJson=json_encode($data);
            echo $dataJson;
            }
	    }

	}


}


?>