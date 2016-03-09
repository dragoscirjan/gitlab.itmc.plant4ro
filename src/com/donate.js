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
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';

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
     * To save to database model
     * @type {Object}
     */
    model = {
        name: '', // Donator name
        email: '', // Donator email
        company: '', // Donator Company
        vat: '', // Donator Company VAT,
        friends: [], // Donator's Friends @TODO: NOT Implemented yet
        anonymous: false, // Donator wants to remain anonymous
        trees: 10, // Donation => Tree Number

        donation: {
            method: 'mobilpay',
            exchange: 0
            // currency: 'RON' // can be RON | EUR ; not needed because we can diferentiate currency by method

        }
    }

    /**
     * Mark if donation is corporate or not
     * @type {Boolean}
     */
    isCorporate = true;

    /**
     * [notRobot description]
     * @type {Boolean}
     */
    notRobot = false;

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
        let self = this;
        // get exchange value
        return this.http.fetch('curs-valutar')
            .catch(error => { self.logger.warn('Getting exchange rates failed with error', error); })
            .then(response => response.json())
            .then((data) => {
                self.logger.debug('Exchange rates obtained:', data);
                if (!data.error) {
                    self.model.donation.exchange = data.exchange.DataSet.Body.Cube.Rate.filter(v => { return v['-currency'] === 'EUR'; })[0]['#text'];
                    self.logger.debug('Exchange rates obtained EUR:', self.model.donation.exchange);
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
        let recaptcahaResponse = '';
        try {
            recaptcahaResponse = grecaptcha.getResponse();
        } catch (err) {
            // this.logger.warn(err);
        }
        let model = $.extend(true, this.model, {
            recaptcha: recaptcahaResponse
        });
        model.donation.total = model.trees * 10;
        model.donation.totalEur = Math.floor(model.donation.total / this.model.donation.exchange * 100) / 100;
        return model;
    }

    /**
     * [paymentModel description]
     * @method paymentModel
     * @return {[type]}     [description]
     */
    set paymentModel(val) {

    }

    // /**
    //  * [paymentWithBraintree description]
    //  * @method paymentWithBraintree
    //  * @return {Promise}             [description]
    //  */
    // paymentWithBraintreeInit() {
    //     let self = this;
    //     this.logger.debug('request:/ donate/braintree-token');
    //     return new Promise((resolve, reject) => {
    //         this.http.fetch('donate/braintree-token')
    //             .then(response => response.json())
    //             .then((data) => {
    //                 self.logger.debug('response:/ donate/braintree-token', data);
    //                 if (!data.error) {
    //                     self.paymentWithBraintreeForm(data.token)
    //                         .catch((error) => { reject(error); })
    //                         .then((token) => { resolve(token); });
    //                 } else {
    //                     self.logger.warn(error);
    //                     reject(data);
    //                 }
    //             });
    //     });
    // }
    //
    // /**
    //  * [paymentWithBraintreeForm description]
    //  * @method paymentWithBraintreeForm
    //  * @param  {string}                 token [description]
    //  * @return {[type]}                       [description]
    //  */
    // paymentWithBraintreeForm(token) {
    //     let self = this;
    //     return new Promise((resolve, reject) => {
    //         // let checkout = null;
    //         $('#braintree-modal')
    //             .modal('show')
    //             .on('shown.bs.modal', () => {
    //                 if (window.btCheckout) {
    //                     return;
    //                 }
    //                 braintree.setup(token, 'dropin', {
    //                     onReady: (ready) => { window.btCheckout = ready; /*console.log(checkout);*/ },
    //                     onPaymentMethodReceived: (payload) => {
    //                         self.logger.debug('braintree:/ ', payload);
    //                         payload.token = token;
    //                         self.paymentWithBraintreeProceed(payload)
    //                             .catch((error) => {  reject(error); })
    //                             .then((resultToken) => { resolve(resultToken); });
    //                     },
    //                     onError: (error) => { self.logger.warn(error); reject(error); },
    //                     container: 'braintree-payment-form'
    //                 });
    //                 // console.log(braintree);
    //
    //                 $('#braintree-modal .btn.btn--sm.btn--secondary').off('click').on('click', (event) => {
    //                     $('#braintree-modal form input').trigger('click', event);
    //                 });
    //             });
    //             // .on('hidden.bs.modal', () => {
    //             //     checkout.teardown(() => { checkout = null; });
    //             //     $('#braintree-payment-form').html('');
    //             // });
    //     });
    // }
    //
    // /**
    //  * [paymentWithBraintreeProceed description]
    //  * @method paymentWithBraintreeProceed
    //  * @param  {[type]}                    payload [description]
    //  * @return {[type]}                            [description]
    //  */
    // paymentWithBraintreeProceed(payload) {
    //     let pay = this.paymentModel;
    //     let self = this;
    //     pay.payment.payload = payload;
    //     this.logger.debug(this.http);
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             error: (jqXHR, status, reason) => { reject(reason); },
    //             data: { load: btoa(JSON.stringify(pay)) },
    //             dataType: 'json',
    //             headers: {
    //                 'X-Request-Playload': payload.nonce
    //             },
    //             method: 'post',
    //             success: (token) => { resolve(token); },
    //             url: self.appConfig.getPhpUrl('donate/braintree')
    //         });
    //     });
    // }
    //
    // /**
    //  * [paymentWithMobilpayInit description]
    //  * @method paymentWithMobilpayInit
    //  * @return {Promise}                [description]
    //  */
    // paymentWithMobilpayInit() {
    //     let self = this;
    //     this.logger.debug('request:/ donate/mobilpay-token');
    //     return new Promise((resolve, reject) => {
    //         this.http.fetch('donate/mobilpay-token', {
    //             method: 'post',
    //             body: json({ load: btoa(self.paymentModel) })
    //         })
    //             .then(response => response.json())
    //             .then((data) => {
    //                 self.logger.debug('response:/ donate/mobilpay-token', data);
    //                 if (!data.error) {
    //                     self.paymentWithBraintreeForm(data.token)
    //                         .catch((error) => { reject(error); })
    //                         .then((token) => { resolve(token); });
    //                 } else {
    //                     self.logger.warn(error);
    //                     reject(data);
    //                 }
    //             });
    //     });
    // }

    /**
     * [proceedToPayment description]
     * @method proceedToPayment
     * @return {[type]}         [description]
     */
    proceedToPayment() {
        let promise = null;
        let self = this;
        if (this.paymentModel.recaptcha.length > 0 && this.formInstance.isValid()) {
            this.logger.debug('Starting payment with:', this.paymentModel);
            switch (this.paymentModel.donation.method) {
                case 'mobilpay':
                    promise = this.paymentWithMobilpayInit()
                        .catch((reason) => { self.logger.warn(reason); })
                        .then((done) => {
                            console.log(done);
                        });
                    break;
                case 'braintree':
                    promise = this.paymentWithBraintreeInit()
                        .catch((reason) => { self.logger.warn(reason); })
                        .then((done) => {
                            $('#braintree-modal').modal('hide');
                            $('iframe').remove();
                            window.location = `/#/diploma/${done.id}/${done.t}`;
                        });
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
     * Toggle if donation is corporate or not
     * @method toggleCorporate
     */
    toggleCorporate() {
        this.isCorporate = !this.isCorporate;
        this.formInstance = $('#donationsForm').parsley();
    }

    /**
     * Initialize range slider
     */
    toggleRangeSlider() {
        const self = this;
        if (!this.isRangerSliderActive) {
            $('#treesQty')
                .slider()
                .on('slide slideStop', function(slideEvt) {
                    self.model.trees = slideEvt.value;
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
