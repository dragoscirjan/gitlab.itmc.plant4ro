<?php 

/**
 * Post Views
 */
// function to display number of posts.
function zl_getPostViews($postID){
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return "0";
    }
    return $count;
}
 
// function to count views.
function zl_setPostViews($postID) {
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}
 
 
// Add it to a column in WP-Admin
add_filter('manage_posts_columns', 'zl_posts_column_views');
add_action('manage_posts_custom_column', 'zl_posts_custom_column_views',5,2);
function zl_posts_column_views($defaults){
    $defaults['post_views'] = __('Views', 'batavia');
    return $defaults;
}
function zl_posts_custom_column_views($column_name, $id){
    if($column_name === 'post_views'){
        echo zl_getPostViews(get_the_ID()) .' '. __('Views', 'batavia');
    }
}



/*
Name:  WordPress Post Like System
Description:  A simple and efficient post like system for WordPress.
Version:      0.5.2
Author:       Jon Masterson
Author URI:   http://jonmasterson.com/
License:
Copyright (C) 2015 Jon Masterson
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Processes like/unlike
 * @since    0.5
 */
add_action( 'wp_ajax_nopriv_zl_process_simple_like', 'zl_process_simple_like' );
add_action( 'wp_ajax_zl_process_simple_like', 'zl_process_simple_like' );
function zl_process_simple_like() {
	// Security
	$nonce = isset( $_REQUEST['nonce'] ) ? sanitize_text_field( $_REQUEST['nonce'] ) : 0;
	if ( !wp_verify_nonce( $nonce, 'simple-likes-nonce' ) ) {
		exit( esc_html__( 'Not permitted', 'batavia' ) );
	}
	// Test if javascript is disabled
	$disabled = ( isset( $_REQUEST['disabled'] ) && $_REQUEST['disabled'] == true ) ? true : false;
	// Test if this is a comment
	$is_comment = ( isset( $_REQUEST['is_comment'] ) && $_REQUEST['is_comment'] == 1 ) ? 1 : 0;
	// Base variables
	$post_id = ( isset( $_REQUEST['post_id'] ) && is_numeric( $_REQUEST['post_id'] ) ) ? $_REQUEST['post_id'] : '';
	$result = array();
	$post_users = NULL;
	$like_count = 0;
	// Get plugin options
	if ( $post_id != '' ) {
		$count = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_comment_like_count", true ) : get_post_meta( $post_id, "_post_like_count", true ); // like count
		$count = ( isset( $count ) && is_numeric( $count ) ) ? $count : 0;
		if ( !zl_already_liked( $post_id, $is_comment ) ) { // Like the post
			if ( is_user_logged_in() ) { // user is logged in
				$user_id = get_current_user_id();
				$post_users = zl_post_user_likes( $user_id, $post_id, $is_comment );
				if ( $is_comment == 1 ) {
					// Update User & Comment
					$user_like_count = get_user_option( "_comment_like_count", $user_id );
					$user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
					update_user_option( $user_id, "_comment_like_count", ++$user_like_count );
					if ( $post_users ) {
						update_comment_meta( $post_id, "_user_comment_liked", $post_users );
					}
				} else {
					// Update User & Post
					$user_like_count = get_user_option( "_user_like_count", $user_id );
					$user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
					update_user_option( $user_id, "_user_like_count", ++$user_like_count );
					if ( $post_users ) {
						update_post_meta( $post_id, "_user_liked", $post_users );
					}
				}
			} else { // user is anonymous
				$user_ip = zl_sl_get_ip();
				$post_users = zl_post_ip_likes( $user_ip, $post_id, $is_comment );
				// Update Post
				if ( $post_users ) {
					if ( $is_comment == 1 ) {
						update_comment_meta( $post_id, "_user_comment_IP", $post_users );
					} else { 
						update_post_meta( $post_id, "_user_IP", $post_users );
					}
				}
			}
			$like_count = ++$count;
			$response['status'] = "liked";
			$response['icon'] = zl_get_liked_icon();
		} else { // Unlike the post
			if ( is_user_logged_in() ) { // user is logged in
				$user_id = get_current_user_id();
				$post_users = zl_post_user_likes( $user_id, $post_id, $is_comment );
				// Update User
				if ( $is_comment == 1 ) {
					$user_like_count = get_user_option( "_comment_like_count", $user_id );
					$user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
					if ( $user_like_count > 0 ) {
						update_user_option( $user_id, "_comment_like_count", --$user_like_count );
					}
				} else {
					$user_like_count = get_user_option( "_user_like_count", $user_id );
					$user_like_count =  ( isset( $user_like_count ) && is_numeric( $user_like_count ) ) ? $user_like_count : 0;
					if ( $user_like_count > 0 ) {
						update_user_option( $user_id, '_user_like_count', --$user_like_count );
					}
				}
				// Update Post
				if ( $post_users ) {	
					$uid_key = array_search( $user_id, $post_users );
					unset( $post_users[$uid_key] );
					if ( $is_comment == 1 ) {
						update_comment_meta( $post_id, "_user_comment_liked", $post_users );
					} else { 
						update_post_meta( $post_id, "_user_liked", $post_users );
					}
				}
			} else { // user is anonymous
				$user_ip = zl_sl_get_ip();
				$post_users = zl_post_ip_likes( $user_ip, $post_id, $is_comment );
				// Update Post
				if ( $post_users ) {
					$uip_key = array_search( $user_ip, $post_users );
					unset( $post_users[$uip_key] );
					if ( $is_comment == 1 ) {
						update_comment_meta( $post_id, "_user_comment_IP", $post_users );
					} else { 
						update_post_meta( $post_id, "_user_IP", $post_users );
					}
				}
			}
			$like_count = ( $count > 0 ) ? --$count : 0; // Prevent negative number
			$response['status'] = "unliked";
			$response['icon'] = zl_get_unliked_icon();
		}
		if ( $is_comment == 1 ) {
			update_comment_meta( $post_id, "_comment_like_count", $like_count );
			update_comment_meta( $post_id, "_comment_like_modified", date( 'Y-m-d H:i:s' ) );
		} else { 
			update_post_meta( $post_id, "_post_like_count", $like_count );
			update_post_meta( $post_id, "_post_like_modified", date( 'Y-m-d H:i:s' ) );
		}
		$response['count'] = zl_get_like_count( $like_count );
		$response['testing'] = $is_comment;
		if ( $disabled == true ) {
			if ( $is_comment == 1 ) {
				wp_redirect( get_permalink( get_the_ID() ) );
				exit();
			} else {
				wp_redirect( get_permalink( $post_id ) );
				exit();
			}
		} else {
			wp_send_json( $response );
		}
	}
}

