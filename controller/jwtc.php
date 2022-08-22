<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTC extends Controller
{
    /**
     * este es el controlador par los productos de inicio y el contenido plano
     * summary
     */
        public function __construct(){
        $params = func_get_args();
        $num_params = func_num_args();
        $funcion_constructor ='__construct'.$num_params;
        if (method_exists($this,$funcion_constructor)) {
            call_user_func_array(array($this,$funcion_constructor),$params);
        }
    }

    public  function __construct0(){
        parent::__construct();
        $token=Array(
            "data"=>[
                "hostname"=>"sddsaffdafd",
                "ip"=>$_SERVER["REMOTE_ADDR"],
                ]
        ); 
        echo "<h1>holaaaa</h1>";
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
                echo "Encode:\n" . print_r($jwt, true) . "\n";

                // Get public key from the private key, or pull from from a file.
                $publicKey = openssl_pkey_get_details($privateKey)['key'];

                $decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));
                echo "Decode:\n" . print_r((array) $decoded, true) . "\n";
      }

}

 ?>