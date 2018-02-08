function initMap() {


  let map = new google.maps.Map(document.getElementById("map"), {
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
  let latitud, longitud;
  let icons = 'assets/images/bici.png';

  let funcionExito = function (posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    let miUbicacion = new google.maps.Marker({
      position: { lat: latitud, lng: longitud },
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icons
    });

    map.setZoom(17);
    map.setCenter({ lat: latitud, lng: longitud });
  }

  let funcionError = function (error) {
    alert("tenemos un problema con encontrar tu ubicación");
  }

}