window.addEventListener('load', function () {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map;
  var txtOrigin = /** @type {!HTMLInputElement} */(
    document.getElementById('origin'));
  var txtDestination = /** @type {!HTMLInputElement} */(
    document.getElementById('destination'));
  initMap();


  var btnRute = document.getElementById('btnIndication');
  function initMap() {
   
    /* Input con autocompletado  */
    var autocomplete = new google.maps.places.Autocomplete(txtOrigin);
    var autocomplete = new google.maps.places.Autocomplete(txtDestination);
    autocomplete.bindTo('bounds', map);

    var infoWindow = new google.maps.InfoWindow({ map: map });

  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  /* Función de botón ruta, como llegar */
  btnRute.addEventListener('click', function (event) {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: txtOrigin.value,
      destination: txtDestination.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });