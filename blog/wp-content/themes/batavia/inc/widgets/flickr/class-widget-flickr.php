<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Flickr extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => '' );
		parent::__construct( false, __( 'Flickr', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );
		// prevent php undefined notices
		$flickr_id = $apikey = $title = $number = $random = $title = '';

		$flickr_id = esc_attr( $instance['flickr_id'] );
		$apikey = esc_attr( $instance['apikey'] );
		$random = esc_attr( $instance['random'] );
		$title     = esc_attr( $instance['title'] );
		$number    = ( (int) ( esc_attr( $instance['number'] ) ) > 0 ) ? esc_attr( $instance['number'] ) : 9;
		$before_widget = str_replace( 'class="', 'class="widget_flickr_image_gallery ', $before_widget );
		$title         = str_replace( 'class="', 'class="widget_flickr_image_gallery ',
				$before_title ) . $title . $after_title;

		$filepath = dirname( __FILE__ ) . '/views/widget.php';

		if ( file_exists( $filepath ) ) {
			include( $filepath );
		}
	}

	function update( $new_instance, $old_instance ) {
		delete_transient( 'zl_flickr_trans_'.$this->id );
		return $new_instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'flickr_id' => '', 'apikey' => '',  'random' => '', 'number' => '', 'title' => '' ) );
		$random = $instance['random'];
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
			       value="<?php echo esc_attr( $instance['title'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'flickr_id' ) ); ?>"><?php esc_html_e( 'Flickr ID', 'batavia' ); ?> (<a
					href="http://www.idgettr.com" target="_blank">idGettr</a>):</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'flickr_id' ) ); ?>"
			       value="<?php echo esc_attr( $instance['flickr_id'] ); ?>" class="widefat"
			       id="<?php $this->get_field_id( 'flickr_id' ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'apikey' ) ); ?>"><?php esc_html_e( 'Api Key', 'batavia' ); ?> (<a
					href="https://www.flickr.com/services/apps/create/apply/" target="_blank">Create Your own</a>):</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'apikey' ) ); ?>"
			       value="<?php echo esc_attr( $instance['apikey'] ); ?>" class="widefat"
			       id="<?php $this->get_field_id( 'apikey' ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"><?php esc_html_e( 'Number of photos', 'batavia' ); ?>
				:</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>"
			       value="<?php echo esc_attr( $instance['number'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('random') );; ?>">
				Random?
				<select class='widefat' id="<?php echo esc_attr( $this->get_field_id('random') ); ?>"
					name="<?php echo esc_attr( $this->get_field_name('random') ); ?>" type="text">
					
					<option value='yes'<?php echo ($random=='yes')?'selected':''; ?>>
						Yes
					</option>

					<option value='no'<?php echo ($random=='no')?'selected':''; ?>>
						No
					</option>
					
				</select> 
			</label>
		</p>
	<?php
	}
}
