<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * Demo Package Installer
 * @param FW_Ext_Backups_Demo[] $demos
 * @return FW_Ext_Backups_Demo[]
 */
function zl_filter_theme_fw_ext_backups_demos($demos) {
    $demos = array(
        'batavia-demo-2015' => array(
            'title' => esc_html__('Batavia Demo Installer', 'batavia'),
            'screenshot' => get_template_directory_uri().'/assets/img/demoinstallpreview.jpg',
            'preview_link' => 'https://zatolab.com/batavia',
        ),
    );

    $download_url = 'http://zatolab.com/democontents/batavia/';

    foreach ($demos as $id => $data) {
        $demo = new FW_Ext_Backups_Demo($id, 'piecemeal', array(
            'url' => $download_url,
            'file_id' => $id,
        ));
        $demo->set_title($data['title']);
        $demo->set_screenshot($data['screenshot']);
        $demo->set_preview_link($data['preview_link']);

        $demos[ $demo->get_id() ] = $demo;

        unset($demo);
    }

    return $demos;
}
add_filter('fw:ext:backups-demo:demos', 'zl_filter_theme_fw_ext_backups_demos');


/**
 * Enqueue Google fonts style to admin screen for custom header display.
 * @internal
 */
function zl_action_theme_admin_fonts() {
	wp_enqueue_style( 'fw-theme-droidserif', fw_theme_font_url(), array(), '1.0' );
}
add_action( 'admin_print_scripts-appearance_page_custom-header', 'zl_action_theme_admin_fonts' );



if ( ! function_exists( '_action_theme_setup' ) ) : 
/**
 * Theme setup.
 *
 * Set up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support post thumbnails.
 * @internal
 */ {
	function zl_action_theme_setup() {

		/*
		 * Make Theme available for translation.
		 */
		load_theme_textdomain( 'batavia', get_template_directory() . '/languages' );

		// This theme styles the visual editor to resemble the theme style.
		add_editor_style( array( 'assets/css/editor-style.css', fw_theme_font_url() ) );

		// Add RSS feed links to <head> for posts and comments.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails, and declare two sizes.
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'zl-stdthumb', 500, 400, true );
		add_image_size( 'zl_eighty', 80, 80, true );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption'
		) );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'image',
			'video',
			'audio',
			'quote',
			'gallery',
		) );

		// This theme uses its own gallery styles.
		add_filter( 'use_default_gallery_style', '__return_false' );
	}
}
endif;
add_action( 'init', 'zl_action_theme_setup' );

/**
 * Adjust content_width value for image attachment template.
 * @internal
 */
function zl_action_theme_content_width() {
	if ( is_attachment() && wp_attachment_is_image() ) {
		$GLOBALS['content_width'] = 810;
	}
}

add_action( 'template_redirect', 'zl_action_theme_content_width' );




/**
 * Extend the default WordPress body classes.
 *
 * Adds body classes to denote:
 * 1. Single or multiple authors.
 * 2. Presence of header image.
 * 3. Index views.
 * 4. Full-width content layout.
 * 5. Presence of footer widgets.
 * 6. Single views.
 * 7. Featured content layout.
 *
 * @param array $classes A list of existing body class values.
 *
 * @return array The filtered body class list.
 * @internal
 */
function zl_filter_theme_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	if ( get_header_image() ) {
		$classes[] = 'header-image';
	} else {
		$classes[] = 'masthead-fixed';
	}

	if ( is_archive() || is_search() || is_home() ) {
		$classes[] = 'list-view';
	}

	if ( is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'footer-widgets';
	}

	if ( is_singular() && ! is_front_page() ) {
		$classes[] = 'singular';
	}

	if ( is_front_page() && 'slider' == get_theme_mod( 'featured_content_layout' ) ) {
		$classes[] = 'slider';
	} elseif ( is_front_page() ) {
		$classes[] = 'grid';
	}

	return $classes;
}
add_filter( 'body_class', 'zl_filter_theme_body_classes' );

/**
 * Extend the default WordPress post classes.
 *
 * Adds a post class to denote:
 * Non-password protected page with a post thumbnail.
 *
 * @param array $classes A list of existing post class values.
 *
 * @return array The filtered post class list.
 * @internal
 */
