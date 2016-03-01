<!-- Post loop -->
<article  id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php 
	// Set Post Views
	$thumb = $img_url = $image = $comments_count = '';
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb );
	$comments_count = wp_count_comments( get_the_ID() );
	$social_sharing = zl_option('page_social_sharing');
	$show_shortlink = zl_option('page_show_shortlink');
	?>

	<!-- META -->
	<meta itemprop="datePublished" content="<?php the_time('c'); ?>">
	<meta itemprop="url" content="<?php the_permalink(); ?>">
	<meta itemprop="author" content="<?php the_author(); ?>">
	<meta itemprop="headline " content="<?php the_title_attribute(); ?>">
	<meta itemprop="image" content="<?php echo esc_url( $img_url ); ?>">
	<meta itemprop="interactionCount" content="UserComments:<?php echo esc_attr( $comments_count->approved  );?>">
	
	<header class="zl_singleposthead">
		
		<!-- Post Title -->
		<h1 class="entry-title"><?php the_title(); ?></h1>
		
		
	</header>
		

	
	<!-- Thumbnail -->
	<div class="zl_single_thumb">
		<?php 
		if( has_post_thumbnail() ) { ?>
		<a href="<?php the_permalink(); ?>">
			<?php the_post_thumbnail();?>
		</a>
		<div class="clear"></div>
		<?php } ?>
		
		<?php 
		$givenone = '';
		if( false == $social_sharing && false == $show_shortlink ){ 
			$givenone = 'nodisplay';
		 } 
		 ?>
		<div class="zl_postutility <?php echo esc_attr( $givenone ); ?>">
			<div class="row">
				<?php if( true == $social_sharing && true == $show_shortlink ){ ?>
					<div class="large-8 column">
						<div id="zl_share"></div>
					</div>

					<div class="large-4 column">
						<div class="zl_shortlink icon-link">
							<?php echo wp_get_shortlink(); ?>
						</div>
					</div>
				<?php } elseif( true == $social_sharing && false == $show_shortlink ) { ?>
					<div class="large-12 column text-center">
						<div id="zl_share"></div>
					</div>
				<?php } elseif( false == $social_sharing && true == $show_shortlink ) { ?>
					<div class="large-12 column text-center">
						<div class="zl_shortlink icon-link">
							<?php echo wp_get_shortlink(); ?>
						</div>
					</div>
				<?php } ?>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</div>
	

	<!-- Post details -->
	<div class="zl_single_detail">

		<!-- Post Excerpt -->
		<div>
			<?php
			the_content();
			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . esc_html__( 'Pages:', 'batavia' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
			) );
			?>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</div> <!-- end .zl_post_excerpt -->
	<div class="clear"></div>
</article> <!-- End .zl_post -->