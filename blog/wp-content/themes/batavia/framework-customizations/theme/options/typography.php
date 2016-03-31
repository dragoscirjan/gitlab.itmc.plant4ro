<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}


// Headings
$headings = array();
for ($i = 1; $i <= 6; $i++) {
	$headings[] = array(
	    'h'.$i.'_sizes' => array(
			'label' => 'Heading '.$i,
			'type'  => 'short-text',
			'value' => 54 - ($i*4),
			'desc'  => esc_html__( 'Font size in pixels', 'batavia' )
		),	
	);
}
$options = array(
	'typography' => array(
		'title'   => esc_html__( 'Typography', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'onoff_typo' => array(
				'title'    => 'Global on/off',
				'type'    => 'tab',
				'options' => array(
					'use_custom_typo' => array(
						'type'         => 'switch',
						'label'        => esc_html__( 'Enable Custom Typography?', 'batavia' ),
						'desc'        => esc_html__( 'If you disable this, all typography options to the right won\'t be applied. Vice-versa', 'batavia' ),
					),
				),
			),
			'body_group' => array(
				'title'    => 'Basic',
				'type'    => 'tab',
				'options' => array(
					// Font ID HERE
					'body_font'  => array(
						'label' => esc_html__( 'Regular Font', 'batavia' ),
						'desc' => esc_html(esc_html__( 'Default Font for <body> <p> <ul> <li>', 'batavia' )),
						'type'  => 'typography-v2',
						'value'      => array(
							'family'    => 'Droid Serif',
							'subset'    => 'latin',
							'variation' => 'regular',
							'size'      => 18,
							'line-height' => 32,
							'letter-spacing' => 0,
							'color'     => '#525252'
						),
						'components' => array(
							'family'         => true,
							'size'           => true,
							'line-height'    => true,
							'letter-spacing' => true,
							'color'          => false
						),
					),							
				),
			),
			'menu_group' => array(
				'title'    => 'Nav Menu',
				'type'    => 'tab',
				'options' => array(
					// Font ID HERE
					'menu_font'  => array(
						'label' => esc_html__( 'Navigation menu', 'batavia' ),
						'desc' => esc_html__( 'Font on navbar text', 'batavia' ),
						'type'  => 'typography-v2',
						'value'      => array(
							'family'    => 'Droid Serif',
							'subset'    => 'latin',
							'variation' => 'regular',
							'size'      => 29,
							'line-height' => 74,
							'letter-spacing' => 0,
							'color'     => '#525252'
						),
						'components' => array(
							'family'         => true,
							'size'           => true,
							'line-height'    => false,
							'letter-spacing' => true,
							'color'          => false
						),
					),
					'menu-text_transform' => array(
						'type'    => 'radio',
						'label'   => esc_html__( 'Menu Text Transform', 'batavia' ),
						'inline' => true,
						'choices' => array(
							'none' 			=> esc_html__( 'None', 'batavia' ),
							'uppercase' 	=> esc_html__( 'Uppercase', 'batavia' ),
							'lowercase' 	=> esc_html__( 'Lowercase', 'batavia' ),
							'capitalize' 	=> esc_html__( 'Capitalize', 'batavia' ),
							'initial' 		=> esc_html__( 'Initial', 'batavia' ),
							'inherit' 		=> esc_html__( 'Inherit', 'batavia' ),
						)
					),						
				),
			),
			'post_title_group' => array(
				'title'    => 'Article',
				'type'    => 'tab',
				'options' => array(
					'postlegroup' => array(
						'type'    => 'group',
						'options' => array(
							// Font ID HERE
							'post_title_font'  => array(
								'label' => esc_html__( 'Post Title', 'batavia' ),
								'type'  => 'typography-v2',
								'value'      => array(
									'family'    => 'Gobold',
									'subset'    => 'latin',
									'weight' => 300,
									'variation' => 'regular',
									'size'      => 50,
									'line-height' => 'normal',
									'letter-spacing' => 0,
									'color'     => '#000000'
								),
								'components' => array(
									'family'         => true,
									'size'           => true,
									'line-height'    => true,
									'letter-spacing' => true,
									'color'          => false
								),
							),
							'post_title-text_transform' => array(
								'type'    => 'radio',
								'label'   => esc_html__( 'Text Transform', 'batavia' ),
								'desc'   => esc_html__( 'Post Title text transform', 'batavia' ),
								'inline' => true,
								'choices' => array(
									'none' 			=> esc_html__( 'None', 'batavia' ),
									'uppercase' 	=> esc_html__( 'Uppercase', 'batavia' ),
									'lowercase' 	=> esc_html__( 'Lowercase', 'batavia' ),
									'capitalize' 	=> esc_html__( 'Capitalize', 'batavia' ),
									'initial' 		=> esc_html__( 'Initial', 'batavia' ),
									'inherit' 		=> esc_html__( 'Inherit', 'batavia' ),
								)
							),
						),
					),
							
					'article_heading_group' => array(
						'type'    => 'group',
						'options' => array(
							// Font ID HERE
							'article_heading_font'  => array(
								'label' => esc_html__( 'Headings Font Family', 'batavia' ),
								'desc' => esc_html__( 'Font for article headings, Default css is Gobold', 'batavia' ),
								'type'  => 'typography-v2',
								'value'      => array(
									'family'    => 'Gobold',
									'subset'    => 'latin',
									'weight' => 300,
									'variation' => 'regular',
									'letter-spacing' => 0,
									'color'     => '#000000'
								),
								'components' => array(
									'family'         => true,
									'size'           => false,
									'line-height'    => true,
									'letter-spacing' => true,
									'color'          => false
								),
							),	
							$headings,
							// Font ID HERE
							'article_p'  => array(
								'label' => esc_html__( 'Paragraph', 'batavia' ),
								'desc' => esc_html__( 'Font size for article paragraph, font family will be inherited by <strong>Regular Font</strong> settings above', 'batavia' ),
								'type'  => 'typography-v2',
								'value'      => array(
									'family'    => 'Droid Serif',
									'subset'    => 'latin',
									'variation' => 'regular',
									'size'      => 18,
									'line-height' => 32,
									'letter-spacing' => 0,
									'color'     => '#525252'
								),
								'components' => array(
									'family'         => true,
									'subset'         => false,
									'size'           => true,
									'line-height'    => true,
									'letter-spacing' => true,
									'color'          => false
								),
							),	
						),
					),
				),
			),

			
			
			'widget_title_group' => array(
				'title'    => 'Sidebar Widget',
				'type'    => 'tab',
				'options' => array(
					// Font ID HERE
					'widtle_font'  => array(
						'label' => esc_html__( 'Sidebar Widget Title', 'batavia' ),
						'type'  => 'typography-v2',
						'value'      => array(
							'family'    => 'Droid Serif',
							'subset'    => 'latin',
							'variation' => 'regular',
							'size'      => 14,
							'letter-spacing' => 0,
						),
						'components' => array(
							'family'         => true,
							'size'           => true,
							'line-height'    => false,
							'letter-spacing' => true,
							'color'          => false
						),
					),

					'widtle_font_text_transform' => array(
						'type'    => 'radio',
						'label'   => esc_html__( 'Text Transform', 'batavia' ),
						'inline' => true,
						'choices' => array(
							'none' 			=> esc_html__( 'None', 'batavia' ),
							'uppercase' 	=> esc_html__( 'Uppercase', 'batavia' ),
							'lowercase' 	=> esc_html__( 'Lowercase', 'batavia' ),
							'capitalize' 	=> esc_html__( 'Capitalize', 'batavia' ),
							'initial' 		=> esc_html__( 'Initial', 'batavia' ),
							'inherit' 		=> esc_html__( 'Inherit', 'batavia' ),
						)
					),							
				),
			),
			'fooget_title_group' => array(
				'title'    => 'Footer Widget',
				'type'    => 'tab',
				'options' => array(
					// Font ID HERE
					'foo_widtle'  => array(
						'label' => esc_html__( 'Footer Widget Title', 'batavia' ),
						'type'  => 'typography-v2',
						'value'      => array(
							'family'    => 'Helvetica',
							'subset'    => 'latin',
							'variation' => 'regular',
							'size'      => 13,
							'letter-spacing' => 0,
						),
						'components' => array(
							'family'         => true,
							'size'           => true,
							'line-height'    => false,
							'letter-spacing' => true,
							'color'          => false
						),
					),
					'foo_widtle_text_transform' => array(
						'type'    => 'radio',
						'label'   => esc_html__( 'Text Transform', 'batavia' ),
						'inline' => true,
						'choices' => array(
							'none' 			=> esc_html__( 'None', 'batavia' ),
							'uppercase' 	=> esc_html__( 'Uppercase', 'batavia' ),
							'lowercase' 	=> esc_html__( 'Lowercase', 'batavia' ),
							'capitalize' 	=> esc_html__( 'Capitalize', 'batavia' ),
							'initial' 		=> esc_html__( 'Initial', 'batavia' ),
							'inherit' 		=> esc_html__( 'Inherit', 'batavia' ),
						)
					),						
				),
			),
		)
	)
);