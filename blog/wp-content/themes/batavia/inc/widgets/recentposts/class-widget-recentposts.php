<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class Widget_Recentposts extends WP_Widget {

	/**
	 * @internal
	 */
	function __construct() {
		$widget_ops = array( 'description' => 'Recent Posts' );
		parent::__construct( false, esc_html__( '&raquo; Recent Posts', 'batavia' ), $widget_ops );
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract( $args );
		$post_number = $cat = $order = $firstbig = null;
		$post_number = esc_attr( $instance['post_number'] );
		$cat = esc_attr( $instance['cat'] );
		$order = esc_attr( $instance['order'] );
		$firstbig = esc_attr( $instance['firstbig'] );

		$title     = esc_attr( $instance['title'] );
		$before_widget = str_replace( 'class="', 'class="zl_widget_recentposts ', $before_widget );
		if($title){
			$title = str_replace( 'class="', 'class="zl_widget_postslider ',
				$before_title ) . $title . $after_title;
		} else {
			$title = null;
		}

		$filepath = get_template_directory() . '/inc/widgets/recentposts/views/widget.php';

		if ( file_exists( $filepath ) ) {
			include( $filepath );
		}
	}

	function update( $new_instance, $old_instance ) {
		delete_transient( 'recent_post_widget_trans_'.$this->id );
		return $new_instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, 
			array( 
				'post_number' => '', 
				'cat' => '', 
				'order' => '', 
				'firstbig' => '', 
				'title' => null 
				) );
		$cat = $instance['cat'];
		$order = $instance['order'];
		$firstbig = $instance['firstbig'];
		$title = $instance['title'];
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title', 'batavia' ); ?> 
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>"/>
			</label>
		</p>
		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'post_number' ) ); ?>"><?php _e( 'Post Number', 'batavia' ); ?> </label>
			<input type="text" name="<?php echo esc_attr( $this->get_field_name( 'post_number' ) ); ?>"
			value="<?php echo esc_attr( $instance['post_number'] ); ?>" class="widefat"
			id="<?php $this->get_field_id( 'post_number' ); ?>"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'cat' ) ); ?>"><?php _e( 'Post Category', 'batavia' ); ?> </label>
			<select id="<?php echo esc_attr( $this->get_field_id('cat') ); ?>" name="<?php echo esc_attr( $this->get_field_name('cat') ); ?>" class="widefat" style="width:100%;">
				<option <?php selected( $instance['cat'], 'all' ); ?> value="<?php echo 'all'; ?>"><?php echo 'all'; ?></option>
				<?php foreach(get_terms('category','parent=0&hide_empty=0') as $term) { ?>
				<option <?php selected( $instance['cat'], $term->term_id ); ?> value="<?php echo esc_attr( $term->term_id ); ?>"><?php echo esc_html( $term->name ); ?></option>
				<?php } ?>      
			</select>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('firstbig') );; ?>">
				First Post has Big Thumbnail?
				<select class='widefat' id="<?php echo esc_attr( $this->get_field_id('firstbig') ); ?>"
					name="<?php echo esc_attr( $this->get_field_name('firstbig') ); ?>" type="text">
					
					<option value='yes'<?php echo ($firstbig=='yes')?'selected':''; ?>>
						Yes
					</option>

					<option value='no'<?php echo ($firstbig=='no')?'selected':''; ?>>
						No
					</option>
					
					
				</select> 
			</label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id('order') );; ?>">
				Order By
				<select class='widefat' id="<?php echo esc_attr( $this->get_field_id('order') ); ?>"
					name="<?php echo esc_attr( $this->get_field_name('order') ); ?>" type="text">
					
					<option value='date'<?php echo ($order=='date')?'selected':''; ?>>
						Date
					</option>

					<option value='title'<?php echo ($order=='title')?'selected':''; ?>>
						Title
					</option>
					
					<option value='comment_count'<?php echo ($order=='comment_count')?'selected':''; ?>>
						Comments
					</option>
					
					<option value='rand'<?php echo ($order=='rand')?'selected':''; ?>>
						Random
					</option>
					
					<option value='modified'<?php echo ($order=='modified')?'selected':''; ?>>
						Modified
					</option>
					
				</select> 
			</label>
		</p>
		<?php
	}
}
