<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class configuracionModel{
    function usuarios_banca(){
        echo "";    
    }
    public function mostrarGrupos(){
        $usuario=json_decode($_SESSION["usuario"]);    
        $gruposArray=array();
        $sql = "CALL bl_banca(:usuario,:banca,:token, 'list', 'fsql', 'gru_usu', '', '', '', '', '', '', '', '', '', '')";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":usuario",$usuario->user);
        $statemant->bindParam(":banca",$usuario->banca);
        $statemant->bindParam(":token",$usuario->token);
        if($statemant->execute()){
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        }
        $grupos = $data;
        foreach ($grupos as $grupo){
            array_push($gruposArray, $grupo);
        }
        echo json_encode($gruposArray);
        }   

}

?>