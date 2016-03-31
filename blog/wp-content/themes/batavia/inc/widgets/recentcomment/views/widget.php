<?php if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/**
 * @var $before_widget
 * @var $after_widget
 * @var $title
 *
 * @var $post_number
 * @var $cat
 * @var $order
 */

echo zl_pass_html( $before_widget );
echo zl_pass_html( $title );

    $args = array(
        'order'     => 'DESC',
        'status'     => 'approve',
        'post_type'    => 'post',
    );

    // The Query
    $comments_query = new WP_Comment_Query;
    $comments = $comments_query->query( $args );

    // Comment Loop
    if ( $comments ) {
        echo '<ul class="zl_reccom">';
        $i = 1;
        foreach ( $comments as $comment ) { 
            $d = "U";
            $comment_date = get_comment_date( $d, $comment->comment_ID );
            ?>
            <li>
                <div class="zl_comment_ava">
                    <div class="zl_avaimg">
                        <?php 
                            $authormail = $comment->comment_author_email ; 
                            echo get_avatar( $authormail, 40 );
                         ?>
                    </div>
                    <div class="zl_comwidget_authorname">
                        <strong><?php echo esc_html( $comment->comment_author ); ?></strong>
                        <br>
                        <span class="comtime"><em><?php echo human_time_diff( $comment_date, current_time('timestamp') ) . ' ago'; ?></em> <?php echo esc_html__('On:', 'batavia'); ?></span>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="zl_commentdetail">
                    <strong><a href="<?php echo get_comment_link($comment->comment_ID ); ?>"><?php echo get_the_title($comment->comment_post_ID); ?></a></strong>
                    <span class="zl_comment_teaser">
                        "<?php echo zl_pass_html( substr( $comment->comment_content ,0,100) ).'... '; ?>"
                    </span>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </li>
           
     <?php 
       
        if ($i++ == $post_number) break;
        }
        echo "</ul>";
    } else {
        echo 'No comments found.';
    }
    ?>

<?php echo zl_pass_html( $after_widget ); ?>