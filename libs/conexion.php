<?php

class conexion{
	private $tipo_de_base = 'mysql';
	private $host = '5.39.70.130';
   	private $nombre_de_base = 'base';
  	private $usuario = 'blprueba';
  	private $contrasena ='M<!>.QXDLwTQ.qi!yCt@';
  	private $port='3306';
	private $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
	private static $conexion;
	private function __construct(){
		      try {
         self::$conexion = new PDO("{$this->tipo_de_base}:host={$this->host};port={$this->port};dbname={$this->nombre_de_base}", $this->usuario, $this->contrasena,$this->opciones);

      } catch (PDOException $e) { 
         echo 'Ha surgido un error y no se puede conectar a la base de datos. Detalle:' . $e->getMessage();
         exit;
      }
	}

	public static function getConexion(){
	if(!self::$conexion){
		new self();
		}
	return self::$conexion;
	}

	public static function close(){
		self::$conexion=null;
	}
}

?>