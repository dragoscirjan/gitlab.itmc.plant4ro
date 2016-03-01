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
import 'parsleyjs';
import 'parsleyjs/dist/i18n/ro';
import * as braintree from 'braintree/braintree-web';

// ParsleyDefaults.classHandler = function (ParsleyField) {};
// ParsleyDefaults.errorsContainer = function (ParsleyField) {};

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
        let self = this;
        this.http = appConfig.configHttp(http);

        window.toggleRecaptchaValidate = (result) => {
            self.toggleRecaptchaValidate(result);
        };

        window.Parsley.on('field:error', (e) => {
            e.$element.closest('.form-wrap').removeClass('success').addClass('error');
            setTimeout(() => {
                let $errorList = e.$element.closest('.form-wrap').find('.parsley-errors-list');
                // $(e.$element).tooltip({
                e.$element.closest('.form-wrap').tooltip({
                    title: $errorList.text(),
                    placement: 'right',
                    trigger: 'hover focus'
                });
                $errorList.remove();
            }, 100);
        });
        window.Parsley.on('field:success', (e) => {
            e.$element.closest('.form-wrap').removeClass('error').addClass('success').tooltip('destroy');
        });
        window.Parsley.setLocale('ro');
    }

    /**
     * Activate event
     * @see ViewModelAbstract#activate
     * @method activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        const self = this;
        return this.http.fetch('curs-valutar')
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

    /**
     * Attached event
     * @see ViewModelAbstract#attached
     * @method attached
     */
    attached() {
        this.toggleRangeSlider();
        this.toggleCorporate();
    }

    /**
     * [paymentModel description]
     * @method paymentModel
     * @return {Object}     [description]
     */
    get paymentModel() {
        return {
            company: this.company,
            vat: this.vatNumber,
            name: this.name,
            email: this.email,
            phone: this.phone,
            payment: {
                total: this.total,
                totalEur: this.totalInEur,
                method: this.payMethod,
                exchange: this.exchangeRate,
                currency: 'EUR'
            },
            anonymous: this.anonymous,
            agreement: this.agreement,
            recaptcha: grecaptcha.getResponse()
        };
    }

    /**
     * [paymentWithBraintree description]
     * @method paymentWithBraintree
     * @return {Promise}             [description]
     */
    paymentWithBraintreeInit() {
        let self = this;
        this.logger.debug('request:/ donate/braintree');
        return new Promise((resolve, reject) => {
            this.http.fetch('donate/braintree')
                .then(response => response.json())
                .then((data) => {
                    self.logger.debug('response:/ donate/braintree', data);
                    if (!data.error) {
                        self.paymentWithBraintreeForm(data.token)
                            .catch((error) => { reject(error); })
                            .then((token) => { resolve(token); });
                    } else {
                        self.logger.warn(error);
                        reject(data);
                    }
                });
        });
    }

    /**
     * [paymentWithBraintreeForm description]
     * @method paymentWithBraintreeForm
     * @param  {string}                 token [description]
     * @return {[type]}                       [description]
     */
    paymentWithBraintreeForm(token) {
        let self = this;
        return new Promise((resolve, reject) => {
            $('#braintree-modal')
                .modal('show')
                .on('shown.bs.modal', () => {
                    let checkout = null;
                    braintree.setup(token, 'dropin', {
                        onReady: (ready) => { checkout = ready; },
                        onPaymentMethodReceived: (payload) => {
                            self.logger.debug('braintree:/ ', payload);
                            // self.paymentWithBraintreeProceed(payload)
                            //     .catch((error) => {  reject(error); })
                            //     .then((resultToken) => { resolve(resultToken); });
                        },
                        onError: (error) => { self.logger.warn(error); reject(error); },
                        container: 'braintree-payment-form'
                    });

                    $('#braintree-modal .btn-primary').off('click').on('click', (event) => {
                        event.preventDefault();
                        checkout.paypal.initAuthFlow();
                    });
                });
        });
    }

    /**
     * [paymentWithBraintreeProceed description]
     * @method paymentWithBraintreeProceed
     * @param  {[type]}                    payload [description]
     * @return {[type]}                            [description]
     */
    paymentWithBraintreeProceed(payload) {

    }

    /**
     * [proceedToPayment description]
     * @method proceedToPayment
     * @return {[type]}         [description]
     */
    proceedToPayment() {
        let promise = null;
        if (this.paymentModel.recaptcha.length > 0 && this.formInstance.isValid()) {
            this.logger.debug('Starting payment with:', this.paymentModel);
            switch (this.paymentModel.payment.method) {
                case 'mobilpay':
                    promise = this.paymentWithMobilpay();
                    break;
                case 'braintree':
                    promise = this.paymentWithBraintreeInit();
                    break;
                case 'wire':
                    promise = this.paymentWithWire();
                    break;
                default:
                    this.logger.warn('Wrong payment method selected');
            }
            if (promise) {
                // @TODO:
            }
        }
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
        this.formInstance = $('#donationsForm').parsley();
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
    toggleRecaptchaValidate(result) {
        this.notRobot = true;
    }
}
