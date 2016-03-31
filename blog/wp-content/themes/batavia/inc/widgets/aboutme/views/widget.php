<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 * @var $image_url
 * @var $deskripsi
 */
echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );
?>

<div class="aboutdetail">
	<div class="about_inner">
		<?php if($avaurl): ?>
			<img src="<?php echo esc_attr( $avaurl ); ?>" alt="" />
		<?php endif; ?>
		
		<strong><?php if( !empty($name) ) echo esc_html( $name ); ?> <br></strong>
	</div>
</div>
<div class="clear"></div>
<div class="widget_zl_aboutme">		
	<?php if($deskripsi) echo balancetags( $deskripsi ); ?>
	<div class="clear"></div>
	
	<div class="clear"></div>
</div>
<div class="clear"></div>

<?php echo zl_pass_html( $after_widget ); ?>
