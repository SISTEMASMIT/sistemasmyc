<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class permisosModel{
	public function permisos(){
        $usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
		$sql = "CALL bl_banca(:usuario,:banca, :token, '', 'fsql', 'menu_config', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":usuario",$usuario->user);
		$statemant->bindParam(":token",$usuario->token);
		$statemant->bindParam(":banca",$usuario->banca);
		if($statemant->execute()){
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        $folderData=json_encode($data);
        $so=json_decode($folderData, TRUE);
        $folders_arr = array();
        $row='';
        $contador=0;
        while ($contador < count($so)) {
            $row=$so[$contador];
            $parentid = $row['parentid'];
            $type="child";
            if ($parentid == '0') {
                $parentid = "#";
                $type= "root";
            }
            $selected = false;
            $opened = false;
            $folders_arr[] = array(
                "id" => $row['id'],
                "parent" => $parentid,
                "text" => $row['item'],
                "state" => array(
                    "selected" => $selected,
                    "opened" => $opened,
                ),
                "type" => $type,
            );
            $contador++;  
        }
        echo json_encode($folders_arr);


		}

	}


}


?>