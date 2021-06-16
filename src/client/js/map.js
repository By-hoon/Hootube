import "../scss/styles.scss";

function init(){
    alert();
    var mapContainer = document.getElementById('map'), 
    mapOption = { 
        center: new kakao.maps.LatLng(36.33929480377198, 127.39343696623958),
        level: 7
    };
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    kakao.maps.event.addListener(map, 'click', makeMarker);
};

function makeMarker(mouseevent) {
    var latlng = mouseevent.latLng; 
    var markerLat = latlng.getLat();
    var markerLng = latlng.getLng();
    alert("click");
};
init();