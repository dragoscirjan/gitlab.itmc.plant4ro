<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'general' => array(
		'title'   => __( 'General', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'general-box' => array(
				'title'   => __( 'Site Identity', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'logo' => array(
						'label' => __( 'Logo', 'batavia' ),
						'desc'  => __( 'Upload a logo image. Use png image for best quality', 'batavia' ),
						'type'  => 'upload'
					),
					'logo_retina' => array(
						'label' => __( 'Logo Retina version', 'batavia' ),
						'desc'  => __( 'The image for retina display or HiDPI devices. Please put "@2x" just before the file extension (eg. mylogo@2x.png)', 'batavia' ),
						'type'  => 'upload'
					)
				)
			),
			'social' => array(
				'title'   => __( 'Social Profiles', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					/**
					 * Addable Option
					 */
					'social_icons' => array(
						'label'	=> __( 'Social Icons', 'zatolab' ),
						'type'	=> 'addable-popup',
						'value'	=> array(),
						'desc'	=> __( 'Add Social Icons as much as you want. Choose the icon, url and the title', 'zatolab' ),
						'popup-options'  => array(

							/**
							 * URL Social
							 */
							'social_name'     => array(
								'label' => __( 'Title', 'zatolab' ),
								'type'  => 'text',
								'value' => 'Name',
								'desc'  => __( 'The Hover Title', 'zatolab' )
							),

							/**
							 * URL Social
							 */
							'social_url'     => array(
								'label' => __( 'Url', 'zatolab' ),
								'type'  => 'text',
								'value' => 'http://',
								'desc'  => __( 'The link to your social profile', 'zatolab' )
							),

							/**
							 * Icon Social
							 */
							'social_icon' => array(
								'label' => __( 'Icon', 'zatolab' ),
								'type'  => 'icon',
								'desc'  => __( 'Choose the icon', 'zatolab' ),
								'set'  => 'zocials'
							),
						),
						'template' => '{{- social_name }}',
						//'limit' => 3,
					),
				)
			),
		)
	),

	
);