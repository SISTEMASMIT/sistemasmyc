<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class QueryModel{   
    
    public $fecha=Array(
        "current_day"=>"y-m-d"
        );


    function getFiltros($url){
        $url=trim($url,"");
        $usuario=json_decode($_SESSION["usuario"]);
        $filtros_consulta=Array(
            "comando"=>$url,
            "usuario"=>$usuario->user,
            "token"=>$usuario->token
        );
        $consulta_filtros = json_encode($filtros_consulta,JSON_UNESCAPED_SLASHES);
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
        $datos_extra=[];
        $usuario = json_decode($_SESSION["usuario"]);
        $data_inicial = json_decode($_POST["data"]);
        $comando =$data_inicial->comando;
        $data_inicial->usuario = $usuario->user;
        $data_inicial->banca= $usuario->banca;
        $data_inicial->token = $usuario->token;
        $orden="";
        if(isset($_SESSION[$comando])){
            $this->comando_orden($data_inicial,$comando,$orden);
        }else{
            $orden=$data_inicial->orden;
        }
        $consulta = json_encode($data_inicial);
        // var_dump($consulta);
        $sql = "CALL bl_banca(:consulta)";
        $this->conexion=conexion::getConexion();
        $statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":consulta",$consulta);
        if($statemant->execute()){
            $response=$statemant->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < $statemant->columnCount(); $i++) {
                $col = $statemant->getColumnMeta($i);
                $head[] = $col['name'];
            }
            
            if(!isset($response[0]["resp"])){
                $data = array(
                    "head" => $head,
                    "data" => $response
                );
            }else{
                $data = array(
                    "head" => "",
                    "data" => "",
                    "mensaje"=>$response[0]["resp"]
                );
            }
        }else{
            $data = array(
                "e" => "0",
                "mensaje" => "Error en la consulta"
            );
        }
        $statemant->closeCursor();
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
        $statemant->closeCursor();
        //Aqui subimos los botones o las acciones a la sesion
        $segunda_r=json_decode($settings["jsr"]);
        foreach ( $segunda_r->filtros as $key => &$r){
            if(!str_contains($r->tipo,"formulario_emergente")){
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
                }else if($r->tipo=="execute"){
                    $data_inicial->comando=$r->datos->comando;
                    $data_inicial->orden=$r->datos->orden;
                    $consulta_datos_extra= json_encode($data_inicial);
                    $sql_extra = "CALL bl_banca(:consulta)";
                    $statemant_extra=$this->conexion->prepare($sql_extra);
                    $statemant_extra->bindParam(":consulta",$consulta_datos_extra);
                    if($statemant_extra->execute()){
                        $datos_extra=$statemant_extra->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                }else if($r->tipo=="button_emergente"){
                    if(!empty($datos_extra)){
                        $_SESSION[$r->datos->id]=$r;
                    $condicion=explode(",",$r->datos->condicion,);
                    foreach($condicion as $c){
                        if(isset($r->datos->{$c})){
                            if(isset($this->{$c})){
                                if($c=="fecha"){
                                    $r->datos->{$c}=date($this->{$c}[$r->datos->$c]);
                                }
                            }
                        }
                    }
                    
                    $valor_condicion="1";
                    foreach($condicion as $c){
                        if(!$r->datos->{$c}==$datos_extra[0][$c]){
                            $valor_condicion="0";
                            break;
                        }
                    }
                    $r->datos->condicion=$valor_condicion;
                    }
                    
                }
            }
        }
        $settings=json_decode($settings["jsr"]);
        $settings->filtros=$segunda_r;
        $settings_finales["jsr"]=json_encode($settings->filtros);
        $info = array(
            "data"=> $data,
            "settings" => $settings_finales,
            "datos_extra"=>$datos_extra,
        );

        echo json_encode($info);

    }


    //funcion para modular y configurar el comando y la orden sacandola de la sesion
    public function comando_orden(&$data_inicial,&$comando,&$orden){
        if(isset($_SESSION[$comando]->comando)){
            $data_inicial->comando = $_SESSION[$comando]->comando;
            $orden=$_SESSION[$comando]->orden;
            $comando=$_SESSION[$comando]->comando;
        }else{
            $data_inicial->comando = $_SESSION[$comando]->datos->comando;
            $orden=$_SESSION[$comando]->datos->orden;
            $comando=$_SESSION[$comando]->datos->comando;
        }
    }
    

}
