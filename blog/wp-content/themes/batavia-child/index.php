<?php get_header(); ?>
	<?php get_sidebar(); ?>
	<!-- SECTION: Site content -->
	<div id="zl_container">
		<div class="row">
			<div class="row">
				<div class="large-12 column title">
					<h1 class="page-title">Stiri</h1>
				</div>
			</div>
			
			<div class="large-12 column" itemscope itemtype="https://schema.org/Blog">

				<?php
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
