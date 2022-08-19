<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class gruposModel{

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