/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

/**
 * Component for homePage
 *
 */
@inject(AppConfig, HttpClient)
export class Component extends ViewModelAbstract {

    /**
     * @type {String}
     */
    heading = 'Planteaza pentru Romania';

    /**
     * [treeCount description]
     * @type {String}
     */
    treeCount = '203.491'

    /**
     * [donatorList description]
     * @type {Array}
     */
    donatorList = [];

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(appConfig, http) {
        super(appConfig);
        this.http = appConfig.configHttp(http);
    }

    /**
     * @see ViewModelAbstract#activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        return this.updateTreeCount();
    }

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        this.initSliders();
        this.updateDonatorList();
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
    toggleDonatorsActive = true;

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
        // setTimeout(() => { self.updateTreeCount(); }, this.setTimeoutTreeCount);
        if (window.location.hostname === 'localhost') {
            this.logger.warn(`You're running under ${window.location}. /services/tree-count is not available.`);
            return null;
        }
        this.logger.debug('Calling /services/tree-count');
        return this.http.fetch('tree-count')
            .then(response => response.json())
            .then((data) => {
                self.logger.debug('Tree count obtained:', data);
                if (!data.error) {
                    self.treeCount = (data.treeCount.length < 4) ? data.treeCount : data.treeCount.replace(/(\d{3})$/, $1 => { return '.' + $1; });
                } else {
                    self.treeCount = 100.000;
                }
            });
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
        this.logger.debug('Calling /services/donator-list');
        return this.http.fetch('donator-list')
            .then(response => response.json())
            .then((data) => {
                self.logger.debug('Donator list obtained:', data);
                if (!data.error) {
                    self.appendDonatorList(data.list);
                    if (!self.drawDonatorListCalled) {
                        self.drawDonatorList();
                        self.drawDonatorListCalled = true;
                    }
                } else {
                    self.donatorList = [];
                }
            });
    }

    /**
     * [drawDonatorList description]
     * @method drawDonatorList
     * @return {[type]}        [description]
     */
    drawDonatorList() {
        const self = this;
        const $ul = $('#donationList');

        this.logger.debug('Drawing donator list', this.donatorList);

        setTimeout(() => { self.drawDonatorList(); }, 2000);

        if (!this.donatorList.length) {
            return;
        }

        if ($ul.find('li').length > 0) {
            const $li = $ul.find('li:first');
            $li.slideUp('slow', () => { $li.remove(); });
            $ul.append(this.drawDonator(this.donatorList.shift()));
            $ul.find('li:last').hide().slideDown('slow');
        } else {
            $ul.append(this.drawDonator(this.donatorList.shift()));
            $ul.append(this.drawDonator(this.donatorList.shift()));
            $ul.append(this.drawDonator(this.donatorList.shift()));
            $ul.append(this.drawDonator(this.donatorList.shift()));
        }
    }

    /**
     * [drawDonatorListCalled description]
     * @type {Boolean}
     */
    drawDonatorListCalled = false;

    /**
     * [drawDonator description]
     * @method drawDonator
     * @param  {[type]}    donator [description]
     * @return {[type]}            [description]
     */
    drawDonator(donator) {
        // this.logger.debug('Drawing donator', donator);
        return `<li class="donation__item" data-hash="${donator.hash}">
            <div class="donator">
                <div class="donator__details">
                    <span class="donator__name">${donator.name}</span>
                    <span class="donator__location">${donator.location}</span>
                </div>
                <span class="donator__donation">${donator.trees}</span>
            </div>
        </li>`;
    }

    /**
     * [appendDonatorList description]
     * @method appendDonatorList
     * @param  {Array}          list [description]
     */
    appendDonatorList(list) {
        const self = this;
        list.forEach((donator, i) => {
            if (!self.donatorList.filter(v => { return v.hash === donator.hash; }).length) {
                self.donatorList.push(donator);
            }
        });
    }

}
