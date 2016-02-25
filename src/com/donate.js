/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {Validation} from 'aurelia-validation';
// import {ensure} from 'aurelia-validation';

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

// import {Recaptcha} from 'google-recaptcha';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

import 'bootstrap-slider';

/**
 * Component for donations
 *
 */
@inject(AppConfig, HttpClient, Validation)
export class Component extends ViewModelAbstract {

    /**
     * Component Title
     * @type {String}
     */
    heading = 'Planteaza!';

    /**
     * Payment Form => Name
     * @type {String}
     */
    // @ensure(function(it) { it.isNotEmpty(); })
    name = '';

    /**
     * [company description]
     * @type {String}
     */
    company = '';

    /**
     * [vatNumber description]
     * @type {String}
     */
    vatNumber = '';

    /**
     * Payment Form => Email
     * @type {String}
     */
    // @ensure(function(it) { it.isNotEmpty().isEmail(); })
    email = '';

    /**
     * Payment Form => Trees Quantity
     * @type {Number}
     */
    treesQty = 10;

    /**
     * Payment Form => Friends to plant with
     * @type {Array}
     */
    friends = [];

    /**
     * Payment Form => Pay as anonymous
     * @type {Number}
     */
    anonymous = 0;

    /**
     * Payment Form => Agree with terms and conditions
     * @type {Number}
     */
    agreement = 0;

    /**
     * [payMethod description]
     * @type {String}
     */
    payMethod = 'mobilpay';

    /**
     * [notRobot description]
     * @type {Boolean}
     */
    notRobot = false;

    /**
     * [total description]
     * @type {Number}
     */
    get total() {
        return this.treesQty * 10;
    }

    /**
     * [treesPriceCurrency description]
     * @method treesPriceCurrency
     * @return {[type]}           [description]
     */
    get totalInEur() {
        return this.exchangeRate ? Math.floor(this.treesPrice / this.exchangeRate * 100) / 100 : 0;
    }

    /**
     * [exchangeRate description]
     * @type {Number}
     */
    exchangeRate = 0;

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(appConfig, http, validation) {
        super(appConfig);
        this.exchange = appConfig.configHttp(http);
        this.validation = this.configValidation(validation);
        // this.validation = validation.on(this);
    }

    /**
     * Activate event
     * @see ViewModelAbstract#activate
     * @method activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        const self = this;
        if (window.location.hostname !== 'localhost') {
            return this.exchange.fetch('curs-valutar')
                .catch(error => { self.logger.warn('Getting exchange rates failed with error', error); })
                .then(response => response.json())
                .then((data) => {
                    self.logger.debug('Exchange rates obtained:', data);
                    if (!data.error) {
                        self.exchangeRate = data.exchange.DataSet.Body.Cube.Rate.filter(v => { return v['-currency'] === 'EUR'; })[0]['#text'];
                    } else {
                        self.exchangeRate = 0;
                    }
                });
        }
    }

    /**
     * Attached event
     * @see ViewModelAbstract#attached
     * @method attached
     */
    attached() {
        this.toggleRangeSlider();
    }

    /**
     * Configure validation model
     * @method configValidation
     * @param  {[type]}         validation [description]
     * @return {[type]}                    [description]
     */
    configValidation(validation) {
        return validation.on(this)
            // .ensure('company', (config) => { config.computedFrom(['isCorporate', 'company']); })
            //     .if(() => { return subject.isCorporate; })
            //         .isNotEmpty()
            //     .endIf()
            // .ensure('vatNumber', (config) => { config.computedFrom('isCorporate'); })
            //     .if(() => { return subject.isCorporate; })
            //         .isNotEmpty()
            //         .matches(/^(RO)?\d{6,10}$/)
            //     .endIf()
            .ensure('name')
                .isNotEmpty('Numele este obligatoriu')
            .ensure('email')
                .isNotEmpty()
                .isEmail()
            // .ensure('phone', (config) => { config.computedFrom('isCorporate'); } )
            //     .if(() => { return subject.isCorporate; })
            //         .isNotEmpty()
            //         .matches(/^(\+|00)?\d+$/)
            //     .endIf()
            ;
    }

    /**
     * [proceedToPayment description]
     * @method proceedToPayment
     * @return {[type]}         [description]
     */
    proceedToPayment() {
        const self = this;
         //the validate will fulfil when validation is valid, and reject if not
        this.validation.validate().then(() => {
            alert(`Welcome, ${this.name}! `);
        }).catch((e) => {
            self.logger.warn(e);
        });
    }

    /**
     * Mark if donation is corporate or not
     * @type {Boolean}
     */
    isCorporate = true;

    /**
     * Toggle if donation is corporate or not
     * @method toggleCorporate
     */
    toggleCorporate() {
        this.isCorporate = !this.isCorporate;
    }

    /**
     * Mark if ranger slider was started
     * @type {Boolean}
     */
    isRangerSliderActive = false;

    /**
     * Initialize range slider
     */
    toggleRangeSlider() {
        const self = this;
        if (!this.isRangerSliderActive) {
            $('#treesQty')
                .slider()
                .on('slide slideStop', function(slideEvt) {
                    self.treesQty = slideEvt.value;
                });
        }
    }

    /**
     * [onRecaptchaVerified description]
     * @method onRecaptchaVerified
     * @return {[type]}            [description]
     */
    toggleRecaptchaValidate(e) {
        this.logger.debug(e);
        this.notRobot = true;
    }
}
