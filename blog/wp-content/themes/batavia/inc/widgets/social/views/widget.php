<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $instance
 * @var $before_widget
 * @var $after_widget
 * @var $title
 */


?>
<?php if ( ! empty( $instance ) ) : ?>
	<?php echo zl_pass_html( $before_widget ); ?>
	<div class="wrap-social">
		<?php echo zl_pass_html( $title ); ?>
		<div class="zl_widget-social">
			<?php social_icons(); ?>
		</div>
	</div>
	<?php echo zl_pass_html( $after_widget ); ?>
<?php endif; ?>