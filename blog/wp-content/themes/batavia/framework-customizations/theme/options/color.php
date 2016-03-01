<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}
$imgdir = get_template_directory_uri() . '/img/';

$options = array(
	'color' => array(
		'title'   => esc_html__( 'Styling', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'compilemethodbox' => array(
				'title'		=> esc_html__( 'Compiler', 'batavia' ),
				'type'		=> 'tab',
				'options'	=> array(
					'compilemethod' => array(
						'label'   => __( 'CSS Compile method', 'batavia' ),
						'type'    => 'radio',
						'value'   => 'sass',
						'desc'    => __( 'The method to generate css from theme settings values.',
							'batavia' ),
						'choices' => array(
							'inline' => __( 'Inline CSS', 'batavia' ),
							'sass' => __( 'Static CSS', 'batavia' ),
						),
						'help'    => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
							__( 'Inline CSS: Means that the styling setting values will be stored as inline code in the <head> section of your website',
								'batavia' ),
							__( 'Static CSS: Means that all the css values will be generated and create the static css file. Keeping your website clean from inline styling',
								'batavia' )
						),
					),
				)
			),
			'accent_tab' => array(
				'title'		=> esc_html__( 'Color Accent', 'batavia' ),
				'type'		=> 'tab',
				'options'	=> array(
					'accent_color'	=> array(
						'label'	=> esc_html__( 'Accent Color', 'batavia' ),
						'desc'	=> esc_html__( 'The color for accent line, link, button, etc', 'batavia' ),
						'type'  => 'color-picker',
						'value'  => '',
					),
				),
			),

			'body_tab' => array(
				'title'   => esc_html__( 'Site Body', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'bodycolorgrup' => array(
						'type'    => 'group',
						'options' => array(
							'body_color' => array(
								'label'	=> esc_html__( 'Background Color', 'batavia' ),
								'desc'	=> esc_html__( 'Color for body', 'batavia' ),
								'type'  => 'color-picker',
								'value'  => '',
							),
							'body_styles' => array(
								'type'         => 'multi-picker',
								'label'        => false,
								'desc'         => false,
								'value'        => array(
									'image_type' => 'predefined',
								),
								'picker' => array(
									'image_type' => array(
										'label'   => esc_html__( 'Background Image', 'batavia' ),
										'type'    => 'radio',
										'choices' => array(
											'predefined'  => esc_html__( "Default", 'batavia' ),
											'custom' => esc_html__( 'Custom', 'batavia' )
										),
										'inline' => true,
									)
								),
								'choices'      => array(
									'predefined'  => array(
										/* IMAGE PICKER */
										'sbasdasdasd' => array(
											'type'  => 'html-full',
											'value' => '',
											'label' => false,
											'html'  => '&nbsp;',
										),
									),
									'custom' => array(
										'background-image' => array(
											'label' => esc_html__( 'Image', 'batavia' ),
											'desc'  => esc_html__( 'Upload image to set as background', 'batavia' ),
											'type'  => 'upload',
										),
										'background-repeat' => array(
											'label'   => esc_html__( 'Repeat', 'batavia' ),
											'type'    => 'radio',
											'inline' => true,
											'choices' => array(
												'repeat' => esc_html__( 'Horizontal and Vertical', 'batavia' ),
												'repeat-x'  => esc_html__( 'Horizontal', 'batavia' ),
												'repeat-y' => esc_html__( 'Vertical', 'batavia' ),
												'no-repeat' => esc_html__( 'No Repeat', 'batavia' )
											),
										),
										'background-attachment' => array(
											'label'   => esc_html__( 'Attachment', 'batavia' ),
											'type'    => 'radio',
											'inline' => true,
											'choices' => array(
												'scroll' => esc_html__( 'Scroll', 'batavia' ),
												'fixed'  => esc_html__( 'Fixed', 'batavia' ),
											),
										),
										'background-position' => array(
											'label'   => esc_html__( 'Position', 'batavia' ),
											'type'    => 'select',
											'choices' => array(
												'top left' => esc_html__( 'Top Left', 'batavia' ),
												'top center'  => esc_html__( 'Top center', 'batavia' ),
												'top right' => esc_html__( 'Top Right', 'batavia' ),
												'center left' => esc_html__( 'Center Left', 'batavia' ),
												'center center' => esc_html__( 'Center Center', 'batavia' ),
												'center right' => esc_html__( 'Center Right', 'batavia' ),
												'bottom left' => esc_html__( 'Bottom Left', 'batavia' ),
												'bottom center' => esc_html__( 'Bottom Center', 'batavia' ),
												'bottom right' => esc_html__( 'Bottom Right', 'batavia' ),
											),
										)
									),
								),
								'show_borders' => false,
							),
							'particleeffect' => array(
								'type'         => 'switch',
								'label'        => esc_html__( 'Particle Effect', 'batavia' ),
								'desc'        => esc_html__( 'Random particle effect for website background', 'batavia' ),
								'right-choice' => array(
									'value' => 'enable',
									'label' => esc_html__( 'Enable', 'batavia' )
								),
								'left-choice'  => array(
									'value' => 'disable',
									'label' => esc_html__( 'Disable', 'batavia' )
								),
							),
						),
					),
				),
			),
			
			'footer_tab' => array(
				'title'   => esc_html__( 'Footer', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'footer_color' => array(
						'label'	=> esc_html__( 'Background Color', 'batavia' ),
						'desc'	=> esc_html__( 'Color for footer', 'batavia' ),
						'type'  => 'rgba-color-picker',
						'value'  => '',
					),
					'footer_styles' => array(
						'type'         => 'multi-picker',
						'label'        => false,
						'desc'         => false,
						'value'        => array(
							'image_type' => 'predefined',
						),
						'picker' => array(
							'image_type' => array(
								'label'   => esc_html__( 'Background Image', 'batavia' ),
								'type'    => 'radio',
								'choices' => array(
									'predefined'  => esc_html__( "Default", 'batavia' ),
									'custom' => esc_html__( 'Custom', 'batavia' )
								),
								'inline' => true,
							)
						),
						'choices'      => array(
							'predefined'  => array(
								/* IMAGE PICKER */
								'sbasdasdasd' => array(
									'type'  => 'html-full',
									'value' => '',
									'label' => false,
									'html'  => '&nbsp;',
								),
							),
							'custom' => array(
								'background-image' => array(
									'label' => esc_html__( 'Image', 'batavia' ),
									'desc'  => esc_html__( 'Upload image to set as background', 'batavia' ),
									'type'  => 'upload',
								),
								'background-repeat' => array(
									'label'   => esc_html__( 'Repeat', 'batavia' ),
									'type'    => 'radio',
									'inline' => true,
									'choices' => array(
										'repeat' => esc_html__( 'Horizontal and Vertical', 'batavia' ),
										'repeat-x'  => esc_html__( 'Horizontal', 'batavia' ),
										'repeat-y' => esc_html__( 'Vertical', 'batavia' ),
										'no-repeat' => esc_html__( 'No Repeat', 'batavia' )
									),
								),
								'background-attachment' => array(
									'label'   => esc_html__( 'Attachment', 'batavia' ),
									'type'    => 'radio',
									'inline' => true,
									'choices' => array(
										'scroll' => esc_html__( 'Scroll', 'batavia' ),
										'fixed'  => esc_html__( 'Fixed', 'batavia' ),
									),
								),
								'background-position' => array(
									'label'   => esc_html__( 'Position', 'batavia' ),
									'type'    => 'select',
									'choices' => array(
										'top left' => esc_html__( 'Top Left', 'batavia' ),
										'top center'  => esc_html__( 'Top center', 'batavia' ),
										'top right' => esc_html__( 'Top Right', 'batavia' ),
										'center left' => esc_html__( 'Center Left', 'batavia' ),
										'center center' => esc_html__( 'Center Center', 'batavia' ),
										'center right' => esc_html__( 'Center Right', 'batavia' ),
										'bottom left' => esc_html__( 'Bottom Left', 'batavia' ),
										'bottom center' => esc_html__( 'Bottom Center', 'batavia' ),
										'bottom right' => esc_html__( 'Bottom Right', 'batavia' ),
									),
								)
							),
						),
						'show_borders' => false,
					),
					
					'copyright_text_clr' => array(
						'label'	=> esc_html__( 'Copyright Bar Text Color', 'batavia' ),
						'type'  => 'rgba-color-picker',
						'value'  => '',
					),
					'copyright_bg_clr' => array(
						'label'	=> esc_html__( 'Copyright Bar Background Color', 'batavia' ),
						'type'  => 'rgba-color-picker',
						'value'  => '',
					),
					'copyright_bd_clr' => array(
						'label'	=> esc_html__( 'Copyright Bar Border Color', 'batavia' ),
						'type'  => 'rgba-color-picker',
						'value'  => '',
					),
				),
			),
					
			
		),
	),
);
