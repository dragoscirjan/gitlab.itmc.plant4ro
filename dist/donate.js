System.register(['aurelia-validation', 'aurelia-framework', 'fetch', 'aurelia-fetch-client', 'lib/app/config', 'lib/view/model/abstract', 'bootstrap-slider', 'parsleyjs', 'parsleyjs/dist/i18n/ro', 'braintree/braintree-web', 'tsironis/lockr'], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var Validation, inject, HttpClient, AppConfig, ViewModelAbstract, braintree, Lockr, Component;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_aureliaValidation) {
            Validation = _aureliaValidation.Validation;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_fetch) {}, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_libAppConfig) {
            AppConfig = _libAppConfig.AppConfig;
        }, function (_libViewModelAbstract) {
            ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
        }, function (_bootstrapSlider) {}, function (_parsleyjs) {}, function (_parsleyjsDistI18nRo) {}, function (_braintreeBraintreeWeb) {
            braintree = _braintreeBraintreeWeb;
        }, function (_tsironisLockr) {
            Lockr = _tsironisLockr;
        }],
        execute: function () {
            Component = (function (_ViewModelAbstract) {
                _inherits(Component, _ViewModelAbstract);

                function Component(appConfig, http, validation) {
                    _classCallCheck(this, _Component);

                    _get(Object.getPrototypeOf(_Component.prototype), 'constructor', this).call(this, appConfig);
                    this.heading = 'Planteaza!';
                    this.model = {
                        name: '',
                        email: '',
                        company: '',
                        vat: '',
                        friends: [],
                        anonymous: false,
                        trees: 10,
                        locationGps: '',

                        donation: {
                            method: 'mobilpay',
                            exchange: 0
                        }
                    };
                    this.donationErrorModal = {
                        message: ''
                    };
                    this.mobilpay = {
                        url: '',
                        env_key: '',
                        data: ''
                    };
                    this.isCorporate = true;
                    this.notRobot = false;
                    this.treePrice = 5;
                    this.maxDonation = 2000;
                    var self = this;
                    this.http = appConfig.configHttp(http);

                    window.toggleRecaptchaValidate = function (result) {
                        self.toggleRecaptchaValidate(result);
                    };

                    window.Parsley.on('field:error', function (e) {
                        e.$element.closest('.form-wrap').removeClass('success').addClass('error');
                        setTimeout(function () {
                            var $errorList = e.$element.closest('.form-wrap').find('.parsley-errors-list');

                            e.$element.closest('.form-wrap').tooltip({
                                title: $errorList.text(),
                                placement: 'right',
                                trigger: 'hover focus'
                            });
                            $errorList.remove();
                        }, 100);
                    });
                    window.Parsley.on('field:success', function (e) {
                        e.$element.closest('.form-wrap').removeClass('error').addClass('success').tooltip('destroy');
                    });
                    window.Parsley.setLocale('ro');
                }

                _createClass(Component, [{
                    key: 'activate',
                    value: function activate(params, routeConfig, navigationInstruction) {
                        _get(Object.getPrototypeOf(_Component.prototype), 'activate', this).call(this, params, routeConfig);
                        var self = this;
                        var ni = navigationInstruction;

                        return this.fetchExchange().then(function () {
                            if (ni.params && ni.params.t) {
                                self.orderId = ni.params.t;
                            }
                        });
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        var self = this;
                        this.toggleRangeSlider();
                        this.toggleCorporate();

                        this.detectGeolocation()['catch'](function () {
                            self.logger.warn('Unable to obtain browser geo location.');
                            self.detectIpGeoLocation()['catch'](function () {
                                self.logger.warn('Unable to obtain ');
                            }).then(function (position) {
                                self.logger.debug('Detected IP Location: ', position);
                                self.model.locationGps = position.locationGps;
                                self.model.location = position.location;
                            });
                        }).then(function (position) {
                            self.logger.debug('Detected Location: ', position);
                            self.model.locationGps = position.locationGps;
                            self.model.location = position.location;
                        });

                        if (this.orderId) {
                            return this.fetchMobilpayInfo(this.orderId);
                        }
                    }
                }, {
                    key: 'detectGeolocation',
                    value: function detectGeolocation() {
                        var self = this;
                        return new Promise(function (resolve, reject) {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(function (position) {
                                    self.logger.debug('Browser geolocation obtained', position);
                                    $.ajax({
                                        error: function error(jqXHR, status, reason) {
                                            self.logger.warn('Unable to obtain location from coordinates.', jqXHR, status, reason);
                                            reject();
                                        },
                                        dataType: 'xml',
                                        method: 'get',
                                        success: function success(doc) {
                                            var pos = {
                                                locationGps: position.coords.latitude + ',' + position.coords.longitude,
                                                location: ''
                                            };
                                            self.logger.debug('Location obtained', doc);
                                            self.logger.debug($(doc).find('address_component'));
                                            $(doc).find('address_component').each(function (i, address) {
                                                self.logger.debug($(address).find('type').text(), $(address).find('short_name').text());
                                                if ($(address).find('type').text() === 'administrative_area_level_1political' && pos.location === '') {
                                                    pos.location = $(address).find('short_name').text().replace(/municipiul /i, '');
                                                }
                                            });
                                            resolve(pos);
                                        },
                                        url: '//maps.googleapis.com/maps/api/geocode/xml?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true&l=ro'
                                    });
                                }, function () {
                                    reject();
                                });
                            } else {
                                reject();
                            }
                        });
                    }
                }, {
                    key: 'detectIpGeoLocation',
                    value: function detectIpGeoLocation() {
                        var self = this;
                        return new Promise(function (resolve, reject) {
                            $.ajax({
                                error: function error(jqXHR, status, reason) {
                                    self.logger.warn('IP geo location failed', jqXHR, status, reason);
                                },
                                dataType: 'jsonp',
                                method: 'get',
                                success: function success(doc) {
                                    self.logger.debug('IP geo location obtained', doc);
                                    resolve({
                                        locationGps: doc.lat + ',' + doc.lon,
                                        location: doc.regionName + ' ' + doc.country
                                    });
                                },
                                url: 'http://ip-api.com/json/'
                            });
                        });
                    }
                }, {
                    key: 'destroyBraintreeForm',
                    value: function destroyBraintreeForm() {
                        $('#braintree-modal').modal('hide');

                        if (window.btCheckout) {
                            window.btCheckout.teardown(function () {
                                window.btCheckout = null;
                            });
                        }
                    }
                }, {
                    key: 'fetchExchange',
                    value: function fetchExchange() {
                        var self = this;
                        return this.http.fetch('curs-valutar')['catch'](function (error) {
                            self.logger.warn('Getting exchange rates failed with error', error);
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            self.logger.debug('Exchange rates obtained:', data);
                            if (!data.error) {
                                self.model.donation.exchange = data.exchange.DataSet.Body.Cube.Rate.filter(function (v) {
                                    return v['-currency'] === 'EUR';
                                })[0]['#text'];
                                self.logger.debug('Exchange rates obtained EUR:', self.model.donation.exchange);
                            }
                        });
                    }
                }, {
                    key: 'fetchMobilpayInfo',
                    value: function fetchMobilpayInfo(t) {
                        var self = this;
                        return self.http.fetch('donate/mobilpay/' + t + '/info')['catch'](function (error) {
                            self.logger.warn('Getting exchange rates failed with error', error);
                        }).then(function (response) {
                            return response.text();
                        }).then(function (data) {
                            data = self.appConfig.decode(data);
                            var message = '';
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    log = _step.value;

                                    if (log.hash && log.hash.objPmNotify && log.hash.objPmNotify.errorCode) {
                                        message = '[' + log.hash.objPmNotify.errorCode + '] ' + log.hash.objPmNotify.errorMessage;
                                        console.log(message);
                                        break;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator['return']) {
                                        _iterator['return']();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            if (!message.length) {
                                message = 'Nu am putut determina eroarea. Va rugam contactati departamentul tehnic.';
                            }
                            self.showDonationError(message);
                        });
                    }
                }, {
                    key: 'paymentWithBraintreeInit',
                    value: function paymentWithBraintreeInit() {
                        var _this = this;

                        var self = this;
                        this.logger.debug('request:/ donate/braintree-token');
                        return new Promise(function (resolve, reject) {
                            _this.http.fetch('donate/braintree-token')['catch'](function (error) {
                                self.logger.warn('response:/ donate/braintree-token', error);
                                reject(error);
                            }).then(function (response) {
                                return response.json();
                            }).then(function (data) {
                                self.logger.debug('response:/ donate/braintree-token', data);
                                if (!data.error) {
                                    self.paymentWithBraintreeForm(data.token)['catch'](function (error) {
                                        reject(error);
                                    }).then(function (token) {
                                        resolve(token);
                                    });
                                } else {
                                    self.logger.warn(error);
                                    reject(data.error);
                                }
                            });
                        });
                    }
                }, {
                    key: 'paymentWithBraintreeForm',
                    value: function paymentWithBraintreeForm(token) {
                        var self = this;
                        return new Promise(function (resolve, reject) {
                            $('#braintree-modal').modal('show').off('shown.bs.modal hidden.bs.modal').on('shown.bs.modal', function () {
                                if (window.btCheckout) {
                                    return;
                                }

                                braintree.setup(token, 'dropin', {
                                    onReady: function onReady(ready) {
                                        self.logger.debug('braintree checkout', ready);
                                        window.btCheckout = ready;
                                    },
                                    onPaymentMethodReceived: function onPaymentMethodReceived(payload) {
                                        self.logger.debug('braintree:/', payload);
                                        payload.token = token;
                                        self.paymentWithBraintreeProceed(payload)['catch'](function (error) {
                                            reject(error);
                                        }).then(function (resultToken) {
                                            resolve(resultToken);
                                        });
                                    },
                                    onError: function onError(error) {
                                        self.logger.warn(error);
                                        reject(error);
                                    },
                                    container: 'braintree-payment-form'
                                });

                                $('#braintree-modal .btn.btn--sm.btn--secondary').off('click').on('click', function (event) {
                                    $('#braintree-modal form input').trigger('click', event);
                                });
                            }).on('hidden.bs.modal', function () {
                                self.destroyBraintreeForm();
                            });
                        });
                    }
                }, {
                    key: 'paymentWithBraintreeProceed',
                    value: function paymentWithBraintreeProceed(payload) {
                        var self = this;
                        var load = this.appConfig.encode($.extend(true, self.paymentModel, { donation: { braintree: payload } }));
                        this.logger.debug('braintree:post:/ donate/braintree', load);
                        return new Promise(function (resolve, reject) {
                            $.ajax({
                                error: function error(jqXHR, status, reason) {
                                    self.logger.warn('braintree:post:/ donate/braintree failed', jqXHR, status, reason);
                                    reject(reason);
                                },
                                data: { load: load },
                                dataType: 'json',
                                headers: {
                                    'X-Request-Playload': payload.nonce
                                },
                                method: 'post',
                                success: function success(token) {
                                    self.logger.debug('braintree:post:/ donate/braintree', token);
                                    resolve(token);
                                },
                                url: self.appConfig.getPhpUrl('donate/braintree')
                            });
                        });
                    }
                }, {
                    key: 'paymentWithMobilpayInit',
                    value: function paymentWithMobilpayInit() {
                        var self = this;
                        var load = this.appConfig.encode(self.paymentModel);

                        this.logger.debug('request:/ donate/mobilpay-token', { load: load });

                        Lockr.set('mobilpay-load', load);

                        return new Promise(function (resolve, reject) {
                            $.ajax({
                                error: function error(jqXHR, status, reason) {
                                    self.logger.warn('response:/ donate/mobilpay-token', jqXHR, status, reason);
                                    reject(reason);
                                },
                                data: { load: load },
                                dataType: 'json',
                                method: 'post',
                                success: function success(data) {
                                    self.logger.debug('response:/ donate/mobilpay-token', data);
                                    if (!data.error) {
                                        self.mobilpay = data;

                                        self.paymentWithMobilpayForm()['catch'](function (error) {
                                            reject(error);
                                        }).then(function (token) {
                                            resolve(token);
                                        });
                                    } else {
                                        self.logger.warn(error);
                                        reject(data);
                                    }
                                },
                                url: self.appConfig.getPhpUrl('donate/mobilpay-token')
                            });
                        });
                    }
                }, {
                    key: 'paymentWithMobilpayForm',
                    value: function paymentWithMobilpayForm(token) {
                        return new Promise(function (resolve, reject) {
                            $('#mobilpay-modal').modal('show').on('shown.bs.modal', function () {
                                $('#mobilpay-modal form').submit();
                            });
                        });
                    }
                }, {
                    key: 'paymentWithWireInit',
                    value: function paymentWithWireInit() {}
                }, {
                    key: 'proceedToPayment',
                    value: function proceedToPayment() {
                        var promise = null;
                        var self = this;
                        if (this.paymentModel.recaptcha.length > 0 && this.formInstance.isValid()) {
                            this.logger.debug('Starting payment with:', this.paymentModel);
                            switch (this.paymentModel.donation.method) {
                                case 'mobilpay':
                                    promise = this.paymentWithMobilpayInit()['catch'](function (reason) {
                                        $('#mobilpay-modal').modal('hide');
                                        setTimeout(function () {
                                            self.showDonationError(reason);
                                        }, 200);
                                        self.logger.warn(reason);
                                    }).then(function (done) {});
                                    break;
                                case 'braintree':
                                    promise = this.paymentWithBraintreeInit()['catch'](function (reason) {
                                        $('#braintree-modal').modal('hide');
                                        setTimeout(function () {
                                            self.showDonationError(reason);
                                        }, 200);
                                        self.logger.warn(reason);
                                    }).then(function (done) {
                                        self.destroyBraintreeForm();
                                        window.location = '/#/diploma/' + done.id + '/' + done.t + '/preview';
                                    });
                                    break;
                                case 'wire':
                                    promise = this.paymentWithWireInit();
                                    break;
                                default:
                                    this.logger.warn('Wrong payment method selected');
                            }
                            if (promise) {}
                        }
                    }
                }, {
                    key: 'showDonationError',
                    value: function showDonationError(message) {
                        this.donationErrorModal.message = message;
                        $('#donation-error-modal').modal('show');
                    }
                }, {
                    key: 'toggleCorporate',
                    value: function toggleCorporate() {
                        this.isCorporate = !this.isCorporate;
                        this.formInstance = $('#donationsForm').parsley();
                    }
                }, {
                    key: 'toggleRangeSlider',
                    value: function toggleRangeSlider() {
                        var self = this;
                        if (!this.isRangerSliderActive) {
                            $('#treesQty').slider().on('slide slideStop', function (slideEvt) {
                                self.model.trees = slideEvt.value;
                            });
                        }
                    }
                }, {
                    key: 'toggleRecaptchaValidate',
                    value: function toggleRecaptchaValidate(result) {
                        this.notRobot = true;
                    }
                }, {
                    key: 'paymentModel',
                    get: function get() {
                        var recaptcahaResponse = '';
                        try {
                            recaptcahaResponse = grecaptcha.getResponse();
                        } catch (err) {}
                        var model = $.extend(true, this.model, {
                            recaptcha: recaptcahaResponse
                        });
                        model.donation.total = model.trees * this.treePrice;
                        model.donation.totalEur = Math.floor(model.donation.total / this.model.donation.exchange * 100) / 100;
                        return model;
                    },
                    set: function set(val) {}
                }]);

                var _Component = Component;
                Component = inject(AppConfig, HttpClient, Validation)(Component) || Component;
                return Component;
            })(ViewModelAbstract);

            _export('Component', Component);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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QUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDbkMscUNBQVMsRUFBRSxrQkFBa0I7eUJBQ2hDLENBQUMsQ0FBQztBQUNILDZCQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDcEQsNkJBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN0RywrQkFBTyxLQUFLLENBQUM7cUJBQ2hCO3lCQU9lLGFBQUMsR0FBRyxFQUFFLEVBRXJCOzs7aUNBdlVRLFNBQVM7QUFBVCx5QkFBUyxHQURyQixNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FDN0IsU0FBUyxLQUFULFNBQVM7dUJBQVQsU0FBUztlQUFTLGlCQUFpQiIsImZpbGUiOiJkb25hdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbmltcG9ydCB7VmFsaWRhdGlvbn0gZnJvbSAnYXVyZWxpYS12YWxpZGF0aW9uJztcbi8vIGltcG9ydCB7ZW5zdXJlfSBmcm9tICdhdXJlbGlhLXZhbGlkYXRpb24nO1xuXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0ICdmZXRjaCc7XG4vLyBpbXBvcnQge0h0dHBDbGllbnQsIGpzb259IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuXG4vLyBpbXBvcnQge1JlY2FwdGNoYX0gZnJvbSAnZ29vZ2xlLXJlY2FwdGNoYSc7XG5cbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICdsaWIvYXBwL2NvbmZpZyc7XG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICdsaWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbmltcG9ydCAnYm9vdHN0cmFwLXNsaWRlcic7XG5pbXBvcnQgJ3BhcnNsZXlqcyc7XG5pbXBvcnQgJ3BhcnNsZXlqcy9kaXN0L2kxOG4vcm8nO1xuaW1wb3J0ICogYXMgYnJhaW50cmVlIGZyb20gJ2JyYWludHJlZS9icmFpbnRyZWUtd2ViJztcbmltcG9ydCAqIGFzIExvY2tyIGZyb20gJ3RzaXJvbmlzL2xvY2tyJztcblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGRvbmF0aW9uc1xuICpcbiAqL1xuQGluamVjdChBcHBDb25maWcsIEh0dHBDbGllbnQsIFZhbGlkYXRpb24pXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgVmlld01vZGVsQWJzdHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQ29tcG9uZW50IFRpdGxlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBoZWFkaW5nID0gJ1BsYW50ZWF6YSEnO1xuXG4gICAgLyoqXG4gICAgICogVG8gc2F2ZSB0byBkYXRhYmFzZSBtb2RlbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgbW9kZWwgPSB7XG4gICAgICAgIG5hbWU6ICcnLCAvLyBEb25hdG9yIG5hbWVcbiAgICAgICAgZW1haWw6ICcnLCAvLyBEb25hdG9yIGVtYWlsXG4gICAgICAgIGNvbXBhbnk6ICcnLCAvLyBEb25hdG9yIENvbXBhbnlcbiAgICAgICAgdmF0OiAnJywgLy8gRG9uYXRvciBDb21wYW55IFZBVCxcbiAgICAgICAgZnJpZW5kczogW10sIC8vIERvbmF0b3IncyBGcmllbmRzIEBUT0RPOiBOT1QgSW1wbGVtZW50ZWQgeWV0XG4gICAgICAgIGFub255bW91czogZmFsc2UsIC8vIERvbmF0b3Igd2FudHMgdG8gcmVtYWluIGFub255bW91c1xuICAgICAgICB0cmVlczogMTAsIC8vIERvbmF0aW9uID0+IFRyZWUgTnVtYmVyXG4gICAgICAgIGxvY2F0aW9uR3BzOiAnJyxcblxuICAgICAgICBkb25hdGlvbjoge1xuICAgICAgICAgICAgbWV0aG9kOiAnbW9iaWxwYXknLFxuICAgICAgICAgICAgZXhjaGFuZ2U6IDBcbiAgICAgICAgICAgIC8vIGN1cnJlbmN5OiAnUk9OJyAvLyBjYW4gYmUgUk9OIHwgRVVSIDsgbm90IG5lZWRlZCBiZWNhdXNlIHdlIGNhbiBkaWZlcmVudGlhdGUgY3VycmVuY3kgYnkgbWV0aG9kXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtkb25hdGlvbkVycm9yTW9kYWwgZGVzY3JpcHRpb25dXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkb25hdGlvbkVycm9yTW9kYWwgPSB7XG4gICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW21vYmlscGF5IGRlc2NyaXB0aW9uXVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgbW9iaWxwYXkgPSB7XG4gICAgICAgIHVybDogJycsXG4gICAgICAgIGVudl9rZXk6ICcnLFxuICAgICAgICBkYXRhOiAnJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmsgaWYgZG9uYXRpb24gaXMgY29ycG9yYXRlIG9yIG5vdFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQ29ycG9yYXRlID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSB1c2VyIGlzIGEgcm9ib3Qgb3Igbm90XG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgbm90Um9ib3QgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFt0cmVlUHJpY2UgZGVzY3JpcHRpb25dXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICB0cmVlUHJpY2UgPSA1O1xuXG4gICAgLyoqXG4gICAgICogW21heE51bWJlck9mVHJlZXMgZGVzY3JpcHRpb25dXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBtYXhEb25hdGlvbiA9IDIwMDA7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjY29uc3RydWN0b3JcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtICB7SHR0cENsaWVudH0gICAgaHR0cCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7dGhpc31cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhcHBDb25maWcsIGh0dHAsIHZhbGlkYXRpb24pIHtcbiAgICAgICAgc3VwZXIoYXBwQ29uZmlnKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmh0dHAgPSBhcHBDb25maWcuY29uZmlnSHR0cChodHRwKTtcblxuICAgICAgICAvLyByZWNhcHRjaGEgdmFsaWRhdGUgZnVuY3Rpb25cbiAgICAgICAgd2luZG93LnRvZ2dsZVJlY2FwdGNoYVZhbGlkYXRlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgc2VsZi50b2dnbGVSZWNhcHRjaGFWYWxpZGF0ZShyZXN1bHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHBhcnNsZXkgc2V0dGluZ3NcbiAgICAgICAgd2luZG93LlBhcnNsZXkub24oJ2ZpZWxkOmVycm9yJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUuJGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0td3JhcCcpLnJlbW92ZUNsYXNzKCdzdWNjZXNzJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgJGVycm9yTGlzdCA9IGUuJGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0td3JhcCcpLmZpbmQoJy5wYXJzbGV5LWVycm9ycy1saXN0Jyk7XG4gICAgICAgICAgICAgICAgLy8gJChlLiRlbGVtZW50KS50b29sdGlwKHtcbiAgICAgICAgICAgICAgICBlLiRlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLXdyYXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICRlcnJvckxpc3QudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkZXJyb3JMaXN0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5QYXJzbGV5Lm9uKCdmaWVsZDpzdWNjZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUuJGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0td3JhcCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpLmFkZENsYXNzKCdzdWNjZXNzJykudG9vbHRpcCgnZGVzdHJveScpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LlBhcnNsZXkuc2V0TG9jYWxlKCdybycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIGV2ZW50XG4gICAgICogQHNlZSBWaWV3TW9kZWxBYnN0cmFjdCNhY3RpdmF0ZVxuICAgICAqIEBtZXRob2QgYWN0aXZhdGVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnLCBuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgc3VwZXIuYWN0aXZhdGUocGFyYW1zLCByb3V0ZUNvbmZpZyk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IG5pID0gbmF2aWdhdGlvbkluc3RydWN0aW9uO1xuICAgICAgICAvLyBnZXQgZXhjaGFuZ2UgdmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hFeGNoYW5nZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5pLnBhcmFtcyAmJiBuaS5wYXJhbXMudCkge1xuICAgICAgICAgICAgICAgIHNlbGYub3JkZXJJZCA9IG5pLnBhcmFtcy50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlZCBldmVudFxuICAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjYXR0YWNoZWRcbiAgICAgKiBAbWV0aG9kIGF0dGFjaGVkXG4gICAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy50b2dnbGVSYW5nZVNsaWRlcigpO1xuICAgICAgICB0aGlzLnRvZ2dsZUNvcnBvcmF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0R2VvbG9jYXRpb24oKVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci53YXJuKCdVbmFibGUgdG8gb2J0YWluIGJyb3dzZXIgZ2VvIGxvY2F0aW9uLicpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGV0ZWN0SXBHZW9Mb2NhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci53YXJuKCdVbmFibGUgdG8gb2J0YWluICcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdEZXRlY3RlZCBJUCBMb2NhdGlvbjogJywgcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tb2RlbC5sb2NhdGlvbkdwcyA9IHBvc2l0aW9uLmxvY2F0aW9uR3BzO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tb2RlbC5sb2NhdGlvbiA9IHBvc2l0aW9uLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnRGV0ZWN0ZWQgTG9jYXRpb246ICcsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vZGVsLmxvY2F0aW9uR3BzID0gcG9zaXRpb24ubG9jYXRpb25HcHM7XG4gICAgICAgICAgICAgICAgc2VsZi5tb2RlbC5sb2NhdGlvbiA9IHBvc2l0aW9uLmxvY2F0aW9uO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hNb2JpbHBheUluZm8odGhpcy5vcmRlcklkKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0RvbmF0aW9uRXJyb3IoJ0xvcmVtIGlwc3VtIHNpdCBkb2xvci4uLi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICQoJyNkb25hdGlvbi1lcnJvci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0IGdlb2xvY2F0aW9uIGJ5IHVzaW5nIGJyb3dzZXIgZ2VvbG9jYXRpb24gYW5kIGdvb2dsZSBtYXBzIEFQSVxuICAgICAqIEBtZXRob2QgZGV0ZWN0R2VvbG9jYXRpb25cbiAgICAgKiBAcmV0dXJuIFByb21pc2UgIHJlc29sdmUgc2hvdWxkIHJldHVybiBhIHN0cnVjdHVyZSBsaWtlIHsgbG9jYXRpb25HcHM6ICcnLCBsb2NhdGlvbjogJycgfVxuICAgICAqL1xuICAgIGRldGVjdEdlb2xvY2F0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ0Jyb3dzZXIgZ2VvbG9jYXRpb24gb2J0YWluZWQnLCBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGpxWEhSLCBzdGF0dXMsIHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ1VuYWJsZSB0byBvYnRhaW4gbG9jYXRpb24gZnJvbSBjb29yZGluYXRlcy4nLCBqcVhIUiwgc3RhdHVzLCByZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAneG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZG9jKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25HcHM6IGAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ0xvY2F0aW9uIG9idGFpbmVkJywgZG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygkKGRvYykuZmluZCgnYWRkcmVzc19jb21wb25lbnQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChkb2MpLmZpbmQoJ2FkZHJlc3NfY29tcG9uZW50JykuZWFjaCgoaSwgYWRkcmVzcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygkKGFkZHJlc3MpLmZpbmQoJ3R5cGUnKS50ZXh0KCksICQoYWRkcmVzcykuZmluZCgnc2hvcnRfbmFtZScpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGFkZHJlc3MpLmZpbmQoJ3R5cGUnKS50ZXh0KCkgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFwb2xpdGljYWwnICYmIHBvcy5sb2NhdGlvbiA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5sb2NhdGlvbiA9ICQoYWRkcmVzcykuZmluZCgnc2hvcnRfbmFtZScpLnRleHQoKS5yZXBsYWNlKC9tdW5pY2lwaXVsIC9pLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgLy9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUveG1sP2xhdGxuZz0ke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfSZzZW5zb3I9dHJ1ZSZsPXJvYFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0cyBJUCBnZW8gbG9jYXRpb24gZnJvbSBpcC1hcGkuY29tXG4gICAgICogQG1ldGhvZCBkZXRlY3RJcEdlb0xvY2F0aW9uXG4gICAgICogQHJldHVybiBQcm9taXNlICByZXNvbHZlIHNob3VsZCByZXR1cm4gYSBzdHJ1Y3R1cmUgbGlrZSB7IGxvY2F0aW9uR3BzOiAnJywgbG9jYXRpb246ICcnIH1cbiAgICAgKi9cbiAgICBkZXRlY3RJcEdlb0xvY2F0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFIsIHN0YXR1cywgcmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ0lQIGdlbyBsb2NhdGlvbiBmYWlsZWQnLCBqcVhIUiwgc3RhdHVzLCByZWFzb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZG9jKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdJUCBnZW8gbG9jYXRpb24gb2J0YWluZWQnLCBkb2MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uR3BzOiBgJHtkb2MubGF0fSwke2RvYy5sb259YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBgJHtkb2MucmVnaW9uTmFtZX0gJHtkb2MuY291bnRyeX1gXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovL2lwLWFwaS5jb20vanNvbi9gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkZXN0cm95QnJhaW50cmVlRm9ybVxuICAgICAqL1xuICAgIGRlc3Ryb3lCcmFpbnRyZWVGb3JtKCkge1xuICAgICAgICAkKCcjYnJhaW50cmVlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgLy8gJCgnaWZyYW1lJykucmVtb3ZlKCk7XG4gICAgICAgIGlmICh3aW5kb3cuYnRDaGVja291dCkge1xuICAgICAgICAgICAgLy8gV2hlbiB5b3UgYXJlIHJlYWR5IHRvIHRlYXIgZG93biB5b3VyIGludGVncmF0aW9uXG4gICAgICAgICAgICB3aW5kb3cuYnRDaGVja291dC50ZWFyZG93bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LmJ0Q2hlY2tvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIGJyYWludHJlZS5zZXR1cCBjYW4gc2FmZWx5IGJlIHJ1biBhZ2FpbiFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmZXRjaEV4Y2hhbmdlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmZXRjaEV4Y2hhbmdlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5mZXRjaCgnY3Vycy12YWx1dGFyJylcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybignR2V0dGluZyBleGNoYW5nZSByYXRlcyBmYWlsZWQgd2l0aCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdFeGNoYW5nZSByYXRlcyBvYnRhaW5lZDonLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tb2RlbC5kb25hdGlvbi5leGNoYW5nZSA9IGRhdGEuZXhjaGFuZ2UuRGF0YVNldC5Cb2R5LkN1YmUuUmF0ZS5maWx0ZXIodiA9PiB7IHJldHVybiB2WyctY3VycmVuY3knXSA9PT0gJ0VVUic7IH0pWzBdWycjdGV4dCddO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnRXhjaGFuZ2UgcmF0ZXMgb2J0YWluZWQgRVVSOicsIHNlbGYubW9kZWwuZG9uYXRpb24uZXhjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZmV0Y2hNb2JpbHBheUluZm9cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICB0XG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmZXRjaE1vYmlscGF5SW5mbyh0KSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuaHR0cFxuICAgICAgICAgICAgLmZldGNoKGBkb25hdGUvbW9iaWxwYXkvJHt0fS9pbmZvYClcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybignR2V0dGluZyBleGNoYW5nZSByYXRlcyBmYWlsZWQgd2l0aCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxmLmFwcENvbmZpZy5kZWNvZGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKGxvZyBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuaGFzaCAmJiBsb2cuaGFzaC5vYmpQbU5vdGlmeSAmJiBsb2cuaGFzaC5vYmpQbU5vdGlmeS5lcnJvckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgWyR7bG9nLmhhc2gub2JqUG1Ob3RpZnkuZXJyb3JDb2RlfV0gJHtsb2cuaGFzaC5vYmpQbU5vdGlmeS5lcnJvck1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ051IGFtIHB1dHV0IGRldGVybWluYSBlcm9hcmVhLiBWYSBydWdhbSBjb250YWN0YXRpIGRlcGFydGFtZW50dWwgdGVobmljLic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd0RvbmF0aW9uRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgOjogcGF5bWVudE1vZGVsXG4gICAgICogQG1ldGhvZCBwYXltZW50TW9kZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0IHBheW1lbnRNb2RlbCgpIHtcbiAgICAgICAgbGV0IHJlY2FwdGNhaGFSZXNwb25zZSA9ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVjYXB0Y2FoYVJlc3BvbnNlID0gZ3JlY2FwdGNoYS5nZXRSZXNwb25zZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nZ2VyLndhcm4oZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbW9kZWwgPSAkLmV4dGVuZCh0cnVlLCB0aGlzLm1vZGVsLCB7XG4gICAgICAgICAgICByZWNhcHRjaGE6IHJlY2FwdGNhaGFSZXNwb25zZVxuICAgICAgICB9KTtcbiAgICAgICAgbW9kZWwuZG9uYXRpb24udG90YWwgPSBtb2RlbC50cmVlcyAqIHRoaXMudHJlZVByaWNlO1xuICAgICAgICBtb2RlbC5kb25hdGlvbi50b3RhbEV1ciA9IE1hdGguZmxvb3IobW9kZWwuZG9uYXRpb24udG90YWwgLyB0aGlzLm1vZGVsLmRvbmF0aW9uLmV4Y2hhbmdlICogMTAwKSAvIDEwMDtcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHRlciA6OiBwYXltZW50TW9kZWwgOjogTk9UIFVTRURcbiAgICAgKiBAbWV0aG9kIHBheW1lbnRNb2RlbFxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgc2V0IHBheW1lbnRNb2RlbCh2YWwpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgQnJhaW50cmVlIHBheW1lbnQgKG9idGFpbiB0b2tlbilcbiAgICAgKiBAbWV0aG9kIHBheW1lbnRXaXRoQnJhaW50cmVlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwYXltZW50V2l0aEJyYWludHJlZUluaXQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ3JlcXVlc3Q6LyBkb25hdGUvYnJhaW50cmVlLXRva2VuJyk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2RvbmF0ZS9icmFpbnRyZWUtdG9rZW4nKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybigncmVzcG9uc2U6LyBkb25hdGUvYnJhaW50cmVlLXRva2VuJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdyZXNwb25zZTovIGRvbmF0ZS9icmFpbnRyZWUtdG9rZW4nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBheW1lbnRXaXRoQnJhaW50cmVlRm9ybShkYXRhLnRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHsgcmVqZWN0KGVycm9yKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHsgcmVzb2x2ZSh0b2tlbik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBCcmFpbnRyZWUgcGF5bWVudCBmb3JtXG4gICAgICogQG1ldGhvZCBwYXltZW50V2l0aEJyYWludHJlZUZvcm1cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgdG9rZW5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHBheW1lbnRXaXRoQnJhaW50cmVlRm9ybSh0b2tlbikge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAkKCcjYnJhaW50cmVlLW1vZGFsJylcbiAgICAgICAgICAgICAgICAubW9kYWwoJ3Nob3cnKVxuICAgICAgICAgICAgICAgIC5vZmYoJ3Nob3duLmJzLm1vZGFsIGhpZGRlbi5icy5tb2RhbCcpXG4gICAgICAgICAgICAgICAgLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5idENoZWNrb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgYnJhaW50cmVlIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgYnJhaW50cmVlLnNldHVwKHRva2VuLCAnZHJvcGluJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25SZWFkeTogKHJlYWR5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ2JyYWludHJlZSBjaGVja291dCcsIHJlYWR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYnRDaGVja291dCA9IHJlYWR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUGF5bWVudE1ldGhvZFJlY2VpdmVkOiAocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdicmFpbnRyZWU6LycsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBheW1lbnRXaXRoQnJhaW50cmVlUHJvY2VlZChwYXlsb2FkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7ICByZWplY3QoZXJyb3IpOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0VG9rZW4pID0+IHsgcmVzb2x2ZShyZXN1bHRUb2tlbik7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAnYnJhaW50cmVlLXBheW1lbnQtZm9ybSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzb2NpYXRlIG1vZGFsIGZvcm0gYnV0dG9uIHRvIGJyYWludHJlZSBmb3JtXG4gICAgICAgICAgICAgICAgICAgICQoJyNicmFpbnRyZWUtbW9kYWwgLmJ0bi5idG4tLXNtLmJ0bi0tc2Vjb25kYXJ5Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2JyYWludHJlZS1tb2RhbCBmb3JtIGlucHV0JykudHJpZ2dlcignY2xpY2snLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGVzdHJveUJyYWludHJlZUZvcm0oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3BheW1lbnRXaXRoQnJhaW50cmVlUHJvY2VlZCBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIHBheW1lbnRXaXRoQnJhaW50cmVlUHJvY2VlZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIHBheWxvYWRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHBheW1lbnRXaXRoQnJhaW50cmVlUHJvY2VlZChwYXlsb2FkKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGxvYWQgPSB0aGlzLmFwcENvbmZpZy5lbmNvZGUoJC5leHRlbmQoXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgc2VsZi5wYXltZW50TW9kZWwsXG4gICAgICAgICAgICB7IGRvbmF0aW9uOiB7IGJyYWludHJlZTogcGF5bG9hZCB9IH1cbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdicmFpbnRyZWU6cG9zdDovIGRvbmF0ZS9icmFpbnRyZWUnLCBsb2FkKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuaHR0cC5mZXRjaCgnZG9uYXRlL2JyYWludHJlZScsIHtcbiAgICAgICAgICAgIC8vICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIC8vICAgICBib2R5OiBqc29uKHtcbiAgICAgICAgICAgIC8vICAgICAgICAgbG9hZDogbG9hZFxuICAgICAgICAgICAgLy8gICAgIH0pLFxuICAgICAgICAgICAgLy8gICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgJ1gtUmVxdWVzdC1QbGF5bG9hZCc6IHBheWxvYWQubm9uY2VcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLy8gICAgIC5jYXRjaCgoZXJyb3IpID0+IHsgcmVqZWN0KGVycm9yKTsgfSlcbiAgICAgICAgICAgIC8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgZXJyb3I6IChqcVhIUiwgc3RhdHVzLCByZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybignYnJhaW50cmVlOnBvc3Q6LyBkb25hdGUvYnJhaW50cmVlIGZhaWxlZCcsIGpxWEhSLCBzdGF0dXMsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YTogeyBsb2FkOiBsb2FkIH0sXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3QtUGxheWxvYWQnOiBwYXlsb2FkLm5vbmNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ2JyYWludHJlZTpwb3N0Oi8gZG9uYXRlL2JyYWludHJlZScsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cmw6IHNlbGYuYXBwQ29uZmlnLmdldFBocFVybCgnZG9uYXRlL2JyYWludHJlZScpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBNb2JpbHBheSBwYXltZW50IChvYnRhaW4gdG9rZW4pXG4gICAgICogQG1ldGhvZCBwYXltZW50V2l0aE1vYmlscGF5SW5pdFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcGF5bWVudFdpdGhNb2JpbHBheUluaXQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGxvYWQgPSB0aGlzLmFwcENvbmZpZy5lbmNvZGUoc2VsZi5wYXltZW50TW9kZWwpO1xuICAgICAgICAvLyBkZWJ1ZyBpbmZvXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdyZXF1ZXN0Oi8gZG9uYXRlL21vYmlscGF5LXRva2VuJywgeyBsb2FkOiBsb2FkIH0pO1xuICAgICAgICAvLyBzdG9yZSBsb2FkIGluIGNhc2Ugb2YgZmFpbFxuICAgICAgICBMb2Nrci5zZXQoJ21vYmlscGF5LWxvYWQnLCBsb2FkKTtcbiAgICAgICAgLy8gb2J0YWluIG1vYmlscGF5IHRva2VucyBieSBQcm9taXNlXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmh0dHAuZmV0Y2goJ2RvbmF0ZS9tb2JpbHBheS10b2tlbicsIHtcbiAgICAgICAgICAgIC8vICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIC8vICAgICBib2R5OiBqc29uKHsgbG9hZDogbG9hZCB9KVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIC8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ3Jlc3BvbnNlOi8gZG9uYXRlL21vYmlscGF5LXRva2VuJywgZGF0YSk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2VsZi5tb2JpbHBheSA9IGRhdGE7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLnBheW1lbnRXaXRoTW9iaWxwYXlGb3JtKClcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7IHJlamVjdChlcnJvcik7IH0pXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgLnRoZW4oKHRva2VuKSA9PiB7IHJlc29sdmUodG9rZW4pOyB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFIsIHN0YXR1cywgcmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ3Jlc3BvbnNlOi8gZG9uYXRlL21vYmlscGF5LXRva2VuJywganFYSFIsIHN0YXR1cywgcmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGxvYWQ6IGxvYWQgfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdyZXNwb25zZTovIGRvbmF0ZS9tb2JpbHBheS10b2tlbicsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubW9iaWxwYXkgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBwYXltZW50IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGF5bWVudFdpdGhNb2JpbHBheUZvcm0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHsgcmVqZWN0KGVycm9yKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHsgcmVzb2x2ZSh0b2tlbik7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVybDogc2VsZi5hcHBDb25maWcuZ2V0UGhwVXJsKCdkb25hdGUvbW9iaWxwYXktdG9rZW4nKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gTW9iaWxwYXkgcGF5bWVudCAocmVkaXJlY3QgdG8gbW9iaWxwYXkgcGF5bWVudCBnYXRld2F5KVxuICAgICAqIEBtZXRob2QgcGF5bWVudFdpdGhCcmFpbnRyZWVGb3JtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIHRva2VuXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgICBOT1RFOiBUaGlzIGlzIGEgZmFjZSBQcm9taXNlLCBzaW5jZSB3ZSdyZSByZWRpcmVjdGluZyB0byBtb2JpbHBheS5yb1xuICAgICAqL1xuICAgIHBheW1lbnRXaXRoTW9iaWxwYXlGb3JtKHRva2VuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAkKCcjbW9iaWxwYXktbW9kYWwnKVxuICAgICAgICAgICAgICAgIC5tb2RhbCgnc2hvdycpXG4gICAgICAgICAgICAgICAgLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI21vYmlscGF5LW1vZGFsIGZvcm0nKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBXaXJlIHBheW1lbnRcbiAgICAgKiBAbWV0aG9kIHBheW1lbnRXaXRoV2lyZVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBwYXltZW50V2l0aFdpcmVJbml0KCkge1xuICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnQgcGF5bWVudCB3aXRoIHdpcmVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWF0ZSBwYXltZW50IHByb2Nlc3MgZGVwZW5kaW5nIG9uIHBheW1lbnQgdHlwZVxuICAgICAqIEBtZXRob2QgcHJvY2VlZFRvUGF5bWVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHByb2NlZWRUb1BheW1lbnQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wYXltZW50TW9kZWwucmVjYXB0Y2hhLmxlbmd0aCA+IDAgJiYgdGhpcy5mb3JtSW5zdGFuY2UuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3RhcnRpbmcgcGF5bWVudCB3aXRoOicsIHRoaXMucGF5bWVudE1vZGVsKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wYXltZW50TW9kZWwuZG9uYXRpb24ubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW9iaWxwYXknOlxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIG1vYmlsIHBheSBwYXltZW50XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLnBheW1lbnRXaXRoTW9iaWxwYXlJbml0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21vYmlscGF5LW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2VsZi5zaG93RG9uYXRpb25FcnJvcihyZWFzb24pOyB9LCAyMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4ocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZG9uZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vdCAndGhlbicgZnVuY3Rpb24gaGVyZSBzaW5jZSB3ZSBzaG91bGQgYmUgcmVkaXJlY3RlZCB0byBtb2JpbHBheS5ybyBmb3IgdGhpcyBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdicmFpbnRyZWUnOlxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhpcy5wYXltZW50V2l0aEJyYWludHJlZUluaXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYnJhaW50cmVlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2VsZi5zaG93RG9uYXRpb25FcnJvcihyZWFzb24pOyB9LCAyMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4ocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZG9uZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgcGF5bWVudCBmb3JtIGFuZCByZWRpcmVjdCB0byBkaXBsb21hIGRvd25sb2FkICh0aGFuayB5b3UpIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlc3Ryb3lCcmFpbnRyZWVGb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYC8jL2RpcGxvbWEvJHtkb25lLmlkfS8ke2RvbmUudH0vcHJldmlld2A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2lyZSc6XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLnBheW1lbnRXaXRoV2lyZUluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignV3JvbmcgcGF5bWVudCBtZXRob2Qgc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQFRPRE86XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbc2hvd0Vycm9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2Qgc2hvd0Vycm9yXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbWVzc2FnZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIGRldGFpbHNcbiAgICAgKi9cbiAgICBzaG93RG9uYXRpb25FcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZG9uYXRpb25FcnJvck1vZGFsLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICAkKCcjZG9uYXRpb24tZXJyb3ItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBpZiBkb25hdGlvbiBpcyBjb3Jwb3JhdGUgb3Igbm90XG4gICAgICogQG1ldGhvZCB0b2dnbGVDb3Jwb3JhdGVcbiAgICAgKi9cbiAgICB0b2dnbGVDb3Jwb3JhdGUoKSB7XG4gICAgICAgIHRoaXMuaXNDb3Jwb3JhdGUgPSAhdGhpcy5pc0NvcnBvcmF0ZTtcbiAgICAgICAgdGhpcy5mb3JtSW5zdGFuY2UgPSAkKCcjZG9uYXRpb25zRm9ybScpLnBhcnNsZXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHJhbmdlIHNsaWRlclxuICAgICAqL1xuICAgIHRvZ2dsZVJhbmdlU2xpZGVyKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmlzUmFuZ2VyU2xpZGVyQWN0aXZlKSB7XG4gICAgICAgICAgICAkKCcjdHJlZXNRdHknKVxuICAgICAgICAgICAgICAgIC5zbGlkZXIoKVxuICAgICAgICAgICAgICAgIC5vbignc2xpZGUgc2xpZGVTdG9wJywgZnVuY3Rpb24oc2xpZGVFdnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tb2RlbC50cmVlcyA9IHNsaWRlRXZ0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW29uUmVjYXB0Y2hhVmVyaWZpZWQgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBvblJlY2FwdGNoYVZlcmlmaWVkXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICB0b2dnbGVSZWNhcHRjaGFWYWxpZGF0ZShyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5ub3RSb2JvdCA9IHRydWU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
