<?php 
$body_color = $body_styles = $footer_styles = $footer_color = '';

/* Body */
$body_color = zl_option('body_color');
$body_styles = zl_option('body_styles');

/* Footer */
$footer_color = zl_option('footer_color');
$footer_styles = zl_option('footer_styles');
$copyright_text_clr = zl_option('copyright_text_clr');
$copyright_bg_clr = zl_option('copyright_bg_clr');
$copyright_bd_clr = zl_option('copyright_bd_clr');
 ?>

body{
<?php if($body_color){ ?>
	background: <?php echo esc_html( $body_color ); ?>;
<?php } // $body_color

if($body_styles){
	#print_r($body_styles);
	$image_type = $body_styles['image_type'];
	if( 'custom' == $image_type ):
		$custom = $body_styles['custom'];
		foreach( $custom as $propery => $value ){
			if( is_array($value) ){
				echo esc_html($propery).':  url("'.esc_html($value['url']).'")'.";\n";
			} else {
				echo esc_html($propery).': '.esc_html($value).";\n";
			}
		}
	endif;
} 
?>
}

#zl_footer{
<?php if($footer_color){ ?>
	background: <?php echo esc_html( $footer_color ); ?>;
<?php } // $footer_color

if($footer_styles){
	#print_r($footer_styles);
	$image_type = $footer_styles['image_type'];
	if( 'custom' == $image_type ):
		$custom = $footer_styles['custom'];
		foreach( $custom as $propery => $value ){
			if( is_array($value) ){
				echo esc_html($propery).':  url("'.esc_html($value['url']).'")'.";\n";
			} else {
				echo esc_html($propery).': '.esc_html($value).";\n";
			}
		}
	endif;	
} 
?>
}

<?php if($footer_color){ ?>
	#zl_footer:before{
		background-color: <?php echo esc_html( $footer_color ); ?>;
	}
<?php } ?>

<?php if( $copyright_text_clr ){ ?>
	.zl_copyright{
		color: <?php echo esc_html( $copyright_text_clr ); ?>;
		background-color: <?php echo esc_html( $copyright_bg_clr ); ?>;
		border-color: <?php echo esc_html( $copyright_bd_clr ); ?>;
	}
<?php } ?>

<?php 
	$color = null;
	$color = zl_option('accent_color');
	if( isset($color) ):
 ?>

/* BACKGROUND COLOR */
::-moz-selection{
	background: <?php echo esc_html($color); ?>;
}
::selection{
	background: <?php echo esc_html($color); ?>;
}
.zl_widtle:before,
button:not(.zl_src_btn), 
html input[type="button"], 
input[type="reset"], 
input[type="submit"],
.zl_tagcloud a:hover,
.zl_readmorelink,
.page-links a,
.zl_posttags a:hover,
.comment-list ul.children .bypostauthor > article:after,
.reply a:hover {
	background: <?php echo esc_html($color); ?>;
}

/* Readmore link */
<?php 

$colour = $color;
$rgb = HTMLToRGB($colour);
$hsl = RGBToHSL($rgb);

if($hsl->lightness > 130){ ?>
    /* bright background, use dark font */
    .zl_readmorelink{
    	color: #000;
		color: rgba(0,0,0,.5);
    }
<?php } else { ?>
    /* dark background, use bright font */
    .zl_readmorelink{
    	color: #fff;
    }
<?php } ?>

/* TEXT COLOR */
.zl_logo_text:hover a,
.zl_sidebar_opener:hover span, .zl_sidebar_opener:active span,
table#wp-calendar tr td a:hover,
.zl_reccom li a:hover,
.zl_recpost_big a.zl_recpostboigtitle:hover,
.zl_recpost_detail a:hover,
.rp_date a:hover,
.widget_zl_aboutme a,
.zl_mainmenu .zl_social_links a:hover,
.zl_postinfos a:hover, .zl_postinfos a:hover span, .zl_postinfos a.liked,
.zl_postnav a:hover,
.comment .url,
.comment-form input[type="submit"]:hover,
.comment-form input[type="submit"]:active,
.comment-form input[type="submit"]:focus,
.related_post a:hover,
#zl_sidebarcloser:hover,
.zl_single_excerpt a:hover,
.zl_singlepost input[type="submit"]:hover,
.zl_singlepost input[type="submit"]:active,
.zl_singlepost input[type="submit"]:focus,
.zl_singlepost input[type="button"]:hover,
.zl_singlepost input[type="button"]:active,
.zl_singlepost input[type="button"]:focus,
.zl_singlepost input[type="submit"]:hover,
.zl_singlepost input[type="submit"]:active,
.zl_singlepost input[type="submit"]:focus,
.zl_singlepost input[type="reset"]:hover,
.zl_singlepost input[type="reset"]:active,
.zl_singlepost input[type="reset"]:focus {
	color: <?php echo esc_html($color); ?>;
}

