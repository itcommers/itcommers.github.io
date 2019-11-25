// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,
        streetViewControl: false,
        //draggable: false,
        mapTypeControl: false,


        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(55.96798079, 37.15057183),

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.96821245, 37.15055574),
        map: map,
        title: 'КухМистер',
        icon: {
            url: "/img/pin.png",
            scaledSize: new google.maps.Size(68, 91)
        }
    });

    /* Map center on resize
        =========================*/
        var getCen = map.getCenter();

        google.maps.event.addDomListener(window, 'resize', function() {
                map.setCenter(getCen);
        });
};
