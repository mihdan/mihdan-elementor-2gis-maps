function mihdan_elementor_yandex_maps_find_address( ob ) {

	'use strict';

    var $ = jQuery,
	    address = $( ob ).parent().find('input').attr('value'),
        output = $( ob ).parent().find('.eb-output-result');

    if( address !== '' ) {

    	var serviceURL = 'https://nominatim.openstreetmap.org/search';

	    $( output ).html( 'Ищу в поте лица ...' );

	    DG.ajax( serviceURL, {
		    type: 'get',
		    data: {
			    q: address,
			    limit: 1,
			    format: 'json',
			    addressdetails: 1,
		    },
		    success: function( data ) {
			    if ( data.length ) {

				    var firstGeoObject = data[0];

				    $( output ).html( firstGeoObject.display_name );

				    $( ob ).parents('.elementor-control-map_notice').nextAll('.elementor-control-map_lat').find("input").val( firstGeoObject.lat ).trigger("input");
				    $( ob ).parents('.elementor-control-map_notice').nextAll('.elementor-control-map_lng').find("input").val( firstGeoObject.lon ).trigger("input");
			    } else {
				    $( output ).html( 'Ничего не найдено' );
			    }
		    },
		    error: function( error ) {
			    $( output ).html( error );
		    }
	    } );
    } else {
	    $( output ).html( 'Не указан адрес для поиска' );
    }
}
function mihdan_elementor_yandex_maps_find_pin_address( ob ) {

	var address = $( ob ).parent().find('input').attr('value');
	if( address !== '' ) {
		ymaps.geocode( address, {
			results: 1
		} ).then(function ( res ) {

			var firstGeoObject = res.geoObjects.get(0),
				// Координаты геообъекта.
				coords = firstGeoObject.geometry.getCoordinates(),
				// Область видимости геообъекта.
				bounds = firstGeoObject.properties.get('boundedBy');

			var output = $(ob).parent().find('.eb-output-result');

			$(output).html("Latitude: " + coords[0] + "<br>Longitude: " + coords[1] + "<br>(Copy and Paste your Latitude & Longitude value below)<br />Полный адрес: " + firstGeoObject.getAddressLine() );

			$(ob).parents('.elementor-control-pin_notice').nextAll('.elementor-control-pin_lat').find("input").val( coords[0] ).trigger("input");
			$(ob).parents('.elementor-control-pin_notice').nextAll('.elementor-control-pin_lng').find("input").val( coords[1] ).trigger("input");
		} );
	} else {
		alert( 'Не указан адрес для поиска' );
	}

}

(function($) {
    $('.repeater-fields').each(function() {
        $(this).click(function() {
            $('.eb-output-result').empty();
        });
    });
});