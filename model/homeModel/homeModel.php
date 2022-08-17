<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class homeModel{
	public function niveles(){
		$sql = "CALL bl_banca('usuario','0001', 'token', '', 'fsql', 'menu_config', '', '', '', '', '', '', '', '', '', '')";
		$this->conexion=conexion::getConexion();
		$statemant=$this->conexion->prepare($sql);
		if($statemant->execute()){
			while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
				while($row=$statemant->fetch(PDO::FETCH_ASSOC)){
				var_dump($row);
			}
		}

	}
}




	// public function listarEjercicios(){
	// 	$alumno=$_SESSION['alumno'];
	// 	$idAlumno=$alumno->getId();
	// 	$sql = "SELECT id_curso FROM `alumno_curso` WHERE id_alumno=:idAlumno";
	// 	$this->conexion=conexion::getConexion();
	// 	$statement=$this->conexion->prepare($sql);
	// 	$statement->bindParam(":idAlumno",$idAlumno,PDO::PARAM_STR);
	// 	$items=array();
	// 	if($statement->execute()){
	// 		$row = $statement->fetch(PDO::FETCH_ASSOC);
	// 		$sql2 = "SELECT * FROM `ejercicio` WHERE id_curso=:idCurso and estado=1";
	// 		$this->conexion=conexion::getConexion();
	// 		$statement=$this->conexion->prepare($sql2);
	// 		$statement->bindParam(":idCurso",$row['id_curso'],PDO::PARAM_STR);
	// 		if($statement->execute()){
	// 			while($row = $statement->fetch(PDO::FETCH_ASSOC)){
	// 			array_push($items, new Ejercicio($row["id"],$row["titulo"],$row["descripcion"],$row["fecha_inicio"],$row["fecha_fin"],$row["sin_fecha"],$row["autor"],$row["tipo_ejercicio"],$row["estado"]));
	// 			}
	// 		}
	// 	return json_encode(array("estado" => 1,"items"=>$items));
    //    }else{
    //         return json_encode(array("estado" => 0));
    //    }
	// }

	// public function listarQuices(){
	// 	$alumno=$_SESSION['alumno'];
	// 	$idAlumno=$alumno->getId();
	// 	$sql = "SELECT id_curso FROM `alumno_curso` WHERE id_alumno=:idAlumno";
	// 	$this->conexion=conexion::getConexion();
	// 	$statement=$this->conexion->prepare($sql);
	// 	$statement->bindParam(":idAlumno",$idAlumno,PDO::PARAM_STR);
	// 	$items=array();
	// 	if($statement->execute()){
	// 		$row = $statement->fetch(PDO::FETCH_ASSOC);
	// 		$sql2 = "SELECT * FROM `quiz` WHERE id_curso=:idCurso and estado=1";
	// 		$this->conexion=conexion::getConexion();
	// 		$statement=$this->conexion->prepare($sql2);
	// 		$statement->bindParam(":idCurso",$row['id_curso'],PDO::PARAM_STR);
	// 		if($statement->execute()){
	// 			while($row = $statement->fetch(PDO::FETCH_ASSOC)){
	// 			array_push($items, new Quiz($row["id_quiz"],$row["titulo"],$row["descripcion"],$row["fecha_inicio"],$row["fecha_fin"],$row["autor"],$row["id_curso"],$row["estado"]));
	// 			}
	// 		}
	// 	return json_encode(array("estado" => 1,"items"=>$items));
    //    }else{
    //         return json_encode(array("estado" => 0));
    //    }
	// }

}

?>