<?php get_header(); ?>
	<?php get_sidebar(); ?>
	<!-- SECTION: Site content -->
	<div id="zl_container" class="zl_giveborder">
		<!-- Page Info -->
		<div class="zl_page_info">
			<h1 class="page-title">
				<?php printf( wp_kses( __( '<em>Search Results for: </em><br>%s', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) ), get_search_query() ); ?>
			</h1>
		</div>
		<div class="row">
				
			<?php 
			if( have_posts() ):
				echo '<div class="large-12 column" itemscope itemtype="https://schema.org/Blog">';
				while( have_posts() ): the_post();
					get_template_part( 'loop', get_post_format() );
				endwhile;
				echo '</div>';
				zl_post_navigation();
			else:
				get_template_part( 'content', 'none' );
			endif;
			 ?>
		</div> <!-- End .row -->
	</div> <!-- end #zl_container -->
	
<?php get_footer(); ?>