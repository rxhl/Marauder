// Setting map's default coordinates

var map = L.map("mapid",{
    center: [42.447535, -76.482790],
    zoom: 14
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// CS
var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// INFO
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// OR
var yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Other
var greyIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var cafeMarkers = [], homeMarkers = [], cornellMarker;

const cafeBtn = document.querySelector("#cafe");
const homeBtn = document.querySelector("#home");

const cs = document.querySelector("#cs");
const info = document.querySelector("#info");
const other = document.querySelector("#other");
const orie = document.querySelector("#orie");

d3.queue()
    .defer(d3.csv, "marauder.csv")
    .await(function(error, data) {
        if (error) {
            console.error(error);
        }
        else
        {
            // Draw cafes for majors

            function drawCafeInfo() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "INFO") {
                        cafeMarkers[i] = L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: greenIcon}).addTo(map);

                        cafeMarkers[i].bindPopup(data[i].cafe);
                    }
                }
            }

            function drawCafeCs() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "CS") {
                        cafeMarkers[i] = L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: redIcon}).addTo(map);

                        cafeMarkers[i].bindPopup(data[i].cafe);
                    }
                }
            }

            function drawCafeOr() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "OR") {
                        cafeMarkers[i] = L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: yellowIcon}).addTo(map);

                        cafeMarkers[i].bindPopup(data[i].cafe);
                    }
                }
            }

            function drawCafeOther() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major !== "OR" || data[i].major !== "INFO" || data[i].major !== "CS") {
                        cafeMarkers[i] = L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: greyIcon}).addTo(map);

                        cafeMarkers[i].bindPopup(data[i].cafe);
                    }
                }
            }
            drawCafeOther();

            // Draw homes for majors

            function drawHomeInfo() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "INFO") {
                        homeMarkers[i] = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: greenIcon}).addTo(map);

                        homeMarkers[i].bindPopup(data[i].home);
                    }
                }
            }

            function drawHomeCs() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "CS") {
                        homeMarkers[i] = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: redIcon}).addTo(map);

                        homeMarkers[i].bindPopup(data[i].home);
                    }
                }
            }

            function drawHomeOr() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "OR") {
                        homeMarkers[i] = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: yellowIcon}).addTo(map);

                        homeMarkers[i].bindPopup(data[i].home);
                    }
                }
            }

            function drawHomeOther() {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major !== "OR" || data[i].major !== "INFO" || data[i].major !== "CS") {
                        homeMarkers[i] = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: greyIcon}).addTo(map);

                        homeMarkers[i].bindPopup(data[i].home);
                    }
                }
            }

            cafeBtn.addEventListener("click", function() {

            });

            homeBtn.addEventListener("click", function() {

            });

            cs.onchange = function() {
                if(this.checked) {
                    // Checkbox is checked.
                    //drawHome();
                } else {
                    // Checkbox is not checked.

                }
            }
        }

    });


