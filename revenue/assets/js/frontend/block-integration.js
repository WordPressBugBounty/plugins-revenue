( function ( $ ) {
	'use strict';

	$( function () {
		init();
	} );

	// ------------------
	// Functions
	// ------------------

	function init() {
		$( '.revenue-block-slot' ).each( function () {
			const $slot = $( this );
			const position = $slot.data( 'position' ); // e.g., revenue-before-cart

			if ( ! position ) {
				return true;
			}

			$.ajax( {
				url: revenue_campaign.ajax, // from wp_localize_script
				method: 'GET',
				data: {
					action: 'revenue_get_campaign_html',
					position: position,
					security: revenue_campaign.nonce,
				},
				success: function ( response ) {
					if ( response.success ) {
						$slot.html( response.data.innerHtml );
						$(document.body).trigger( 'updated_checkout' );
					}
				},
			} );
		} );
	}

} )( jQuery );