function zl_filter_theme_post_classes( $classes ) {
	if ( ! post_password_required() && ! is_attachment() && has_post_thumbnail() ) {
		$classes[] = 'has-post-thumbnail';
	}

	return $classes;
}
add_filter( 'post_class', 'zl_filter_theme_post_classes' );


/**
 * Flush out the transients used in fw_theme_categorized_blog.
 * @internal
 */
function zl_action_theme_category_transient_flusher() {
	// Like, beat it. Dig?
	delete_transient( 'fw_theme_category_count' );
}

add_action( 'edit_category', 'zl_action_theme_category_transient_flusher' );
add_action( 'save_post', 'zl_action_theme_category_transient_flusher' );

// Framework Additional CSS 
function zl_admin_enqueue() {
    wp_register_style( 'custom-fw-styles', get_template_directory_uri() . '/assets/css/fw-styles.css', false, '1.0.0' );
    wp_enqueue_style( 'custom-fw-styles' );
}
add_action( 'admin_enqueue_scripts', 'zl_admin_enqueue' );

/**
 * Register widget areas.
 * @internal
 */
function zl_action_theme_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar Widget Area', 'batavia' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Appears in the sidebar section of the site.', 'batavia' ),
		'before_widget' => '<div id="%1$s" class="zl_widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="zl_widtle"><span>',
		'after_title'   => '</span></h3>',
	) );


	if( function_exists('fw_get_db_settings_option') ){
		$sections = fw_get_db_settings_option('footer_section');
		if(!empty($sections)){
			foreach ($sections as $section) {
				$footer_widgets = $section['footer_widgets'];
				if(!empty($footer_widgets)){
					$i=0;
					foreach ($footer_widgets as $footer_widget) {
						register_sidebar( array(
							'name'          => $footer_widget['footer_widget_name'],
							'id'            => strtolower(str_replace(' ', '-', $footer_widget['footer_widget_name'])),
							'before_widget' => '<div class="zl_foo_widget" id="%1$s">',
							'after_widget'  => '<div class="clear"></div></div>',
							'before_title'  => '<h3 class="zl_foo_wid_head"><span>',
							'after_title'   => '</span></h3>',
						) );
					$i++;
					}
				}
			}
		}
	}
}

add_action( 'widgets_init', 'zl_action_theme_widgets_init' );

/**
 * Setup Author Social Profile URL's
 *
 * @since batavia 1.0
 */
function zl_add_to_author_profile( $contactmethods ) {
	
	$contactmethods['rss_url'] = 'RSS URL';
	$contactmethods['google_profile'] = 'Google URL';
	$contactmethods['twitter_profile'] = 'Twitter URL';
	$contactmethods['facebook_profile'] = 'Facebook URL';
	$contactmethods['linkedin_profile'] = 'Linkedin URL';
	//$contactmethods['cover_image'] = 'Cover Image';
	
	return $contactmethods;
}
add_filter( 'user_contactmethods', 'zl_add_to_author_profile', 10, 1);

/**
 * Lets add Open Graph Meta Info
 *
 * @since batavia 1.0
 */
function zl_insert_fb_in_head() {
	$thumbnail_src = $desc = '';
	$desc = zl_post_excerpt( get_the_ID() );
	if ( !is_singular()) //if it is not a post or a page
		return;
        echo '<meta property="og:title" content="' . esc_attr( get_the_title() ) . '"/>'."\n";
        echo '<meta property="og:type" content="article"/>'."\n";
        echo '<meta property="og:url" content="' . esc_url( get_permalink() ) . '"/>'."\n";
        echo '<meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '"/>'."\n";
        echo '<meta property="og:description" content="' . esc_attr( wp_trim_words( $desc, 35, null ) ) . '"/>'."\n";
	if( has_post_thumbnail( get_the_ID() ) ) { //the post does not have featured image, use a default image
		$thumbnail_src = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
		echo '<meta property="og:image" content="' . esc_url( $thumbnail_src[0] ) . '"/>'."\n";
	}
	echo "";
}
add_action( 'wp_head', 'zl_insert_fb_in_head', 5 );


/**
 * Add custom icon sets
 *
 * @since batavia 1.0
 */

