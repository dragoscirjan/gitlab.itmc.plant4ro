<?php get_header(); ?>
	
	<?php get_sidebar(); ?>
	<!-- SECTION: Site content -->
	<div class="zl_single_container">
		<div class="row">
			<div class="large-12 column" itemscope itemtype="https://schema.org/Blog">
				<div class="zl_singlepost">
					
					<?php 
						get_template_part( 'content', 'none' );
					 ?>
					
				</div> <!-- End large-12 -->
			</div> <!-- End large-12 -->
			
			<div class="clear"></div>
		</div> <!-- End .row -->
	</div> <!-- end #zl_container -->
	
<?php get_footer(); ?>