<?php get_header(); ?>
	
	<?php get_sidebar(); ?>
	<!-- SECTION: Site content -->
	<div class="zl_single_container">
		<div class="row">
			<div class="large-12 column" itemscope itemtype="https://schema.org/Blog">
				<div class="zl_singlepost">
					
					<?php 
					if( have_posts() ):
						while( have_posts() ): the_post();
							$postid = get_the_ID();
							get_template_part( 'content', get_post_format() );
						endwhile;
					endif;

					// Author info
					if( function_exists('zl_post_author') && true == zl_option('author_bio') && !is_attachment() ) {
						zl_post_author();
					}

					if( function_exists('zl_related_posts') && true == zl_option('related_posts') && !is_attachment() ) {
						zl_related_posts( $postid );
					}

					// Comments
					if ( comments_open() || get_comments_number() ) {
						echo '<div class="zl_comment_container">';
						comments_template();
						echo '</div>';
					}
					 ?>
					
				</div> <!-- End large-12 -->
			</div> <!-- End large-12 -->
			
			<div class="clear"></div>
		</div> <!-- End .row -->
	</div> <!-- end #zl_container -->
	
<?php get_footer(); ?>