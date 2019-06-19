// Store API endpoint for baseball stadiums
var queryUrl = "https://gist.githubusercontent.com/the55/2155142/raw/30a251395cd3c04771f29f2a6295fc8849b73d11/mlb_stadium.json";

// var map = L.map("map", {
//   center: [45.52, -122.67],
//   zoom: 13
// });


// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>, <br> Created by Jonathan Randolph",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   }).addTo(map);

// Perform a GET request to the query the baseball stadium API URL
d3.json(queryUrl, function(data) {
    // console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data);
});

function createFeatures(data){
    data.forEach(d => {
         console.log(d.lat, d.lng);
        L.marker([d.lat, d.lng]).bindPopup();
    })
}

function createMap(data) {

  // // Define streetmap and darkmap layers
  // var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2RoZWxkIiwiYSI6ImNqd2lmZngyMzAxamE0M28xM3NtNmI3cGQifQ.Xjd8bShTIz2VRS7GTwaFcw"); 
  // // {
  //   // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   // maxZoom: 18,
  //   // id: "mapbox.streets",
  //   // accessToken: API_KEY
  // // }
  
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>, <br> Created by Jonathan Randolph",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2RoZWxkIiwiYSI6ImNqd2lmZngyMzAxamE0M28xM3NtNmI3cGQifQ.Xjd8bShTIz2VRS7GTwaFcw");
  // , {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.dark",
  //   accessToken: API_KEY
  // }
  
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   : earthquakes
  // };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, mlbStadium]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, {
    collapsed: false
  }).addTo(myMap);
};