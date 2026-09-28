const lat = listing.geometry.coordinates[1];
const lng = listing.geometry.coordinates[0];

var map = L.map('map').setView([lat, lng], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [30, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -38]
});

// console.log(coordinates);

L.marker([lat, lng], { icon: redIcon }).bindTooltip(`
    <h3>${listing.title}</h3>
    <p>Exact location will be provided after booking.</p>
`, {
    direction: "top",
    offset: [4, -55]
}).addTo(map);