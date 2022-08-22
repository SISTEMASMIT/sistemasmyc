<?php 
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
  * summary
  */
 class Controller 
 {
     /**
      * summary
      */
     public function __construct()
     { 
        $this->view= new View();
        if (isset($_POST)) {
            $this->data=$_POST;
        }
        if (isset($_FILES)) {
            $this->files=$_FILES;            
        }
     }

     function loadModel($model){
     	$url="model/".$model."/".$model.".php";
     	if (file_exists($url)) {
            require($url);
     		$modelName=$model;
     		$this->model= new $modelName;
            return 1;
     	}else{
            return 0;
        }
     }
     public function encode_jwt(){
        $token=Array(
            "data"=>[
                "userAgent"=>$_SERVER['HTTP_USER_AGENT'],
                "ip"=>$_SERVER["REMOTE_ADDR"],
                ]
        ); 
                // Your passphrase
                $passphrase = getenv("PASSPHRASE");
                // Your private key file with passphrase
                // Can be generated with "ssh-keygen -t rsa -m pem"
                $privateKeyFile = '/var/www/html/.ssh/private_key.pem';
                // Create a private key of type "resource"
                $privateKey = openssl_pkey_get_private(
                    file_get_contents($privateKeyFile),
                    $passphrase
                );
                $jwt = JWT::encode($token, $privateKey, 'RS256');
                return $jwt;
     }
     public function decode_jwt(){
        // Get public key from the private key, or pull from from a file.
        $publicKey = openssl_pkey_get_details($privateKey)['key'];

        $decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));
        return $decoded;
     }
 } 

 ?>