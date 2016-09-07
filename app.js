$(document).ready(function() {

    var key = "a9ddabe16a77f96f264928080e0864ce";
    var lat;
    var long;
    var gridAppend = $('#gridArea');
    var areaList;
    var breweryName;

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
            areaList = results.data;
            breweryName = results.data.brewery;

            for (var i = 0; i < areaList.length; i++) {
                if (areaList[i].brewery.images) {

                    gridAppend.append('<div class="five wide column"><img src="' + areaList[i].brewery.images.squareMedium + '" id="' + areaList[i].brewery.id + '"></div>');
                } else {}
            }
        });
        $('#barDiv').hide();
    })

    $('#gridArea').on('click', 'img', function(event) {
        event.preventDefault();
        var idOfthingClicked = '#' + this.id;
        console.log(idOfthingClicked);
        $('img').addClass('active')
        $('img').not($(idOfthingClicked)).addClass('inactive')

        $.ajax({
            url: 'http://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/breweries?key=a9ddabe16a77f96f264928080e0864ce&ids=' + idOfthingClicked,
        }).done(function(results) {
            console.log(results.data[0].description);
        });
    })





})
