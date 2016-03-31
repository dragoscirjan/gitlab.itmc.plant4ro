	<footer id="zl_footer">
		<div class="clear"></div>
		<div class="zl_footer_content">
			<?php zl_footer_content(); ?>
		</div>
		
		<div class="zl_copyright">
			<?php echo zl_option('footer_copyright', esc_html__( 'COPYRIGHT &copy; 2015 DESIGNED BY JUARATHEMES', 'zatolab' )); ?>
		</div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>