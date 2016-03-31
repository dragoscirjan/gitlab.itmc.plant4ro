<!-- Post loop -->
<article  id="post-<?php the_ID(); ?>" <?php post_class('zl_post'); ?> itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
	<?php
	// Set Post Views
	$show_category = $show_authorname = $show_date = $show_postlikes = $show_postviews = $show_comment = $thumb = $img_url = $image = $comments_count = '';

	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb );
	$comments_count = wp_count_comments( get_the_ID() );

	$show_category = zl_option('show_category', 1);
	$show_authorname = zl_option('show_authorname', 1);
	$show_date = zl_option('show_date', 1);
	$show_postlikes = zl_option('show_postlikes', 1);
	$show_postviews = zl_option('show_postviews', 1);
	$show_comment = zl_option('show_comment', 1);
	?>

	<!-- META -->
	<meta itemprop="datePublished" content="<?php the_time('c'); ?>">
	<meta itemprop="url" content="<?php the_permalink(); ?>">
	<meta itemprop="author" content="<?php the_author(); ?>">
	<meta itemprop="headline " content="<?php the_title_attribute(); ?>">
	<meta itemprop="image" content="<?php echo esc_url( $img_url ); ?>">
	<meta itemprop="interactionCount" content="UserComments:<?php echo esc_attr( $comments_count->approved  );?>">

	<?php
	if( has_post_thumbnail() ) {
	 ?>
	<!-- Thumbnail -->
	<div class="zl_post_thumb">
		<a href="<?php the_permalink(); ?>">
			<?php the_post_thumbnail( 'zl-stdthumb' );?>
		</a>
	</div>
	<?php } ?>

	<!-- Post details -->
	<div class="zl_post_detail">
		<header class="zl_loop_posthead">
			<?php if( true == $show_category ){ ?>
				<!-- Post Category -->
				<div class="zl_post_cat">
					<span class="zl_by"><em><?php esc_html_e( 'in', 'batavia' );?></em> <?php the_category( ' - ' ); ?></span>
				</div>
			<?php } ?>

			<!-- Post Title -->
			<h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

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

		<!-- Post Excerpt -->
		<div class="zl_post_excerpt">
			<?php
			$content = '';
			$content = get_the_excerpt();
			$trimmed_content = wp_trim_words( $content, 41, null );
			echo '<p>';
			echo zl_pass_html( $trimmed_content );
			echo '</p>';
			?>
			<div class="clear"></div>

			<!-- POST FOOTER -->
			<div class="zl_post_footer">
				<div class="large-8 column nopadding text-left zl_postinfos">
					<?php if( true == $show_postlikes ){ ?>
						<!-- Likes -->
						<?php echo zl_get_simple_likes_button( $post->ID );
					 } ?>

					<?php if( true == $show_postviews ){ ?>
						<!-- Post Views -->
						<a href="<?php the_permalink(); ?>" title="Total Views"><span class="icon-eye-outline"> <?php echo esc_html( zl_getPostViews(get_the_ID()) ); ?></span></a>
					<?php } ?>

					<?php if( true == $show_comment ){ ?>
						<!-- Comment Number -->
						<a href="<?php the_permalink(); ?>#comments" title="Comments"><span class="icon-comment"> <?php echo esc_html( $comments_count->approved  );?></span></a>
						<div class="clear"></div>
					<?php } ?>

				</div> <!-- end .zl_postinfos -->

				<div class="large-4 column nopadding">
					<div class="zl_readmore_box">
						<a href="<?php the_permalink(); ?>" class="zl_readmorelink">
							<?php esc_html_e( 'FULL STORY', 'batavia' );?>
							<!-- <i class="icon-right-small"></i> -->
						</a>
					</div>
				</div> <!-- End large-4 -->
				<div class="clear"></div>
			</div> <!-- end .zl_post_footer -->
			<div class="clear"></div>
		</div>
	</div> <!-- end .zl_post_excerpt -->
	<div class="clear"></div>
</article> <!-- End .zl_post -->
