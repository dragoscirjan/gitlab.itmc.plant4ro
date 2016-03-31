<article class="zl_notfound">
	<header class="zl_singleposthead">
		<!-- Post Title -->
		<h1 class="entry-title">
			<?php 
				if(is_404()){
					esc_html_e( '404', 'batavia' );
				} elseif( is_search() ){
					echo zl_option('notfoundtitle', esc_html__('Nothing Found', 'batavia'));
				}
			?>
		</h1>
	</header>
	

	<!-- Post details -->
	<div class="zl_single_detail">
		<!-- Post Excerpt -->
		<div class="text-center">
			<?php echo wpautop( zl_option('404_message', esc_html__('It seems we can’t find what you’re looking for', 'batavia')) ); ?>
			<?php if( is_search() ){ ?>
			<form method="get" id="searchform"  action="<?php echo home_url(); ?>">
				<input type="text" placeholder="Search and hit enter..." name="s" id="s">
			</form>
			<?php } ?>
		</div> <!-- end .zl_single_excerpt -->
	</div> <!-- end .zl_single_detail -->
	<div class="clear"></div>
</article> <!-- End .zl_post