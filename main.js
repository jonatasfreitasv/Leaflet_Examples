//// From 

(function () {
    "use strict";

    // Load Map
    var map = new L.map('map').setView([50.5, 30.5], 9);
    //

    // Add OSM layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.',
        maxZoom: 19
    }).addTo(map);
    //

    // Draw Controls with https://github.com/Leaflet/Leaflet.draw/tree/leaflet-master
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        draw: {
            position: 'topleft',
            polygon: {
                title: 'Draw a sexy polygon!',
                allowIntersection: false,
                drawError: {
                    color: '#b00b00',
                    timeout: 1000
                },
                shapeOptions: {
                    color: '#bada55'
                },
                showArea: true
            },
            polyline: {
                metric: false
            },
            circle: {
                shapeOptions: {
                    color: '#662d91'
                }
            }
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });
    //

    // Marker with popup and draggable
    var myIcon = L.icon({
        iconUrl: 'http://www.myiconfinder.com/uploads/iconsets/5f9f834af5818fa985de0f1ed06ee2a5-pin.png',
        iconSize: [40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42]
    });

    var marker = L.marker([50.5, 30.5], {icon: myIcon}).addTo(map);
    marker.bindPopup('<b>Hello Leaflet !!!</b>').openPopup();
    //

    // Polyline
    var polylineLatLngs = [
        [50.5, 30.5],
        [50.10, 30.10],
        [50.30, 30.20]
    ];

    var polyline = L.polyline(
        polylineLatLngs,
        {
            color: 'red'
        }).addTo(map);
    //

    // Polygon
    var polygonLatLngs = [
        [50.90, 30.90],
        [50.50, 30.50],
        [50.50, 30.10],
        [50.90, 30.90]
    ];

    var polygon = L.polygon(polygonLatLngs,
        {
            color: 'green',
            fill: true,
            fillColor: 'green',
            fillOpacity: 0.2
        }).addTo(map);
    //

    // Custom Control
    var customControl = L.Control.extend({

        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

            container.innerHTML = '<input id="markerAnimation" type="checkbox"/> Marker Animation Stoped';
            container.style.backgroundColor = 'white';
            container.style.width = '170px';
            container.style.height = '22px';
            container.style.textAlign = 'center';
            container.style.paddingTop = '4px';

            container.onclick = function () {
                if(document.getElementById('markerAnimation').checked) {
                    animatedMarker.start();
                    container.innerHTML = '<input id="markerAnimation" type="checkbox" checked/> Marker Animation Started';
                }
                else {
                    animatedMarker.pause();
                    container.innerHTML = '<input id="markerAnimation" type="checkbox"/> Marker Animation Stoped';
                }
            };
            return container;
        }

    });

    map.addControl(new customControl());
    //

    // Animated Markers with > https://github.com/ewoken/Leaflet.MovingMarker
    var animatedMarker = L.Marker.movingMarker(polylineLatLngs,
        [10000, 20000, 10000],
        {
            autostart: false,
            loop: true
        }
    ).addTo(map);
    //

    // Marker Cluster with https://github.com/SINTEF-9012/PruneCluster
    var pruneCluster = new PruneClusterForLeaflet();

    for(var i = 1; i < 1000; i++){

        var marker = new PruneCluster.Marker(50.400000 + (i % 10), 30.400000 + (i % 10));
        pruneCluster.RegisterMarker(marker);

        console.log('added');

    }
    map.addLayer(pruneCluster);
    //

})();