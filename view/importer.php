<?php 

class Importer{
function select_search_shadow($label,$json){
    try{    
    $object=json_decode($json);
    $html="<label class='form-label'>".$label."</label>";
    $html.="<select class='selectpicker' data-live-search='true' id='$label'>";
        foreach($object as $key => $select){
            if($key==0){
                $html.= "<option value=".$select->id." data-subtext=".$select->label." selected>".$select->id."</option>";
            }else{
                $html.= "<option value=".$select->id." data-subtext=".$select->label.">".$select->id."</option>";
            }
        }
    $html.="</select>";
    return $html;
    }catch(Exception $e){
        echo $e;
    }
}

}
?>