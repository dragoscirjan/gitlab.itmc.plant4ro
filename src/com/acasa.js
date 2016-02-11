/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {ViewModelAbstract} from 'lib/view/model/abstract';

/**
 *
 */
export class Acasa extends ViewModelAbstract {

    /**
     * @type {String}
     */
    heading = 'Planteaza pentru Romania';

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        this.initSliders();
    }

    /**
     * Initialize sliders on this page
     * @method initSliders
     */
    initSliders() {
        this.logger.debug('Starting owl-slider');
        $('#owlCarouselHP').owlCarousel({
            autoPlay: false,
            stopOnHover: true,
            navigation: false,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            // autoHeight: true,
            transitionStyle: 'fade',
            afterInit: function() {
                $('.owl-controls').addClass('container container--carousel-pagination hidden-xs');
            }
        });
    }

    // updateTreeCount() {
    //     //
    // }
    //
    // updateDonatorLit() {
    //     //
    // }
    //
    // doShowDontaorList() {
    //     //
    // }
    //
    // doHideDonatorList() {
    //     //
    // }

}