/**
 * Utility to test if the post is already liked
 * @since    0.5
 */
function zl_already_liked( $post_id, $is_comment ) {
	$post_users = NULL;
	$user_id = NULL;
	if ( is_user_logged_in() ) { // user is logged in
		$user_id = get_current_user_id();
		$post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_liked" ) : get_post_meta( $post_id, "_user_liked" );
		if ( count( $post_meta_users ) != 0 ) {
			$post_users = $post_meta_users[0];
		}
	} else { // user is anonymous
		$user_id = zl_sl_get_ip();
		$post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_IP" ) : get_post_meta( $post_id, "_user_IP" ); 
		if ( count( $post_meta_users ) != 0 ) { // meta exists, set up values
			$post_users = $post_meta_users[0];
		}
	}
	if ( is_array( $post_users ) && in_array( $user_id, $post_users ) ) {
		return true;
	} else {
		return false;
	}
} // zl_already_liked()

/**
 * Output the like button
 * @since    0.5
 */
function zl_get_simple_likes_button( $post_id, $is_comment = NULL ) {
	$is_comment = ( NULL == $is_comment ) ? 0 : 1;
	$output = '';
	$nonce = wp_create_nonce( 'simple-likes-nonce' ); // Security
	if ( $is_comment == 1 ) {
		$post_id_class = esc_attr( ' sl-comment-button-' . $post_id );
		$comment_class = esc_attr( ' sl-comment' );
		$like_count = get_comment_meta( $post_id, "_comment_like_count", true );
		$like_count = ( isset( $like_count ) && is_numeric( $like_count ) ) ? $like_count : 0;
	} else {
		$post_id_class = esc_attr( ' sl-button-' . $post_id );
		$comment_class = esc_attr( '' );
		$like_count = get_post_meta( $post_id, "_post_like_count", true );
		$like_count = ( isset( $like_count ) && is_numeric( $like_count ) ) ? $like_count : 0;
	}
	$count = zl_get_like_count( $like_count );
	$icon_empty = zl_get_unliked_icon();
	$icon_full = zl_get_liked_icon();
	// Loader
	$loader = '<span class="sl-loader"></span>';
	// Liked/Unliked Variables
	if ( zl_already_liked( $post_id, $is_comment ) ) {
		$class = esc_attr( ' liked' );
		$title = esc_html__( 'Unlike', 'batavia' );
		$icon = $icon_full;
	} else {
		$class = '';
		$title = esc_html__( 'Like', 'batavia' );
		$icon = $icon_empty;
	}
	$output = '<span class="sl-wrapper"><a href="' . admin_url( 'admin-ajax.php?action=zl_process_simple_like' . '&nonce=' . $nonce . '&post_id=' . $post_id . '&disabled=true&is_comment=' . $is_comment ) . '" class="sl-button' . $post_id_class . $class . $comment_class . '" data-nonce="' . $nonce . '" data-post-id="' . $post_id . '" data-iscomment="' . $is_comment . '" title="' . $title . '">' . $icon . $count . '</a>' . $loader . '</span>';
	return $output;
} // zl_get_simple_likes_button()

