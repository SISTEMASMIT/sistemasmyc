<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once($path.'/view/header.php');
?>
<body data-sidebar="dark">
        <div class="container"></div>
        <div class="main-content" id="result">
                </div>
                <!-- Right bar overlay-->
                <div class="rightbar-overlay"></div>
                
                <!---Mi Js--->
                
                <script src="<? $path;?>/public/js/main.js"></script>

<!-- JAVASCRIPT -->
<script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
<script src="<? $path;?>/public/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<? $path;?>/public/libs/metismenu/metisMenu.min.js"></script>
<script src="<? $path;?>/public/libs/simplebar/simplebar.min.js"></script>
<script src="<? $path;?>/public/libs/node-waves/waves.min.js"></script>
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCtSAR45TFgZjOs4nBFFZnII-6mMHLfSYI"></script>

<!-- App js -->
<script src="<? $path;?>/public/js/app.js"></script>
<script src="<? $path;?>/public/js/ajax.js"></script>

</body>

</html>