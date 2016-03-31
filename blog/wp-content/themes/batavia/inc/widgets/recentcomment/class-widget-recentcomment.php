<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Recentcomment extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Recent Comments' );
		parent::__construct( false, esc_html__( '&raquo; Recent Comments', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );

		$post_number = esc_attr( $instance['post_number'] );

		$title     = esc_attr( $instance['title'] );
		$before_widget = str_replace( 'class="', 'class="zl_widget_recentposts ', $before_widget );
		if($title){
			$title = str_replace( 'class="', 'class="zl_widget_postslider ',
				$before_title ) . $title . $after_title;
		} else {
			$title = null;
		}

		$filepath = get_template_directory() . '/inc/widgets/recentcomment/views/widget.php';

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
				'post_number' => '', 
				'cat' => '', 
				'order' => '', 
				'title' => '' 
			) );
			$cat = $instance['cat'];
			$order = $instance['order'];
			$title = $instance['title'];
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> 
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>" />
			       </label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'post_number' ) ); ?>"><?php _e( 'How much comments?', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'post_number' ) ); ?>"
			       value="<?php echo esc_attr( $instance['post_number'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'post_number' ) ); ?>"/>
		</p>
		
	<?php
	}
}
