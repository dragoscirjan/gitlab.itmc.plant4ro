<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Adscode extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Ads Code for Google Adsense. It\'s borderless' );
		parent::__construct( false, esc_html__( '&raquo; Ads Code', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );

		$adscode = $instance['adscode'];

		$title 	= esc_attr( $instance['title'] );
		$before_widget = str_replace( 'class="', 'class="iqlan ', $before_widget );
		if(!empty($title)){
			$title = str_replace( 'class="', 'class="iqlan ', $before_title ) . $title . $after_title;
		}

		$filepath = get_template_directory() . '/inc/widgets/adscode/views/widget.php';

		if ( file_exists( $filepath ) ) {
			include( $filepath );
		}
	}

	function update( $new_instance, $old_instance ) {
		return $new_instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, 
			array( 
				'adscode' => '', 
				'title' => '' 
			) );
		$adscode = $instance['adscode'];
		$title = $instance['title'];
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> 
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>" />
			       </label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'adscode' ) ); ?>"><?php _e( 'Ads Code', 'batavia' ); ?> </label>
			<textarea class="widefat" rows="16" cols="20" id="<?php echo esc_attr( $this->get_field_id('adscode') ); ?>" name="<?php echo esc_attr( $this->get_field_name('adscode') ); ?>"><?php echo esc_textarea( $adscode ); ?></textarea>
		</p>
	<?php
	}
}
