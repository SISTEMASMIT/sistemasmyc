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

    function standard_query(){
        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"]);
        $comando =$data->comando;
        $data->usuario = $usuario->user;
        $data->banca= $usuario->banca;
        $data->token = $usuario->token;
        if(isset($_SESSION[$comando]->comando)){
            $data->comando = $_SESSION[$comando]->comando;
            $orden=$_SESSION[$comando]->orden;
            $comando=$_SESSION[$comando]->comando;
        }else{
            $data->comando = $_SESSION[$comando]->datos->comando;
            $orden=$_SESSION[$comando]->datos->orden;
            $comando=$_SESSION[$comando]->datos->comando;
        }
        $consulta = json_encode($data);
        $sql = "CALL bl_banca(:consulta)";
        // var_dump($consulta);
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta",$consulta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($response);
            for ($i = 0; $i < $statemant->columnCount(); $i++) {
                $col = $statemant->getColumnMeta($i);
                $head[] = $col['name'];
            }
            $data = array(
                "head" => $head,
                "data" => $response
            );
        }else{
            $data = array(
                "e" => "0",
                "mensaje" => "Error en la consulta"
            );
        }
        //Sacando los 2dos resultado
        $segunda_respuesta=Array(
            "comando"=>$comando.",".$orden,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        
        $segunda_respuesta = json_encode($segunda_respuesta);

        $sql = "CALL bl_parametros(:segunda_respuesta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":segunda_respuesta",$segunda_respuesta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            $settings = $response[0];
        }else{
            $settings = "0";
        }
        
        //Aqui subimos los botones o las acciones a la sesion
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $r){
            if(!isset($r->datos->id)){
                $r->datos->id=$r->label;
            }
            if($r->tipo=="dclick"){
                $_SESSION[$r->datos->id]=$r;
            }else if($r->tipo=="rclick"){
                foreach($r->datos->items as $key => $item){
                    if(!isset($item->id)){
                        $item->id=$item->label;
                    }
                    $_SESSION[$item->id]=$r->datos->items[$key];
                }
            }
        }
        $info = array(
            "data"=> $data,
            "settings" => $settings
        );

        echo json_encode($info);

    }

}


?>