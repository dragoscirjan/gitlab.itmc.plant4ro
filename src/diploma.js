/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {inject} from 'aurelia-framework';
import 'fetch';
// import {HttpClient, json} from 'aurelia-fetch-client';
import {HttpClient} from 'aurelia-fetch-client';

// import {Recaptcha} from 'google-recaptcha';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

/**
 * Component for donations
 *
 */
@inject(AppConfig, HttpClient)
export class Component extends ViewModelAbstract {

    /**
     * @type {String}
     */
    heading = 'Multumim pentru Donatie';

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(appConfig, http, validation) {
        super(appConfig);
        this.http = appConfig.configHttp(http);
    }

    /**
     * Activate event
     * @see ViewModelAbstract#activate
     * @method activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        this.params = params;
        this.logger.debug('Page params: ', this.params);
        return this.fetchDonationInfo(this.params.t);
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
     * @method fetchMobilpayInfo
     * @param  {String}  t
     * @return {Promise}
     */
    fetchDonationInfo(t) {
        let self = this;
        return self.http
            .fetch(`donation/${t}`)
            .catch(error => {
                self.logger.warn('Getting exchange rates failed with error', error);
            })
            .then(response => response.text())
            .then((data) => {
                self.donation = self.appConfig.decode(data);
                self.logger.debug('Donation discovered', self.donation);
            });
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

    print() {
        window.print();
    }

}
