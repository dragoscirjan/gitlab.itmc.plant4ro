/* START Foundation */
jQuery(document).foundation();

var ZL_Batavia = (function($) {
	"use strict"; 
	var winsize = $(window).width();
	return {
		init: function() {
			this.zl_particle();
			this.zl_mandatory();
			this.zl_postlove();
			this.zl_postshare();
		}, // end init:
		
		zl_particle: function() {
			if( $('#particles-js').length ){
				var body = jQuery('#particles-js'),
				siteaddress = body.attr('data-siteaddress'),
				jsonpath = siteaddress + '/assets/js/particles-config.json';
				particlesJS.load('particles-js', jsonpath);
			}
		},

		zl_postanim: function() {
			$('.zl_post').each(function(t) {
				var article = $(this);
				article.one('inview', function() {
					article.addClass('appear');
				});

			});

			$('.zl_postnav').each(function() {
				var link = $(this);
				link.one('inview', function() {
					link.addClass('appear');
				});
			});
		},

		zl_menuopen: function() {
			if( winsize > 737 ){
				/* Disable Body scrolling */
				$('body').on('scroll touchmove mousewheel', function(e) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			}

			/* Add clicked class */
			$('.zl_bgr_menu_trigger').addClass('zl_is_clicked');

			/* Add width class */
			setTimeout(function() {
				$('#zl_menu-overlay').addClass('addWidth');
			}, 150);

			/* Add height class */
			setTimeout(function() {
				$('#zl_menu-overlay').addClass('addHeight');
			}, 250);

			setTimeout(function() {
				$('#zl_menucontainer').addClass('appear');

				$('.zl_batavia_menu').fadeIn(200, function() {
					$('ul.zl_bt_menu > li').eachStep(50, function(i, el, duration) {
						$(el).velocity({
							translateY: [0, '70%'],
							opacity: 1
						}, {
							duration: 400,
							visibility: "visible",
							easing: "easeOutCubic"
								/*easing: [.22,1.64,.63,1.04]*/
						});
					});
				});
			}, 400);

		},

		zl_menuclose: function() {
			if( winsize > 737 ){
				/* Enable again the page scroll */
				$('body').off('scroll touchmove mousewheel');
			}

			$('ul.zl_bt_menu > li').eachStep(50, function(i, el, duration) {
				$(el).velocity({
					translateY: '-70%',
					opacity: 0
				}, {
					duration: 300,
					visibility: "visible",
					easing: "easeOutCubic"
				});
			});

			$('.zl_batavia_menu').fadeOut();


			$('#zl_menucontainer').removeClass('appear');

			setTimeout(function() {
				$('#zl_menu-overlay').removeClass('addHeight');
			}, 150);

			setTimeout(function() {
				$('#zl_menu-overlay').removeClass('addWidth');
			}, 250);

			setTimeout(function() {
				$('.zl_bgr_menu_trigger').removeClass('zl_is_clicked');
			}, 400);

		},

		zl_sidebaropen: function() {
			if( winsize > 737 ){
				/* Disable Body scrolling */
				$('body').on('scroll touchmove mousewheel', function(e) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				});
			}
				

			/* Sidebar Black Overlay */
			$('#zl_sidebarcontainer_overlay').velocity('fadeIn', {
				duration: 100
			});

			/* Animate Sidebar's Outtest Box */
			$('#zl_sidebarcontainer').velocity({
				translateX: '-325px'
			}, {
				duration: 500,
				display: 'block',
				easing: "easeInOutExpo"
			}).addClass('appear');

			/* Display Actuall Sidebar Container */
			setTimeout(function() {
				$('#zl_sidebar').velocity('fadeIn');
				$('#zl_sidebar').find('.zl_widget').each(function(t) {
					$(this).velocity({
						translateX: [0, '70%'],
						opacity: 1
					}, {
						duration: 400,
						delay: (t * 75),
						visibility: "visible",
						easing: [0.175, 0.885, 0.330, 1.165]
					});
				});
			}, 350);

			/* Add Class Closer */
			$('.zl_sidebar_opener').addClass('closer');
		},

		zl_sidebarclose: function() {
			if( winsize > 737 ){
				/* Enable again the page scroll */
				$('body').off('scroll touchmove mousewheel');
			}

			/* Display the overlay */
			$('#zl_sidebarcontainer_overlay').velocity('fadeOut', {
				duration: 100
			});

			$('#zl_sidebar').find('.zl_widget').each(function(t) {
				$(this).velocity({
					translateX: ['70%', 0],
					opacity: 0
				}, {
					duration: 300,
					delay: (t * 40),
					visibility: "hidden",
					easing: "easeOutQuard"
				});
			});

			$('#zl_sidebarcontainer').velocity({
				translateX: '325px'
			}, {
				duration: 500,
				easing: "easeInOutExpo"
			}).removeClass('appear');

			$('#zl_sidebar').velocity('fadeOut');
			$('.zl_sidebar_opener').removeClass('closer');
		},

		zl_postlove: function() {
			$(document).on('click', '.sl-button', function() {
				var button = $(this);
				var post_id = button.attr('data-post-id');
				var security = button.attr('data-nonce');
				var iscomment = button.attr('data-iscomment');
				var allbuttons;
				if (iscomment === '1') { /* Comments can have same id */
					allbuttons = $('.sl-comment-button-' + post_id);
				} else {
					allbuttons = $('.sl-button-' + post_id);
				}
				var loader = allbuttons.next('.sl-loader');
				if (post_id !== '') {
					$.ajax({
						type: 'POST',
						url: simpleLikes.ajaxurl,
						data: {
							action: 'zl_process_simple_like',
							post_id: post_id,
							nonce: security,
							is_comment: iscomment
						},
						beforeSend: function() {
							loader.html();
						},
						success: function(response) {
							var icon = response.icon;
							var count = response.count;
							allbuttons.html(icon + count);
							if (response.status === 'unliked') {
								var like_text = simpleLikes.like;
								allbuttons.prop('title', like_text);
								allbuttons.removeClass('liked');
							} else {
								var unlike_text = simpleLikes.unlike;
								allbuttons.prop('title', unlike_text);
								allbuttons.addClass('liked');
							}
							loader.empty();
						}
					});

				}
				return false;
			});
		},

		zl_postshare: function() {
			if ($("#zl_share").length) {
				var imageToShare = jQuery('div.zl_single_thumb img:first').attr('src');
				jsSocials.setDefaults("pinterest", {
					media: imageToShare
				});
				$("#zl_share").jsSocials({
					shares: ["facebook", "googleplus", "linkedin", "pinterest", "twitter", "email"],
					showLabel: false,
					showCount: true
				});
			}
		},

		zl_mandatory: function() {
			var winsize = $(window).width();

			/* Fit any Video */
			$("iframe").parent().fitVids();

			$('.zl_single_detail > div > *').not('figure').not('img').each( function(){
				$(this).wrap('<div class="zl_single_excerpt"></div>');
			});

			/*Animate Menu Burger*/
			$('.zl_bgr_menu_trigger').stop().funcToggle('click', function() {
				ZL_Batavia.zl_menuopen();
			}, function() {
				ZL_Batavia.zl_menuclose();
			});

			/* BATAVIA MENU ANIMATION */
			$('#zl_menu-overlay').click(function() {
				$('.zl_bgr_menu_trigger').trigger('click');
			});

			$('ul.zl_bt_menu > li.menu-item-has-children > a').each(function() {
				var thisanchor = $(this),
					anchorparent = $(this).parent(); // .headermobile_menu > li
				thisanchor.append('<span class="icn icon-down-small"></span>');


				thisanchor.find('span.icn').funcToggle('click', function(e) {
					e.preventDefault();

					anchorparent.find('> ul').velocity("slideDown", {
						duration: 700,
						easing: "spring",
						complete: function() {
							thisanchor.find('span.icn').toggleClass('icon-down-small icon-up-small');
						}
					});

					anchorparent.find('ul li').each(function(i) {
						$(this).velocity({
							translateY: [0, '-100px'],
							opacity: [1, 0]
						}, {
							duration: 500,
							delay: i * 35,
							visibility: "visible",
							easing: [.22, 1.64, .63, 1.04]
						});
					});

				}, function(e) {
					e.preventDefault();
					anchorparent.find('> ul').velocity("slideUp", {
						duration: 400,
						easing: "easeInOutExpo",
						complete: function() {
							thisanchor.find('span.icn').toggleClass('icon-up-small icon-down-small');
						}
					});
				});
			});

			$('.zl_batavia_menu ul ul > li > a').each(function() {
				$(this).hover(function() {
					$(this).velocity({
						rotateZ: "2deg"
					}, 50);
				}, function() {
					$(this).velocity({
						rotateZ: "0"
					}, 50);
				});
			});

			/* Esc key */
			$(document).keyup(function(e) {
				if (e.keyCode == 27) {
					if ($('#zl_menucontainer.appear').length) {
						$('.zl_bgr_menu_trigger').trigger('click');
					};
					if ($('#zl_sidebarcontainer.appear').length) {
						$('.zl_sidebar_opener').trigger('click');
					};
				} // esc
			});
			// ================== // END Menu Triggering

			/* Start Sidebar Menu */
			$('.zl_sidebar_opener').funcToggle('click', function() {
				ZL_Batavia.zl_sidebaropen();
			}, function() {
				ZL_Batavia.zl_sidebarclose();
			});

			/* Trigger click when overlay clicked */
			$('#zl_sidebarcontainer_overlay, #zl_sidebarcloser').click(function() {
				$('.zl_sidebar_opener').trigger('click');
			});

			if( winsize > 737 ){
				/* Scrollbar for sidebar */
				$('#zl_sidebar').mCustomScrollbar({
					scrollInertia: 0,
					theme: 'minimal-dark',
					mouseWheel: {
						preventDefault: true,
						scrollAmount: 100
					}
				});

				/* Scrollbar for menu */
				$('.zl_batavia_menu').mCustomScrollbar({
					scrollInertia: 0,
					theme: 'minimal-dark',
					mouseWheel: {
						preventDefault: true,
						scrollAmount: 100
					}
				});
			}
				

			/* SHORTLINK Click */
			$('.zl_shortlink').each(function() {
				$(this).click(function() {
					$(this).selectText();
				});
			});

			/* Sticky menu when scroll up */
			var lastScrollTop = 0;
			var bodytop = $('body').offset().top;

			/* If the refreshed page is in the middle of window, then hide it */
			if( $('.zl_mainmenu').offset().top > bodytop ){
				$('.zl_mainmenu').hide();
			}

			/* If scroll up, show it, vice-versa */
			$(window).scroll(function(event) {
				var st = $(this).scrollTop(),
					width = $(window).width();

				if (st > lastScrollTop) {
					// down scroll
					if( st > 5 ){
						$('.zl_mainmenu').hide().removeClass('addbg');
					} 
				} else {
					// upscroll code
					$('.zl_mainmenu').show().addClass('addbg');
				}
				// remove background if the page is on the top
				if( st < 10 ){
					$('.zl_mainmenu').show().removeClass('addbg');
				}
				lastScrollTop = st;
			});


		},
	}; // End return {}
})(jQuery);

// load when ready
jQuery(function($) {
	"use strict";
	/* Initiate */
	ZL_Batavia.init();
	ZL_Batavia.zl_postanim();
	$(window).smartresize(function(){
		setTimeout(function() {
			ZL_Batavia.zl_postanim();
		}, 1000);
	});
});

/* In case there is code that needs to fire after page finished load */
jQuery(window).load(function() {
	"use strict";
});