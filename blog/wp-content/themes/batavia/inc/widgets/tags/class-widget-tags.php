<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Tags extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Tags' );
		parent::__construct( false, esc_html__( '&raquo; Tags', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );

		$title     = esc_attr( $instance['title'] );
		
		$before_widget = str_replace( 'class="', 'class=" ', $before_widget );
		if($title){
			$title = str_replace( 'class="', 'class=" ',
				$before_title ) . $title . $after_title;
		} else {
			$title = null;
		}

		$filepath = get_template_directory() . '/inc/widgets/tags/views/widget.php';

		if ( file_exists( $filepath ) ) {
			include( $filepath );
		}
	}

	function update( $new_instance, $old_instance ) {
		delete_transient( 'zl_tag_trans_'.$this->id );
		return $new_instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, 
			array( 
				'title' => '' 
			) );
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
			       value="<?php echo esc_attr( $instance['title'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"/>
		</p>
		
	<?php
	}
}
