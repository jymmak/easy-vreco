let inputFrom = document.getElementById('origin');
let inputTo = document.getElementById('destination');
let btnRoad = document.getElementById('btnIndication');

let autocompleteInputs = () => {
  new google.maps.places.Autocomplete(inputFrom);
  new google.maps.places.Autocomplete(inputTo);
};

let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
  directionsService.route({
    origin: inputFrom.value,
    destination: inputTo.value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {
      lat: -12.020651498087096, 
      lng: -77.0349046 
    }
  });
  directionsDisplay.setMap(map);
  let initRoad = (event) => {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  autocompleteInputs();
  // asociando evento a elemento del DOM 
  btnRoad.addEventListener('click', initRoad);

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