/**
 * Utility retrieves post meta user likes (user id array), 
 * then adds new user id to retrieved array
 * @since    0.5
 */
function zl_post_user_likes( $user_id, $post_id, $is_comment ) {
	$post_users = '';
	$post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_liked" ) : get_post_meta( $post_id, "_user_liked" );
	if ( count( $post_meta_users ) != 0 ) {
		$post_users = $post_meta_users[0];
	}
	if ( !is_array( $post_users ) ) {
		$post_users = array();
	}
	if ( !in_array( $user_id, $post_users ) ) {
		$post_users['user-' . $user_id] = $user_id;
	}
	return $post_users;
} // zl_post_user_likes()

/**
 * Utility retrieves post meta ip likes (ip array), 
 * then adds new ip to retrieved array
 * @since    0.5
 */
function zl_post_ip_likes( $user_ip, $post_id, $is_comment ) {
	$post_users = '';
	$post_meta_users = ( $is_comment == 1 ) ? get_comment_meta( $post_id, "_user_comment_IP" ) : get_post_meta( $post_id, "_user_IP" );
	// Retrieve post information
	if ( count( $post_meta_users ) != 0 ) {
		$post_users = $post_meta_users[0];
	}
	if ( !is_array( $post_users ) ) {
		$post_users = array();
	}
	if ( !in_array( $user_ip, $post_users ) ) {
		$post_users['ip-' . $user_ip] = $user_ip;
	}
	return $post_users;
} // zl_post_ip_likes()

/**
 * Utility to retrieve IP address
 * @since    0.5
 */
function zl_sl_get_ip() {
	if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) && ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) && ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = ( isset( $_SERVER['REMOTE_ADDR'] ) ) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
	}
	$ip = filter_var( $ip, FILTER_VALIDATE_IP );
	$ip = ( $ip === false ) ? '0.0.0.0' : $ip;
	return $ip;
} // zl_sl_get_ip()

/**
 * Utility returns the button icon for "like" action
 * @since    0.5
 */
function zl_get_liked_icon() {
	/* If already using Font Awesome with your theme, replace svg with: <i class="fa fa-heart"></i> */
	$icon = '<span class="sl-icon icon-heart-filled"></span>';
	return $icon;
} // zl_get_liked_icon()

/**
 * Utility returns the button icon for "unlike" action
 * @since    0.5
 */
function zl_get_unliked_icon() {
	/* If already using Font Awesome with your theme, replace svg with: <i class="fa fa-heart-o"></i> */
	$icon = '<span class="sl-icon icon-heart"></span>';
	return $icon;
} // zl_get_unliked_icon()

/**
 * Utility function to format the button count,
 * appending "K" if one thousand or greater,
 * "M" if one million or greater,
 * and "B" if one billion or greater (unlikely).
 * $precision = how many decimal points to display (1.25K)
 * @since    0.5
 */
