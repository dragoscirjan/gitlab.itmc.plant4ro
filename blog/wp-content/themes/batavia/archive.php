<?php get_header(); ?>
	<?php get_sidebar(); ?>
	<!-- div: Site content -->
	<div id="zl_container" class="zl_giveborder">
		<!-- Page Info -->
		<div class="zl_page_info">
			<h1 class="page-title">
				<?php
					if ( is_day() ) :
						printf( wp_kses( __( '<em>Daily Archives:</em><br> %s', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) ), get_the_date() );

					elseif ( is_month() ) :
						printf( wp_kses( __( '<em>Monthly Archives:</em><br> %s', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) ), get_the_date( esc_html( _x( 'F Y', 'monthly archives date format', 'batavia' ) ) ) );

					elseif ( is_year() ) :
						printf( wp_kses( __( '<em>Yearly Archives:</em><br> %s', 'batavia' ), array( 'br' => array(), 'em' => array(), 'strong' => array() ) ), get_the_date( esc_html( _x( 'Y', 'yearly archives date format', 'batavia' ) ) ) );

					else :
						_e( 'Archives', 'batavia' );
					endif;
				?>
			</h1>
		</div>
		<div class="row">
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
