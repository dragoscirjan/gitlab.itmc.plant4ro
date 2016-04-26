/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

import 'parsleyjs';
import 'parsleyjs/dist/i18n/ro';

/**
 * Component for donations
 *
 */
@inject(AppConfig, HttpClient)
export class Component extends ViewModelAbstract {

    /**
     * Page Title
     * @type {String}
     */
    heading = 'Contact';

    /**
     * Form Email Model
     * @type {Object}
     */
    model = {
        name: '', // Name of contacting person
        email: '', // Email of contacting person
        company: '', // Company represented by the contacting person
        vat: '', // Company VAT
        subject: '', // Email subject
        message: '', // Email Message,
        notRobot: false // this it no robot - ignore @ post
    }

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(appConfig, http, modalBox) {
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
     * Attached event
     * @see ViewModelAbstract#attached
     * @method attached
     */
    attached() {
        this.formInstance = $('#contactForm').parsley();
    }

    /**
     * [sendEmail description]
     * @method sendEmail
     * @return {[type]}  [description]
     */
    sendEmail() {
        if (grecaptcha.getResponse().length > 0 && this.formInstance.isValid()) {
            this.http.fetch('contact', {
                method: 'post',
                body: json(this.model)
            }).then(response => response.json())
            .then((data) => {
                if (data.error === 0) {
                    $('#message-box-success').modal('show');
                } else {
                    $('#message-box-error').modal('show');
                }
            });
        }
    }

    /**
     * [onRecaptchaVerified description]
     * @method onRecaptchaVerified
     * @return {[type]}            [description]
     */
    toggleRecaptchaValidate(result) {
        this.model.notRobot = true;
    }

}
