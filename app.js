$(document).ready(function() {

    var key = "a9ddabe16a77f96f264928080e0864ce";
    var lat;
    var long;

    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log('ready');
    });



    $('#sButton').on('click', function() {
        event.preventDefault();

        $.ajax({
            url: 'http://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/search/geo/point?key=a9ddabe16a77f96f264928080e0864ce&lat=' + lat + '&lng=' + long + '&type=brewery',
        }).done(function(results) {
            var areaList = results.data;

            for (var i = 0; i < areaList.length; i++) {
                console.log(areaList[i].brewery.name);
                var persist = (areaList[i].brewery.name);
            }
        });
        $('#barDiv').hide();
    })





})





// console.log(results.data[0].brewery.name);
