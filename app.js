$(document).ready(function() {

    var key = "a9ddabe16a77f96f264928080e0864ce";
    var lat;
    var long;
    var gridAppend = $('#gridArea');
    var areaList;
    var breweryInfo;
    var listAppend = $('#breweryDetails')
    var beerInfo;
    var beerAppend = $('#celled');


    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log('ready');
    });

    $('#sButton').on('click', function() {
        event.preventDefault();

        $.ajax({
            url: 'http://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/search/geo/point?key=' + key + '&lat=' + lat + '&lng=' + long + '&type=brewery',
        }).done(function(results) {
            areaList = results.data;

            for (var i = 0; i < areaList.length; i++) {
                if (areaList[i].brewery.images) {
                    gridAppend.append('<div class="five wide column"><img src="' + areaList[i].brewery.images.squareMedium + '" id="' + areaList[i].id + '"></div>');
                }
            }
        });
        $('#barDiv').hide();
    })


    $('#gridArea').on('click', 'img', function(event) {
        event.preventDefault();
        var locationId = "#" + this.id;
        $('img').addClass('active')
        $('img').not(locationId).addClass('inactive')

        var locationIdFixed = locationId.slice(1)

        $.ajax({
            url: 'http://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/location/' + locationIdFixed + '?key=' + key + ''
        }).done(function(results) {
            breweryInfo = results.data;

            $('#breweryText').addClass('description');
            $('#breweryText').text(breweryInfo.brewery.name + " - " + breweryInfo.brewery.description);

            if (!!breweryInfo.streetAddress) {
                listAppend.append('<div class="item">' + breweryInfo.streetAddress + "<br>" + breweryInfo.locality + " " +
                    breweryInfo.region + " " + breweryInfo.postalCode + '</div>');
            }
            if (!!breweryInfo.hoursOfOperation) {
                listAppend.append('<div class="item">' + breweryInfo.hoursOfOperation + '</div>');
            }
            if (!!breweryInfo.website) {
                listAppend.append('<div class="item"><a href="' + breweryInfo.website + '">' + breweryInfo.website + '</a></div>');
            }

            $.ajax({
                url: 'http://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2/brewery/' + breweryInfo.brewery.id + '/beers?key=' + key,
            }).done(function(results) {
                beerInfo = results.data;
                for (var i = 0; i < beerInfo.length; i++) {
                    console.log(beerInfo[i]);
                    beerAppend.append('<div class="item" id="beerLine"></div>');
                    if (beerInfo[i].labels) {
                        $(beerAppend).append('<img class="ui avatar image" src="' + beerInfo[i].labels.icon + '" id="icon" >');
                    }
                    $(beerAppend).append('<div class="content" id="abv">' + beerInfo[i].style.abvMin + " to " + beerInfo[i].style.abvMax + " abv" +
                        '</div>');
                    $(beerAppend).append('<div class="header">' + beerInfo[i].name + '</div>');
                }
            });

        });
    })





})
