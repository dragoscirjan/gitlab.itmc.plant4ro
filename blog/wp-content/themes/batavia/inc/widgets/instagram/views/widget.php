<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 *
 * @var $instagram_id
 * @var $number
 * @var $actok
 * @var $columns
 */

echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );
?>
	<ul class="zl_instawrapper <?php echo esc_attr( $columns ); ?>" data-username="<?php echo esc_attr( $instagram_id ); ?>" data-limit="<?php echo esc_attr( $number );?>" data-clientid="<?php echo esc_attr( $actok );?>">
	</ul>
<?php echo zl_pass_html( $after_widget ); ?>