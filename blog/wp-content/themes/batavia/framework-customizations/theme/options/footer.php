<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}
$options = array(
	'footer' => array(
		'title'   => esc_html__( 'Footer', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'footer-widget-settings' => array(
				'title'   => esc_html__( 'Footer Widgetized Area', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'footer_section' => array(
						'type'  => 'addable-box',
						'label' => esc_html__('Footer Section', 'batavia'),
					    'desc'  => esc_html__('The Section that will be shown on footer. It can contain widgetized area.', 'batavia'),
					    'help'  => array(
							'icon' => 'video',
							'html' => '<iframe width="420" height="315" src="https://www.youtube.com/embed/ShO93cxQp6A" frameborder="0" allowfullscreen></iframe>'
						),
						'template' => '{{- section_name }}', // box title
					   
						'box-options' => array(
					        'section_name' => array( 
					        	'type' => 'text', 
					        	'label' => 'Section Name' 
					        ),

					        'footer_widgets' => array(
								'label'	=> esc_html__( 'Footer Widgetized Area Builder', 'batavia' ),
								'type'	=> 'addable-popup',
								'value'	=> array(),
								'desc'	=> esc_html__( 'Add Widgetable Area to Footer, and pick the column width', 'batavia' ),
								'popup-options'  => array(

									/**
									 * URL Social
									 */
									'footer_widget_name' => array(
										'label' => esc_html__( 'Widgetized Area Name', 'batavia' ),
										'type'  => 'text',
										'value' => '',
										'desc'  => wp_kses( __( 'Widgetized Area Name for Footer, <strong>Do Not</strong> leave this empty', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) )
									),

									/**
									 * Column Width
									 */
									'column_width' => array(
										'label'	=> esc_html__( 'Column Width', 'batavia' ),
										'type'	=> 'select',
										'desc'	=> esc_html__( 'The column system is using 12 column grid that brought by foundation css framework', 'batavia' ),
										'choices' => array( 
									        'large-1 columns' => esc_html__('1/12', 'batavia'),
									        'large-2 columns' => esc_html__('2/12', 'batavia'),
									        'large-3 columns' => esc_html__('3/12', 'batavia'),
									        'large-4 columns' => esc_html__('4/12', 'batavia'),
									        'large-5 columns' => esc_html__('5/12', 'batavia'),
									        'large-6 columns' => esc_html__('6/12', 'batavia'),
									        'large-7 columns' => esc_html__('7/12', 'batavia'),
									        'large-8 columns' => esc_html__('8/12', 'batavia'),
									        'large-9 columns' => esc_html__('9/12', 'batavia'),
									        'large-10 columns' => esc_html__('10/12', 'batavia'),
									        'large-11 columns' => esc_html__('11/12', 'batavia'),
									        'large-12 columns' => esc_html__('12/12', 'batavia'),
									    ), //choices
									), //column_width
								),
								'template' => '{{- footer_widget_name }}',
								//'limit' => 3,
							),

					        'sec_type' => array( 
					        	'type'  => 'radio',
					        	'label' => 'Section content box',
					        	'desc' => 'This is how your widgetized area will be wrapped. Full means it will be wrapped as wide as the screen width, boxed means it\'ll wrapped in the middle of the section',
					        	'choices' => array( 
							        'full' => esc_html__('Full', 'batavia'),
							        'boxed' => esc_html__('Boxed', 'batavia'),
							    ),
					        ),
					        'sec_vertical_padding' => array( 
					        	'type'  => 'text',
					        	'label' => 'Section PADDING',
					        	'desc' => 'Top and Bottom padding, leave this empty will give you zero padding',
					        ),
					        'sec_vertical_margin' => array( 
					        	'type'  => 'text',
					        	'label' => 'Section MARGIN',
					        	'desc' => 'Top and Bottom margin, leave this empty will give you zero padding',
					        ),
					        'sec_background_clr' => array( 
					        	'type'  => 'rgba-color-picker',
					        	'label' => 'Section Background Color',
					        	'desc' => 'Set the background color of this section',
					        	'value' => '',
					        ),
					        'sec_brd_clr' => array( 
					        	'type'  => 'rgba-color-picker',
					        	'label' => 'Border Color',
					        	'desc' => 'Top border color for section',
					        	'value' => '',
					        ),
					        'sec_text_clr' => array( 
					        	'type'  => 'radio',
					        	'label' => 'Text Color',
					        	'value' => 'dark',
					        	'desc' => 'The text color of this section',
					        	'choices' => array( 
							        'dark' => esc_html__('Dark', 'batavia'),
							        'light' => esc_html__('Light', 'batavia'),
							    ),
					        ),
					    ),
					),
				),
			),
					
			'copyright' => array(
				'title'   => esc_html__( 'Copyright text', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'footer_copyright' => array(
						'label' => __( 'Copyright text', 'batavia' ),
						'type'  => 'text',
						'value' => 'Copyright 2016. All rights reserved.',
					),
				),
			),
		),
	),
);
