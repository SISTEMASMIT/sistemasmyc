
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="row">
                    <div id="load"></div>
                        <div class="col-md-12">
                        <select class="selectpicker" id="tipo">
                            <option value="todas" selected>Todas</option>
                            <option value="NO" >Sin Signo</option>
                            <option value="SI" >Con SIgno</option>
                            <option value="PE" >4 Cifras</option>
                            <option value="OT" >Figuras</option>
                        </select>
                        </div>
                        <div class="col-md-12" id="" style="max-height: 600px;">
                            <table id="tabla1" class="cell-border display nowrap" style="width:100%">
                                <thead class="thead" id="thead1">
                                    <tr><th></th></tr>
                                </thead>
                                <tbody id="tbody1">
                                <tr><td></td></tr>
                                </tbody>
                            </table>
                            <div id="contador"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div id="formulario" style="font-size: large";>
                        
                    </div>
                    
                </div>
            </div> <!-- Row general -->
        </div> <!-- container-fluid -->
    </div>  <!--- page-content --->
</div><!-- FIN CONTENIDO WEB -->
<script type="module" src="<? $path;?>/public/js/<?php echo str_replace("-","_",$this->url[1])?>.js" ></script> 
<script src="<? $path;?>/public/js/sweetalert2.js"></script>
