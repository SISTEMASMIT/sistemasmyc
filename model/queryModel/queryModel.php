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
        $comando=$data["accion"];
        $data['comando'] = json_decode($_SESSION[$comando])->comando;
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
            "comando"=>json_decode($_SESSION[$comando])->comando.",".json_decode($_SESSION[$comando])->orden,
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
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $r){
            if($r->tipo=="dclick"){
                $_SESSION[$r->datos->id]=$r;
            }else if($r->tipo=="rclick"){
                foreach($r->datos->items as $key => $item){
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

    function agencias_en_linea(){
        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"], true);
        $data['usuario'] = $usuario->user;
        $data['banca'] = $usuario->banca;
        $data['token'] = $usuario->token;
        $data['ordenado'] = "cod";
        $comando=$data["accion"];
        $data['comando'] = json_decode($_SESSION[$comando])->comando;
        $consulta_agencias = json_encode($data);

        $sql = "CALL bl_banca(:consulta_agencias)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_agencias",$consulta_agencias);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
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
            "comando"=>json_decode($_SESSION[$comando])->comando.",".json_decode($_SESSION[$comando])->orden,
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
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $r){
            if($r->tipo=="dclick"){
                $_SESSION[$r->datos->id]=$r;
            }else if($r->tipo=="rclick"){
                foreach($r->datos->items as $key => $item){
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


    //Emergente de agencias en linea

    function equipos(){
        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"]);
        $comando =$data->comando;
        $data->usuario = $usuario->user;
        $data->banca= $usuario->banca;
        $data->token = $usuario->token;
        $data->comando = $_SESSION[$comando]->datos->comando;
        $consulta_equipos = json_encode($data);
        
        $sql = "CALL bl_banca(:consulta_equipos)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_equipos",$consulta_equipos);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
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
        $segunda_respuesta=Array(
            "comando"=>$_SESSION[$comando]->datos->comando.",".$_SESSION[$comando]->datos->orden,
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
        
        $info = array(
            "data"=> $data,
            "settings" => $settings
        );

        echo json_encode($info);
    }


    //Emergente de Monitoreos

    function monitorear_nro(){
        $usuario = json_decode($_SESSION["usuario"]);
        $data = json_decode($_POST["data"]);
        $comando =$data->comando;
        $data->usuario = $usuario->user;
        $data->banca= $usuario->banca;
        $data->token = $usuario->token;
        $data->comando = $_SESSION[$comando]->datos->comando;
        $consulta_equipos = json_encode($data);
        $sql = "CALL bl_banca(:consulta_equipos)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta_equipos",$consulta_equipos);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
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
        $segunda_respuesta=Array(
            "comando"=>$_SESSION[$comando]->datos->comando.",".$_SESSION[$comando]->datos->orden,
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
        
        $info = array(
            "data"=> $data,
            "settings" => $settings
        );

        echo json_encode($info);
    }


    function listado_general(){
        echo "";
    }

}


?>