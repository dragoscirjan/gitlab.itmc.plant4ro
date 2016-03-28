//import {computedFrom} from 'aurelia-framework';

import {ViewModelAbstract} from 'lib/view/model/abstract';

export class Proiect extends ViewModelAbstract {

    /**
     * @type {String}
     */
    heading = 'Multumim pentru Donatie';

    /**
     * Activate event
     * @see ViewModelAbstract#activate
     * @method activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        this.params = params;
    }

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        this.initSliders();
        if (this.params.mode && this.params.mode === 'print') {
            $('body').addClass('print');
        }
    }

    /**
     * Initialize sliders on this page
     * @method initSliders
     */
    initSliders() {
        this.logger.debug('Starting owl-slider');

        // HP has two carousel that need to be synced
        const $slider = $('#owlCarouselDiploma');

        $slider.owlCarousel({
            autoPlay: true,
            stopOnHover: false,
            navigation: true,
            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: false
            // transitionStyle: 'fade'
        });
    }

}
