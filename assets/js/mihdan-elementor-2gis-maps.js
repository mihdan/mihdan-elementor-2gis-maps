var DG = window.DG || [];

( function( $, window, document, undefined ) {

	'use strict';

    var mihdan_elementor_two_gis_maps = function( $scope, $ ) {

        var mapid = $scope.find('.mihdan-elementor-two-gis-map'),
            zoom = $(mapid).data("metm-map-zoom"),
            map_lat = parseFloat( $( mapid ).data("metm-map-lat") ),
            map_lng = parseFloat( $( mapid ).data("metm-map-lng") ),
	        ruler_control = $(mapid).data("metm-ruler-control"),
	        traffic_control = $(mapid).data("metm-traffic-control"),
	        zoom_control = $(mapid).data("metm-zoom-control"),
	        fullscreen_control = $(mapid).data("metm-fullscreen-control"),
	        scale_control = $(mapid).data("metm-scale-control"),
            active_info,
            infowindow,
            map;

	    DG.then( function () {
		    map = DG.map( mapid.attr('id'), {
			    center: [ map_lat, map_lng ],
			    zoom: zoom,
			    dragging : false,
			    touchZoom: false,
			    scrollWheelZoom: false,
			    doubleClickZoom: false,
			    boxZoom: false,
			    geoclicker: false,
			    zoomControl: false,
			    fullscreenControl: false
		    } );

		    // Добавить контроллы на карту
		    if ( 'yes' === ruler_control ) {
			    DG.control.ruler().addTo( map );
		    }

		    if ( 'yes' === traffic_control ) {
			    DG.control.traffic().addTo( map );
		    }

		    if ( 'yes' === zoom_control ) {
			    DG.control.zoom().addTo( map );
		    }

		    if ( 'yes' === fullscreen_control ) {
			    DG.control.fullscreen().addTo( map );
		    }

		    if ( 'yes' === scale_control ) {
			    DG.control.scale().addTo( map );
		    }
	    } );

//
//            var markersLocations = $( mapid ).data('metm-locations');
//
//            $.each( markersLocations, function( index, Element, content ) {
//                var icon_color = '';
//                if ( Element.pin_icon !== '' ) {
//	                icon_color = Element.pin_icon;
//                }
//
//	            var placemark = new ymaps.Placemark( [ parseFloat( Element.lat ), parseFloat( Element.lng ) ], {
//		            //iconCaption: 'dfwefwe',
//		            hintContent: 'Нажмите, чтобы увидеть описание',
//		            balloonContentHeader: Element.title,
//		            balloonContentBody: Element.content,
//		            balloonContentFooter: ''
//	            }, {
//		            iconColor: icon_color,
//		            //preset: 'islands#circleIcon',
//		            // Запретить сворачивать балун в панель на маленьком экране
//		            //balloonPanelMaxMapArea: 0,
//		            balloonMaxWidth: parseInt( infowindow_max_width )
//	            } );
//	            map.geoObjects.add( placemark );
//            } );
    };

    // Make sure you run this code under Elementor..
	$( window ).on( 'elementor/frontend/init', function( e ) {
        window.elementorFrontend.hooks.addAction( 'frontend/element_ready/two-gis-maps.default', mihdan_elementor_two_gis_maps );
    } );

} )( window.jQuery, window, document );

// eof;
