
 var map = L.map('mapid').setView([-5.135399, 119.423790], 13);

 var layer_lagenda=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
     maxZoom: 18,
     id: 'mapbox.streets',
     accessToken: 'pk.eyJ1IjoiYWtiYXJhdG9yaSIsImEiOiJjazM0MG9rc3kweGpvM2RtanYxemo4aW44In0.sinw42NuYfdaK83mhLgN0w'
 });
     map.addLayer(layer_lagenda)

 function popUp(f,l){
     var out = [];
         if (f.properties){
             for(key in f.properties){
                 out.push(key+": "+f.properties[key]);
             }
             l.bindPopup(out.join("<br />"));
     }
 }

 //Legend
 function iconByName(name) {
     return '<i class="icon icon-'+name+'"></i>';
 }

 function featureToMarker(feature, latlng) {
     return L.marker(latlng, {
         icon: L.divIcon({
             className: 'marker-'+feature.properties.amenity,
             html: iconByName(feature.properties.amenity),
             iconUrl: '../images/markers/'+feature.properties.amenity+'.png',
             iconSize: [25, 41],
             iconAnchor: [12, 41],
             popupAnchor: [1, -34],
             shadowSize: [41, 41]
         })
     });
 }

 function getColor(d) {
     return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                     '#FFEDA0';
 }

 function style(feature) {
     return {
         fillColor:getColor(Math.random()*1000),
         weight: 2,
         opacity: 1,
         color: 'white',
         dashArray: '3',
         fillOpacity: 0.7
     };
 }

 var legend = L.control({position: 'bottomright'});

 legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend'),
         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
         labels = [];

     // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }

     return div;
 };

 legend.addTo(map);

 
 var jsonTest = new L.GeoJSON.AJAX(["assets/geojson/Kelurahan_Makassar.geojson"],{onEachFeature:popUp, style: style}).addTo(map);

 //LAYER GROUP//
 var SLTP = L.layerGroup();    
     L.marker([-5.13865, 119.41952]).bindPopup('SMPN 46 Makassar').addTo(SLTP),
     L.marker([-5.13582, 119.43028]).bindPopup('SMPN 47 Makassar').addTo(SLTP),
     L.marker([-5.13699, 119.43119]).bindPopup('Sekolah Menengah Pertama Bawakaraeng Makassar' + '<br><a href="http://www.google.com">Visit Google</a>').addTo(SLTP),
     L.marker([3-5.14776, 119.42271]).bindPopup('Bina Citra Indonesia').addTo(SLTP);

 var SMP6 = L.layerGroup();

 var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWtiYXJhdG9yaSIsImEiOiJjazM0MG9rc3kweGpvM2RtanYxemo4aW44In0.sinw42NuYfdaK83mhLgN0w';
 
 var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
 streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});



 var baseLayers = {
     "Grayscale": grayscale,
     "Streets": streets
 };

 var overlays = {
     "SLaaaaaTP": SLasasasTP,
     "SMP 6" : SMP6
 };

 L.control.layers(baseLayers, overlays).addTo(map);

 var baseMaps = {
     "<span style='color: gray'>Grayscale</span>": grayscale,
     "Streets": streets
 };