<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 *
 * @var $targetlink
 * @var $image_url
 */

echo zl_pass_html( $before_widget );
if($title):
echo zl_pass_html( $title );
endif;
?>
<?php if( zl_pass_html( $adscode ) ): ?>
<?php echo zl_pass_html( $adscode ); ?>
<?php endif; ?>
<?php echo zl_pass_html( $after_widget ); ?>