/* BORDER COLOR */
.zl_tagcloud a:hover,
.zl_mainmenu .zl_social_links a:hover,
.zl_single_excerpt a:hover,
.zl_postnav a:hover,
.bypostauthor > article,
.reply a:hover,
.zl_single_excerpt a,
.zl_logo_text,
.comment-respond a:hover,
.comment-form input:focus,.comment-form textarea:focus,
.comment-form input[type="submit"]:hover,
.comment-form input[type="submit"]:active,
.comment-form input[type="submit"]:focus,
.zl_singlepost input[type="text"]:active,
.zl_singlepost input[type="password"]:active,
.zl_singlepost input[type="date"]:active,
.zl_singlepost input[type="datetime"]:active,
.zl_singlepost input[type="datetime-local"]:active,
.zl_singlepost input[type="month"]:active,
.zl_singlepost input[type="week"]:active,
.zl_singlepost input[type="email"]:active,
.zl_singlepost input[type="number"]:active,
.zl_singlepost input[type="search"]:active,
.zl_singlepost input[type="tel"]:active,
.zl_singlepost input[type="time"]:active,
.zl_singlepost input[type="url"]:active,
.zl_singlepost input[type="color"]:active,
.zl_singlepost textarea:active,
.zl_singlepost input[type="text"]:focus,
.zl_singlepost input[type="password"]:focus,
.zl_singlepost input[type="date"]:focus,
.zl_singlepost input[type="datetime"]:focus,
.zl_singlepost input[type="datetime-local"]:focus,
.zl_singlepost input[type="month"]:focus,
.zl_singlepost input[type="week"]:focus,
.zl_singlepost input[type="email"]:focus,
.zl_singlepost input[type="number"]:focus,
.zl_singlepost input[type="search"]:focus,
.zl_singlepost input[type="tel"]:focus,
.zl_singlepost input[type="time"]:focus,
.zl_singlepost input[type="url"]:focus,
.zl_singlepost input[type="color"]:focus,
.zl_singlepost textarea:focus,
.zl_singlepost input[type="submit"]:hover,
.zl_singlepost input[type="submit"]:active,
.zl_singlepost input[type="submit"]:focus,
.zl_singlepost input[type="button"]:hover,
.zl_singlepost input[type="button"]:active,
.zl_singlepost input[type="button"]:focus,
.zl_singlepost input[type="submit"]:hover,
.zl_singlepost input[type="submit"]:active,
.zl_singlepost input[type="submit"]:focus,
.zl_singlepost input[type="reset"]:hover,
.zl_singlepost input[type="reset"]:active,
.zl_singlepost input[type="reset"]:focus
{
	border-color: <?php echo esc_html($color); ?>;
}

<?php endif; ?>

<?php
/* Typography */
$use_custom_typo = zl_option('use_custom_typo');

// Body Font
$body_font = zl_option('body_font');

// Menu Font
$menu_font = zl_option('menu_font');
$menu_text_transform = zl_option('menu-text_transform');

// Post Title
$post_title_font = zl_option('post_title_font');
$post_title_text_transform = zl_option('post_title-text_transform');

// Article Headings
$article_heading_font = zl_option('article_heading_font');
// Heading size
$h1_size = zl_option('h1_size');
$h2_size = zl_option('h2_size');
$h3_size = zl_option('h3_size');
$h4_size = zl_option('h4_size');
$h5_size = zl_option('h5_size');
$h6_size = zl_option('h6_size');

// Article Paragraph
$article_p = zl_option('article_p');

// Widget title
$widtle_font = zl_option('widtle_font');
$widtle_font_text_transform = zl_option('widtle_font_text_transform');

// Footer Widget title
$foo_widtle = zl_option('foo_widtle');
$foo_widtle_text_transform = zl_option('foo_widtle_text_transform');

if( true == $use_custom_typo ): ?>	
/* Body */
body,
.zl_post_excerpt p{
	<?php 
	zl_fontfamily($body_font['family']); 
	zl_fontsize($body_font['size']); 
	zl_lineheight($body_font['line-height']); 
	zl_fontweight($body_font);
	zl_fontstyle($body_font);
	?>
	letter-spacing: <?php echo esc_html( $body_font['letter-spacing'] . 'px' ); ?>
}

ul.zl_bt_menu > li
{
	<?php 
	zl_fontfamily($menu_font['family']);
	zl_fontsize($menu_font['size']); 
	zl_fontweight($menu_font);
	zl_fontstyle($menu_font);
	if($menu_text_transform) { 
		echo 'text-transform: '.$menu_text_transform.';'; 
	};
	?>
	letter-spacing: <?php echo esc_html( $menu_font['letter-spacing'] . 'px' ); ?>
}

