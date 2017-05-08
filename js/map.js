document.addEventListener("DOMContentLoaded", function () {

    var map = L.map("mapid",{
    center: [42.448685, -76.478369],
    zoom: 15
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
	
	var polygon = L.polygon([
		[42.444737, -76.482338],
		[42.447768, -76.485334],
		[42.448685, -76.478369]
	]).addTo(map);
	
	var marker1 = L.marker([42.444737, -76.482338]).addTo(map);
	var marker2 = L.marker([42.447768, -76.485334]).addTo(map);
	var marker3 = L.marker([42.448685, -76.478369]).addTo(map);
	
	marker1.bindPopup("<b>Station_1</b><br>Philips Hall").openPopup();
	marker2.bindPopup("<b>Station_2</b><br>McGraw Tower").openPopup();
	marker3.bindPopup("<b>Station_3</b><br>Ag Quad").openPopup();
	
	polygon.bindPopup("Libe slope");

});