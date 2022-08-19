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
	public $hijos=array();
	public $listahijos="";
	public $html="";

	public function __construct($id,$paretdId,$icono,$titulo,$link,$etiqueta){
		$this->id=$id;
		$this->parentId=$paretdId;
		$this->icono=$icono;
		$this->titulo=$titulo;
		$this->link=$link;
		$this->etiqueta=$etiqueta;
	}
}
class homeModel{
	public function niveles(){
		$arboles=array();
		$niveles=array();
		$sql = "CALL bl_banca('usuario','0001', 'token', '', 'fsql', 'menu_config', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		if($statemant->execute()){
			while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
				array_push($arboles,new Arbol($row["id"],$row["parentid"],$row["icono"],$row["item"],$row["link"],$row["etiqueta"]));
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
				echo "hola";
				$this->buscarEnArbol($arbol->hijos,$nodo,$id);
			}
		}
	}
}

}

?>