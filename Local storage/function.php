<?php
/**
 * Load the parent style.css file
 *
 * @link http://codex.wordpress.org/Child_Themes
 */
if( ! function_exists( 'justg_child_enqueue_parent_style') ) {
	function justg_child_enqueue_parent_style() {

        wp_enqueue_script( 'justg-custom-scripts', get_stylesheet_directory_uri() . '/js/custom.js', array(), $js_version, true );
        wp_localize_script( 'justg-custom-scripts', 'parameterurl', jscripts_parameters() );

	}
}
add_action( 'after_setup_theme', 'velocitychild_theme_setup', 9 );

if ( ! function_exists( 'jscripts_parameters' ) ) :
	/**
	 * Get localized scripts parameters.
	 *
	 * @since 1.2.11
	 *
	 * @param array $params Custom localized scripts parameters.
	 *
	 * @return array
	 */
	function jscripts_parameters( $params = array() ) {
		return wp_parse_args(
			$params,
			array(
				'ajax_url'      => admin_url( 'ajax.php' ),
				'json'          => array(
					'country_url'     => add_query_arg( array( 't' => time() ), get_template_directory_uri() .'/inc/data/country.json' ),
					'country_key'     => 'justg_country_data',
					'province_url'    => add_query_arg( array( 't' => time() ), get_template_directory_uri() .'/inc/data/province.json' ),
					'province_key'    => 'justg_province_data',
					'city_url'        => add_query_arg( array( 't' => time() ), get_template_directory_uri() .'/inc/data/city.json' ),
					'city_key'        => 'justg_city_data',
					'subdistrict_url' => add_query_arg( array( 't' => time() ), get_template_directory_uri() .'/inc/data/subdistrict.json' ),
					'subdistrict_key' => 'justg_subdistrict_data',
				),
				'text'          => array(
					'placeholder' => array(
						'state'     => __( 'Province', 'justg' ),
						'city'      => __( 'Town / City', 'justg' ),
						'address_2' => __( 'Subdistrict', 'justg' ),
					),
					'label'       => array(
						'state'     => __( 'Province', 'justg' ),
						'city'      => __( 'Town / City', 'justg' ),
						'address_2' => __( 'Subdistrict', 'justg' ),
					),
				),
				'debug'         => ( 'yes' === get_option( 'woocommerce_shipping_debug_mode', 'no' ) ),
				'show_settings' => isset( $_GET['justg_settings'] ) && is_admin(), // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'method_id'         => 'justg',
			'method_title'      => 'Ongkir ID',
			)
		);
	}
endif;