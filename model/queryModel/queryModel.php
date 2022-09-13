<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class QueryModel{
    
    function getFiltros($url){
        $usuario=json_decode($_SESSION["usuario"]);
        $filtros_consulta=Array(
            "comando"=>$url,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        $consulta_filtros = json_encode($filtros_consulta);
        $sql = "CALL bl_parametros(:consulta_filtros)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_filtros",$consulta_filtros);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            return $response;
        }else{
            return -1;
        }
    }


    function monitoreo(){
        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"], true);
        $data['usuario'] = $usuario->user;
        $data['banca'] = $usuario->banca;
        $data['token'] = $usuario->token;
        $consulta_monitoreo = json_encode($data);
        $sql = "CALL bl_banca(:consulta_monitoreo)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_monitoreo",$consulta_monitoreo);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < $statemant->columnCount(); $i++) {
                $col = $statemant->getColumnMeta($i);
                $head[] = $col['name'];
            }
            $info = array(
                "head" => $head,
                "data" => $response
            );
        }else{
            $info = array(
                "e" => "0",
                "mensaje" => "Error en la consulta"
            );
        }
        
        echo json_encode($info);
        

    }


    function listado_general(){
        echo "";
    }

}


?>