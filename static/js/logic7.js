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
    "Dark Map": darkmap
  };

 
  
  

  // Create an overlayMaps object to hold the MLB Stadium layer
  var overlayMaps = {
    "MLB Stadiums": mlbStadiums
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [34.82, -98.57],
    zoom: 5.2,
    layers: [lightmap, streetmap, darkmap, mlbStadiums]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. 
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
// pass the urls into variables
var queryUrl = "/jsonfile";
var queryUrl2 = "/breweryjsonfile";

// Perform a GET request to the query the baseball stadium API URL
d3.json(queryUrl, function (data) {

  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function

  createFeatures(data);
});


var markerList = [];
function createFeatures(data) {

  data.forEach(d => {
    // Create the icons for each team
    var mlbIcon = L.icon({
      iconUrl: d.Logos,
      iconSize: [55, 60], // size of the icon
      iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -60]
    });

    var marker = L.marker([d.Latitude, d.Longitude], { icon: mlbIcon })
      .bindPopup("<h3>" + d.Teams + "</h3><h3>Location: " + d.City + "</h3><hr><p>Likely Beers: " + d.Beers + "</p>");


    // Add the marker to the bikeMarkers array

    markerList.push(marker);
  })

  console.log(markerList);

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(markerList));
}