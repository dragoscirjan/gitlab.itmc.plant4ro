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
     * Current List of Donators
     * @type {Array}
     */
    donatorsQueue = [];

    /**
     * List of already drawn donators
     * @type {Array}
     */
    donatorsDrawn = [];

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
     * Append donators from database to drawing queue
     * @method appendDonatorsQueue
     */
    appendDonatorsQueue(list) {
        const self = this;
        list.forEach((donator, i) => {
            // first search if donator was already shown (could happen)
            let isUsedDonator = self.donatorsDrawn.filter(v => { return v === donator.hash; }).length;
            if (isUsedDonator) {
                return;
            }
            // second search if donator is already in queue (can happen)
            let isInCurrentList = self.donatorsQueue.filter(v => { return v.hash === donator.hash; }).length;
            if (isInCurrentList) {
                return;
            }
            // add donator to queue
            self.donatorsQueue.push(donator);
            // if donator list is higher than 50, shift the first one
            if (self.donatorsQueue.length > 50) {
                self.donatorsQueue.shift();
                // self.donatorsDrawn.shift();
            }
        });
        // call log
        this.logger.debug('Donator list updated: ', this.donatorsQueue);
    }

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        this.initSliders();
        this.updateDonatorsQueue();
    }

    /**
     * Generate donator HTML
     * @method drawDonator
     * @param  {Object}    donator
     * @return {String}
     */
    drawDonator(donator) {
        this.logger.debug('Drawing donator', donator);
        this.donatorsDrawn.push(donator.hash);
        // return template
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
     * Draw donations (recursive at 2 seconds)
     * @method drawDonatorsQueue
     */
    drawDonatorsQueue() {
        let self = this;
        let $ul = $('#donationList');
        // log call
        this.logger.debug('Drawing donator list', this.donatorsQueue);
        // recursive call
        setTimeout(() => { self.drawDonatorsQueue(); }, 2000);
        // if donator list is empty, exit
        if (!this.donatorsQueue.length) {
            return;
        }
        // if drawing list is empty, draw four elements
        if (this.donatorsDrawn.length === 0) {
            let limit = this.donatorsQueue.length < 4 ? this.donatorsQueue.length : 4;
            for (let i = 0; i < limit; i++) {
                $ul.append(this.drawDonator(this.donatorsQueue.shift()));
            }
        }
        // if 1st 4 are drawn and list is not visible, just exit
        if (this.donatorsDrawn.length && !this.toggleDonatorsActive) {
            return;
        }
        // if donators queue is empty, just exit
        if (!this.donatorsQueue.length) {
            return;
        }
        // hide first item in list & remove it when hidden
        $ul.find('> li:first').slideUp('slow', () => { $li.remove(); });
        // add a new item in list
        $ul.append(this.drawDonator(this.donatorsQueue.shift()));
        // and show it
        $ul.find('> li:last').hide().slideDown('slow');
    }

    /**
     * [drawDonatorsQueueCalled description]
     * @type {Boolean}
     */
    drawDonatorsQueueCalled = false;

    /**
     * Initialize sliders on this page
     * @method initSliders
     */
    initSliders() {
        this.logger.debug('Starting owl-slider');

        // HP has two carousel that need to be synced
        const $sliderImg = $('#owlCarouselHPImg');
        const $sliderTxt = $('#owlCarouselHPTxt');

        $sliderImg.owlCarousel({
            autoPlay: true,
            stopOnHover: false,
            navigation: false,
            pagination: false,
            paginationSpeed: 3000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: false,
            transitionStyle: 'fade'
        });

        $sliderTxt.owlCarousel({
            autoPlay: true,
            stopOnHover: false,
            navigation: false,
            pagination: true,
            paginationSpeed: 3000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: true,
            transitionStyle: 'fade',
            afterInit: function(slider) {
                // Move the controls before the content
                this.owlControls.prependTo(slider);
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
     * [setTimeoutdonatorsQueue description]
     * @type {Number}
     */
    setTimeoutdonatorsQueue = 10000;

    /**
     * Calls service and manages array and html (recursive each `setTimeoutdonatorsQueue` seconds)
     * @method updateDonatorsQueue
     */
    updateDonatorsQueue() {
        const self = this;
        setTimeout(() => { self.updateDonatorsQueue(); }, this.setTimeoutdonatorsQueue);
        // if I still have donators in list and html is not visible, exit
        if (this.donatorsQueue.length > 0 && !this.toggleDonatorsActive) {
            return;
        }
        // log call
        this.logger.debug('Calling /services/donator-list');
        // http service call
        this.http
            .fetch('donator-list')
            .then(response => response.json())
            .then((data) => {
                // log obtained list
                self.logger.debug('Donator list obtained:', data);
                if (!data.error) {
                    // add donators to list
                    self.appendDonatorsQueue(data.list);
                    // prevent drawing from being called twice in the same time
                    if (!self.drawDonatorsQueueCalled) {
                        // call drawer
                        self.drawDonatorsQueue();
                        // mark drawer as called
                        self.drawDonatorsQueueCalled = true;
                    }
                } else {
                    self.donatorsQueue = self.donatorsQueue ? self.donatorsQueue : [];
                }
            });
    }

}
