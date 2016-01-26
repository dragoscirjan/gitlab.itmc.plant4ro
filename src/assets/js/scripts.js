/**
 * Custom scripts
 */

(function($) {

    $(document).ready(function() {
        // Revolution slider initialization
        $("#slider").revolution({
            sliderType: "standard",
            sliderLayout: "fullscreen",
            delay: 10000,
            navigation: {
                arrows: {enable: false},
                onHoverStop: 'off',
            },
            responsiveLevels: [1200, 992, 768, 480],
            gridwidth: [1200, 992, 768, 480],
            gridheight: [500, 450, 400, 350]
        });

        // Magnific popup initialization
        $('.mfp-trigger').magnificPopup();
    });

})(jQuery);
