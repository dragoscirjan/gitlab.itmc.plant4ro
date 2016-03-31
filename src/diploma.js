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

import jsPDF from 'jspdf';
console.log('CURVE', jsPDF);

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

    /**
     * Create PDF from element in page
     * @param  {Object} $elem - jQuery element to convert to PDF
     */
    pdf() {
        let pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        let source = $('#diploma').get(0);

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        // specialElementHandlers = {
        //     // element with id of "bypass" - jQuery style selector
        //     '#bypassme': function (element, renderer) {
        //         // true = "handled elsewhere, bypass text extraction"
        //         return true
        //     }
        // };

        let margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 'auto'
        };

        console.log('XAXAXAXA', pdf);

        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        // pdf.fromHTML(
        //     source, // HTML string or DOM elem ref.
        //     margins.left, // x coord
        //     margins.top, // y coord
        //     {
        //         'width': margins.width // max width of content on PDF
        //         // 'elementHandlers': specialElementHandlers
        //     },
        //     function (dispose) {
        //         // dispose: object with X, Y of the last line add to the PDF
        //         //          this allow the insertion of new lines after html
        //         pdf.save('Test.pdf');
        //     },
        //     margins
        // );
    }

    print() {
        window.print();
    }

}
