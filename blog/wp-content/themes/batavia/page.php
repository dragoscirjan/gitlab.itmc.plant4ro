<?php get_header(); ?>
	
	<?php get_sidebar(); ?>
	<!-- SECTION: Site content -->
	<div class="zl_single_container">
		<div class="row">
			<div class="large-12 column">
				<div class="zl_singlepost">
					
					<?php 
					if( have_posts() ):
						while( have_posts() ): the_post();
							get_template_part( 'content', 'page' );
						endwhile;
					endif;

					// Comments
					if( true == zl_option('enable_comment', 1) ){
						if ( comments_open() || get_comments_number() ) {
							echo '<div class="zl_comment_container">';
							comments_template();
							echo '</div>';
						}
					}
					 ?>
					
				</div> <!-- End large-12 -->
			</div> <!-- End large-12 -->
			
			<div class="clear"></div>
		</div> <!-- End .row -->
	</div> <!-- end #zl_container -->
	
<?php get_footer(); ?>