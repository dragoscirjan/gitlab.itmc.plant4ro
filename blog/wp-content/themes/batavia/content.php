<?php 
	$show_category = $show_authorname = $show_date = $show_postlikes = $show_postviews = $show_comment = $thumb = $img_url = $image = $comments_count = $social_sharing = $show_shortlink = $related_posts = $givenone = '';

	// Set Post Views
	if( function_exists('zl_setPostViews') ) zl_setPostViews(get_the_ID());
	$thumb = $img_url = $image = $comments_count = '';
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb );
	$comments_count = wp_count_comments( get_the_ID() );

	$show_category = zl_option('show_category', 1);
	$show_authorname = zl_option('show_authorname', 1);
	$show_date = zl_option('show_date', 1);
	$show_postlikes = zl_option('show_postlikes', 1);
	$show_postviews = zl_option('show_postviews', 1);
	$show_comment = zl_option('show_comment', 1);
	$social_sharing = zl_option('social_sharing', 1);
	$show_shortlink = zl_option('show_shortlink', 1);
	$related_posts = zl_option('related_posts', 1);
?>

<!-- Post loop -->
<article  id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
	<!-- META -->
	<meta itemprop="datePublished" content="<?php the_time('c'); ?>">
	<meta itemprop="url" content="<?php the_permalink(); ?>">
	<meta itemprop="author" content="<?php the_author(); ?>">
	<meta itemprop="headline " content="<?php the_title_attribute(); ?>">
	<meta itemprop="image" content="<?php echo esc_url( $img_url ); ?>">
	<meta itemprop="interactionCount" content="UserComments:<?php echo esc_attr( $comments_count->approved  );?>">
	
	<header class="zl_singleposthead">
		<?php if( true == $show_category && !is_attachment() ){ ?>
			<!-- Post Category -->
			<div class="zl_post_cat">
				<span class="zl_by"><em><?php esc_html_e( 'in', 'batavia' );?></em> <?php the_category( ' - ' ); ?></span>
			</div>
		<?php } ?>

		<!-- Post Title -->
		<h1 class="entry-title"><?php the_title(); ?></h1>
		
		<?php if( true == $show_authorname || true == $show_date ){ ?>
			<!-- Post Meta -->
			<div class="zl_postmeta">
				<?php if( true == $show_authorname ){ ?>
					<span class="zl_by"><em><?php esc_html_e( 'by', 'batavia' );?></em> <?php the_author_posts_link(); ?></span>
				<?php } ?>

				<?php if( true == $show_date ){ ?>
					<span class="zl_by"><em><?php esc_html_e( 'on', 'batavia' );?></em> <a href="<?php the_permalink(); ?>"><?php echo get_the_time(get_option('date_format'), $post->ID); ?></a></span>
				<?php } ?>
			</div>
		<?php } ?>
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
		
		<?php if( false == $social_sharing && false == $show_shortlink ){ 
			$givenone = 'nodisplay';
		 } ?>
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

			if( is_single() && !is_attachment() ):
				echo "<div class='zl_posttags'>";
				the_tags('<span class="icon-tags">' . esc_html__('Tags:', 'batavia') . '</span>', ' ', '<br />');
				echo "</div>";
			endif;
			?>

			<!-- POST FOOTER -->
			<div class="zl_post_footer">
				<div class="large-12 column nopadding text-left zl_postinfos">
					<?php if( true == $show_postlikes ){ ?>
						<!-- Likes -->
						<?php echo zl_get_simple_likes_button( $post->ID );
					 } ?>

					<?php if( true == $show_postviews ){ ?>
						<!-- Post Views -->
						<a href="<?php the_permalink(); ?>#post-<?php the_ID(); ?>" title="Total Views"><span class="icon-eye-outline"> <?php echo esc_html( zl_getPostViews(get_the_ID()) ); ?></span></a>
					<?php } ?>
					
					<?php if( true == $show_comment ){ ?>
						<!-- Comment Number -->
						<a href="<?php the_permalink(); ?>#comments" title="Comments"><span class="icon-comment"> <?php echo esc_html( $comments_count->approved  );?></span></a>
						<div class="clear"></div>
					<?php } ?>
					<div class="clear"></div>
				</div> <!-- end .zl_postinfos -->
				<div class="clear"></div>
			</div> <!-- end .zl_post_footer -->
		</div>
	</div> <!-- end .zl_post_excerpt -->
	<div class="clear"></div>
</article> <!-- End .zl_post -->