function zl_sl_format_count( $number ) {
	$precision = 2;
	if ( $number >= 1000 && $number < 1000000 ) {
		$formatted = number_format( $number/1000, $precision ).'K';
	} else if ( $number >= 1000000 && $number < 1000000000 ) {
		$formatted = number_format( $number/1000000, $precision ).'M';
	} else if ( $number >= 1000000000 ) {
		$formatted = number_format( $number/1000000000, $precision ).'B';
	} else {
		$formatted = $number; // Number is less than 1000
	}
	$formatted = str_replace( '.00', '', $formatted );
	return $formatted;
} // zl_sl_format_count()

/**
 * Utility retrieves count plus count options, 
 * returns appropriate format based on options
 * @since    0.5
 */
function zl_get_like_count( $like_count ) {
	$like_text = esc_html__( 'Like', 'batavia' );
	if ( is_numeric( $like_count ) && $like_count > 0 ) { 
		$number = zl_sl_format_count( $like_count );
	} else {
		$number = $like_text;
	}
	$count = '<span class="sl-count">' . $number . '</span>';
	return $count;
} // zl_get_like_count()

// User Profile List
add_action( 'show_user_profile', 'zl_show_user_likes' );
add_action( 'edit_user_profile', 'zl_show_user_likes' );
function zl_show_user_likes( $user ) { ?>        
	<table class="form-table">
		<tr>
			<th><label for="user_likes"><?php _e( 'You Like:', 'batavia' ); ?></label></th>
			<td>
			<?php
			$types = get_post_types( array( 'public' => true ) );
			$args = array(
			  'numberposts' => -1,
			  'post_type' => $types,
			  'meta_query' => array (
				array (
				  'key' => '_user_liked',
				  'value' => $user->ID,
				  'compare' => 'LIKE'
				)
			  ) );		
			$sep = '';
			$like_query = new WP_Query( $args );
			if ( $like_query->have_posts() ) : ?>
			<p>
			<?php while ( $like_query->have_posts() ) : $like_query->the_post(); 
			echo esc_html( $sep );; ?><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
			<?php
			$sep = ' &middot; ';
			endwhile; 
			?>
			</p>
			<?php else : ?>
			<p><?php _e( 'You do not like anything yet.', 'batavia' ); ?></p>
			<?php 
			endif; 
			wp_reset_postdata(); 
			?>
			</td>
		</tr>
	</table>
<?php } // zl_show_user_likes()


// Add it to a column in WP-Admin
add_filter('manage_posts_columns', 'zl_posts_column_likes');
add_action('manage_posts_custom_column', 'zl_posts_custom_column_likes',10,2);
function zl_posts_column_likes( $defaults ){
    $defaults['post_likes'] = __('Likes', 'batavia');
    return $defaults;
}
function zl_posts_custom_column_likes( $column_name, $id ){
    if($column_name === 'post_likes'){
    	$likes = '';
    	$likes = get_post_meta( get_the_id(), "_post_like_count", true );
    	if( 0 < $likes ){
    		echo esc_html( $likes );;
    	} else {
    		echo esc_html( '0' );
    	}
    }
}


/**
 * Render POST NAVIGATOR
 * @since batavia 1.0
 */
function zl_post_navigation(){ ?>

	<?php 
	$prev_link = $next_link = '';
	$prev_link = get_previous_posts_link(__('&laquo; Older Entries', 'batavia'));
	$next_link = get_next_posts_link(__('Newer Entries &raquo;', 'batavia'));
	if ($prev_link || $next_link) {
	 ?>
	<!-- Post Loop Navigation -->
	<div class="zl_postnav">
		<div class="large-6 column">
			<?php next_posts_link( esc_html__('PREVIOUS POSTS', 'batavia') ); ?>
		</div>
		<div class="large-6 column">
			<?php previous_posts_link( esc_html__('NEXT POSTS', 'batavia'), '' ); ?>
		</div>
		<div class="clear"></div>
	</div>
	<?php } ?>
<?php
}

/**
 * Render Author Info under post article
 * @since batavia 1.0
 */
