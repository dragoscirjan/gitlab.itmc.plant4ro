<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$manifest = array();

$manifest['id'] = get_option( 'stylesheet' );

$manifest['supported_extensions'] = array(
	'backups' => array(),
	'analytics' => array()
);