<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }
/**
 * Return value from the database of an option from the framework’s settings page. 
 * Settings options are located in framework-customizations/theme/options/settings.php.
 * @return string
 */
if ( ! function_exists( 'zl_option' ) ){
	function zl_option( $id, $default = null ){
		if( function_exists( 'fw_get_db_settings_option' ) ){
			$value = fw_get_db_settings_option( $id );
			if( '' !== $value ){
				return $value;
			} elseif( $value == false or $value === "" or $value == null or !$value or empty( $value ) ) {
				return $default;
			}			
		}
        return $default;
	}
}

/**
 * Return value from the database of an option from Unyson Metabox/custom field. 
 * Settings options are located in framework-customizations/theme/options/posts/page.php.
 * @return string
 * @var $post_id
 * @var $option_id
 * @var $default_value
 */
if ( ! function_exists( 'zl_meta' ) ){
	function zl_meta( $option_id, $default = null ){
		$post_id = get_the_id();
		if( function_exists( 'fw_get_db_post_option' ) ){
			$option = fw_get_db_post_option( $post_id, $option_id );
	        if (empty($option)) {
	            $option = $default;
	        } 
	        return $option;
		} else {
			return null;
		}
	}
}

/**
 * Register Droid Serif Google font.
 *
 * @return string
 */
function fw_theme_font_url() {
	$font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Lato, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Droid Serif font: on or off', 'batavia' ) ) {
		$font_url = add_query_arg( 'family', urlencode( 'Droid Serif:400,400italic,700,700italic' ),
			"//fonts.googleapis.com/css" );
	}

	return $font_url;
}

/**
 * Passing HTML
 * @return string
 */
function zl_pass_html( $string ){
	return $string;
}

/**
 * Getter function for Featured Content Plugin.
 *
 * @return array An array of WP_Post objects.
 */
function fw_theme_get_featured_posts() {
	/**
	 * @param array|bool $posts Array of featured posts, otherwise false.
	 */
	return apply_filters( 'fw_theme_get_featured_posts', array() );
}

/**
 * A helper conditional function that returns a boolean value.
 *
 * @return bool Whether there are featured posts.
 */
function fw_theme_has_featured_posts() {
	return ! is_paged() && (bool) fw_theme_get_featured_posts();
}

if ( ! function_exists( 'fw_theme_the_attached_image' ) ) : /**
 * Print the attached image with a link to the next attached image.
 */ {
	function fw_theme_the_attached_image() {
		$post = get_post();
		/**
		 * Filter the default attachment size.
		 *
		 * @param array $dimensions {
		 *     An array of height and width dimensions.
		 *
		 * @type int $height Height of the image in pixels. Default 810.
		 * @type int $width Width of the image in pixels. Default 810.
		 * }
		 */
		$attachment_size     = apply_filters( 'fw_theme_attachment_size', array( 810, 810 ) );
		$next_attachment_url = wp_get_attachment_url();

		/*
		 * Grab the IDs of all the image attachments in a gallery so we can get the URL
		 * of the next adjacent image in a gallery, or the first image (if we're
		 * looking at the last image in a gallery), or, in a gallery of one, just the
		 * link to that image file.
		 */
		$attachment_ids = get_posts( array(
			'post_parent'    => $post->post_parent,
			'fields'         => 'ids',
			'numberposts'    => - 1,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'order'          => 'ASC',
			'orderby'        => 'menu_order ID',
		) );

		// If there is more than 1 attachment in a gallery...
		if ( count( $attachment_ids ) > 1 ) {
			foreach ( $attachment_ids as $attachment_id ) {
				if ( $attachment_id == $post->ID ) {
					$next_id = current( $attachment_ids );
					break;
				}
			}

			// get the URL of the next image attachment...
			if ( $next_id ) {
				$next_attachment_url = get_attachment_link( $next_id );
			} // or get the URL of the first image attachment.
			else {
				$next_attachment_url = get_attachment_link( array_shift( $attachment_ids ) );
			}
		}

		printf( '<a href="%1$s" rel="attachment">%2$s</a>',
			esc_url( $next_attachment_url ),
			wp_get_attachment_image( $post->ID, $attachment_size )
		);
	}
}
endif;

