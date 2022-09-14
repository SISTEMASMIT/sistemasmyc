<?php

class Importer
{
    public $colores=Array(
    "Aceptar"=>"btn btn-success",
    "Detener"=>"btn btn-danger"
    );
    function select_search_shadow($label, $json)
    {   
        try {
            $html = "<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' data-live-search='true' id=".strtolower(str_replace(" ","_",$label)).">";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    $html .= "<option value='Todos' selected>Todos</option>";
                    $html .= "<option value=" . $select->id . " data-subtext=" . $select->label . ">" . $select->id . "</option>";
                } else {
                    $html .= "<option value=" . $select->id . " data-subtext=" . $select->label . ">" . $select->id . "</option>";
                }
            }
            $html .= "</select></div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }

    function select_multiple($label, $json)
    {
        try {
            $html = "<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' id=".strtolower(str_replace(" ","_",$label))." data-live-search='true' multiple>";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    $html .= "<option value='Abiertas' selected>Abiertas</option>";
                    $html .= "<option value=" . $select->id . ">" . $select->label . "</option>";
                } else {
                    $html .= "<option value=" . $select->id . ">" . $select->label . "</option>";
                }
            }
            $html .= "</select></div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }
    function select($label, $json)
    {
        try {
            $html = "<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' id=".strtolower(str_replace(" ","_",$label))." >";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    
                    $html .= "<option value=" . $select->id . " selected>" . $select->label . "</option>";
                } else {
                    $html .= "<option value=" . $select->id . ">" . $select->label . "</option>";
                }
            }
            $html .= "</select></div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }

    function button($label, $json)
    {   
        if(!isset($json->id)){
            $json->id=$label;
        }
        if(!isset($_SESSION[strtolower(str_replace(" ","_",$json->id))])){
            $_SESSION[strtolower(str_replace(" ","_",$json->id))]=json_encode($json);
        }
        try {
            $html = "<div class='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 filtros'>";
            $html .= "<button type='button'id='".strtolower(str_replace(" ","_",$json->id))."' class='".$this->colores[$label]." btn-lg btn-block'>".$label."</button>";
            $html .= "</div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }

    function input_int($label, $json)
    {   if(!isset($_SESSION[strtolower(str_replace(" ","_",$label))])){
        $_SESSION[strtolower(str_replace(" ","_",$label))]=json_encode($json);
    }
    try {
            $html = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 filtros'>";
            $html .="<input class='form-control form-control-lg' id='".strtolower(str_replace(" ","_",$label))."'type='numeric' placeholder='Numero ".$label."'>";
            $html .= "</div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }
    
}
