System.register(['aurelia-framework', 'fetch', 'aurelia-fetch-client', 'jspdf', 'lib/app/config', 'lib/view/model/abstract'], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var inject, HttpClient, jsPDF, AppConfig, ViewModelAbstract, Component;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_fetch) {}, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_jspdf) {
            jsPDF = _jspdf['default'];
        }, function (_libAppConfig) {
            AppConfig = _libAppConfig.AppConfig;
        }, function (_libViewModelAbstract) {
            ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
        }],
        execute: function () {
            Component = (function (_ViewModelAbstract) {
                _inherits(Component, _ViewModelAbstract);

                function Component(appConfig, http, validation) {
                    _classCallCheck(this, _Component);

                    _get(Object.getPrototypeOf(_Component.prototype), 'constructor', this).call(this, appConfig);
                    this.heading = 'Multumim pentru Donatie';
                    this.http = appConfig.configHttp(http);
                }

                _createClass(Component, [{
                    key: 'activate',
                    value: function activate(params, routeConfig) {
                        _get(Object.getPrototypeOf(_Component.prototype), 'activate', this).call(this, params, routeConfig);
                        var self = this;
                        this.params = params;
                        this.logger.debug('Page params: ', this.params);

                        return Promise.all([self.fetchDonationInfo(this.params.t), self.fetchPdf(this.params.t)]);
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        this.initSliders();
                        if (this.params.mode && this.params.mode === 'print') {
                            $('body').addClass('print');
                        }
                    }
                }, {
                    key: 'fetchDonationInfo',
                    value: function fetchDonationInfo(t) {
                        var self = this;
                        return self.http.fetch('donation/' + t)['catch'](function (error) {
                            self.logger.warn('Getting exchange rates failed with error', error);
                        }).then(function (response) {
                            return response.text();
                        }).then(function (data) {
                            self.donation = self.appConfig.decode(data);
                            self.logger.debug('Donation discovered', self.donation);
                        });
                    }
                }, {
                    key: 'fetchPdf',
                    value: function fetchPdf(t) {
                        var self = this;
                        return this.http.fetch('pdf/generate/' + t)['catch'](function (error) {
                            self.logger.warn('PDF generation failed', error);
                        }).then(function (response) {
                            return response.text();
                        }).then(function (data) {
                            self.pdf = '/services/index.php/pdf/download/' + t;
                            self.logger.debug('PDF Created', self.pdf, data);
                        });
                    }
                }, {
                    key: 'initSliders',
                    value: function initSliders() {
                        this.logger.debug('Starting owl-slider');

                        var $slider = $('#owlCarouselDiploma');

                        $slider.owlCarousel({
                            autoPlay: true,
                            stopOnHover: false,
                            navigation: true,
                            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                            paginationSpeed: 1000,
                            goToFirstSpeed: 2000,
                            singleItem: true,
                            autoHeight: false
                        });
                    }
                }, {
                    key: 'pdfDownload',
                    value: function pdfDownload() {
                        $('<iframe src="' + this.appConfig.getPhpUrl('../../' + this.pdf) + '" />').appendTo(document.body);
                    }
                }, {
                    key: 'pdfMail',
                    value: function pdfMail() {
                        return this.http.fetch('pdf/mail/' + this.params.t)['catch'](function (error) {
                            self.logger.warn('Failed sending email', error);
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (data.error === 0) {
                                $('#message-box-success').modal('show');
                            } else {
                                $('#message-box-error').modal('show');
                            }
                            self.logger.debug('Mail Sent', self.pdf, data);
                        });
                    }
                }, {
                    key: 'print',
                    value: function print() {
                        window.print();
                    }
                }]);

                var _Component = Component;
                Component = inject(AppConfig, HttpClient)(Component) || Component;
                return Component;
            })(ViewModelAbstract);

            _export('Component', Component);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUMzQyxNQUFNO0FBQ0gsaUNBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDekM7QUFDRCxnQ0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ2xELENBQUMsQ0FBQztxQkFDVjs7OzJCQUVJLGlCQUFHO0FBQ0osOEJBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDbEI7OztpQ0E5SVEsU0FBUztBQUFULHlCQUFTLEdBRHJCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQ2pCLFNBQVMsS0FBVCxTQUFTO3VCQUFULFNBQVM7ZUFBUyxpQkFBaUIiLCJmaWxlIjoiZGlwbG9tYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxhbnRlYXphIHBlbnRydSBSb21hbmlhIChodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8pXG4gKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBQcmlldGVuaWkgUGFkdXJpbG9yIGRpbiBSb21hbmlhIChodHRwOi8vcHJpZXRlbmlpcGFkdXJpbG9yLnJvKVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBJVCBNZWRpYSBDb25uZWN0IChodHRwOi8vaXRtZWRpYWNvbm5lY3Qucm8pXG4gKiBAbGljZW5zZSAgIGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLyMvYXBwbGljYXRpb24tbGljZW5zZSBDb21tZXJjaWFsXG4gKi9cblxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCAnZmV0Y2gnO1xuLy8gaW1wb3J0IHtIdHRwQ2xpZW50LCBqc29ufSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcblxuaW1wb3J0IGpzUERGIGZyb20gJ2pzcGRmJztcblxuLy8gaW1wb3J0IHtSZWNhcHRjaGF9IGZyb20gJ2dvb2dsZS1yZWNhcHRjaGEnO1xuXG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnbGliL2FwcC9jb25maWcnO1xuaW1wb3J0IHtWaWV3TW9kZWxBYnN0cmFjdH0gZnJvbSAnbGliL3ZpZXcvbW9kZWwvYWJzdHJhY3QnO1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZG9uYXRpb25zXG4gKlxuICovXG5AaW5qZWN0KEFwcENvbmZpZywgSHR0cENsaWVudClcbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBWaWV3TW9kZWxBYnN0cmFjdCB7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGhlYWRpbmcgPSAnTXVsdHVtaW0gcGVudHJ1IERvbmF0aWUnO1xuXG4gICAgLyoqXG4gICAgICogY29uc3RydWN0b3JcbiAgICAgKiBAc2VlIFZpZXdNb2RlbEFic3RyYWN0I2NvbnN0cnVjdG9yXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSAge0h0dHBDbGllbnR9ICAgIGh0dHAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge3RoaXN9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYXBwQ29uZmlnLCBodHRwLCB2YWxpZGF0aW9uKSB7XG4gICAgICAgIHN1cGVyKGFwcENvbmZpZyk7XG4gICAgICAgIHRoaXMuaHR0cCA9IGFwcENvbmZpZy5jb25maWdIdHRwKGh0dHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIGV2ZW50XG4gICAgICogQHNlZSBWaWV3TW9kZWxBYnN0cmFjdCNhY3RpdmF0ZVxuICAgICAqIEBtZXRob2QgYWN0aXZhdGVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnKSB7XG4gICAgICAgIHN1cGVyLmFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnUGFnZSBwYXJhbXM6ICcsIHRoaXMucGFyYW1zKTtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgLy8gICAgICAgICBzZWxmLmZldGNoRG9uYXRpb25JbmZvKHRoaXMucGFyYW1zLnQpLFxuICAgICAgICAvLyAgICAgICAgIHNlbGYuZmV0Y2hQZGYoKVxuICAgICAgICAvLyAgICAgXSkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHNlbGYuZmV0Y2hEb25hdGlvbkluZm8odGhpcy5wYXJhbXMudCksXG4gICAgICAgICAgICBzZWxmLmZldGNoUGRmKHRoaXMucGFyYW1zLnQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFthdHRhY2hlZCBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGF0dGFjaGVkXG4gICAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFNsaWRlcnMoKTtcbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLm1vZGUgJiYgdGhpcy5wYXJhbXMubW9kZSA9PT0gJ3ByaW50Jykge1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdwcmludCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmZXRjaE1vYmlscGF5SW5mb1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIHRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZldGNoRG9uYXRpb25JbmZvKHQpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5odHRwXG4gICAgICAgICAgICAuZmV0Y2goYGRvbmF0aW9uLyR7dH1gKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci53YXJuKCdHZXR0aW5nIGV4Y2hhbmdlIHJhdGVzIGZhaWxlZCB3aXRoIGVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5kb25hdGlvbiA9IHNlbGYuYXBwQ29uZmlnLmRlY29kZShkYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnRG9uYXRpb24gZGlzY292ZXJlZCcsIHNlbGYuZG9uYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmZXRjaFBkZlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gIHRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgZmV0Y2hQZGYodCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5mZXRjaChgcGRmL2dlbmVyYXRlLyR7dH1gKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci53YXJuKCdQREYgZ2VuZXJhdGlvbiBmYWlsZWQnLCBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnBkZiA9IGAvc2VydmljZXMvaW5kZXgucGhwL3BkZi9kb3dubG9hZC8ke3R9YDtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnUERGIENyZWF0ZWQnLCBzZWxmLnBkZiwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHNsaWRlcnMgb24gdGhpcyBwYWdlXG4gICAgICogQG1ldGhvZCBpbml0U2xpZGVyc1xuICAgICAqL1xuICAgIGluaXRTbGlkZXJzKCkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3RhcnRpbmcgb3dsLXNsaWRlcicpO1xuXG4gICAgICAgIC8vIEhQIGhhcyB0d28gY2Fyb3VzZWwgdGhhdCBuZWVkIHRvIGJlIHN5bmNlZFxuICAgICAgICBjb25zdCAkc2xpZGVyID0gJCgnI293bENhcm91c2VsRGlwbG9tYScpO1xuXG4gICAgICAgICRzbGlkZXIub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgYXV0b1BsYXk6IHRydWUsXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogZmFsc2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB0cnVlLFxuICAgICAgICAgICAgbmF2aWdhdGlvblRleHQ6IFsnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPicsICc8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPiddLFxuICAgICAgICAgICAgcGFnaW5hdGlvblNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgZ29Ub0ZpcnN0U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBzaW5nbGVJdGVtOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0hlaWdodDogZmFsc2VcbiAgICAgICAgICAgIC8vIHRyYW5zaXRpb25TdHlsZTogJ2ZhZGUnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgcGRmRG93bmxvYWRcbiAgICAgKi9cbiAgICBwZGZEb3dubG9hZCgpIHtcbiAgICAgICAgJChgPGlmcmFtZSBzcmM9XCIke3RoaXMuYXBwQ29uZmlnLmdldFBocFVybCgnLi4vLi4vJyArIHRoaXMucGRmKX1cIiAvPmApLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgcGRmTWFpbFxuICAgICAqL1xuICAgIHBkZk1haWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5mZXRjaChgcGRmL21haWwvJHt0aGlzLnBhcmFtcy50fWApXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ0ZhaWxlZCBzZW5kaW5nIGVtYWlsJywgZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI21lc3NhZ2UtYm94LXN1Y2Nlc3MnKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNtZXNzYWdlLWJveC1lcnJvcicpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdNYWlsIFNlbnQnLCBzZWxmLnBkZiwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmludCgpIHtcbiAgICAgICAgd2luZG93LnByaW50KCk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
