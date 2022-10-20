<?php

$webCol="https://supergirosnortesantander.com.co/tabla-resultados/";
$weblotto = "https://centrodeapuestaselrey.com.ve/resultados/lotto-activo";

// obtener_lotto($weblotto);
// var_dump( obtener_colombia($webCol)  ); 
enviar_alerta();

function enviar_alerta(){
    $id_session="fjbvlam5iuqsoxdkt2wgy7901p36hcne84zr";
    $id_app = "2305578";
    $titulo = "Movimiento En El Sistema";
    $subtitulo = "Han hecho un movimiento en el sistema";

    
    $web="http://www.appcreator24.com/intra/app_envios_confirm_guardando.php?idioma=es&idsesion=".$id_session."&idapp=".$id_app."&titulo=".$titulo."&subtitulo=".$subtitulo."&idabrir=0&idseccabrir=&web=https%3A%2F%2Fsistemasmyc.com%3A8080&sustituir=0&cod_img=&enviar_a=&codigo=&mensaje_chat=";

    echo $web;
    $url=$web;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_TIMEOUT,3000);
	$page = curl_exec ($ch);
    echo $page;
    curl_close($ch);

}
function obtener_colombia($web){
	$url=$web;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_TIMEOUT,3000);
	$page = curl_exec ($ch);
    curl_close($ch);


    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($page);
    libxml_clear_errors();
    $xpath = new DOMXpath($dom);

    $data = array();
    // get all table rows and rows which are not headers
    $table_rows = $xpath->query('//table[@class="todos-resultados"]//tr');
    foreach($table_rows as $row => $tr) {
        foreach($tr->childNodes as $td) {
            $data[$row][] = preg_replace('~[\r\n]+~', '', trim($td->nodeValue));
        }
        $data[$row] = array_values(array_filter($data[$row]));
    }

    echo '<pre>';
    print_r($data);
    
    // var_dump($data);
	
	// $datos2 = json_decode($data);
	return $data;
}



function obtener_lotto($web){
	$url=$web;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_TIMEOUT,3000);
	$page = curl_exec ($ch);
    curl_close($ch);


    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($page);
    libxml_clear_errors();
    $xpath = new DOMXpath($dom);

    $data = array();

    $resultados = $xpath->query('//div[@data-lotery="lotto-activo"]');


    foreach($resultados as $resultado => $re){
        foreach($re->childNodes as $premiado){
            if(strlen(trim($premiado->nodeValue))>2){
                $data[$resultado][] = preg_replace('~[\r\n\//]+~', '', trim($premiado->nodeValue));
            }else{
                $data[$resultado][] = "";
            }
        }
        $data[$resultado] = array_values(array_filter($data[$resultado]));
    }
    echo '<pre>';
    print_r($data);
    // get all table rows and rows which are not headers
    // $table_rows = $xpath->query('//table[@class="todos-resultados"]//tr');
    // foreach($table_rows as $row => $tr) {
    //     foreach($tr->childNodes as $td) {
    //         $data[$row][] = preg_replace('~[\r\n]+~', '', trim($td->nodeValue));
    //     }
    //     $data[$row] = array_values(array_filter($data[$row]));
    // }

    // echo '<pre>';
    // print_r($data);
    
    // var_dump($data);
	
	// $datos2 = json_decode($data);
	return $data;
}






?>


