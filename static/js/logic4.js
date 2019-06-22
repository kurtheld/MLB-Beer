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
  
  var queryUrl = "/jsonfile";
  var queryUrl2 = "/breweryjsonfile";
  // Perform a GET request to the query the baseball stadium API URL
  //   d3.json("/jsonfile").then((data) => {
  //   d3.json('/jsonfile').then(function (data) {
  
  
  
  d3.json(queryUrl, function (data) {
    // d3.json(queryUrl2, function (beerData) {
    // d3.json('/jsonfile').then(function (data) {
    // createFeatures(beerData); 
    // });
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
      // createFeatures(beerData);
    createFeatures(data);
    // });
  });
  
  
  var markerList = [];
  function createFeatures(data) {
  
    data.forEach(d => {
      //  console.log(d.lat, d.lng);
      var mlbIcon = L.icon({
        // .extendoptions: {
        iconUrl: d.Logos,
        iconSize: [55, 60], // size of the icon
        iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -60]
        //    }
      });
  
      var marker = L.marker([d.Latitude, d.Longitude], { icon: mlbIcon })
        .bindPopup("<h3>" + d.Teams + "</h3><h3>Location: " + d.City + "</h3><hr><p>" + d.Beers + "</p>");
  
  
      // Add the marker to the bikeMarkers array
  
      markerList.push(marker);
    })
  
    console.log(markerList);
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(markerList));
  }

function createMap(brewery) {

    // Create the tile layer that will be the background of our map
    var lmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    var smap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.street",
      accessToken: API_KEY
    });
  
    var dmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lmap,
      "Street Map": smap,
      "Dark Map": dmap
    };
  
   
    
    
  
    // Create an overlayMaps object to hold the MLB Stadium layer
    var overlayMaps = {
      "Brewery": brewery
    };
  
    // Create the map object with options
    var map = L.map("map2", {
      center: [39.82, -98.57],
      zoom: 5.2,
      layers: [lmap, smap, dmap, brewery]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. 
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }

  
  var queryUrl4 = "/breweryjsonfile";

  d3.json(queryUrl4, function (beerdata) {

  createFeatures(beerdata);
 
  });
    var mlbIcon2 = L.icon({
      iconUrl: "static/images/mlb.png",
      iconSize: [55, 60], // size of the icon
      iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -60]
        //  }
    });
    var markerListbrewery = [];
    function createFeatures(beerdata) {
      
      beerdata.forEach(b => {
        //  console.log(b.lat, b.lng);
        var marker2 = L.marker([b.bLat, b.bLong], {icon: mlbIcon2})
          .bindPopup("<h3>" + b.teams + "</h3><h3>Location: " + b.stadium + "</h3><hr><p>" + b.address + "</p>");
    
    
        // Add the marker to the bikeMarkers array
    
        markerListbrewery.push(marker2);
      })
    
      console.log(markerListbrewery);
      

      // Create a layer group made from the bike markers array, pass it into the createMap function
      createMap(L.layerGroup(markerListbrewery));
    }  