function zl_filter_theme_new_icon_set($sets) {
        $sets['zocials'] = array(
        'font-style-src' => get_template_directory_uri() . '/assets/css/fontello.css',
        'container-class' => '', // some fonts need special wrapper class to display properly
        'groups' => array(
            'socials' => __('Social icons', 'fw'),
        ),
        'icons' => array(
            // Web Application Icons
            'icon-wikipedia' => array('group' => 'socials'),
			'icon-duckduckgo' => array('group' => 'socials'),
			'icon-aim' => array('group' => 'socials'),
			'icon-delicious' => array('group' => 'socials'),
			'icon-paypal' => array('group' => 'socials'),
			'icon-flattr' => array('group' => 'socials'),
			'icon-android' => array('group' => 'socials'),
			'icon-eventful' => array('group' => 'socials'),
			'icon-smashmag' => array('group' => 'socials'),
			'icon-lanyrd' => array('group' => 'socials'),
			'icon-calendar-1' => array('group' => 'socials'),
			'icon-stumbleupon' => array('group' => 'socials'),
			'icon-fivehundredpx' => array('group' => 'socials'),
			'icon-pinterest-1' => array('group' => 'socials'),
			'icon-bitcoin' => array('group' => 'socials'),
			'icon-w3c' => array('group' => 'socials'),
			'icon-foursquare' => array('group' => 'socials'),
			'icon-html5' => array('group' => 'socials'),
			'icon-ie' => array('group' => 'socials'),
			'icon-call' => array('group' => 'socials'),
			'icon-grooveshark' => array('group' => 'socials'),
			'icon-ninetyninedesigns' => array('group' => 'socials'),
			'icon-forrst' => array('group' => 'socials'),
			'icon-digg' => array('group' => 'socials'),
			'icon-spotify' => array('group' => 'socials'),
			'icon-reddit' => array('group' => 'socials'),
			'icon-guest' => array('group' => 'socials'),
			'icon-gowalla' => array('group' => 'socials'),
			'icon-appstore' => array('group' => 'socials'),
			'icon-blogger' => array('group' => 'socials'),
			'icon-cc' => array('group' => 'socials'),
			'icon-dribbble-1' => array('group' => 'socials'),
			'icon-evernote' => array('group' => 'socials'),
			'icon-flickr-1' => array('group' => 'socials'),
			'icon-google' => array('group' => 'socials'),
			'icon-viadeo' => array('group' => 'socials'),
			'icon-instapaper' => array('group' => 'socials'),
			'icon-weibo' => array('group' => 'socials'),
			'icon-klout' => array('group' => 'socials'),
			'icon-linkedin-1' => array('group' => 'socials'),
			'icon-meetup' => array('group' => 'socials'),
			'icon-vk' => array('group' => 'socials'),
			'icon-plancast' => array('group' => 'socials'),
			'icon-disqus' => array('group' => 'socials'),
			'icon-rss-1' => array('group' => 'socials'),
			'icon-skype-1' => array('group' => 'socials'),
			'icon-twitter' => array('group' => 'socials'),
			'icon-youtube' => array('group' => 'socials'),
			'icon-vimeo-1' => array('group' => 'socials'),
			'icon-windows' => array('group' => 'socials'),
			'icon-xing' => array('group' => 'socials'),
			'icon-yahoo' => array('group' => 'socials'),
			'icon-chrome' => array('group' => 'socials'),
			'icon-email' => array('group' => 'socials'),
			'icon-macstore' => array('group' => 'socials'),
			'icon-myspace' => array('group' => 'socials'),
			'icon-podcast' => array('group' => 'socials'),
			'icon-amazon' => array('group' => 'socials'),
			'icon-steam' => array('group' => 'socials'),
			'icon-cloudapp' => array('group' => 'socials'),
			'icon-dropbox' => array('group' => 'socials'),
			'icon-ebay' => array('group' => 'socials'),
			'icon-facebook-1' => array('group' => 'socials'),
			'icon-github-1' => array('group' => 'socials'),
			'icon-github-circled-1' => array('group' => 'socials'),
			'icon-googleplay' => array('group' => 'socials'),
			'icon-itunes' => array('group' => 'socials'),
			'icon-plurk' => array('group' => 'socials'),
			'icon-songkick' => array('group' => 'socials'),
			'icon-lastfm-1' => array('group' => 'socials'),
			'icon-gmail' => array('group' => 'socials'),
			'icon-pinboard' => array('group' => 'socials'),
			'icon-openid' => array('group' => 'socials'),
			'icon-quora' => array('group' => 'socials'),
			'icon-soundcloud' => array('group' => 'socials'),
			'icon-tumblr' => array('group' => 'socials'),
			'icon-eventasaurus' => array('group' => 'socials'),
			'icon-wordpress' => array('group' => 'socials'),
			'icon-yelp' => array('group' => 'socials'),
			'icon-intensedebate' => array('group' => 'socials'),
			'icon-eventbrite' => array('group' => 'socials'),
			'icon-scribd' => array('group' => 'socials'),
			'icon-posterous' => array('group' => 'socials'),
			'icon-stripe' => array('group' => 'socials'),
			'icon-opentable' => array('group' => 'socials'),
			'icon-cart' => array('group' => 'socials'),
			'icon-print-1' => array('group' => 'socials'),
			'icon-angellist' => array('group' => 'socials'),
			'icon-instagram' => array('group' => 'socials'),
			'icon-dwolla' => array('group' => 'socials'),
			'icon-appnet' => array('group' => 'socials'),
			'icon-statusnet' => array('group' => 'socials'),
			'icon-acrobat' => array('group' => 'socials'),
			'icon-drupal' => array('group' => 'socials'),
			'icon-buffer' => array('group' => 'socials'),
			'icon-pocket' => array('group' => 'socials'),
			'icon-bitbucket' => array('group' => 'socials'),
			'icon-lego' => array('group' => 'socials'),
			'icon-login' => array('group' => 'socials'),
			'icon-stackoverflow' => array('group' => 'socials'),
			'icon-hackernews' => array('group' => 'socials'),
			'icon-lkdto' => array('group' => 'socials'),
			'icon-gplus' => array('group' => 'socials'),
        ),
    );
    return $sets;
}
add_filter('fw_option_type_icon_sets', 'zl_filter_theme_new_icon_set');

