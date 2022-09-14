<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class ProcesosModel{
    function monitoreo_de_loterias(){

        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"], true);
        $data['usuario'] = $usuario->user;
        $data['banca'] = $usuario->banca;
        $data['token'] = $usuario->token;
        $consulta_monitoreo = json_encode($data);
        var_dump($consulta_monitoreo);
        $sql = "CALL bl_banca(:consulta_monitoreo)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_monitoreo",$consulta_monitoreo);
        $statemant->execute();
        $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
        // $head = $statemant->getColumnMeta();
        var_dump($data);

    }
    function listado_general(){
        echo "";
    }



}


?>