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
        $sql = "CALL bl_banca(:username,:banca, :token, 'list', 'fsql', 'gru_usu', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":username",$usuario->user);
        $statemant->bindParam(":banca",$usuario->banca);
        $statemant->bindParam(":token",$usuario->token);
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
            if($grupo["grupo"]=="SUPER"){

            }else{
                array_push($gruposArray, $grupo);
            }
        }
        echo json_encode($gruposArray);
    }

    public function guardarGrupos(){
        $usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
        $datos=json_decode($_POST['usuario']);
        $sql = "CALL bl_banca(:usuario,'', :token, 'crear', 'fsql', 'gru_usu', :nombre, :descripcion, '', '', '', '', '', '', :permisos, '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":usuario",$usuario->user);
        $statemant->bindParam(":token",$usuario->token);
        $statemant->bindParam(":nombre",$datos->nombre);
        $statemant->bindParam(":descripcion",$datos->descripcion);
        $statemant->bindParam(":permisos",$datos->permisos);
        if($statemant->execute()){
            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
            if($data[0]["e"]=='0'){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }else if($data[0]["e"]=="1"){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }
            
        }else{

        }

    }


    //Eliminar grupo

    public function eliminarGrupo(){
        $datos=json_decode($_POST['datos']);
        $usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
        $sql = "CALL bl_banca(:usuario,'', :token, 'eliminar', 'fsql', 'gru_usu', :nombre, '', '', '', '', '', '', '', '', '')";
        $this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":usuario",$usuario->user);
        $statemant->bindParam(":token",$usuario->token);
        $statemant->bindParam(":nombre",$datos->nombre);
        if($statemant->execute()){
            $data=$statemant->fetchAll(PDO::FETCH_ASSOC);
            if($data[0]["e"]=='0'){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }else if($data[0]["e"]=="1"){
                $data2[] = array(
                    "e" => $data[0]["e"],
                    "mensaje" => $data[0]["m"]
                );
                $dataJson=json_encode($data2[0]);
                echo $dataJson;
            }
            
        }else{

        }

    }

    //Permisos del grupo reales

    public function permisos_nombres(){
        $datos=json_decode($_POST['datos']);
        $niveles = explode(",",$datos->niveles);
        $usuario=$_SESSION["usuario"];
		$usuario=json_decode($usuario);
		$sql = "CALL bl_banca(:usuario,:banca,:token, 'list', 'fsql', 'menu_usu', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
        $statemant->bindParam(":usuario",$usuario->user);
		$statemant->bindParam(":token",$usuario->token);
		$statemant->bindParam(":banca",$usuario->banca);
		if($statemant->execute()){
			while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
                $permisos[] = array(
                    "id" => $row["id"],
                    "item" => $row["item"]
                );
            }
        }else{
            echo "sdfsd";
        }
        $grupo = array (
            "nombre" => $datos->grupo,
            "permisos" => array()
        );
        foreach($niveles as $key => $nivel){
            if($nivel!="4" AND $nivel!="17"){
               $grupo["permisos"][$key] = $permisos[array_search(intval($nivel), array_column($permisos, 'id'))]["item"];
            }
        }
        
        echo json_encode($grupo);
        

    }

}


?>