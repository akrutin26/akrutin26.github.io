var UfaMap = (function() {
    var routes = [];
    var fontSize = 1;
    var pathWidth = 2;
    var element = null;
    var markerTemplate = null;
    var pathTemplate = null;

    function init() {
        element.style.fontSize = fontSize + 'px';

        routes.forEach(function(routeData, routeNum) {
            var path = renderPath(routeNum, routeData.path);
            element.append(path);
            
            routeData.markers.forEach(function(markerData, markerNum) {
                var marker = renderMarker(routeNum, markerNum, markerData);
                element.append(marker);
            });
        });

        svgPanZoom(element, {
            viewportSelector: '.viewport',
            panEnabled: true,
            controlIconsEnabled: false,
            zoomScaleSensitivity: 0.1,
            minZoom: 1,
            maxZoom: 10,
            fit: true,
            center: true,
            beforeZoom: function(e){},
            onZoom: function(zoom){
                zoomElement(zoom);
                zoomMarkers(zoom);
                zoomMarkersNew(zoom);
            },
            beforePan: function(){},
            onPan: function(e){},
        });
    }

    function showRoute(num) {
        element.querySelectorAll('[data-route]').forEach(function(el) {
            el.classList.remove('show');
        });
        element.querySelectorAll('[data-route="'+num+'"]').forEach(function(part) {
            part.classList.add('show');
        });
    }

    function renderMarker(routeNum, markerNum, data) {
        var marker = markerTemplate.cloneNode(true);
        var markerId = 'marker-' + routeNum + '-' + markerNum;
        var markerGradientId = 'marker-gradient-' + routeNum + '-' + markerNum
        var x = data.x - 20;
        var y = data.y - 50;

        // Element data
        marker.id = markerId;
        marker.dataset.route = routeNum;
        marker.dataset.x = x;
        marker.dataset.y = y;

        // Image
        marker.querySelector("image").setAttribute("xlink:href", data.src);

        // Position
        marker.style.transform = "translateX("+x+"px)  translateY("+y+"px) scale(1)";
        
        // Gradient
        marker.querySelector("#baloon-gradient").id = markerGradientId;
        marker.querySelector('.marker-baloon').style.fill = "url(#"+markerGradientId+")";

        return marker;
    }

    function renderPath(routeNum, data) {
        var path = pathTemplate.cloneNode(true);
        var pathId = 'path-' + routeNum;
        var x = data.x;
        var y = data.y;

        // Element data
        path.id = pathId;
        path.dataset.route = routeNum;
        path.dataset.x = x;
        path.dataset.y = y;

        // Transform translate
        path.style.transform = "translateX("+x+"px)  translateY("+y+"px) scale(1)";

        // Attrs
        path.style.stroke = data.color;
        path.setAttribute('d', data.d);

        return path;
    }

    function zoomElement(zoom) {
        var realZoom = 1 / zoom;
        element.style.fontSize = (fontSize * realZoom) + 'px';
    }

    function zoomMarkersNew(zoom) {
        var markers = element.querySelectorAll('.viewport .route .marker');
        var realZoom = 1 / zoom;

        markers.forEach(function(marker) {
            var scale = parseFloat(marker.style.scale) || 0;
            marker.style.scale = 1 / zoom;
        });
    }

    function zoomMarkers(zoom) {
        // Without marker template in <defs>
        var markers = [];
        // var markers = element.querySelectorAll('.viewport > .marker');
        var realZoom = 1 / zoom;

        markers.forEach(function(marker) {
            var transform = marker.style.transform;

            // Transform scale    
            var replacedScale = transform.replace(/scale\([0-9|\.]*\)/, 'scale('+realZoom+')');
            transform = replacedScale;
            
            // Transform translateX
            var width = parseFloat(marker.getBBox().width);
            // Point in 20px of 40px (0.5)
            var computedWidth = width * 0.5;
            var initialX = parseFloat(marker.dataset.x);
            var translateX = initialX + (computedWidth - computedWidth  * realZoom);
            var replacedTranslateX = transform.replace(/translateX\([0-9|\.]*(px)\)/, 'translateX('+translateX+'px)');
            transform = replacedTranslateX;

            // Transform translateY
            var height = parseFloat(marker.getBBox().height);
            // Point in 50px of 60px (0.833333333333)
            var computedHeight = height * 0.8333333333333;
            var initialY = parseFloat(marker.dataset.y);
            var translateY = initialY + (computedHeight - computedHeight * realZoom);
            var replacedTranslateY = transform.replace(/translateY\([0-9|\.]*(px)\)/, 'translateY('+translateY+'px)');
            transform = replacedTranslateY;

            marker.style.transform = transform;
        });
    }


    return {
        init: function(elementId, routesList) {
            if (document.getElementById(elementId) == null) {
                return;
            }
            
            routes = routesList;
            element = document.getElementById(elementId);
            markerTemplate = document.getElementById("marker");
            pathTemplate = document.getElementById('path');

            init();
        },
        showRoute: showRoute,
    }
})();
