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
            $html = "<div class='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' data-live-search='true' id='$label'>";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    $html .= "<option value='Todas' selected>Todas</option>";
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
            $html = "<div class='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' id=".strtolower(str_replace(" ","_",$label))." data-live-search='true' multiple>";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    $html .= "<option value='Abiertas' selected>Abiertas</option>";
                    $html .= "<option value=" . $select->id . ">" . $select->id . "</option>";
                } else {
                    $html .= "<option value=" . $select->id . ">" . $select->id . "</option>";
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
            $html = "<div class='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'><label class='form-label'>" . $label . "</label>";
            $html .= "<select class='selectpicker' id=".strtolower(str_replace(" ","_",$label))." >";
            foreach ($json as $key => $select) {
                if (!isset($select->id)) {
                    $select->id = $select->label;
                }
                if ($key == 0) {
                    
                    $html .= "<option value=" . $select->id . " selected>" . $select->id . "</option>";
                } else {
                    $html .= "<option value=" . $select->id . ">" . $select->id . "</option>";
                }
            }
            $html .= "</select></div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }

    function button($label, $json)
    {   if(!isset($_SESSION[strtolower(str_replace(" ","_",$label))])){
            $_SESSION[strtolower(str_replace(" ","_",$label))]=json_encode($json);
        }
        try {
            $html = "<div class='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>";
            $html .= "<button type='button'id='".strtolower(str_replace(" ","_",$label))."' class='".$this->colores[$label]." btn-lg btn-block'>".$label."</button>";
            $html .= "</div>";
            return $html;
        } catch (Exception $e) {
            echo $e;
        }
    }
}
