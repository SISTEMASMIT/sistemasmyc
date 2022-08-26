<?php
session_start();

$tiempo = 600;
// Máxima duración de sesión activa en hora
define( 'MAX_SESSION_TIEMPO', 3600 *  1);
define( 'MAX_SESSION_INACTIVIDAD', $tiempo *  1);
// Controla cuando se ha creado y cuando tiempo ha recorrido 
if ( isset( $_SESSION[ 'ULTIMA_ACTIVIDAD' ] ) && 
     ( time() - $_SESSION[ 'ULTIMA_ACTIVIDAD' ] > MAX_SESSION_TIEMPO ) ) {
    destruir_session();
}


if(!isset($_SESSION['inactividad'])){
    $_SESSION['inactividad']="Off";
}

if ( isset( $_SESSION[ 'ULTIMA_ACTIVIDAD' ] ) && isset( $_SESSION[ 'usuario' ] ) &&
     ( time() - $_SESSION[ 'ULTIMA_ACTIVIDAD' ] > MAX_SESSION_INACTIVIDAD ) || ($_SESSION['inactividad'] == "On")){
        inactividad();
    }




$_SESSION[ 'ULTIMA_ACTIVIDAD' ] = time();

// Función para destruir y resetear los parámetros de sesión
function destruir_session() {

    $_SESSION = array();
    if ( ini_get( 'session.use_cookies' ) ) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - MAX_SESSION_TIEMPO,
            $params[ 'path' ],
            $params[ 'domain' ],
            $params[ 'secure' ],
            $params[ 'httponly' ] );
    }

    @session_destroy();
}


function inactividad() {
    $_SESSION['inactividad'] = "On";
    if(($_SERVER['REQUEST_URI']!="/inactividad" ) && ($_SERVER['REQUEST_URI']!="/") && ($_SERVER['REQUEST_URI']!="/inactividad/comprobacion" ) ){
        header('Location: /inactividad');
    }
    

}


