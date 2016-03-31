<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Instagram extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Instagram' );
		parent::__construct( false, esc_html__( '&raquo; Instagram', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );

		$instagram_id = esc_attr( $instance['instagram_id'] );
		$number    = ( (int) ( esc_attr( $instance['number'] ) ) > 0 ) ? esc_attr( $instance['number'] ) : 6;
		$actok    = ( (int) ( esc_attr( $instance['actok'] ) ) > 0 ) ? esc_attr( $instance['actok'] ) : '138f057ac12b4c48a460274c2e8e3a34';

		
		$columns     = esc_attr( $instance['columns'] );
		$before_widget = str_replace( 'class="', 'class="zl_instagram_widget ', $before_widget );
		if(!empty($instance['title'])){
			$title = empty($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
			$title = str_replace( 'class="', 'class="widget_instagram ',
					$before_title ) . $title . $after_title;
		} else {
			$title = null;
		}
		
		wp_enqueue_script(
			'zl-instagram-widget',
			get_template_directory_uri() . '/inc/widgets/instagram/static/js/instagram-lite.js',
			array( 'jquery' ),
			'1.0'
		);

		wp_enqueue_script(
			'zl-instagram-trigger',
			get_template_directory_uri() . '/inc/widgets/instagram/static/js/script.js',
			array( 'jquery' ),
			'1.0'
		);
		
		$filepath = get_template_directory() . '/inc/widgets/instagram/views/widget.php';

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
				'instagram_id' => '',
				'number' => '',
				'actok' => '',
				'title' => '',
				'columns' => '',
			)
		);
		$columns = $instance['columns'];
		$title = $instance['title'];
		 ?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> 
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id('title') ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>" />
			       </label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'instagram_id' ) ); ?>"><?php _e( 'Instagram username', 'batavia' ); ?> :</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'instagram_id' ) ); ?>"
			       value="<?php echo esc_attr( $instance['instagram_id'] ); ?>" class="widefat"
			       id="<?php $this->get_field_id( 'instagram_id' ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'actok' ) ); ?>"><?php _e( 'Client ID', 'batavia' ); ?>
				(<a
					href="https://www.youtube.com/watch?v=OKn-OtiCPcw" target="_blank">Watch how!</a>):</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'actok' ) ); ?>"
			       value="<?php echo esc_attr( $instance['actok'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'actok' ) ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"><?php _e( 'Number of photos', 'batavia' ); ?>
				:</label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>"
			       value="<?php echo esc_attr( $instance['number'] ); ?>" class="widefat"
			       id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"/>
		</p>
		<p>
            <label for="<?php echo esc_attr( $this->get_field_id('columns') );; ?>">
            Columns
	            <select class='widefat' id="<?php echo esc_attr( $this->get_field_id('columns') ); ?>"
	                name="<?php echo esc_attr( $this->get_field_name('columns') ); ?>" type="text">
	                
	                <option value='twocol'<?php echo ($columns=='twocol')?'selected':''; ?>>
	                    2 Columns
	                </option>

	                <option value='threecol'<?php echo ($columns=='threecol')?'selected':''; ?>>
	                    3 columns
	                </option>
	                
	                <option value='fourcol'<?php echo ($columns=='fourcol')?'selected':''; ?>>
	                    4 columns
	                </option>
	                
	                <option value='fivecol'<?php echo ($columns=='fivecol')?'selected':''; ?>>
	                    5 columns
	                </option>
	                
	                <option value='sixcol'<?php echo ($columns=='sixcol')?'selected':''; ?>>
	                    6 columns
	                </option>
	                
	                <option value='sevencol'<?php echo ($columns=='sevencol')?'selected':''; ?>>
	                    7 columns
	                </option>
	                
	                <option value='eightcol'<?php echo ($columns=='eightcol')?'selected':''; ?>>
	                    8 columns
	                </option>
	                
	                <option value='ninecol'<?php echo ($columns=='ninecol')?'selected':''; ?>>
	                    9 columns
	                </option>
	                
	                <option value='tencol'<?php echo ($columns=='tencol')?'selected':''; ?>>
	                    10 columns
	                </option>
	            </select> 
            </label>
        </p>
		
	<?php
	}
}
