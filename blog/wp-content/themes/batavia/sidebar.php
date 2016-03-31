<div id="zl_sidebarcontainer"></div>
<div id="zl_sidebarcontainer_overlay"></div>
<div id="zl_sidebar">
	<span id="zl_sidebarcloser" class="icon-cancel"></span>
	<div id="zl_sidebar_content">
		<?php 
		/*  
		 * Sidebar	Primary
		*/
		if ( function_exists('dynamic_sidebar') && dynamic_sidebar('sidebar-1') ) : else : ?><?php endif; 

		?>
	</div>
</div>