<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }


/**
 * Batavia only works in WordPress 4.4 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.4-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}

/**
 * Theme Includes
 */
require_once get_template_directory() . '/inc/init.php';
include( get_template_directory() . '/inc/remotefonts.php');
require_once get_template_directory() . '/inc/features.php';


/**
 * TGM Plugin Activation
 */
{
	require_once get_template_directory() . '/TGM-Plugin-Activation/class-tgm-plugin-activation.php';

	/** @internal */
	function zl_action_theme_register_required_plugins() {
		tgmpa( array(
			array(
				'name'      => 'Unyson',
				'slug'      => 'unyson',
				'required'  => true,
			),
			array(
				'name'      => 'WP Retina 2x',
				'slug'      => 'wp-retina-2x/',
				'required'  => false,
			)
		) );

	}
	add_action( 'tgmpa_register', 'zl_action_theme_register_required_plugins' );
}