if ( ! function_exists( 'fw_theme_list_authors' ) ) : /**
 * Print a list of all site contributors who published at least one post.
 */ {
	function fw_theme_list_authors() {
		$contributor_ids = get_users( array(
			'fields'  => 'ID',
			'orderby' => 'post_count',
			'order'   => 'DESC',
			'who'     => 'authors',
		) );

		foreach ( $contributor_ids as $contributor_id ) :
			$post_count = count_user_posts( $contributor_id );

			// Move on if user has not published a post (yet).
			if ( ! $post_count ) {
				continue;
			}
			?>

			<div class="contributor">
				<div class="contributor-info">
					<div class="contributor-avatar"><?php echo get_avatar( $contributor_id, 132 ); ?></div>
					<div class="contributor-summary">
						<h2 class="contributor-name"><?php echo get_the_author_meta( 'display_name',
								$contributor_id ); ?></h2>

						<p class="contributor-bio">
							<?php echo get_the_author_meta( 'description', $contributor_id ); ?>
						</p>
						<a class="button contributor-posts-link"
						   href="<?php echo esc_url( get_author_posts_url( $contributor_id ) ); ?>">
							<?php printf( _n( '%d Article', '%d Articles', $post_count, 'batavia' ), $post_count ); ?>
						</a>
					</div>
					<!-- .contributor-summary -->
				</div>
				<!-- .contributor-info -->
			</div><!-- .contributor -->

		<?php
		endforeach;
	}
}
endif;

/**
 * Minify CSS
 */
function zl_minify_css($input) {
    if(trim($input) === "") return $input;
    return preg_replace(
        array(
            // Remove comment(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
            // Remove unused white-space(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
            // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
            '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
            // Replace `:0 0 0 0` with `:0`
            '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
            // Replace `background-position:0` with `background-position:0 0`
            '#(background-position):0(?=[;\}])#si',
            // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
            '#(?<=[\s:,\-])0+\.(\d+)#s',
            // Minify string value
            '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
            '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
            // Minify HEX color code
            '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
            // Replace `(border|outline):none` with `(border|outline):0`
            '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
            // Remove empty selector(s)
            '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
        ),
        array(
            '$1',
            '$1$2$3$4$5$6$7',
            '$1',
            ':0',
            '$1:0 0',
            '.$1',
            '$1$3',
            '$1$2$4$5',
            '$1$2$3',
            '$1:0',
            '$1$2'
        ),
    $input);
}

/**
 * font style
 */
if(!function_exists('zl_fontstyle')){
	function zl_fontstyle($font = null){

		$is_google = $font['google_font'];

		// If current font is googleFonts
		if( true == $is_google ){

			if( 'italic' == $font['variation'] ){
				$font_style = 'font-style: italic' . ";\n";
			} elseif( 'regular' == $font['variation'] ){
				$font_style = 'font-style: normal' . ";\n";
			} else {
				$font_style  = ( strpos( $font['variation'], 'italic' ) ) ? 'font-style: italic'.";\n" : '';
			}
		// else, use defined
		} else {
			$font_style = $font['style'];
			$font_style = 'font-style: '. $font_style. ";\n" ;
		}
		
		echo zl_pass_html( $font_style );

	}
}

/**
 * Get font weight
 */
if(!function_exists('zl_fontweight')){
	function zl_fontweight($font = null){

		$is_google = $font['google_font'];

		if( true == $is_google ){
			if(preg_match('#[0-9]#',$font['variation'])){
				//has number
				echo 'font-weight: ' . intval( $font['variation'] ) . ";\n";
			} elseif( 'italic' == $font['variation'] ) {
				echo 'font-weight: normal;' . ";\n";
			} elseif( 'regular' == $font['variation'] ){
				echo 'font-weight: normal;' . ";\n";
			}
		} else {
			$font_weight = $font['weight'];
			$font_weight = 'font-weight: '. $font_weight. ";\n" ;
			echo esc_html( $font_weight );
		}
	}
}

