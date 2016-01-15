/**
 * Custom scripts
 */

(function($) {

    $(document).ready(function() {
        $("#slider").revolution({
            sliderType: "standard",
            sliderLayout: "fullscreen",
            delay: 10000,
            navigation: {
                arrows: {enable: false},
                onHoverStop: 'off',
            },
            gridwidth: 1230,
            gridheight: 720
        });
    });

})(jQuery);
