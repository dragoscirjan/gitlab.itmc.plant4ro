<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}
$imgdir = get_template_directory_uri() . '/img/';

$options = array(
	'advanced_tab' => array(
		'title'   => esc_html__( 'Posts', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'postmeta' => array(
				'title'   => esc_html__( 'Blog', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'show_category' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Category', 'batavia' ),
						'value' => true,
					),
					'show_authorname' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Author Name', 'batavia' ),
						'value' => true,
					),
					'show_date' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Date', 'batavia' ),
						'value' => true,
					),
					'show_postlikes' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Likes', 'batavia' ),
						'value' => true,
					),
					'show_postviews' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Views', 'batavia' ),
						'value' => true,
					),
					'show_comment' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Comment Count', 'batavia' ),
						'value' => true,
					),
					'social_sharing' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Social Share', 'batavia' ),
						'desc' => esc_html__( 'Social Share buttons that appears under article thumbnail', 'batavia' ),
					),
					'show_shortlink' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Shortlink box', 'batavia' ),
						'desc' => esc_html__( 'The small box that contains short url of the blog article', 'batavia' ),
					),
					'author_bio' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Author Bio', 'batavia' ),
						'desc' => esc_html__( 'Author short bio under blog post', 'batavia' ),
					),
					'related_posts' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Related Posts', 'batavia' ),
						'desc' => esc_html__( 'The related posts that ordered by random. This section will appear in post article page.', 'batavia' ),
					),
				),
			),
			
			'pagemeta' => array(
				'title'   => esc_html__( 'Page', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'enable_comment' => array(
						'type'  => 'switch',
						'label' => esc_html__( 'Comment', 'batavia' ),
						'value' => true,
					),
					'page_social_sharing' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Social Share', 'batavia' ),
						'desc' => esc_html__( 'Social Share buttons that appears under article thumbnail', 'batavia' ),
					),
					'page_show_shortlink' => array(
						'type'  => 'switch',
						'value' => true,
						'label' => esc_html__( 'Shortlink box', 'batavia' ),
						'desc' => esc_html__( 'The small box that contains short url of the blog article', 'batavia' ),
					),
				),
			),
			
			/* 404.php */
			'404-layout' => array(
				'title'   => esc_html__( 'Not Found Page', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'404_sliderbox' => array(
						'title'   => '404 Setting',
						'type'    => 'box',
						'options' => array(
							'404_template_group' => array(
								'title'   => 'Template Setting',
								'type'    => 'group',
								'options' => array(
									'notfoundtitle' => array(
									    'type'  => 'text',
									    'label' => esc_html__('Not Found Title', 'batavia'),
									    'desc' => esc_html__('Will only be applied to not found search result page', 'batavia'),
									),
									'404_message' => array(
										'label' => esc_html__( '404/Not Found Message', 'batavia' ),
										'type'  => 'wp-editor',
										'desc'  => esc_html__( 'If you\'d like to write custom message, write it here.', 'batavia' ),
										'reinit' => true,
									),
								),
							),
						),
					),
				),
			), //404.php

		),
	),
);
