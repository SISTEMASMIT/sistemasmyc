<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class gruposModel{

    public function configurar_grupos(){

    }

    public function grupos_permisos(){
        $usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
        $gruposArray=array();
        $sql = "CALL bl_banca(:username,'', '', 'list', 'fsql', 'gru_usu', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->user);
		if($statemant->execute()){
            while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
                $grupos[] = array(
                    "niveles" => explode(",",$row["niveles"]),
                    "descripcion" => $row["descripcion"],
                    "grupo" => $row["grupo"],
                    "componente" => $row["componente"]
                );
            }
        }
   
    echo json_encode($grupos);
}

    public function mostrarGrupos(){
        $gruposArray=array();
        $sql = "CALL bl_banca('usuario','0001', 'token', 'list', 'fsql', 'gru_usu', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		if($statemant->execute()){
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        }
        $grupos = $data;
        foreach ($grupos as $grupo){
            if($grupo["grupo"]=="SUPER"){

            }else{
                array_push($gruposArray, $grupo);
            }
        }
    
        
        echo json_encode($gruposArray);
    
    }
}


?>