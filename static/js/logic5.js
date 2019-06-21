// var imageArr = [];
// for (var i = 0; i < 30; i += 1) {
//     imageArr[i] = "../images/" + i + ".png";
//     // console.log(imageArr[i]);
// }

// console.log(imageArr);



function createMap(mlbStadiums) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.street",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Street Map": streetmap,
    "Dark Map" : darkmap
  };

  // Create an overlayMaps object to hold the MLB Stadium layer
  var overlayMaps = {
    "MLB Stadiums": mlbStadiums
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [39.82, -98.57],
    zoom: 5.2,
    layers: [lightmap, streetmap, darkmap, mlbStadiums]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. 
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

}


  

// var mlbIcon = L.icon({
//   iconUrl: beer.logos,
//   // shadowUrl: 'leaf-shadow.png',

//   iconSize:     [80, 80], // size of the icon
//   shadowSize:   [50, 64], // size of the shadow
//   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62],  // the same for the shadow
//   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// For each stadium, create a marker and bind a popup with the station's name

// Store API endpoint for baseball stadiums
var queryUrl = "https://gist.githubusercontent.com/the55/2155142/raw/30a251395cd3c04771f29f2a6295fc8849b73d11/mlb_stadium.json";

// Perform a GET request to the query the baseball stadium API URL
d3.json(queryUrl, function(data) {
  // console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data);
});

// For each stadium, create a marker and bind a popup with the station's name


var markerList = [];
function createFeatures(data){
  
  data.forEach(d => {
      //  console.log(d.lat, d.lng);
      var marker = L.marker([d.lat, d.lng])
              .bindPopup("<h3>" + d.team + "<h3>");

  // Add the marker to the bikeMarkers array

  markerList.push(marker);
  })

console.log(markerList);

// Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(markerList));
}

// $(document).ready(function() {
//   $.ajax({
//    type: "GET",
//    url: "https://api.myjson.com/bins/1103sp",
//    dataType: "json",
//    mimeType: "application/json",
//    success: function(beer) {processData(beer);}
//  });
// });

function processData(beerData) {

 for (var i in beerData){
      beer = beerData[i];

      var mlbIcon = L.Icon.extend({
       options: {
       iconUrl: beer.Logos,
       iconSize:     [52, 60], // size of the icon
       iconAnchor:   [26, 60], // point of the icon which will correspond to marker's location
       popupAnchor: [0, -60]
      }
   });

   L.marker([beer.Longitude, beer.Latitude], {icon: mlbIcon})
   .addTo(map)
   .bindPopup("<strong style='color: #84b819'>" + beer.Teams + "</strong><br>" + beer.Brewery + " | " + beer.City )

  // Create the map object with options
  var map2 = L.map("map2", {
    center: [39.82, -98.57],
    zoom: 5.2,
    layers: [lightmap, streetmap, darkmap, beerData]
  });

   }
}


  