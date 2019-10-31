System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', '../lib/app/config', '../lib/view/model/abstract'], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var inject, HttpClient, AppConfig, ViewModelAbstract, Facebook;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_fetch) {}, function (_libAppConfig) {
            AppConfig = _libAppConfig.AppConfig;
        }, function (_libViewModelAbstract) {
            ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
        }],
        execute: function () {
            Facebook = (function (_ViewModelAbstract) {
                _inherits(Facebook, _ViewModelAbstract);

                function Facebook(appConfig, http) {
                    _classCallCheck(this, _Facebook);

                    _get(Object.getPrototypeOf(_Facebook.prototype), 'constructor', this).call(this, appConfig);
                    this.heading = 'Sustine Proiectul pe Facebook';
                    this.mrc = null;
                    this.mrp = null;
                    this.http = http;
                }

                _createClass(Facebook, [{
                    key: 'activate',
                    value: function activate(params, routeConfig) {
                        _get(Object.getPrototypeOf(_Facebook.prototype), 'activate', this).call(this, params, routeConfig);
                        var self = this;
                        return this.fbLoginCheck().then(function () {
                            self.fbIsLoggedIn = true;
                            self.logger.debug('fb-sdk / permissions granted');
                            return self.fbLoadImages().then(function () {
                                self.logger.debug('fb-sdk / images loaded');
                            })['catch'](function (e) {
                                self.logger.warn('fb-sdk / failed loading images', e);
                            });
                        })['catch'](function (x, e) {
                            self.logger.warn('fb-sdk / permission denied', x, e);
                            self.fbIsLoggedIn = false;
                        });
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        if (this.mrp && this.mrp.data) {
                            this.logger.debug('picture', this.mrp);
                            $('.fb-head__profile-img').attr('src', this.mrp.data.url);
                        }
                        if (this.mrc && this.mrc.cover) {
                            this.logger.debug('cover', this.mrc);
                            $('.fb-head__cover-img').attr('src', this.mrc.cover.source).css({
                                'top': '-' + this.mrc.cover.offset_y + '%'
                            });
                        }

                        this.initSliders();
                    }
                }, {
                    key: 'initSliders',
                    value: function initSliders() {
                        this.logger.debug('Starting owl-slider');

                        var $sliderFB = $('.owl-carousel--fb');
                        var $sliderFBProfile = $('#owlCarouselFBProfile');
                        var $sliderFBCover = $('#owlCarouselFBCover');
                        var $sliderFBProfileNav = $('#owlCarouselFBProfileNav');
                        var $sliderFBCoverNav = $('#owlCarouselFBCoverNav');

                        $sliderFB.owlCarousel({
                            autoPlay: false,
                            stopOnHover: false,
                            navigation: false,

                            pagination: false,
                            paginationSpeed: 500,
                            singleItem: true,
                            autoHeight: false,
                            transitionStyle: 'fade'
                        });

                        $sliderFBProfileNav.find('.owl-prev').on('click', function () {
                            $sliderFBProfile.trigger('owl.prev');
                        });

                        $sliderFBProfileNav.find('.owl-next').on('click', function () {
                            $sliderFBProfile.trigger('owl.next');
                        });

                        $sliderFBCoverNav.find('.owl-prev').on('click', function () {
                            $sliderFBCover.trigger('owl.prev');
                        });

                        $sliderFBCoverNav.find('.owl-next').on('click', function () {
                            $sliderFBCover.trigger('owl.next');
                        });
                    }
                }, {
                    key: 'fbLoadImages',
                    value: function fbLoadImages() {
                        this.logger.debug('fb-sdk / loading images');
                        var self = this;
                        return new Promise(function (resolve, reject) {
                            FB.api('/me/picture', 'get', { width: 300, height: 300 }, function (mrp) {
                                self.logger.debug('fb-sdk / /me/picture', mrp);
                                self.mrp = mrp;
                                FB.api('/me?fields=cover', function (mrc) {
                                    self.logger.debug('fb-sdk / /me?fields=cover', mrc);
                                    self.mrc = mrc;
                                    resolve.call(self);
                                });
                            });
                            setTimeout(function () {
                                if (!self.mrc) {
                                    reject.call(self, new Error('Facebook SDK timeout.'));
                                }
                            }, 20000);
                        });
                    }
                }, {
                    key: 'fbLoginCheck',
                    value: function fbLoginCheck() {
                        this.logger.debug('fb-sdk / check permissions');
                        return new Promise(function (resolve, reject) {
                            FB.getLoginStatus(function (response) {
                                switch (response.status) {
                                    case 'connected':
                                        resolve.call(this);
                                        break;
                                    case 'not_authorized':
                                    default:
                                        reject.call(this, response);
                                }
                            });
                        });
                    }
                }, {
                    key: 'fbLogin',
                    value: function fbLogin() {
                        this.logger.debug('fb-sdk / attempting login');

                        FB.login(function () {
                            location.reload();
                        }, { scope: 'publish_actions,read_stream,publish_stream,offline_access' });
                    }
                }, {
                    key: 'fbChangePicture',
                    value: function fbChangePicture() {
                        var _this = this;

                        var self = this;
                        this.fbLoginCheck().then(function () {
                            self.logger.debug('fb-sdk / permissions granted');
                            $.ajax({
                                url: _this.appConfig.getPhpUrl('sustine-facebook/1/0'),
                                dataType: 'json'
                            }).then(function (data) {
                                window.open('https://mobile.facebook.com/photo.php?fbid=1232098750152620&id=100000575215180&prof&ls=your_photo_permalink&ref_component=mbasic_photo_permalink', 'Sustin Planteaza pentru Romania', 'width=400,height=400');
                                console.log(data);
                                console.log('http://www.facebook.com/photo.php?fbid=' + data.id + '&type=1&makeprofile=1&makeuserprofile=1');
                                console.log('http://www.facebook.com/photo.php?pid=' + data.id + '&id=' + FB.getUserID() + '&makeprofile=1');
                            });
                        })['catch'](function (x, e) {
                            self.logger.warn('fb-sdk / permission denied', x, e);
                        });
                    }
                }]);

                var _Facebook = Facebook;
                Facebook = inject(AppConfig, HttpClient)(Facebook) || Facebook;
                return Facebook;
            })(ViewModelAbstract);

            _export('Facebook', Facebook);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvZmFjZWJvb2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7MERBNEJhLFFBQVE7Ozs7Ozs7Ozs7Ozt1Q0FwQmIsTUFBTTs7NkNBQ04sVUFBVTs7c0NBR1YsU0FBUzs7c0RBQ1QsaUJBQWlCOzs7QUFlWixvQkFBUTswQkFBUixRQUFROztBQWtCTix5QkFsQkYsUUFBUSxDQWtCTCxTQUFTLEVBQUUsSUFBSSxFQUFFOzs7QUFDekIscUdBQU0sU0FBUyxFQUFFO3lCQWpCckIsT0FBTyxHQUFHLCtCQUErQjtBQWtCckMsd0JBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLHdCQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztBQUNoQix3QkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBRXBCOzs2QkF4QlEsUUFBUTs7MkJBK0JULGtCQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDMUIsc0dBQWUsTUFBTSxFQUFFLFdBQVcsRUFBRTtBQUNwQyw0QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLCtCQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNsQyxnQ0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsZ0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDbEQsbUNBQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ2xDLG9DQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDOzZCQUMvQyxDQUFDLFNBQU0sQ0FBQyxVQUFDLENBQUMsRUFBSztBQUNaLG9DQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDekQsQ0FBQyxDQUFDO3lCQUNOLENBQUMsU0FBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBSztBQUNmLGdDQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDckQsZ0NBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3lCQUM3QixDQUFDLENBQUM7cUJBQ047OzsyQkFPTyxvQkFBRztBQUVQLDRCQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsZ0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsNkJBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQzdEO0FBQ0QsNEJBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUM1QixnQ0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyw2QkFBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDNUQscUNBQUssUUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLE1BQUc7NkJBQ3hDLENBQUMsQ0FBQzt5QkFDTjs7QUFFRCw0QkFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUN0Qjs7OzJCQU1VLHVCQUFHO0FBQ1YsNEJBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRXpDLDRCQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN6Qyw0QkFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNwRCw0QkFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDaEQsNEJBQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDMUQsNEJBQU0saUJBQWlCLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7O0FBRXRELGlDQUFTLENBQUMsV0FBVyxDQUFDO0FBQ2xCLG9DQUFRLEVBQUUsS0FBSztBQUNmLHVDQUFXLEVBQUUsS0FBSztBQUNsQixzQ0FBVSxFQUFFLEtBQUs7O0FBRWpCLHNDQUFVLEVBQUUsS0FBSztBQUNqQiwyQ0FBZSxFQUFFLEdBQUc7QUFDcEIsc0NBQVUsRUFBRSxJQUFJO0FBQ2hCLHNDQUFVLEVBQUUsS0FBSztBQUNqQiwyQ0FBZSxFQUFFLE1BQU07eUJBQzFCLENBQUMsQ0FBQzs7QUFHSCwyQ0FBbUIsQ0FDZCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUNwQiw0Q0FBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3hDLENBQUMsQ0FBQzs7QUFFUCwyQ0FBbUIsQ0FDZCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUNwQiw0Q0FBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3hDLENBQUMsQ0FBQzs7QUFFUCx5Q0FBaUIsQ0FDWixJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUNwQiwwQ0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDdEMsQ0FBQyxDQUFDOztBQUVQLHlDQUFpQixDQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDakIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFXO0FBQ3BCLDBDQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUN0QyxDQUFDLENBQUM7cUJBQ1Y7OzsyQkFPVyx3QkFBRztBQUNYLDRCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzdDLDRCQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsK0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ3BDLDhCQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFTLEdBQUcsRUFBRTtBQUNuRSxvQ0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDL0Msb0NBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2Ysa0NBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBUyxHQUFHLEVBQUU7QUFDckMsd0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELHdDQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLDJDQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUN0QixDQUFDLENBQUM7NkJBQ04sQ0FBQyxDQUFDO0FBQ0gsc0NBQVUsQ0FBQyxZQUFNO0FBQ2Isb0NBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1gsMENBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztpQ0FDekQ7NkJBQ0osRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFDYixDQUFDLENBQUM7cUJBQ047OzsyQkFPVyx3QkFBRztBQUNYLDRCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ2hELCtCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUNwQyw4QkFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFTLFFBQVEsRUFBRTtBQUNqQyx3Q0FBUSxRQUFRLENBQUMsTUFBTTtBQUNuQix5Q0FBSyxXQUFXO0FBQ1osK0NBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsOENBQU07QUFBQSxBQUNWLHlDQUFLLGdCQUFnQixDQUFDO0FBQ3RCO0FBQ0ksOENBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQUEsaUNBQ25DOzZCQUNKLENBQUMsQ0FBQzt5QkFDTixDQUFDLENBQUM7cUJBQ047OzsyQkFNTSxtQkFBRztBQUNOLDRCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztBQUUvQywwQkFBRSxDQUFDLEtBQUssQ0FBQyxZQUFNO0FBQUUsb0NBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLDJEQUEyRCxFQUFDLENBQUMsQ0FBQztxQkFDaEg7OzsyQkFPYywyQkFBRzs7O0FBQ2QsNEJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQiw0QkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzNCLGdDQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2xELDZCQUFDLENBQUMsSUFBSSxDQUFDO0FBQ0gsbUNBQUcsRUFBRSxNQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUM7QUFDckQsd0NBQVEsRUFBRSxNQUFNOzZCQUNuQixDQUFDLENBSUcsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ1osc0NBQU0sQ0FBQyxJQUFJLHFKQUVQLGlDQUFpQyxFQUNqQyxzQkFBc0IsQ0FDekIsQ0FBQztBQUNGLHVDQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLHVDQUFPLENBQUMsR0FBRyw2Q0FBMkMsSUFBSSxDQUFDLEVBQUUsNkNBQTBDLENBQUM7QUFDeEcsdUNBQU8sQ0FBQyxHQUFHLDRDQUEwQyxJQUFJLENBQUMsRUFBRSxZQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsb0JBQWlCLENBQUM7NkJBQ3RHLENBQUMsQ0FBQzt5QkFDVixDQUFDLFNBQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDZixnQ0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUN4RCxDQUFDLENBQUM7cUJBQ047OztnQ0E5TVEsUUFBUTtBQUFSLHdCQUFRLEdBRHBCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQ2pCLFFBQVEsS0FBUixRQUFRO3VCQUFSLFFBQVE7ZUFBUyxpQkFBaUIiLCJmaWxlIjoic3VwcG9ydC9mYWNlYm9vay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxhbnRlYXphIHBlbnRydSBSb21hbmlhIChodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8pXG4gKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBQcmlldGVuaWkgUGFkdXJpbG9yIGRpbiBSb21hbmlhIChodHRwOi8vcHJpZXRlbmlpcGFkdXJpbG9yLnJvKVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBJVCBNZWRpYSBDb25uZWN0IChodHRwOi8vaXRtZWRpYWNvbm5lY3Qucm8pXG4gKiBAbGljZW5zZSAgIGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLyMvYXBwbGljYXRpb24tbGljZW5zZSBDb21tZXJjaWFsXG4gKi9cblxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi9saWIvYXBwL2NvbmZpZyc7XG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICcuLi9saWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbi8vaW1wb3J0IHtjb21wdXRlZEZyb219IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbi8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9ncmFwaC1hcGkvdXNpbmctZ3JhcGgtYXBpXG4vLyBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvcGhwL2hvd3RvL3VwbG9hZHBob3RvXG4vLyBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvcGhwL2hvd3RvL3VwbG9hZHBob3RvXG4vLyBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvamF2YXNjcmlwdFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2phdmFzY3JpcHQvaG93dG8vanF1ZXJ5XG4vLyBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvamF2YXNjcmlwdC9ob3d0by9qcXVlcnkvdjIuNVxuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgY2hhbmdpbmcgRmFjZWJvb2sgUHJvZmlsZSBQaWN0dXJlIG9yIFByb2ZpbGUgQ292ZXJcbiAqXG4gKi9cbkBpbmplY3QoQXBwQ29uZmlnLCBIdHRwQ2xpZW50KVxuZXhwb3J0IGNsYXNzIEZhY2Vib29rIGV4dGVuZHMgVmlld01vZGVsQWJzdHJhY3Qge1xuXG4gICAgaGVhZGluZyA9ICdTdXN0aW5lIFByb2llY3R1bCBwZSBGYWNlYm9vayc7XG5cbiAgICAvKipcbiAgICAgKiBiZWNhdXNlIEBpbmplY3QgZG9lc24ndCB3b3JrLlxuICAgICAqIEBtZXRob2QgaW5qZWN0XG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgLy8gc3RhdGljIGluamVjdCgpIHsgcmV0dXJuIFtIdHRwQ2xpZW50XTsgfVxuXG4gICAgLyoqXG4gICAgICogY29uc3RydWN0b3JcbiAgICAgKiBAc2VlIFZpZXdNb2RlbEFic3RyYWN0I2NvbnN0cnVjdG9yXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSAge0h0dHBDbGllbnR9ICAgIGh0dHAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge3RoaXN9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYXBwQ29uZmlnLCBodHRwKSB7XG4gICAgICAgIHN1cGVyKGFwcENvbmZpZyk7XG4gICAgICAgIHRoaXMubXJjID0gbnVsbDtcbiAgICAgICAgdGhpcy5tcnAgPSBudWxsO1xuICAgICAgICB0aGlzLmh0dHAgPSBodHRwO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaHR0cCcsIHRoaXMuaHR0cCwgbmV3IEh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIGV2ZW50XG4gICAgICogQHNlZSBWaWV3TW9kZWxBYnN0cmFjdCNhY3RpdmF0ZVxuICAgICAqIEBtZXRob2QgYWN0aXZhdGVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnKSB7XG4gICAgICAgIHN1cGVyLmFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcpO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuZmJMb2dpbkNoZWNrKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmZiSXNMb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnZmItc2RrIC8gcGVybWlzc2lvbnMgZ3JhbnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZmJMb2FkSW1hZ2VzKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ2ZiLXNkayAvIGltYWdlcyBsb2FkZWQnKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2FybignZmItc2RrIC8gZmFpbGVkIGxvYWRpbmcgaW1hZ2VzJywgZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKHgsIGUpID0+IHtcbiAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ2ZiLXNkayAvIHBlcm1pc3Npb24gZGVuaWVkJywgeCwgZSk7XG4gICAgICAgICAgICBzZWxmLmZiSXNMb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlZCBldmVudFxuICAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjYXR0YWNoZWRcbiAgICAgKiBAbWV0aG9kIGF0dGFjaGVkXG4gICAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgIC8vIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5tcnAgJiYgdGhpcy5tcnAuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ3BpY3R1cmUnLCB0aGlzLm1ycCk7XG4gICAgICAgICAgICAkKCcuZmItaGVhZF9fcHJvZmlsZS1pbWcnKS5hdHRyKCdzcmMnLCB0aGlzLm1ycC5kYXRhLnVybCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXJjICYmIHRoaXMubXJjLmNvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnY292ZXInLCB0aGlzLm1yYyk7XG4gICAgICAgICAgICAkKCcuZmItaGVhZF9fY292ZXItaW1nJykuYXR0cignc3JjJywgdGhpcy5tcmMuY292ZXIuc291cmNlKS5jc3Moe1xuICAgICAgICAgICAgICAgICd0b3AnOiBgLSR7dGhpcy5tcmMuY292ZXIub2Zmc2V0X3l9JWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0U2xpZGVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgc2xpZGVycyBvbiB0aGlzIHBhZ2VcbiAgICAgKiBAbWV0aG9kIGluaXRTbGlkZXJzXG4gICAgICovXG4gICAgaW5pdFNsaWRlcnMoKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTdGFydGluZyBvd2wtc2xpZGVyJyk7XG5cbiAgICAgICAgY29uc3QgJHNsaWRlckZCID0gJCgnLm93bC1jYXJvdXNlbC0tZmInKTtcbiAgICAgICAgY29uc3QgJHNsaWRlckZCUHJvZmlsZSA9ICQoJyNvd2xDYXJvdXNlbEZCUHJvZmlsZScpO1xuICAgICAgICBjb25zdCAkc2xpZGVyRkJDb3ZlciA9ICQoJyNvd2xDYXJvdXNlbEZCQ292ZXInKTtcbiAgICAgICAgY29uc3QgJHNsaWRlckZCUHJvZmlsZU5hdiA9ICQoJyNvd2xDYXJvdXNlbEZCUHJvZmlsZU5hdicpO1xuICAgICAgICBjb25zdCAkc2xpZGVyRkJDb3Zlck5hdiA9ICQoJyNvd2xDYXJvdXNlbEZCQ292ZXJOYXYnKTtcblxuICAgICAgICAkc2xpZGVyRkIub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgYXV0b1BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgc3RvcE9uSG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBuYXZpZ2F0aW9uVGV4dDogWyc8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+JywgJzxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+J10sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb25TcGVlZDogNTAwLFxuICAgICAgICAgICAgc2luZ2xlSXRlbTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlOiAnZmFkZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWFwIGN1c3RvbSBuYXYgdG8gZWFjaCBjYXJvdXNlbFxuICAgICAgICAkc2xpZGVyRkJQcm9maWxlTmF2XG4gICAgICAgICAgICAuZmluZCgnLm93bC1wcmV2JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyRkJQcm9maWxlLnRyaWdnZXIoJ293bC5wcmV2Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAkc2xpZGVyRkJQcm9maWxlTmF2XG4gICAgICAgICAgICAuZmluZCgnLm93bC1uZXh0JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyRkJQcm9maWxlLnRyaWdnZXIoJ293bC5uZXh0Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAkc2xpZGVyRkJDb3Zlck5hdlxuICAgICAgICAgICAgLmZpbmQoJy5vd2wtcHJldicpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlckZCQ292ZXIudHJpZ2dlcignb3dsLnByZXYnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICRzbGlkZXJGQkNvdmVyTmF2XG4gICAgICAgICAgICAuZmluZCgnLm93bC1uZXh0JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyRkJDb3Zlci50cmlnZ2VyKCdvd2wubmV4dCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBGYWNlYm9vIEltYWdlcyAoUHJvZmlsZSBQaWN0dXJlIGFuZCBQcm9maWxlIENvdmVyKVxuICAgICAqIEBtZXRob2QgZmJMb2FkSW1hZ2VzXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmYkxvYWRJbWFnZXMoKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdmYi1zZGsgLyBsb2FkaW5nIGltYWdlcycpO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIEZCLmFwaSgnL21lL3BpY3R1cmUnLCAnZ2V0Jywge3dpZHRoOiAzMDAsIGhlaWdodDogMzAwIH0sIGZ1bmN0aW9uKG1ycCkge1xuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdmYi1zZGsgLyAvbWUvcGljdHVyZScsIG1ycCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tcnAgPSBtcnA7XG4gICAgICAgICAgICAgICAgRkIuYXBpKCcvbWU/ZmllbGRzPWNvdmVyJywgZnVuY3Rpb24obXJjKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmRlYnVnKCdmYi1zZGsgLyAvbWU/ZmllbGRzPWNvdmVyJywgbXJjKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tcmMgPSBtcmM7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLm1yYykge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QuY2FsbChzZWxmLCBuZXcgRXJyb3IoJ0ZhY2Vib29rIFNESyB0aW1lb3V0LicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIEZhY2Vib29rIFNESyBmb3IgUGVybW9zc2lvbnMgdG8gdXNlIHRoZSBhcHBsaWNhdGlvblxuICAgICAqIEBtZXRob2QgZmJMb2dpbkNoZWNrXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmYkxvZ2luQ2hlY2soKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdmYi1zZGsgLyBjaGVjayBwZXJtaXNzaW9ucycpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vdF9hdXRob3JpemVkJzpcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdC5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNrIEZhY2Vib29rIFNESyB0byBsb2dpbiB0byBGYWNlYm9vay5cbiAgICAgKiBAbWV0aG9kIGZiTG9naW5cbiAgICAgKi9cbiAgICBmYkxvZ2luKCkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnZmItc2RrIC8gYXR0ZW1wdGluZyBsb2dpbicpO1xuICAgICAgICAvLyB0cnkgZmFjZWJvb2sgbG9naW4gYW5kIHJlbG9hZCBsb2NhdGlvblxuICAgICAgICBGQi5sb2dpbigoKSA9PiB7IGxvY2F0aW9uLnJlbG9hZCgpOyB9LCB7c2NvcGU6ICdwdWJsaXNoX2FjdGlvbnMscmVhZF9zdHJlYW0scHVibGlzaF9zdHJlYW0sb2ZmbGluZV9hY2Nlc3MnfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW2ZiQ2hhbmdlUGljdHVyZSBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGZiQ2hhbmdlUGljdHVyZVxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBmYkNoYW5nZVBpY3R1cmUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZiTG9naW5DaGVjaygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ2ZiLXNkayAvIHBlcm1pc3Npb25zIGdyYW50ZWQnKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmFwcENvbmZpZy5nZXRQaHBVcmwoJ3N1c3RpbmUtZmFjZWJvb2svMS8wJyksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHNlbGYuaHR0cFxuICAgICAgICAgICAgICAgIC8vIC5mZXRjaChzZWxmLmFwcENvbmZpZy5nZXRQaHBVcmwoJ3N1c3RpbmUtZmFjZWJvb2svMS8wJykpXG4gICAgICAgICAgICAgICAgLy8gLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgYGh0dHBzOi8vbW9iaWxlLmZhY2Vib29rLmNvbS9waG90by5waHA/ZmJpZD0xMjMyMDk4NzUwMTUyNjIwJmlkPTEwMDAwMDU3NTIxNTE4MCZwcm9mJmxzPXlvdXJfcGhvdG9fcGVybWFsaW5rJnJlZl9jb21wb25lbnQ9bWJhc2ljX3Bob3RvX3Blcm1hbGlua2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3VzdGluIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGg9NDAwLGhlaWdodD00MDAnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vcGhvdG8ucGhwP2ZiaWQ9JHtkYXRhLmlkfSZ0eXBlPTEmbWFrZXByb2ZpbGU9MSZtYWtldXNlcnByb2ZpbGU9MWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vcGhvdG8ucGhwP3BpZD0ke2RhdGEuaWR9JmlkPSR7RkIuZ2V0VXNlcklEKCl9Jm1ha2Vwcm9maWxlPTFgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKHgsIGUpID0+IHtcbiAgICAgICAgICAgIHNlbGYubG9nZ2VyLndhcm4oJ2ZiLXNkayAvIHBlcm1pc3Npb24gZGVuaWVkJywgeCwgZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFtmYkNoYW5nZUNvdmVyIGRlc2NyaXB0aW9uXVxuICAgIC8vICAqIEBtZXRob2QgZmJDaGFuZ2VDb3ZlclxuICAgIC8vICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gICAgLy8gICovXG4gICAgLy8gZmJDaGFuZ2VDb3ZlcigpIHtcbiAgICAvL1xuICAgIC8vIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
