var locations = [
    ['Recicleiros', -23.5293633, -46.5492213],
    ['Instituto Reciclar', -23.5421504, -46.7526569],
    ['ANCAT (Associação Nacional dos Catadores)', -23.54399, -46.63995],
    ['CEMPRE (Compromisso Empresarial para Reciclagem)', -23.58141, -46.67447],
    ['ABRECON (Associação Brasileira para Reciclagem de RCD)', -23.52836, -46.67015]
];
  
var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
              center: new google.maps.LatLng(-23.550104,-46.633953),
              mapTypeId: google.maps.MapTypeId.ROADMAP
});
  
var infowindow = new google.maps.InfoWindow();

var marker, i;
const icon = {
    url: "./img/pin2.png", // url
    scaledSize: new google.maps.Size(30, 40),
};

for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      title: locations[i][0],
      url: '/',
      map: map
    });
    marker.setIcon(icon);
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
}

//search box  - não está funcionando
var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
google.maps.event.addListener(searchBox, 'places_changed', function() {
     searchBox.set('map', null);


     var places = searchBox.getPlaces();

     var bounds = new google.maps.LatLngBounds();
     var i, place;
     for (i = 0; place = places[i]; i++) {
       (function(place) {
         var marker = new google.maps.Marker({

           position: place.geometry.location
         });
         marker.bindTo('map', searchBox, 'map');
         google.maps.event.addListener(marker, 'map_changed', function() {
           if (!this.getMap()) {
             this.unbindAll();
           }
         });
         bounds.extend(place.geometry.location);


       }(place));

     }
     map.fitBounds(bounds);
     searchBox.set('map', map);
     map.setZoom(Math.min(map.getZoom(),12));

});
 
google.maps.event.addDomListener(window, 'load', init);

//evento para destacar a ong na listagem, ao clicar no mapa - Não está funcionando ainda
google.maps.event.addListener(marker, 'click', function() {window.location.href = marker.url;});