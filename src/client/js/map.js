import "../scss/styles.scss";

function init(){
    var mapContainer = document.getElementById('map'), 
    mapOption = { 
        center: new kakao.maps.LatLng(36.33929480377198, 127.39343696623958),
        level: 7
    };
    var map = new kakao.maps.Map(mapContainer, mapOption); 
};
init();