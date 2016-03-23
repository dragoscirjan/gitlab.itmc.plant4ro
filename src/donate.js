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
// import {HttpClient, json} from 'aurelia-fetch-client';
import {HttpClient} from 'aurelia-fetch-client';

// import {Recaptcha} from 'google-recaptcha';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

import 'bootstrap-slider';
import 'parsleyjs';
import 'parsleyjs/dist/i18n/ro';
import * as braintree from 'braintree/braintree-web';
import * as Lockr from 'tsironis/lockr';

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
     * [donationErrorModal description]
     * @type {Object}
     */
    donationErrorModal = {
        message: ''
    }

    /**
     * [mobilpay description]
     * @type {Object}
     */
    mobilpay = {
        url: '',
        env_key: '',
        data: ''
    }

    /**
     * Mark if donation is corporate or not
     * @type {Boolean}
     */
    isCorporate = true;

    /**
     * Determine whether the user is a robot or not
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

        // recaptcha validate function
        window.toggleRecaptchaValidate = (result) => {
            self.toggleRecaptchaValidate(result);
        };

        // parsley settings
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
    activate(params, routeConfig, navigationInstruction) {
        super.activate(params, routeConfig);
        let self = this;
        let ni = navigationInstruction;
        console.log(ni.params.t);
        // get exchange value
        return this.fetchExchange().then(() => {
            if (ni.params && ni.params.t) {
                return self.fetchMobilpayInfo(ni.params.t);
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

        // this.showDonationError('Lorem ipsum sit dolor....');
    }

    destroyBraintreeForm() {
        $('#braintree-modal').modal('hide');
        // $('iframe').remove();
        if (window.btCheckout) {
            // When you are ready to tear down your integration
            window.btCheckout.teardown(() => {
                window.btCheckout = null;
                // braintree.setup can safely be run again!
            });
        }
    }

    /**
     * @method fetchExchange
     * @return {Promise}
     */
    fetchExchange() {
        let self = this;
        return this.http
            .fetch('curs-valutar')
            .catch(error => {
                self.logger.warn('Getting exchange rates failed with error', error);
            })
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
     * [fetchMobilpayInfo description]
     * @method fetchMobilpayInfo
     * @param  {String}  t
     * @return {Promise}
     */
    fetchMobilpayInfo(t) {
        let self = this;
        return self.http
            .fetch(`donate/mobilpay/${t}/info`)
            .catch(error => {
                self.logger.warn('Getting exchange rates failed with error', error);
            })
            .then(response => response.text())
            .then((data) => {
                data = self.appConfig.decode(data);
                let message = '';
                for (log of data) {
                    if (log.hash && log.hash.objPmNotify && log.hash.objPmNotify.errorCode) {
                        message = `[${log.hash.objPmNotify.errorCode}] ${log.hash.objPmNotify.errorMessage}`;
                        console.log(message);
                        break;
                    }
                }
                if (!message.length) {
                    message = 'Nu am putut determina eroarea. Va rugam contactati departamentul tehnic.';
                }
                self.showDonationError(message);
            });
    }

    /**
     * Getter :: paymentModel
     * @method paymentModel
     * @return {Object}
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
     * Setter :: paymentModel :: NOT USED
     * @method paymentModel
     * @deprecated
     */
    set paymentModel(val) {

    }

    /**
     * Initialize Braintree payment (obtain token)
     * @method paymentWithBraintree
     * @return {Promise}
     */
    paymentWithBraintreeInit() {
        let self = this;
        this.logger.debug('request:/ donate/braintree-token');
        return new Promise((resolve, reject) => {
            this.http.fetch('donate/braintree-token')
                .catch((error) => {
                    self.logger.warn('response:/ donate/braintree-token', error);
                    reject(error);
                })
                .then(response => response.json())
                .then((data) => {
                    self.logger.debug('response:/ donate/braintree-token', data);
                    if (!data.error) {
                        self.paymentWithBraintreeForm(data.token)
                            .catch((error) => { reject(error); })
                            .then((token) => { resolve(token); });
                    } else {
                        self.logger.warn(error);
                        reject(data.error);
                    }
                });
        });
    }

    /**
     * Initialize Braintree payment form
     * @method paymentWithBraintreeForm
     * @param  {String}   token
     * @return {Promise}
     */
    paymentWithBraintreeForm(token) {
        let self = this;
        return new Promise((resolve, reject) => {
            $('#braintree-modal')
                .modal('show')
                .off('shown.bs.modal hidden.bs.modal')
                .on('shown.bs.modal', () => {
                    if (window.btCheckout) {
                        return;
                    }
                    // setup braintree form
                    braintree.setup(token, 'dropin', {
                        onReady: (ready) => {
                            self.logger.debug('braintree checkout', ready);
                            window.btCheckout = ready;
                        },
                        onPaymentMethodReceived: (payload) => {
                            self.logger.debug('braintree:/', payload);
                            payload.token = token;
                            self.paymentWithBraintreeProceed(payload)
                                .catch((error) => {  reject(error); })
                                .then((resultToken) => { resolve(resultToken); });
                        },
                        onError: (error) => {
                            self.logger.warn(error);
                            reject(error);
                        },
                        container: 'braintree-payment-form'
                    });

                    // associate modal form button to braintree form
                    $('#braintree-modal .btn.btn--sm.btn--secondary').off('click').on('click', (event) => {
                        $('#braintree-modal form input').trigger('click', event);
                    });
                })
                .on('hidden.bs.modal', () => {
                    self.destroyBraintreeForm();
                });
        });
    }

    /**
     * [paymentWithBraintreeProceed description]
     * @method paymentWithBraintreeProceed
     * @param  {String}  payload
     * @return {Promise}
     */
    paymentWithBraintreeProceed(payload) {
        let self = this;
        let load = this.appConfig.encode($.extend(
            true,
            self.paymentModel,
            { donation: { braintree: payload } }
        ));
        this.logger.debug('braintree:post:/ donate/braintree', load);
        return new Promise((resolve, reject) => {
            // this.http.fetch('donate/braintree', {
            //     method: 'post',
            //     body: json({
            //         load: load
            //     }),
            //     headers: {
            //         'X-Request-Playload': payload.nonce
            //     }
            // })
            //     .catch((error) => { reject(error); })
            //     .then(response => response.json())
            //     .then((data) => {
            //         resolve(data);
            //     });
            $.ajax({
                error: (jqXHR, status, reason) => {
                    self.logger.warn('braintree:post:/ donate/braintree failed', jqXHR, status, reason);
                    reject(reason);
                },
                data: { load: load },
                dataType: 'json',
                headers: {
                    'X-Request-Playload': payload.nonce
                },
                method: 'post',
                success: (token) => {
                    self.logger.debug('braintree:post:/ donate/braintree', token);
                    resolve(token);
                },
                url: self.appConfig.getPhpUrl('donate/braintree')
            });
        });
    }

    /**
     * Initialize Mobilpay payment (obtain token)
     * @method paymentWithMobilpayInit
     * @return {Promise}
     */
    paymentWithMobilpayInit() {
        let self = this;
        let load = this.appConfig.encode(self.paymentModel);
        // debug info
        this.logger.debug('request:/ donate/mobilpay-token', { load: load });
        // store load in case of fail
        Lockr.set('mobilpay-load', load);
        // obtain mobilpay tokens by Promise
        return new Promise((resolve, reject) => {
            // this.http.fetch('donate/mobilpay-token', {
            //     method: 'post',
            //     body: json({ load: load })
            // })
            //     .then(response => response.json())
            //     .then((data) => {
            //         self.logger.debug('response:/ donate/mobilpay-token', data);
            //         if (!data.error) {
            //             self.mobilpay = data;
            //             self.paymentWithMobilpayForm()
            //                 .catch((error) => { reject(error); })
            //                 .then((token) => { resolve(token); });
            //         } else {
            //             self.logger.warn(error);
            //             reject(data);
            //         }
            //     });
            $.ajax({
                error: (jqXHR, status, reason) => {
                    self.logger.warn('response:/ donate/mobilpay-token', jqXHR, status, reason);
                    reject(reason);
                },
                data: { load: load },
                dataType: 'json',
                method: 'post',
                success: (data) => {
                    self.logger.debug('response:/ donate/mobilpay-token', data);
                    if (!data.error) {
                        self.mobilpay = data;
                        // trigger payment form
                        self.paymentWithMobilpayForm()
                            .catch((error) => { reject(error); })
                            .then((token) => { resolve(token); });
                    } else {
                        self.logger.warn(error);
                        reject(data);
                    }
                },
                url: self.appConfig.getPhpUrl('donate/mobilpay-token')
            });
        });
    }

    /**
     * Perform Mobilpay payment (redirect to mobilpay payment gateway)
     * @method paymentWithBraintreeForm
     * @param  {String}   token
     * @return {Promise}         NOTE: This is a face Promise, since we're redirecting to mobilpay.ro
     */
    paymentWithMobilpayForm(token) {
        return new Promise((resolve, reject) => {
            $('#mobilpay-modal')
                .modal('show')
                .on('shown.bs.modal', () => {
                    $('#mobilpay-modal form').submit();
                });
        });
    }

    /**
     * Initialize Wire payment
     * @method paymentWithWire
     * @return {[type]}        [description]
     */
    paymentWithWireInit() {
        // TODO: Implement payment with wire
    }

    /**
     * Initiate payment process depending on payment type
     * @method proceedToPayment
     * @return {Promise}         [description]
     */
    proceedToPayment() {
        let promise = null;
        let self = this;
        if (this.paymentModel.recaptcha.length > 0 && this.formInstance.isValid()) {
            this.logger.debug('Starting payment with:', this.paymentModel);
            switch (this.paymentModel.donation.method) {
                case 'mobilpay':
                    // initialize mobil pay payment
                    promise = this.paymentWithMobilpayInit()
                        .catch((reason) => {
                            $('#mobilpay-modal').modal('hide');
                            setTimeout(() => { self.showDonationError(reason); }, 200);
                            self.logger.warn(reason);
                        })
                        .then((done) => {
                            // there is not 'then' function here since we should be redirected to mobilpay.ro for this option
                        });
                    break;
                case 'braintree':
                    promise = this.paymentWithBraintreeInit()
                        .catch((reason) => {
                            $('#braintree-modal').modal('hide');
                            setTimeout(() => { self.showDonationError(reason); }, 200);
                            self.logger.warn(reason);
                        })
                        .then((done) => {
                            // hide payment form and redirect to diploma download (thank you) page
                            self.destroyBraintreeForm();
                            window.location = `/#/diploma/${done.id}/${done.t}`;
                        });
                    break;
                case 'wire':
                    promise = this.paymentWithWireInit();
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
     * [showError description]
     * @method showError
     * @param  {String}  message
     * @param  {String}  details
     */
    showDonationError(message) {
        this.donationErrorModal.message = message;
        $('#donation-error-modal').modal('show');
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