function zl_post_author(){ ?>
	<div class="zl_authorinfo_container">
		<div class="zl_authorinfo_box">
			<div class="row">
				<div class="small-2 columns">
					<div class="authorava">
						<?php echo get_avatar( get_the_author_meta('email') , 100 ); ?>
					</div>
				</div>
				<div class="small-10 columns">
					<div class="author_desc">
						<strong class="ain"><?php the_author_posts_link(); ?></strong>
						<p><?php  echo get_the_author_meta('description'); ?></p>
						<div class="clear"></div>
						<ul class="author_social text-center">
						<?php 
							$rss_url = get_the_author_meta( 'rss_url' );
							if ( $rss_url && $rss_url != '' ) {
								echo '<li class="rss"><a href="' . esc_url($rss_url) . '"><i class="icon-rss"></i></li>';
							}
											
							$google_profile = get_the_author_meta( 'google_profile' );
							if ( $google_profile && $google_profile != '' ) {
								echo '<li class="google"><a href="' . esc_url($google_profile) . '" rel="author"><i class="icon-gplus"></i></a></li>';
							}
											
							$twitter_profile = get_the_author_meta( 'twitter_profile' );
							if ( $twitter_profile && $twitter_profile != '' ) {
								echo '<li class="twitter"><a href="' . esc_url($twitter_profile) . '"><i class="icon-twitter"></i></a></li>';
							}
											
							$facebook_profile = get_the_author_meta( 'facebook_profile' );
							if ( $facebook_profile && $facebook_profile != '' ) {
								echo '<li class="facebook"><a href="' . esc_url($facebook_profile) . '"><i class="icon-facebook"></i></a></li>';
							}
											
							$linkedin_profile = get_the_author_meta( 'linkedin_profile' );
							if ( $linkedin_profile && $linkedin_profile != '' ) {
								   echo '<li class="linkedin"><a href="' . esc_url($linkedin_profile) . '"><i class="icon-linkedin"></i></a></li>';
							}
						?>	
						</ul>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
<?php

}


/**
 * Render Related Posts
 * @since batavia 1.0
 */
function zl_related_posts( $postid ){
	
	if ( false === ( $special_query_results = get_transient( 'zl_relposts_trans_'.$postid ) ) ) {
		
		ob_start();
	    echo '<div class="zl_post_extra">';
		    echo '<div class="zl_related_posts">';
		    echo '<h3>'. esc_html__('Related Posts', 'batavia') .'</h3>';
		    $tags = '';
		    $tags = wp_get_post_tags($postid);
		    if($tags) {
				$tag_ids = array();
				foreach($tags as $individual_tag) $tag_ids[] = $individual_tag->term_id;
				$args = array(
					'tag__in' => $tag_ids,
					'post_status' => 'publish',
					'post__not_in' => array($postid),
					'posts_per_page'=> 3, // Number of related posts to display.
					'ignore_sticky_posts'=> 1,
					'orderby'=> 'rand',
					'meta_query' => array(array('key' => '_thumbnail_id')) 
					);

				$related_posts = new wp_query( $args );

		        if( $related_posts->have_posts() ){

		        	echo '<div id="zl-related-posts" class="row">';
		        	echo '<div class="row">';

		        		while( $related_posts->have_posts() ){
		        			$related_posts->the_post(); ?>
		        			<div class="related_post large-4 column">
		                		<?php 
		                			if( has_post_thumbnail() ){
		                				echo '<div class="zl_related_thumb">';
		                				echo '<a href="'. get_permalink() .'">';
		                				the_post_thumbnail( 'medium' );
		                				echo '</a>';
		                				echo '</div> <!-- end .zl_related_thumb -->';
		                			} 
		                		?>
			                    <a class="entry-unrelated" href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
			                    <div class="clear"></div>
			                    <div class="zl_relate_date">
			                    	<?php echo get_the_time(get_option('date_format'), $postid); ?>
			                    </div>
			                </div> <!-- end of .related_post -->
		        		<?php
		        		}

		        	echo '</div>'; // .row;
		       		echo '</div>'; // #zl-related-posts.row;
		        
		        } else {

		        	echo esc_html__( 'Not found any related posts', 'batavia' );

		        }

		    }
			wp_reset_postdata();
		    echo '</div>'; // .zl_related_posts
	    echo '</div>'; // .zl_post_extra
	    $special_query_results = ob_get_clean();
		set_transient( 'zl_relposts_trans_'.$postid, $special_query_results, DAY_IN_SECONDS );
	}

	echo zl_pass_html( $special_query_results );
   
}