/* PARAGRAPH */
.zl_post_excerpt p{
	<?php zl_fontfamily($article_p['family']); ?>
}

.zl_single_excerpt p, .zl_single_excerpt{
<?php 
zl_fontfamily($article_p['family']); 
zl_fontsize($article_p['size']); 
zl_lineheight($article_p['line-height']); 
zl_fontweight($article_p);
zl_fontstyle($article_p);
?>
letter-spacing: <?php echo esc_html( $article_p['letter-spacing'] . 'px' ); ?>
}

.zl_single_excerpt ul, .zl_single_excerpt ol{
	<?php 
	zl_fontsize($article_p['size']); 
	zl_lineheight($article_p['line-height']); 
	 ?>
	letter-spacing: <?php echo esc_html( $article_p['letter-spacing'] . 'px' ); ?>
}

.zl_single_excerpt p{
	margin: <?php if( !empty( $article_p['line-height'] ) ) echo esc_html( $article_p['line-height'] ); ?>px 0;
}

.zl_post .entry-title,
.zl_singleposthead .entry-title
{
	<?php 
	zl_fontfamily($post_title_font['family']); 
	zl_fontsize($post_title_font['size']);
	zl_lineheight($post_title_font['line-height']);
	zl_fontweight($post_title_font);
	zl_fontstyle($post_title_font);
	if($post_title_text_transform) { echo 'text-transform: '.$post_title_text_transform.';'; };
	?>
	letter-spacing: <?php echo esc_html( $post_title_font['letter-spacing'] . 'px' ); ?>
}

.zl_singleposthead .entry-title{
	font-size: <?php echo esc_html( $post_title_font['size'] + 10 ).'px;'."\n"; ?>
	letter-spacing: <?php echo esc_html( $post_title_font['letter-spacing'] . 'px;' ); ?>
}

.zl_single_excerpt h1,
.zl_single_excerpt h2,
.zl_single_excerpt h3,
.zl_single_excerpt h4,
.zl_single_excerpt h5,
.zl_single_excerpt h6,
.page-title,
.zl_logo_text
{
	<?php 
	zl_fontfamily($article_heading_font['family']); 
	zl_fontweight($article_heading_font);
	zl_fontstyle($article_heading_font);
	?>
	letter-spacing: <?php echo esc_html( $article_heading_font['letter-spacing'] . 'px' ); ?>
}

.zl_single_excerpt h1{
<?php zl_fontsize($h1_size); ?>
}
.zl_single_excerpt h2{
<?php zl_fontsize($h2_size); ?>
}
.zl_single_excerpt h3{
<?php zl_fontsize($h3_size); ?>
}
.zl_single_excerpt h4{
<?php zl_fontsize($h4_size); ?>
}
.zl_single_excerpt h5{
<?php zl_fontsize($h5_size); ?>
}
.zl_single_excerpt h6{
<?php zl_fontsize($h6_size); ?>
}
	

/* SIDEBAR WIDGET */
.zl_widtle
{
	<?php 
	zl_fontfamily($widtle_font['family']); 
	zl_fontsize($widtle_font['size']);
	zl_lineheight($widtle_font['line-height']);
	zl_fontweight($widtle_font);
	zl_fontstyle($widtle_font);
	if($widtle_font_text_transform) { echo 'text-transform: '.$widtle_font_text_transform.';'; };
	?>	
	letter-spacing: <?php echo esc_html( $widtle_font['letter-spacing'] . 'px;' ); ?>
}

/* FOOTER WIDGET */
.zl_foo_wid_head
{
	<?php 
	zl_fontfamily($foo_widtle['family']); 
	zl_fontsize($foo_widtle['size']);
	zl_lineheight($foo_widtle['line-height']);
	zl_fontweight($foo_widtle);
	zl_fontstyle($foo_widtle);
	if($foo_widtle_text_transform) { echo 'text-transform: '.$foo_widtle_text_transform.';'; };
	?>	
	letter-spacing: <?php echo esc_html( $foo_widtle['letter-spacing'] . 'px' ); ?>
}



@media screen and (min-width: 0) and (max-width: 900px){
	.zl_post_detail .entry-title,
	.zl_singleposthead .entry-title{
		font-size: <?php echo esc_html($post_title_font['size'] * 0.8) ?>px!important;
		line-height: 1.1!important;
	}
}

@media screen and (min-width: 0) and (max-width: 414px){
	.zl_post_detail .entry-title,
	.zl_singleposthead .entry-title{
		font-size: <?php echo esc_html($post_title_font['size'] * 0.5) ?>px!important;
		line-height: 1.2!important;
	}
}



<?php 
	endif; // $use_custom_typo

	$custom = zl_option('customcss', '');
	if( !empty($custom) ){
		echo zl_pass_html( $custom );
	}
 ?>