/**
 * Add Default Font from batavia theme
 */
function zl_add_defaultfont($fonts) {

    array_unshift($fonts, 'Gobold');
    // array_unshift($fonts, 'Test');
    return $fonts;
}
add_filter('fw_option_type_typography_v2_standard_fonts', 'zl_add_defaultfont');

/**
 * Delete menu transients when updated
 */
function zl_delete_menu_transients() {
	delete_transient( 'primary_menu' );
}
add_action( 'wp_update_nav_menu', 'zl_delete_menu_transients' );

/**
 * Delete Related Posts Cache
 */
function zl_delete_related( $post_id ) {

	delete_transient( 'zl_relposts_trans_'.$post_id );
}
add_action( 'save_post', 'zl_delete_related' );



/**
 * Compile theme options css into css file
 * @see static.php:
 */
function zl_generate_css(){
	ob_start();
	require get_template_directory() . '/assets/scss/style.scss.php';
	$custom_css = ob_get_clean();
	$custom_css_min = zl_minify_css($custom_css);

	// Stash CSS in uploads directory
	require_once( ABSPATH . 'wp-admin/includes/file.php' ); // We will probably need to load this file
	global $wp_filesystem;
	$upl = zl_upl();
	$url = $upl['url'];
	$dir = $upl['dir'];

	WP_Filesystem(); // Initial WP file system
	$wp_filesystem->mkdir( $dir ); // Make a new folder for storing our file
	$wp_filesystem->put_contents( $dir . 'style.css', $custom_css_min, 0644 ); // Finally, store the file :)
}

/**
 * Delete Inline style cache
 * @see batavia-theme-style.php:
 */
function zl_reset_css_transient(){
	delete_transient( 'zl_custom_css' );
	zl_generate_css();
}
add_action( 'fw_settings_form_saved', 'zl_reset_css_transient' );
add_action( 'fw_settings_form_reset', 'zl_reset_css_transient' );



// Adapted from https://gist.github.com/toscho/1584783
add_filter( 'clean_url', function( $url )
{
    if ( FALSE === strpos( $url, '.js' ) )
    { // not our file
        return $url;
    }
    // Must be a ', not "!
    return "$url' async";
}, 11, 1 );