<?php
/**
 * Load the parent style.css file
 *
 * @link http://codex.wordpress.org/Child_Themes
 */
if( ! function_exists( 'justg_child_enqueue_parent_style') ) {
	function justg_child_enqueue_parent_style() {

        wp_enqueue_script( 'justg-custom-scripts', get_stylesheet_directory_uri() . '/js/custom.js', array(), $js_version, true );
        wp_localize_script( 'justg-custom-scripts', 'parameterurl', justg_scripts_params() );

	}
}
add_action( 'after_setup_theme', 'velocitychild_theme_setup', 9 );