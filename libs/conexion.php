<?php

class conexion{
	private $tipo_de_base = 'mysql';
	private $host = 'database-3.cr5kiddvokid.us-east-2.rds.amazonaws.com';
   private $nombre_de_base = 'noanlearning';
  	private $usuario = 'admin';
  	private $contrasena ='Prestamo2021*';
  	private $port='3306';
	private static $conexion;


	private function __construct(){
		      try {
         self::$conexion = new PDO("{$this->tipo_de_base}:host={$this->host};port={$this->port};dbname={$this->nombre_de_base}", $this->usuario, $this->contrasena);

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