/**
* Render Social Icons
*/
function social_icons(){
	$social_label = $social_icons = '';
	$social_label = zl_option('social_label'); 
	$social_icons = zl_option('social_icons', '');
	if( !empty( $social_icons ) ){
		foreach( $social_icons as $icon ){
			echo '<a href="'. esc_url( $icon['social_url'] ) .'" title="'. esc_attr($icon['social_name'] ) .'"><span class="'. esc_attr( $icon['social_icon'] ) .'"></span></a>'."\n";
		}
	} else { ?>
		<a href="#"><span class="icon-facebook"></span></a>
		<a href="#"><span class="icon-twitter"></span></a>
		<a href="#"><span class="icon-youtube"></span></a>
		<a href="#"><span class="icon-linkedin"></span></a>
		<a href="#"><span class="icon-dribbble"></span></a>
	<?php
	}
}


/**
* Render Footer Content
* @var $sections
*/
function zl_footer_content(){
	$sections = '';
	$sections = zl_option('footer_section');

	if(!empty($sections)){
		foreach ($sections as $section) {
			/* Empty value to prevent error */
	        $section_name = $footer_widget = $sec_type = $sec_vertical_padding = $sec_vertical_margin = $sec_background_clr = $sec_text_clr = $sec_brd_clr = '';
			/*Get all variables*/
			$section_name 			= $section['section_name'];
			$footer_widgets  		= $section['footer_widgets'];
			$sec_type 				= $section['sec_type'];
			$sec_vertical_padding 	= $section['sec_vertical_padding'];
			$sec_vertical_margin 	= $section['sec_vertical_margin'];
			$sec_background_clr 	= $section['sec_background_clr'];
			$sec_brd_clr 			= $section['sec_brd_clr'];
			$sec_text_clr 			= $section['sec_text_clr'];

			

			if($section_name){
				$sec_class = '';
				if($sec_background_clr || $sec_brd_clr || $sec_text_clr || $sec_vertical_padding || $sec_vertical_margin){
					$sec_bg = $sec_pad = $sec_mar = $sec_text = $sec_brd = '';
					$sec_bg = 'background-color: '.$sec_background_clr.';';
					$sec_brd = ( !empty($sec_brd_clr) ) ? 'border-top: 1px solid '.$sec_brd_clr.';' : '' ;
					$sec_pad = 'padding: '.$sec_vertical_padding.'px 0'.';';
					$sec_mar = 'margin: '.$sec_vertical_margin.'px 0'.';';
					$sectionstyle = "style='{$sec_bg} {$sec_pad} {$sec_mar} {$sec_brd}'";
				}
				$section_id = strtolower( str_replace( ' ', '-', $section_name ) );
				echo '<!-- Start of '.esc_html( $section_name ).'-->'."\n";
				echo '<div '.zl_pass_html( $sectionstyle ).' class="foo_section '.esc_attr( $section_id.' '.$sec_text_clr.' '.$sec_type ).'" id="'.esc_attr( $section_id ).'">'."\n";

					
					/* <div class="row"> */ 
					if( 'boxed' == $sec_type ){	echo '<div class="row">'."\n"; }


							/* Footer Widgets */
							if(!empty($footer_widgets)){
								foreach ($footer_widgets as $footer_widget) {
									/* Prevent Error */
									$footer_widget_name = $column_width = '';

									/* Define Variables */
									$footer_widget_name = $footer_widget['footer_widget_name'];
									$column_width = $footer_widget['column_width'];
									$column_width = str_replace('large', 'medium', $column_width);

									if($column_width){
										echo '<div class="'.esc_attr( $column_width ).'">';

											if ( function_exists('dynamic_sidebar') && dynamic_sidebar(strtolower(str_replace(' ', '-', $footer_widget_name))) ) : else : endif;
					
										echo '<div class="clear"></div>'."\n".'</div>';
									}
								}
								echo '<div class="clear"></div>'."\n";
							}

					
					/* </div> */ 
					if( 'boxed' == $sec_type ){	echo '</div><div class="clear"></div>'."\n"; }


				echo '</div><!-- end of '.esc_html($section_name).'-->'."\n";
			}
		}
	}
}