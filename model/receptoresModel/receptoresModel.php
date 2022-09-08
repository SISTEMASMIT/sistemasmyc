<?php
class ReceptoresModel{
    function usuarios_receptores(){
        echo "";
    }
    function receptores(){
        try{
        $receptores= array();
        if(isset($_SESSION["usuario"])){
            $usuario=json_decode($_SESSION["usuario"]);
            $consulta_receptores=json_encode(array(
                "comando"=>"get_rec",
                "orden"=>"todos",
                "usuario"=>$usuario->user,
                "banca"=>$usuario->banca,
                "token"=>$usuario->token
            ));
            $sql="CALL bl_banca(:consulta_receptores)";
            $this->conexion=conexion::getConexion();
            $statemant=$this->conexion->prepare($sql);
            $statemant->bindParam(":consulta_receptores",$consulta_receptores);
            if($statemant->execute()){
                if($statemant->rowCount()>1){
                    $receptores=$statemant->fetchAll(PDO::FETCH_CLASS, "receptor");
                    $resultado=json_encode(array("estado"=>200,"receptores"=>$receptores));
                }else{
                    $row=$statemant->fetch(PDO::FETCH_ASSOC);
                    $resultado=json_encode(array("estado"=>500,"error"=>$row["m"],"error_code"=>$row["e"]));
                }
                
            }
            return $resultado;
        }else{
            $resultado=json_encode(array("estado"=>500,"error"=>"Error de con el usuario","error_code"=>"0"));    
            return $resultado;
        }
    }catch(Exception $e){
        $resultado=json_encode(array("estado"=>500,"error"=>"Error de con interno","error_code"=>"0"));
        return $resultado;
    }
}

}
class receptor{
    public $receptor;
    public $nombre;
    public $nivel;
    function __construct(){
        $this->receptor=$this->COD;
        unset($this->COD);
        $this->nombre=$this->NOM;
        unset($this->NOM);
        $this->nivel=$this->niv;
        unset($this->niv);
    }
}
?>