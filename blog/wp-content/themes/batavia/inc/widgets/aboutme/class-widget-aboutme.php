<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Aboutme extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Describe yourself or your website' );
		parent::__construct( false, esc_html__( '&raquo; About Me', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );

		if(isset($instance['image_url'])){
			$image_url = $instance['image_url'];
		} else {
			$image_url = '';
		}

		if(isset($instance['deskripsi'])){
			$deskripsi = $instance['deskripsi'];
		} else {
			$deskripsi = '';
		}

		if(isset($instance['name'])){
			$name = $instance['name'];
		} else {
			$name = '';
		}

		if(isset($instance['avaurl'])){
			$avaurl = $instance['avaurl'];
		} else {
			$avaurl = '';
		}
		
		
		$before_widget = str_replace( 'class="', 'class="widget_instagram ', $before_widget );
		if(!empty($instance['title'])){
			$title = empty($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
			$title = str_replace( 'class="', 'class="widget_instagram ',
					$before_title ) . $title . $after_title;
		} else {
			$title = null;
		}
		
		$filepath = get_template_directory() . '/inc/widgets/aboutme/views/widget.php';

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
				'image_url' => '', 
				'deskripsi' => '', 
				'avaurl' => '', 
				'name' => '',
				'title' => '' 
			) );
			$deskripsi = $instance['deskripsi'];
			$name = $instance['name'];
			$title = $instance['title'];
		 ?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> 
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>" />
			       </label>
		</p>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'name' ) ); ?>"><?php _e( 'Your Name', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'name' ) ); ?>"
			       value="<?php echo esc_attr( $instance['name'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'name' ) ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'avaurl' ) ); ?>"><?php _e( 'Profile Image URL', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'avaurl' ) ); ?>"
			       value="<?php echo esc_attr( $instance['avaurl'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'avaurl' ) ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'deskripsi' ) ); ?>"><?php _e( 'Description', 'batavia' ); ?>
				:</label>
			<textarea class="widefat" rows="16" cols="20" id="<?php echo esc_attr( $this->get_field_id('deskripsi') ); ?>" name="<?php echo esc_attr( $this->get_field_name('deskripsi') ); ?>"><?php echo esc_textarea( $deskripsi ); ?></textarea>
		</p>
	<?php
	}
}
