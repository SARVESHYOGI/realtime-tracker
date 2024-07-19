const socket = io();

console.log("hey")

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', { latitude, longitude });
    },
        (err) => {
            console.log(err);
        }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }
    );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",

}).addTo(map);



