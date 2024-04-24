var BashMap = (function() {
    var element = null;

    function init() {
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

    return {
        init: function(elementId) {
            if (document.getElementById(elementId) == null) {
                return;
            }
            
            element = document.getElementById(elementId);

            init();
        },
    }
})();
