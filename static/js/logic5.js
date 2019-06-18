function createMap(mlbStadiums) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the MLB Stadium layer
    var overlayMaps = {
      "MLB Stadiums": mlbStadiums
    };
  
    // Create the map object with options
    var map = L.map("map", {
      center: [30.73, -74.0059],
      zoom: 3,
      layers: [lightmap, mlbStadiums]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. 
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }


// Store API endpoint for baseball stadiums
var queryUrl = "https://gist.githubusercontent.com/the55/2155142/raw/30a251395cd3c04771f29f2a6295fc8849b73d11/mlb_stadium.json";

// Perform a GET request to the query the baseball stadium API URL
d3.json(queryUrl, function(data) {
    // console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data);
});

var sMarker = [];

// For each stadium, create a marker and bind a popup with the station's name
function createFeatures(data){
    
    data.forEach(d => {
         console.log(d.lat, d.lng);
        var sMarkers = L.marker([d.lat, d.lng])
                .bindPopup("<h3>" + "Test" + "<h3>");

    // Add the marker to the bikeMarkers array
    sMarker.push(sMarkers);
    })

console.log(sMarker);

// Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(sMarker));
}