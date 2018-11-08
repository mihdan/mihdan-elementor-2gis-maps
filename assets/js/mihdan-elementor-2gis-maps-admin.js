( function( $, window, document, undefined ) {

	'use strict';
	
	var metg = {
		search: function( query, $output, $lat, $lng  ) {
			var serviceURL = 'https://nominatim.openstreetmap.org/search';

			query = $.trim( query );

			if ( ! query ) {
				$output.html( 'Вы забыли указать, что искать' );
				return;
			}

			$.ajax( {
				url: serviceURL,
				data: {
					q: query,
					limit: 1,
					format: 'json',
					addressdetails: 1,
					//county: 'Россия',
					county_code: 'ru'
					//json_callback: 'metg.callback',
				},
				dataType: 'json',
				success: function ( data ) {
					if ( data.length ) {
						var first_geo_object = data[0];

						$output.html( first_geo_object.display_name );
						$lat.val( first_geo_object.lat ).trigger('input');
						$lng.val( first_geo_object.lon ).trigger('input');

					} else {
						$output.html( 'По вашему запросу ничего не найдено' );
					}


				},
				error: function ( data ) {

				}
			} );
		},
	};

	/**
	 * Поиск центра карты
	 */
	window.elementor.channels.editor.on( 'metg:editor:search:center', function ( e ) {

		var $btn = e.$el[0],
			$output = $( $btn.nextSibling ).find('.elementor-control-raw-html'),
			$query = $( '[data-setting="map_search_query"]' ),
			$lat = $( '[data-setting="map_lat"]' ),
			$lng = $( '[data-setting="map_lng"]' );


		metg.search( $query.val(), $output, $lat, $lng );
	} );

} )( window.jQuery, window, document );

function mihdan_elementor_yandex_maps_find_pin_address__( ob ) {

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
//
//(function($) {
//    $('.repeater-fields').each(function() {
//        $(this).click(function() {
//            $('.eb-output-result').empty();
//        });
//    });
//});