<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 *
 * @var $post_number
 * @var $cat
 * @var $order
 */

echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );
?>

<?php 

/**
 * The WordPress Query class.
 * @link http://codex.wordpress.org/Function_Reference/WP_Query
 *
 */
$recentpost = get_transient('recent_post_widget_trans_'.$this->id);
if ( false === $recentpost ){
    ob_start();
	$args = array(
	    'posts_per_page' => $post_number,          
	    'cat' => $cat,          
	    'ignore_sticky_posts' => 1,          
	    'orderby' => $order,          
	);
	$recentposts = new WP_Query( $args );
	if( $recentposts->have_posts() ): ?>
		<ul class="zl_widget_recentposts">
			<?php 
			$i=0;
			while( $recentposts->have_posts() ): 
				$recentposts->the_post();
			 ?>
			<?php if( 0 == $i && 'yes' == $firstbig ){ ?>
				<li class="zl_recpost_big">
					<a href="<?php the_permalink(); ?>">
					<?php 
					if(has_post_thumbnail()){
				        the_post_thumbnail( 'zl_eighty' );
				    } else {
				        echo '<img src="http://placehold.it/450x300" alt=""/>';
				    }
					 ?>
					</a>
					<span class="rp_date"><?php the_category(', ' ); ?></span>
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" class="zl_recpostboigtitle"><?php the_title(); ?></a>
					<?php 
					$excerpt = get_the_excerpt();
					$excerpt_2 = substr($excerpt,0,120);
					echo zl_pass_html( $excerpt_2 );
					if($excerpt_2!=$excerpt) { echo "..."; }
					?>
				</li>
			<?php 
			} else {
			?>
				<li>
					<a href="<?php the_permalink(); ?>">
					<?php 
					if(has_post_thumbnail()){
				        the_post_thumbnail( 'zl_eighty' );
				    } else {
				        echo '<img src="'. get_template_directory_uri().'/lib/img/patterns/no_pattern.jpg' .'" class="attachment-zl_eighty wp-post-image appear" alt=""/>';
				    }
					 ?>
					</a>
					<div class="zl_recpost_detail">
						<span class="rp_date"><?php the_category(', ' ); ?></span>
						<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" class="zl_recpostsmalltitle"><?php the_title(); ?></a>
						<div class="clear"></div>
					</div>
					<div class="clear"></div>
				</li>

			<?php
				} 
			$i++;
			endwhile;
			?>
		</ul>
	    <?php
	    $recentpost = ob_get_clean();
	    set_transient( 'recent_post_widget_trans_'.$this->id, $recentpost, DAY_IN_SECONDS );
	endif;
}
echo zl_pass_html( $recentpost ); ?>
<?php echo zl_pass_html( $after_widget ); ?>