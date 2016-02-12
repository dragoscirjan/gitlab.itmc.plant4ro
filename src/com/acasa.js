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
        this.donationToggleInit();
    }

    /**
     * [imgTrigger description]
     * @param  {[type]} $currentSlide [description]
     * @return {[type]}               [description]
     */
    imgTrigger($currentSlide) {
        const imgSrc = $currentSlide.data('img');
        const imgUrl = 'url("' + imgSrc + '")';

        if (!$('#bgImg').length) {
            $('#wrapper').prepend('<div id="bgImg" class="bg-img"/>');
        } else {
            $('#bgImg').css('background-image', imgUrl);
        }

    }

    /**
     * Initialize sliders on this page
     * @method initSliders
     */
    initSliders() {
        const self = this;
        this.logger.debug('Starting owl-slider');

        $('#owlCarouselHP').owlCarousel({
            // autoPlay: true,
            stopOnHover: true,
            navigation: false,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            // autoHeight: true,
            transitionStyle: 'fade',
            afterInit: function() {
                // $('.owl-controls').addClass('container container--carousel-pagination hidden-xs');
                const $currentSlide = $(this.owl.userItems[this.owl.currentItem]);
                self.imgTrigger($currentSlide);
            },
            beforeMove: function() {
                // $('#bgImg').fadeOut('fast');
            },
            afterMove: function() {
                const $currentSlide = $(this.owl.userItems[this.owl.currentItem]);
                self.imgTrigger($currentSlide);
                // $('#bgImg').fadeIn('fast');
            }
        });
    }

    /**
     * Initialize donation toggle sidebar
     * @return {[type]} [description]
     */
    donationToggleInit() {
        const $donation = $('#donation');

        $('#donationToggler').on('click', function() {
            if (!$donation.hasClass('is-donation-open')) {
                $donation.addClass('is-donation-open');
                return;
            }
            $donation.removeClass('is-donation-open');
        });

        $('#donationClose').on('click', function() {
            $donation.removeClass('is-donation-open');
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
