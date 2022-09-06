<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Arbol{
	public $id=0;
	public $parentId=0;
	public $icono="";
	public $titulo="";
	public $link="";
	public $etiqueta=0;
	public $posicion=0;
	public $hijos=array();
	public $listahijos="";
	public $html="";

	public function __construct($id,$paretdId,$icono,$titulo,$posicion,$link,$etiqueta){
		$this->id=$id;
		$this->parentId=$paretdId;
		$this->icono=$icono;
		$this->titulo=$titulo;
		$this->posicion=$posicion;
		$this->link=$link;
		$this->etiqueta=$etiqueta;
	}
}
class homeModel{
	public function niveles(){
		$arboles=array();
		$niveles=array();
		$usuario=$_SESSION["usuario"];
		
		$usuario=json_decode($usuario);
		var_dump($usuario);
		$sql = "CALL bl_banca(:json)";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		$data=json_encode(array("comando"=>"menu_usu","orden"=>"list","usuario"=>$usuario->user,"token"=>$usuario->token));
		$statemant->bindParam(":json",$data);
		if($statemant->execute()){
			$row2=$statemant;
			if($row2->rowCount()>1){
				while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
					if($row["item"]=="OTROS SISTEMAS"){
						$row["posicion"]=1;
					}
					array_push($arboles,new Arbol($row["id"],$row["parentid"],$row["icono"],$row["item"],$row["posicion"],$row["link"],$row["etiqueta"]));
				}
			}else{
				// destruir_session();
				// header("Location: /logout/logout");
			}
		}
		$niveles=$this->crearArbol($arboles); 
	return json_encode($niveles);
}

function crearArbol($arboles){
	$arrayAux=Array();
	foreach($arboles as $clave => $arbol){ 	
		if($arbol->etiqueta==0){
			array_push($arrayAux,$arbol);
		}else if($arbol->etiqueta==1 or $arbol->etiqueta==2){
			$padre=$arrayAux[array_search(intval($arbol->parentId), array_column($arrayAux, 'id'))];	
				$padre->listahijos=$padre->listahijos.";".strval($arbol->id);
			array_push($padre->hijos,$arbol);
		}else if($arbol->etiqueta==3 or $arbol->etiqueta==4 or $arbol->etiqueta==5 or $arbol->etiqueta==6){
			if($arbol->id=="129"){echo "hola";}
			$this->buscarEnArbol($arrayAux,$arbol,$arbol->parentId);
		}else if($arbol->etiqueta==7 or $arbol->etiqueta==8){
			$this->buscarEnArbol($arrayAux,$arbol,$arbol->parentId);
		}
	}
	return $arrayAux;
}
#falta desarrollo de cursividad ..........
function buscarEnArbol(&$arboles,$nodo,$id){
	foreach($arboles as $clave => $arbol){
		$ids=explode(";",$arbol->listahijos);
		if(array_search(strval($id),$ids)!=0){
			$encontro=0;
			foreach($arbol->hijos as $hijo2){
				if($hijo2->id == $id){
					$encontro=1;
					$arboles[$clave]->listahijos=$arboles[$clave]->listahijos.";".strval($nodo->id);
					$hijo2->listahijos=$hijo2->listahijos.";".strval($nodo->id);
					array_push($hijo2->hijos,$nodo);
				}
			}
			if($encontro==0){
				$this->buscarEnArbol($arbol->hijos,$nodo,$id);
			}
		}
	}
}

function array_sort(&$array, $on, $order=SORT_ASC){
    $new_array = array();
    $sortable_array =$array;

    if (count($array) > 0) {
        foreach ($array as $k => $v) {
            if (is_array($v)) {
                foreach ($v as $k2 => $v2) {
                    if ($k2 == $on) {
                        $sortable_array[$k] = $v2;
                    }
                }
            } else {
                $sortable_array[$k] = $v;
            }
        }

        switch ($order) {
            case SORT_ASC:
                asort($sortable_array);
            break;
            case SORT_DESC:
                arsort($sortable_array);
            break;
        }

        foreach ($sortable_array as $k => $v) {
            $new_array[$k] = $array[$k];
        }
		return $new_array;
    }



	}
}


?>
