function initMap() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: -12.020651498087096, lng: -77.0349046 },
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("locat").addEventListener("click", buscar);
  var latitud, longitud;
  var icons = 'assets/images/bici.png';

  var funcionExito = function (posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: { lat: latitud, lng: longitud },
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icons
    });

    map.setZoom(17);
    map.setCenter({ lat: latitud, lng: longitud });
  }

  var funcionError = function (error) {
    alert("tenemos un problema con encontrar tu ubicación");
  }

  directionsDisplay.setMap(map);
  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  route.addEventListener('click', onChangeHandler);

}