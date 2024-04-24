var UfaMap = (function() {
    var element = null;

    function init() {
        svgPanZoom(element, {
            viewportSelector: '.viewport',
            panEnabled: true,
            controlIconsEnabled: false,
            zoomScaleSensitivity: 0.1,
            minZoom: 1,
            maxZoom: 12,
            fit: true,
            center: true,
            beforeZoom: function(e){},
            onZoom: function(zoom){
                zoomElement(zoom);
                zoomMarkers(zoom);
            },
            beforePan: function(){},
            onPan: function(e){},
        });

        element.addEventListener('click', function(e) {
            if (e.target.closest('[data-route]')) {
                return;
            }

            element.querySelectorAll("[data-route]").forEach(function(el) {
                el.classList.remove('active');
            });
        });

        element.querySelectorAll("[data-route]").forEach(function(el) {
            var routeId = el.dataset.route;

            el.addEventListener("click", function(e) {
                element.querySelectorAll("[data-route='"+routeId+"']").forEach(function(childEl) {
                    childEl.classList.add('active');
                });
            });
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

    function zoomElement(zoom) {
        element.style.fontSize = (1 / zoom) + 'px';
    }

    function zoomMarkers(zoom) {
        var markers = element.querySelectorAll('.viewport .marker');
        markers.forEach(function(marker) {
            marker.style.scale = 1 / zoom;
        });
    }

    return {
        init: function(elementId) {
            if (document.getElementById(elementId) == null) {
                return;
            }
            
            element = document.getElementById(elementId);

            init();
        },
        showRoute: showRoute,
    }
})();
