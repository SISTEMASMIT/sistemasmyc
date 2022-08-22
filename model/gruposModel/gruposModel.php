<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class gruposModel{

    public function configurar_grupos(){

    }

    public function grupos_permisos(){
        $gruposArray=array();
        $sql = "CALL bl_banca('usuario','0001', 'token', 'list', 'fsql', 'gru_usu', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
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

        //saco todos los permisos
        $sql = "CALL bl_banca('lg','0001', '', 'login', 'fsql', 'usu_login', 'clavlg', '', '', '', '', '', '', '', 'tokenl', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		if($statemant->execute()){
			$statemant->fetchAll(PDO::FETCH_ASSOC);
			$statemant->nextRowset();
			while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
                $permisos[] = array(
                    "id" => $row["id"],
                    "item" => $row["item"]
                );
            }
    }
    
    foreach ($grupos as $atr => $grupo){
        if($grupo["grupo"]=="SUPER"){
        }else{
            foreach($grupo["niveles"] as $key => $nivel){
                if($nivel!="4"){
                $grupos[$atr]["niveles"][$key] = $permisos[array_search(intval($nivel), array_column($permisos, 'id'))]["item"];
                }
            }

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