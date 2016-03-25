<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "header".
 *
 * @package WordPress
 * @subpackage Batavia
 * @since Batavia 1.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
	<!-- ====================== EFFECT ELEMENTS -->
	<?php if( 'enable' == zl_option('particleeffect') ){ ?>
	<div id="particles-js" data-siteaddress="<?php echo get_template_directory_uri(); ?>"></div>
	<?php } ?>
	<div id="zl_menu-overlay"></div>
	<div id="zl_menucontainer"></div>
	<!-- ====================== EFFECT ELEMENTS -->

	<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	HEADER
	xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
	<header id="zl_siteheader">
		<div class="zl_mainmenuholder"></div>
		<div class="zl_mainmenu">
			<!-- <div class="small-5 column zl_socrent">
				<div class="zl_social_links">
					<?php social_icons(); ?>
				</div>
				&nbsp;
			</div> -->

			<!-- Menu trigger -->
			<div class="zl_bgrmnwrp">
				<div class="zl_bgr_menu_trigger">
					<div class="zl_burgermenu">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</div>
				</div>
			</div>

			<!-- Batavia Menu ====================== -->
			<div class="zl_batavia_menu">
				<ul class="zl_bt_menu">
					<?php
						$menu = get_transient('primary_menu');
						if (false === $menu ){
						    ob_start();
						    wp_nav_menu( array( 'container'=> false, 'items_wrap' => '%3$s', 'theme_location' => 'primary', 'fallback_cb'=> 'zl_fallbackmenu') );
						    $menu = ob_get_clean();
						    set_transient( 'primary_menu', $menu, DAY_IN_SECONDS );
						}
						echo zl_pass_html( $menu ) ;
					?>
				</ul>
			</div>

			<!-- Branding -->
			<div class="small-6 column zl_branding">
				<?php
				$logo = zl_option('logo');
				$logo_retina = zl_option('logo_retina');
				#print_r($logo);
				if( !empty($logo) ) {
					echo '<a href="'.esc_url( home_url() ).'">';
					echo '<img src="'.esc_attr( $logo['url'] ).'" alt="'.get_bloginfo( 'name' ).'" data-at2x="'.esc_attr( $logo_retina['url'] ).'"/>';
					echo '</a>';
					echo '<div class="clear"></div>'."\n";
				} else {
					echo '<h1 class="zl_logo_text">';
					echo '<a href="'.esc_url( home_url() ).'">';
					echo get_bloginfo( 'name' );
					echo '</a>';
					echo '</h1>';
				}
				 ?>
			</div>

			<!-- Sidebar Trigger -->
			<div class="small-6 column zl_srccontainer text-right">
				<!-- Search Form -->
				<div class="zl_srcform">
					<form action="<?php echo home_url(); ?>" method="get">
						<input type="text" name="s" onfocus="if(this.value=='Search...'){this.value=''};" onblur="if(this.value==''){this.value='Search...'};" value="Search..." />
						<button class="zl_src_btn"><span class="icon-search-outline"></span></button>
					</form>
				</div>

				<!-- Sidebar Trigger -->
				<div class="zl_sidebar_opener">
					<span class="icon-book-open"></span>
				</div>
			</div>
			<div class="clear"></div>
		</div>

	</header>
