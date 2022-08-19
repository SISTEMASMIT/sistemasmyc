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
        //var_dump($data);
        var_dump($data[0]["m"]);
        $dataJson=json_encode($data);
        //echo json_encode($dataJson);
		}

	}


}


?>