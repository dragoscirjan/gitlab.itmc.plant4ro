<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $number
 * @var $before_widget
 * @var $after_widget
 * @var $title
 * @var $flickr_id
 * @var $apikey
 * @var $random @return string 'yes' or 'no'
 */

echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );
	$flickr = get_transient('zl_flickr_trans_'.$this->id);
    if (false === $flickr ){
	    ob_start();
	    if( 'yes' == $random ){
			// $apikey = '75e2c1c3104fb2a2e24038bb838c1239'; Mine
			$userinfo_url = "https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=".$apikey."&user_id=".$flickr_id."&format=rest";
			$userinfo_xml = simplexml_load_file($userinfo_url);
			$getcount = $userinfo_xml->children()->children();
			$count = '';
			if( $getcount ){
				foreach( $getcount as $child ){
					foreach($child->children() as $key => $value){
						if( 'count' === $key ){
							$count = $value;
						}
					}
				}
			}
			$count = $count / $number;
			$count = round($count, 0, PHP_ROUND_HALF_DOWN);
			$page = wp_rand(1, $count);
		} else {
			$page = 1;
		}

		$url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&extras=url_sq,url_z&user_id=".$flickr_id."&per_page=".$number."&page=".$page."&api_key=".$apikey."&&format=rest";
		$xml = simplexml_load_file($url); ?>
	    <div>
	    <?php
	    foreach( $xml->children()->children() as $child ) { ?>
	        <a href="<?php echo esc_url( $child['url_z'] );?>">
				<img src="<?php echo esc_url( $child['url_sq'] ); ?>" alt=""/>
	        </a>
	    <?php } ?>
	    </div>
	    <?php 
	    $flickr = ob_get_clean();
	    set_transient( 'zl_flickr_trans_'.$this->id, $flickr, DAY_IN_SECONDS );
	}

	echo zl_pass_html( $flickr );
	?>
	
<?php echo zl_pass_html( $after_widget ) ?>