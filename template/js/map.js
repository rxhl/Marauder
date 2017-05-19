// Play some music

var hp = new Audio("static/hp.mp3");

function init() {
	hp.loop = true;
	hp.play();
}

// Show the map

const marauder = document.querySelector(".marauder");
const boxed = document.querySelector(".boxed");

setTimeout(function() {
	$(".marauder").fadeOut(2000);
}, 100);

setTimeout(function() {
	marauder.style.background = "none";
	boxed.style.visibility = "visible";
	$(".marauder").fadeIn(2000);
}, 2100);

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

var csCafe = new L.FeatureGroup();
var csHome = new L.FeatureGroup();

var infoCafe = new L.FeatureGroup();
var infoHome = new L.FeatureGroup();

var orCafe = new L.FeatureGroup();
var orHome = new L.FeatureGroup();

var otherCafe = new L.FeatureGroup();
var otherHome = new L.FeatureGroup();


const cafeBtn = document.querySelector("#cafe");
const homeBtn = document.querySelector("#home");

const cs = document.querySelector("#cs");
const info = document.querySelector("#info");
const otherMajor = document.querySelector("#other");
const orie = document.querySelector("#orie");

d3.queue()
    .defer(d3.csv, "data/marauder.csv")
    .await(function(error, data) {
        if (error) {
            console.error(error);
        }
        else
        {
            // Draw cafes for majors

            function drawCafeInfo() {
                var infoC;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "INFO") {
                        infoC = new L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: greenIcon, opacity: 0.8}).addTo(map);

                        infoC.bindPopup(data[i].cafe);
                        infoCafe.addLayer(infoC);
                    }

                }

                map.addLayer(infoCafe);
            }


            function drawCafeCs() {
                var cseC;
                for (var i = 0; i < data.length; i++) {

                    if (data[i].major === "CS") {
                        cseC = new L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: redIcon, opacity: 0.8}).addTo(map);
                        cseC.bindPopup(data[i].cafe);
                        csCafe.addLayer(cseC);
                    }

                }
                map.addLayer(csCafe);
            }


            function drawCafeOr() {
                var orieC;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "OR") {
                        orieC = new L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: yellowIcon, opacity: 0.8}).addTo(map);

                        orieC.bindPopup(data[i].cafe);
                        orCafe.addLayer(orieC);
                    }

                }
                map.addLayer(orCafe);
            }

            function drawCafeOther() {
                var otherC;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major !== "OR" || data[i].major !== "INFO" || data[i].major !== "CS") {
                        otherC = new L.marker([+data[i].cafe_lat, +data[i].cafe_lon],
                            {icon: greyIcon, opacity: 0.8}).addTo(map);

                        otherC.bindPopup(data[i].cafe);
                        otherCafe.addLayer(otherC);
                    }

                }
                map.addLayer(otherCafe);
            }

            // Draw homes for majors

            function drawHomeInfo() {
                var infoH;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "INFO") {
                        infoH = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: greenIcon, opacity: 0.8}).addTo(map);

                        infoH.bindPopup(data[i].home);
                        infoHome.addLayer(infoH);
                    }

                }
                map.addLayer(infoHome);
            }

            function drawHomeCs() {
                var cseH;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "CS") {
                        cseH = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: redIcon, opacity: 0.8}).addTo(map);

                        cseH.bindPopup(data[i].home);
                        csHome.addLayer(cseH);
                    }

                }
                map.addLayer(csHome);
            }

            function drawHomeOr() {
                var orieH;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major === "OR") {
                        orieH = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: yellowIcon, opacity: 0.8}).addTo(map);

                        orieH.bindPopup(data[i].home);
                        orHome.addLayer(orieH);
                    }

                }
                map.addLayer(orHome);
            }

            function drawHomeOther() {
                var otherH;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].major !== "OR" || data[i].major !== "INFO" || data[i].major !== "CS") {
                        otherH = L.marker([+data[i].home_lat, +data[i].home_lon],
                            {icon: greyIcon, opacity: 0.8}).addTo(map);

                        otherH.bindPopup(data[i].home);
                        otherHome.addLayer(otherH);
                    }

                }
                map.addLayer(otherHome);
            }

            cafeBtn.addEventListener("click", function() {

                infoHome.clearLayers();
                csHome.clearLayers();
                orHome.clearLayers();
                otherHome.clearLayers();

                if(info.checked) {
                    drawCafeInfo();
                }
                else {
                    infoCafe.clearLayers();
                }

                if(cs.checked) {
                    drawCafeCs();
                }
                else {
                    csCafe.clearLayers();
                }

                if(orie.checked) {
                    drawCafeOr();
                }
                else {
                    orCafe.clearLayers();
                }


                if(otherMajor.checked) {
                    drawCafeOther();
                }
                else {
                    otherCafe.clearLayers();
                }


            });

            homeBtn.addEventListener("click", function() {

                csCafe.clearLayers();
                infoCafe.clearLayers();
                orCafe.clearLayers();
                otherCafe.clearLayers();

                if(info.checked) {
                    drawHomeInfo();
                }
                else {
                    infoHome.clearLayers();
                }

                if(cs.checked) {
                    drawHomeCs();
                }
                else {
                    csHome.clearLayers();
                }

                if(orie.checked) {
                    drawHomeOr();
                }
                else {
                    orHome.clearLayers();
                }

                if(otherMajor.checked) {
                    drawHomeOther();
                }
                else {
                    otherHome.clearLayers();
                }

            });

            cs.onchange = function() {
                if(this.checked && cafeBtn.checked) {
                    drawCafeCs();
                }
                else if(this.checked && homeBtn.checked) {
                    drawHomeCs();
                }
                else {
                    csCafe.clearLayers();
                    csHome.clearLayers();
                }
            };

            info.onchange = function() {
                if(this.checked && cafeBtn.checked) {
                    drawCafeInfo();
                }
                else if(this.checked && homeBtn.checked) {
                    drawHomeInfo();
                }
                else {
                    infoCafe.clearLayers();
                    infoHome.clearLayers();
                }
            };

            orie.onchange = function() {
                if(this.checked && cafeBtn.checked) {
                    drawCafeOr();
                }
                else if(this.checked && homeBtn.checked) {
                    drawHomeOr();
                }
                else {
                    orCafe.clearLayers();
                    orHome.clearLayers();
                }
            };

            otherMajor.onchange = function() {
                if(this.checked && cafeBtn.checked) {
                    drawCafeOther();
                }
                else if(this.checked && homeBtn.checked) {
                    drawHomeOther();
                }
                else {
                    otherCafe.clearLayers();
                    otherHome.clearLayers();
                }
            };
        }

    });


