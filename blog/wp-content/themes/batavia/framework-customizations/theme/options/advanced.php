<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}
$imgdir = get_template_directory_uri() . '/assets/img/doc/';
ob_start(); ?>
<ol>
	<li>Visit this link: <a href="https://console.developers.google.com/start">https://console.developers.google.com/start</a>
	</li>
	<li>
		Clik the blue "card" that says <strong>Use Google APIs</strong> <br>
		<a href="<?php echo esc_url( $imgdir . 'goapistart.jpeg' ); ?>" target="_blank"><img src="<?php echo esc_url( $imgdir ) . 'goapistart.jpeg'; ?>" alt=""/></a>
	</li>
	<li>
		Fill up all required fields, and click "Create" Button <br>
		<a href="<?php echo esc_url( $imgdir . 'googleoptions.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googleoptions.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		After you clicked "create" button, you will be redirected to <strong>API Manager Page</strong>.<br>
		Please click <strong>"URL Shortener API"</strong><br>
		<a href="<?php echo esc_url( $imgdir . 'google-3.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'google-3.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		Click The "Enable" Button<br>
		<a href="<?php echo esc_url( $imgdir . 'googleenable.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googleenable.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		When the API enabled, there will be a notice box that you need to create <strong>credentials</strong><br>
		<a href="<?php echo esc_url( $imgdir . 'googletocredent.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googletocredent.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		Click "Create Credentials" and then Click API Key. (See image, click to view full size)
		<br>
		<a href="<?php echo esc_url( $imgdir . 'googlecreatekey.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googlecreatekey.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		Click Browser Key
		<br>
		<a href="<?php echo esc_url( $imgdir . 'googlebrowserkey.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googlebrowserkey.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		Fill up all fields and click the "Create" button
		<br>
		<a href="<?php echo esc_url( $imgdir . 'googlefinalcreate.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googlefinalcreate.jpeg' ); ?>" alt=""/>
		</a>
	</li>
	<li>
		It's done. You can see your API key now.
		<br>
		<a href="<?php echo esc_url( $imgdir . 'googlecopykey.jpeg' ); ?>" target="_blank">
			<img src="<?php echo esc_url( $imgdir . 'googlecopykey.jpeg' ); ?>" alt=""/>
		</a>
	</li>
</ol>
<?php
$apitutor = ob_get_clean();
$options = array(
	'advanced_settings' => array(
		'title'   => esc_html__( 'Advanced', 'batavia' ),
		'type'    => 'tab',
		'options' => array(
			'custom_code' => array(
				'title'   => esc_html__( 'Custom Code', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'customcss' => array(
					    'type'  => 'textarea',
					    'value' => '',
					    'label' => esc_html__('Custom CSS', 'batavia'),
					    'desc' => esc_html__('Write your custom css here. Do not include <style> tag', 'batavia'),
					),
					'customjavascript' => array(
					    'type'  => 'textarea',
					    'value' => '',
					    'label' => esc_html__('Custom Javascript', 'batavia'),
					    'desc' => esc_html__('Write down your custom javascript. Do not include <script> tag', 'batavia'),
					),
				),
			),
			'url_shortener_tab' => array(
				'title'   => esc_html__( 'URL Shortener', 'batavia' ),
				'type'    => 'tab',
				'options' => array(
					'googleapikey' => array(
					    'type'  => 'text',
					    'value' => '',
					    'label' => esc_html__('API key', 'batavia'),
					    'desc' => esc_html__('Put your google api key here. Generate your own API key here: ', 'batavia'),
					),
					'url_shortener_tab' => array(
						'title'   => esc_html__( 'How to Get Your Own Google API Key', 'batavia' ),
						'type'    => 'box',
						'attr'    => array('class' => 'closed'),
						'options' => array(
							'googleapikeytutorial' => array(
							    'type'  => 'html-full',
							    'value' => '',
							    'label' => false,
							    'html' => $apitutor,
							),
						),
					),
				),
			),
		),
	),
);
