<html>
<script src="<? $path;?>/public/js/sweetalert2.js"></script>
<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <script>
        if(navigator.geolocation){
            
            var success = function(position){
                const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude);
            console.log(longitude);
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                var myOptions = {
                zoom: 15,
                center: latlng,
                mapTypeControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions)
                var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title:"Estás aquí! (en un radio de "+position.coords.accuracy+" metros)"
                })
            }
            const options = {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
                };
            navigator.geolocation.getCurrentPosition(success, function(msg){
                Swal.fire({
                title: '',
                text: 'Necesita dar permisos para usar el sistema',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            },options);
            }

    </script>
    <div id="mapcanvas" style="width:400px; height:400px"></div>

</html>