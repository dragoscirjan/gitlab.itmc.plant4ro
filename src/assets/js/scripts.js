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
            responsiveLevels: [1200, 992, 768, 480],
            gridwidth: [1200, 992, 768, 480],
            gridheight: [500, 450, 400, 350]
        });
    });

})(jQuery);
