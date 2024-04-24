var routes = [
    {
        name: "Путь 1",
        markers: [
            {
                x: 304, // 273 284px
                y: 963, // 910 913px
                src: "images/baloon.png",
            },
            {
                x: 302.6,
                y: 952.7,
                src: "images/baloon.png",
            },
            {
                x: 319,
                y: 950.1,
                src: "images/baloon.png",
            }
        ], 
        path: {
            x: 299,
            y: 947,
            color: "#BF81F0",
            d: "M5 16L3.5 5.50001L19.9995 3"
        }
    }
];

window.onload = function() {
    UfaMap.init('ufa-map', []);
    BashMap.init('bash-map', []);
}