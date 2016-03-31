<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }
/**
 * Register menus
 */

// This theme uses wp_nav_menu() in two locations.
register_nav_menus( array(
	'primary'   => __( 'Top primary menu', 'batavia' ),
) );

function zl_fallbackmenu(){ ?>
	<li><a href="#">Menu is Not Set Yet</a></li>
<?php }	