/**
 * Render Font Family
 */
if(!function_exists('zl_fontfamily')){
	function zl_fontfamily($family = null){
		if($family && 'Theme Default' != $family){
			echo "font-family: '" . $family . "';\n";
		}
	}
}

/**
 * Render Font Size
 */
if(!function_exists('zl_fontsize')){
	function zl_fontsize($size = null){
		if($size && $size != '9' ){ /* 9 means default options */
			echo "font-size: " . $size . "px;\n";
		}
	}
}

/**
 * Render Line Height
 */
if(!function_exists('zl_lineheight')){
	function zl_lineheight($lineheight = null){
		if($lineheight){
			$final_lineheight = $lineheight + 11;
			echo "line-height: " . $lineheight . "px;\n";
		}
	}
}

/**
 * Get post excerpt by post ID.
 *
 * @return string
 */
function zl_post_excerpt() {
    $post = get_the_ID();
    setup_postdata( $post );
    $the_excerpt = get_the_excerpt();
    wp_reset_postdata();
    return $the_excerpt;
}

/*
 * Get upload directory details
 */
function zl_upl(){
	
	$upload_dir = wp_upload_dir(); // Grab uploads folder array
	$cssdirname = 'batavia-css'; // Set folder name
	$uploadurl = $upload_dir['baseurl'] . '/'. $cssdirname; // get batavia directory url
	$uploaddir = trailingslashit( $upload_dir['basedir'] ) . $cssdirname . '/'; // Set storage directory path

	$out['url'] = $uploadurl;
	$out['dir'] = $uploaddir;

	return $out;
}

function HTMLToRGB($htmlCode){
    if($htmlCode[0] == '#')
      $htmlCode = substr($htmlCode, 1);

    if (strlen($htmlCode) == 3)
    {
      $htmlCode = $htmlCode[0] . $htmlCode[0] . $htmlCode[1] . $htmlCode[1] . $htmlCode[2] . $htmlCode[2];
    }

    $r = hexdec($htmlCode[0] . $htmlCode[1]);
    $g = hexdec($htmlCode[2] . $htmlCode[3]);
    $b = hexdec($htmlCode[4] . $htmlCode[5]);

    return $b + ($g << 0x8) + ($r << 0x10);
  }

function RGBToHSL($RGB) {
    $r = 0xFF & ($RGB >> 0x10);
    $g = 0xFF & ($RGB >> 0x8);
    $b = 0xFF & $RGB;

    $r = ((float)$r) / 255.0;
    $g = ((float)$g) / 255.0;
    $b = ((float)$b) / 255.0;

    $maxC = max($r, $g, $b);
    $minC = min($r, $g, $b);

    $l = ($maxC + $minC) / 2.0;

    if($maxC == $minC)
    {
      $s = 0;
      $h = 0;
    }
    else
    {
      if($l < .5)
      {
        $s = ($maxC - $minC) / ($maxC + $minC);
      }
      else
      {
        $s = ($maxC - $minC) / (2.0 - $maxC - $minC);
      }
      if($r == $maxC)
        $h = ($g - $b) / ($maxC - $minC);
      if($g == $maxC)
        $h = 2.0 + ($b - $r) / ($maxC - $minC);
      if($b == $maxC)
        $h = 4.0 + ($r - $g) / ($maxC - $minC);

      $h = $h / 6.0; 
    }

    $h = (int)round(255.0 * $h);
    $s = (int)round(255.0 * $s);
    $l = (int)round(255.0 * $l);

    return (object) Array('hue' => $h, 'saturation' => $s, 'lightness' => $l);
}