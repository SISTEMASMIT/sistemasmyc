<?php

class loteriaModel{

    function loterias(){
        try{
            if(isset($_SESSION["usuario"])){
                $loterias= array();
                $usuario=json_decode($_SESSION["usuario"]);
                $consulta_loterias=json_encode(array(
                    "comando"=>"get_lot",
                    "orden"=>"todas",
                    "usuario"=>$usuario->user,
                    "banca"=>$usuario->banca,
                    "token"=>"$usuario->token"
                ));
                $sql="CALL bl_banca(:consulta_loterias)";
                $this->conexion=conexion::getConexion();
                $statemant=$this->conexion->prepare($sql);
                $statemant->bindParam(":consulta_loterias",$consulta_loterias);
                if($statemant->execute()){
                    if($statemant->rowCount()>1){
                        $loterias=$statemant->fetchAll(PDO::FETCH_CLASS, "loteria");
                        $resultado=json_encode(array("estado"=>200,"loterias"=>$loterias));
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
            $resultado=json_encode(array("estado"=>500,"error"=>"Error de con de codigo","error_code"=>"0"));
            return $resultado;
        }
        
    }

}

class loteria{
    public $loteria;
    public $nombre;
    public $signo;
    public $estado;
    
    function __construct(){
        $this->loteria=$this->COD;
        $this->nombre=$this->COD;
        unset($this->COD);
        $this->signo=$this->SIG;
        unset($this->SIG);
        $this->estado=$this->edo;
        unset($this->edo);
    }
}
?>