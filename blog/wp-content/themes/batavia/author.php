<?php get_header(); ?>
	<?php get_sidebar(); ?>
	<!-- DIV: Site content -->
	<div id="zl_container" class="zl_giveborder">
		<!-- Page Info -->
		<div class="zl_page_info">
			<h1 class="page-title">
				<?php
					if(have_posts()) the_post();
					printf( wp_kses( __( '<em>All posts by</em><br> %s', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) ), get_the_author() );
				?>
			</h1>
		</div>
		<div class="row">
			<div class="large-12 column" itemscope itemtype="https://schema.org/Blog">
				
				<?php 
				rewind_posts();
				if( have_posts() ):
					while( have_posts() ): the_post();
						get_template_part( 'loop', get_post_format() );
					endwhile;
				endif;
				 ?>

			</div> <!-- End large-12 -->

			<?php zl_post_navigation(); ?>

		</div> <!-- End .row -->
	</div> <!-- end #zl_container -->
	
<?php get_footer(); ?>
