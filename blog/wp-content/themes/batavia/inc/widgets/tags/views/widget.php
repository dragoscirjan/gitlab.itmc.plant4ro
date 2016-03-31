<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 */

echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );
?>
<?php 
	$finaltag = get_transient('zl_tag_trans_'.$this->id);
	if ( false === $finaltag ){
	    ob_start();
	    $tags = get_tags();
		if( $tags ){
			$html = '<div class="zl_tagcloud">';
			foreach ( $tags as $tag ) {
				$tag_link = get_tag_link( $tag->term_id );
						
				$html .= "<a href='{$tag_link}' title='{$tag->name} Tag' class='{$tag->slug}'>";
				$html .= "{$tag->name}</a>";
			}
			$html .= '</div>';
			$finaltag = $html;
		}
	    $html = ob_get_clean();
	    set_transient( 'zl_tag_trans_'.$this->id, $finaltag, DAY_IN_SECONDS );
	}
	echo zl_pass_html( $finaltag );
 ?>
<?php echo zl_pass_html( $after_widget ); ?>