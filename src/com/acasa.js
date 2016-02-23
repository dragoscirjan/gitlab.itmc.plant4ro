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
     * [donatorsCount description]
     * @type {String}
     */
    donatorsCount = '203.491'

    /**
     * @see ViewModelAbstract#activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);

        // return new Promise();
        // TODO: Load numer of trees
    }

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        const self = this;

        this.initSliders();

        setTimeout(() => { self.updateTreeCount(); }, this.setTimeoutTreeCount);
        setTimeout(() => { self.updateDonatorList(); }, this.setTimeoutDonatorList);
    }

    /**
     * Initialize sliders on this page
     * @method initSliders
     */
    initSliders() {
        this.logger.debug('Starting owl-slider');

        // HP has two carousel that need to be synced
        const $sliderImg = $('#owlCarouselHPImg');
        const $sliderTxt = $('#owlCarouselHPTxt');

        $('#owlCarouselHPImg').owlCarousel({
            autoPlay: true,
            stopOnHover: false,
            navigation: false,
            pagination: false,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: false,
            transitionStyle: 'fade'
        });

        $('#owlCarouselHPTxt').owlCarousel({
            autoPlay: true,
            stopOnHover: false,
            navigation: false,
            pagination: true,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: true,
            transitionStyle: 'fade',
            afterInit: function(slider) {
                // $('.owl-controls').addClass('container container--carousel-pagination hidden-xs');
                // const $currentSlide = $(this.owl.userItems[this.owl.currentItem]);
                // self.imgTrigger($currentSlide);
                // Move the controls before the content
                this.owlControls.prependTo(slider);
            },
            beforeMove: function() {
                // $('#bgImg').fadeOut('fast');
            },
            afterMove: function() {
                // const $currentSlide = $(this.owl.userItems[this.owl.currentItem]);
                // self.imgTrigger($currentSlide);
                // $('#bgImg').fadeIn('fast');
            }
        });

        $sliderTxt.on('click', '.owl-page', function(e) {
            // e.preventDefault();
            const number = $(this).data('owlPage');
            $sliderImg.trigger('owl.goTo', number);
        });
    }

    /**
     * [toggleDonatorsActive description]
     * @type {Boolean}
     */
    toggleDonatorsActive = false;

    /**
     * [toggleDonators description]
     * @method toggleDonators
     */
    toggleDonators() {
        this.toggleDonatorsActive = !this.toggleDonatorsActive;
    }

    /**
     * [setTimeoutTreeCount description]
     * @type {Number}
     */
    setTimeoutTreeCount = 5000;

    /**
     * [updateTreeCount description]
     * @method updateTreeCount
     * @return {Promise}          [description]
     */
    updateTreeCount() {
        const self = this;
        setTimeout(() => { self.updateTreeCount(); }, this.setTimeoutTreeCount);
        // TODO: Create the HTTP call for tree count
    }

    /**
     * [setTimeoutDonatorList description]
     * @type {Number}
     */
    setTimeoutDonatorList = 10000;

    /**
     * [updateDonatorList description]
     * @method updateDonatorList
     * @return {Promise}          [description]
     */
    updateDonatorList() {
        const self = this;
        setTimeout(() => { self.updateDonatorList(); }, this.setTimeoutDonatorList);
        // TODO: Create the HTTP call for donator list
    }

}
