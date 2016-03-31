(function($) {
	"use strict";
	
	window.onload = function () {
		"use strict";
		if( $('.zl_instagram_widget').length ){
			$('.zl_instagram_widget').each(function(){
				var thisinsta = $(this),
					wrapper = thisinsta.find('.zl_instawrapper'),
					clientID = wrapper.attr('data-clientid'),
					username = wrapper.attr('data-username'),
					limit = wrapper.attr('data-limit');

				/* Fire the script */
				wrapper.instagramLite({
				    clientID: clientID,
				    username: username,
				    limit: limit,
				    urls: true
				});
			});
		}
	}

})(jQuery);
