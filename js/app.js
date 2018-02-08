function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,//zoom representa el nivel de profundidad de nuestro mapa, entre más zoom más localizado se verá.
    center: { lat: -12.020651498087096, lng: -77.0349046 },//center contiene la longitud y latitud en que queremos que se muestre nuestro mapa
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);//getCurrentPosition permite al usuario obtener su ubicación actual, uncionExito se ejecuta solo cuando el usuario comparte su ubicación, mientras que funcionError se ejecuta cuando se produce un error en la geolocalización
    }
  }

  document.getElementById("locat").addEventListener("click", buscar);
  var latitud, longitud;


  var funcionExito = function (posicion) {//var funcionExito, con el que obtendremos nuestra latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: { lat: latitud, lng: longitud },
      animation: google.maps.Animation.DROP,
      map: map

    });

    map.setZoom(17);
    map.setCenter({ lat: latitud, lng: longitud });
  }

  var funcionError = function (error) {//funcionError con un mensaje para el usuario, en caso de que nuestra geolocalización falle.
    alert("tenemos un problema con encontrar tu ubicación");
  }
}