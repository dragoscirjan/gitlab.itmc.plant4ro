System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'lib/app/config', 'lib/view/model/abstract'], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var inject, HttpClient, AppConfig, ViewModelAbstract, Component;

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
            Component = (function (_ViewModelAbstract) {
                _inherits(Component, _ViewModelAbstract);

                function Component(appConfig, http) {
                    _classCallCheck(this, _Component);

                    _get(Object.getPrototypeOf(_Component.prototype), 'constructor', this).call(this, appConfig);
                    this.heading = 'Planteaza pentru Romania';
                    this.treeCount = '203.491';
                    this.donatorsQueue = [];
                    this.donatorsDrawn = [];
                    this.drawDonatorsQueueCalled = false;
                    this.toggleDonatorsActive = false;
                    this.setTimeoutTreeCount = 5000;
                    this.setTimeoutdonatorsQueue = 10000;
                    this.http = appConfig.configHttp(http);
                }

                _createClass(Component, [{
                    key: 'activate',
                    value: function activate(params, routeConfig) {
                        _get(Object.getPrototypeOf(_Component.prototype), 'activate', this).call(this, params, routeConfig);
                        return this.updateTreeCount();
                    }
                }, {
                    key: 'appendDonatorsQueue',
                    value: function appendDonatorsQueue(list) {
                        var self = this;
                        list.forEach(function (donator, i) {
                            var isUsedDonator = self.donatorsDrawn.filter(function (v) {
                                return v === donator.hash;
                            }).length;
                            if (isUsedDonator) {
                                return;
                            }

                            var isInCurrentList = self.donatorsQueue.filter(function (v) {
                                return v.hash === donator.hash;
                            }).length;
                            if (isInCurrentList) {
                                return;
                            }

                            self.donatorsQueue.push(donator);

                            if (self.donatorsQueue.length > 50) {
                                self.donatorsQueue.shift();
                            }
                        });

                        this.logger.debug('Donator list updated: ', this.donatorsQueue);
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        this.initSliders();
                        this.updateDonatorsQueue();
                    }
                }, {
                    key: 'drawDonator',
                    value: function drawDonator(donator) {
                        this.logger.debug('Drawing donator', donator);
                        this.donatorsDrawn.push(donator.hash);

                        return '<li class="donation__item" data-hash="' + donator.hash + '">\n            <div class="donator">\n                <div class="donator__details">\n                    <span class="donator__name">' + donator.name + '</span>\n                    <span class="donator__location">' + donator.location + '</span>\n                </div>\n                <span class="donator__donation">' + donator.trees + '</span>\n            </div>\n        </li>';
                    }
                }, {
                    key: 'drawDonatorsQueue',
                    value: function drawDonatorsQueue() {
                        var self = this;
                        var $ul = $('#donationList');

                        this.logger.debug('Drawing donator list', this.donatorsQueue);

                        setTimeout(function () {
                            self.drawDonatorsQueue();
                        }, 2000);

                        if (!this.donatorsQueue.length) {
                            return;
                        }

                        if (this.donatorsDrawn.length === 0) {
                            var limit = this.donatorsQueue.length < 4 ? this.donatorsQueue.length : 4;
                            for (var i = 0; i < limit; i++) {
                                $ul.append(this.drawDonator(this.donatorsQueue.shift()));
                            }
                        }

                        if (this.donatorsDrawn.length && !this.toggleDonatorsActive) {
                            return;
                        }

                        if (!this.donatorsQueue.length) {
                            return;
                        }

                        $ul.find('> li:first').slideUp('slow', function () {
                            $li.remove();
                        });

                        $ul.append(this.drawDonator(this.donatorsQueue.shift()));

                        $ul.find('> li:last').hide().slideDown('slow');
                    }
                }, {
                    key: 'initSliders',
                    value: function initSliders() {
                        this.logger.debug('Starting owl-slider');

                        var $sliderImg = $('#owlCarouselHPImg');
                        var $sliderTxt = $('#owlCarouselHPTxt');

                        $sliderImg.owlCarousel({
                            autoPlay: true,
                            stopOnHover: false,
                            navigation: false,
                            pagination: false,
                            paginationSpeed: 5000,
                            goToFirstSpeed: 2000,
                            singleItem: true,
                            transitionStyle: 'fade'
                        });

                        $sliderTxt.owlCarousel({
                            autoPlay: true,
                            stopOnHover: false,
                            navigation: false,
                            pagination: true,
                            paginationSpeed: 5000,
                            goToFirstSpeed: 2000,
                            singleItem: true,
                            transitionStyle: 'fade',
                            afterInit: function afterInit(slider) {
                                this.owlControls.prependTo(slider);
                            },
                            afterMove: function afterMove(slider) {
                                var number = this.currentItem;
                                $sliderImg.trigger('owl.goTo', number);
                            }
                        });
                    }
                }, {
                    key: 'toggleDonators',
                    value: function toggleDonators() {
                        this.toggleDonatorsActive = !this.toggleDonatorsActive;
                    }
                }, {
                    key: 'updateTreeCount',
                    value: function updateTreeCount() {
                        var self = this;
                        setTimeout(function () {
                            self.updateTreeCount();
                        }, this.setTimeoutTreeCount);
                        this.logger.debug('Calling /services/tree-count');
                        return this.http.fetch('tree-count').then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            self.logger.debug('Tree count obtained:', data);
                            if (!data.error) {
                                self.treeCount = data.treeCount.length < 4 ? data.treeCount : data.treeCount.replace(/(\d{3})$/, function ($1) {
                                    return '.' + $1;
                                });
                            } else {
                                self.treeCount = 100.000;
                            }
                        });
                    }
                }, {
                    key: 'updateDonatorsQueue',
                    value: function updateDonatorsQueue() {
                        var self = this;
                        setTimeout(function () {
                            self.updateDonatorsQueue();
                        }, this.setTimeoutdonatorsQueue);

                        if (this.donatorsQueue.length > 0 && !this.toggleDonatorsActive) {
                            return;
                        }

                        this.logger.debug('Calling /services/donator-list');

                        this.http.fetch('donator-list').then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            self.logger.debug('Donator list obtained:', data);
                            if (!data.error) {
                                self.appendDonatorsQueue(data.list);

                                if (!self.drawDonatorsQueueCalled) {
                                    self.drawDonatorsQueue();

                                    self.drawDonatorsQueueCalled = true;
                                }
                            } else {
                                self.donatorsQueue = self.donatorsQueue ? self.donatorsQueue : [];
                            }
                        });
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
//# sourceMappingURL=data:application/json;base64,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RUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFaEYsNEJBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO0FBQzdELG1DQUFPO3lCQUNWOztBQUVELDRCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOztBQUVwRCw0QkFBSSxDQUFDLElBQUksQ0FDSixLQUFLLENBQUMsY0FBYyxDQUFDLENBQ3JCLElBQUksQ0FBQyxVQUFBLFFBQVE7bUNBQUksUUFBUSxDQUFDLElBQUksRUFBRTt5QkFBQSxDQUFDLENBQ2pDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUVaLGdDQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRCxnQ0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFFYixvQ0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFcEMsb0NBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7QUFFL0Isd0NBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztBQUV6Qix3Q0FBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztpQ0FDdkM7NkJBQ0osTUFBTTtBQUNILG9DQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7NkJBQ3JFO3lCQUNKLENBQUMsQ0FBQztxQkFDVjs7O2lDQS9RUSxTQUFTO0FBQVQseUJBQVMsR0FEckIsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FDakIsU0FBUyxLQUFULFNBQVM7dUJBQVQsU0FBUztlQUFTLGlCQUFpQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxhbnRlYXphIHBlbnRydSBSb21hbmlhIChodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8pXG4gKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBQcmlldGVuaWkgUGFkdXJpbG9yIGRpbiBSb21hbmlhIChodHRwOi8vcHJpZXRlbmlpcGFkdXJpbG9yLnJvKVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBJVCBNZWRpYSBDb25uZWN0IChodHRwOi8vaXRtZWRpYWNvbm5lY3Qucm8pXG4gKiBAbGljZW5zZSAgIGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLyMvYXBwbGljYXRpb24tbGljZW5zZSBDb21tZXJjaWFsXG4gKi9cblxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICdsaWIvYXBwL2NvbmZpZyc7XG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICdsaWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbi8qKlxuICogQ29tcG9uZW50IGZvciBob21lUGFnZVxuICpcbiAqL1xuQGluamVjdChBcHBDb25maWcsIEh0dHBDbGllbnQpXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgVmlld01vZGVsQWJzdHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBoZWFkaW5nID0gJ1BsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSc7XG5cbiAgICAvKipcbiAgICAgKiBbdHJlZUNvdW50IGRlc2NyaXB0aW9uXVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdHJlZUNvdW50ID0gJzIwMy40OTEnXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IExpc3Qgb2YgRG9uYXRvcnNcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgZG9uYXRvcnNRdWV1ZSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBhbHJlYWR5IGRyYXduIGRvbmF0b3JzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGRvbmF0b3JzRHJhd24gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICogQHNlZSBWaWV3TW9kZWxBYnN0cmFjdCNjb25zdHJ1Y3RvclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gIHtIdHRwQ2xpZW50fSAgICBodHRwIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFwcENvbmZpZywgaHR0cCkge1xuICAgICAgICBzdXBlcihhcHBDb25maWcpO1xuICAgICAgICB0aGlzLmh0dHAgPSBhcHBDb25maWcuY29uZmlnSHR0cChodHRwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2VlIFZpZXdNb2RlbEFic3RyYWN0I2FjdGl2YXRlXG4gICAgICovXG4gICAgYWN0aXZhdGUocGFyYW1zLCByb3V0ZUNvbmZpZykge1xuICAgICAgICBzdXBlci5hY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVHJlZUNvdW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGRvbmF0b3JzIGZyb20gZGF0YWJhc2UgdG8gZHJhd2luZyBxdWV1ZVxuICAgICAqIEBtZXRob2QgYXBwZW5kRG9uYXRvcnNRdWV1ZVxuICAgICAqL1xuICAgIGFwcGVuZERvbmF0b3JzUXVldWUobGlzdCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgbGlzdC5mb3JFYWNoKChkb25hdG9yLCBpKSA9PiB7XG4gICAgICAgICAgICAvLyBmaXJzdCBzZWFyY2ggaWYgZG9uYXRvciB3YXMgYWxyZWFkeSBzaG93biAoY291bGQgaGFwcGVuKVxuICAgICAgICAgICAgbGV0IGlzVXNlZERvbmF0b3IgPSBzZWxmLmRvbmF0b3JzRHJhd24uZmlsdGVyKHYgPT4geyByZXR1cm4gdiA9PT0gZG9uYXRvci5oYXNoOyB9KS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoaXNVc2VkRG9uYXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNlY29uZCBzZWFyY2ggaWYgZG9uYXRvciBpcyBhbHJlYWR5IGluIHF1ZXVlIChjYW4gaGFwcGVuKVxuICAgICAgICAgICAgbGV0IGlzSW5DdXJyZW50TGlzdCA9IHNlbGYuZG9uYXRvcnNRdWV1ZS5maWx0ZXIodiA9PiB7IHJldHVybiB2Lmhhc2ggPT09IGRvbmF0b3IuaGFzaDsgfSkubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGlzSW5DdXJyZW50TGlzdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCBkb25hdG9yIHRvIHF1ZXVlXG4gICAgICAgICAgICBzZWxmLmRvbmF0b3JzUXVldWUucHVzaChkb25hdG9yKTtcbiAgICAgICAgICAgIC8vIGlmIGRvbmF0b3IgbGlzdCBpcyBoaWdoZXIgdGhhbiA1MCwgc2hpZnQgdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgaWYgKHNlbGYuZG9uYXRvcnNRdWV1ZS5sZW5ndGggPiA1MCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZG9uYXRvcnNRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuZG9uYXRvcnNEcmF3bi5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2FsbCBsb2dcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ0RvbmF0b3IgbGlzdCB1cGRhdGVkOiAnLCB0aGlzLmRvbmF0b3JzUXVldWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFthdHRhY2hlZCBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGF0dGFjaGVkXG4gICAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFNsaWRlcnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb25hdG9yc1F1ZXVlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgZG9uYXRvciBIVE1MXG4gICAgICogQG1ldGhvZCBkcmF3RG9uYXRvclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gICAgZG9uYXRvclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBkcmF3RG9uYXRvcihkb25hdG9yKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdEcmF3aW5nIGRvbmF0b3InLCBkb25hdG9yKTtcbiAgICAgICAgdGhpcy5kb25hdG9yc0RyYXduLnB1c2goZG9uYXRvci5oYXNoKTtcbiAgICAgICAgLy8gcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwiZG9uYXRpb25fX2l0ZW1cIiBkYXRhLWhhc2g9XCIke2RvbmF0b3IuaGFzaH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb25hdG9yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvbmF0b3JfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb25hdG9yX19uYW1lXCI+JHtkb25hdG9yLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvbmF0b3JfX2xvY2F0aW9uXCI+JHtkb25hdG9yLmxvY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvbmF0b3JfX2RvbmF0aW9uXCI+JHtkb25hdG9yLnRyZWVzfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPmA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhdyBkb25hdGlvbnMgKHJlY3Vyc2l2ZSBhdCAyIHNlY29uZHMpXG4gICAgICogQG1ldGhvZCBkcmF3RG9uYXRvcnNRdWV1ZVxuICAgICAqL1xuICAgIGRyYXdEb25hdG9yc1F1ZXVlKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCAkdWwgPSAkKCcjZG9uYXRpb25MaXN0Jyk7XG4gICAgICAgIC8vIGxvZyBjYWxsXG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdEcmF3aW5nIGRvbmF0b3IgbGlzdCcsIHRoaXMuZG9uYXRvcnNRdWV1ZSk7XG4gICAgICAgIC8vIHJlY3Vyc2l2ZSBjYWxsXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZWxmLmRyYXdEb25hdG9yc1F1ZXVlKCk7IH0sIDIwMDApO1xuICAgICAgICAvLyBpZiBkb25hdG9yIGxpc3QgaXMgZW1wdHksIGV4aXRcbiAgICAgICAgaWYgKCF0aGlzLmRvbmF0b3JzUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgZHJhd2luZyBsaXN0IGlzIGVtcHR5LCBkcmF3IGZvdXIgZWxlbWVudHNcbiAgICAgICAgaWYgKHRoaXMuZG9uYXRvcnNEcmF3bi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBsaW1pdCA9IHRoaXMuZG9uYXRvcnNRdWV1ZS5sZW5ndGggPCA0ID8gdGhpcy5kb25hdG9yc1F1ZXVlLmxlbmd0aCA6IDQ7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcbiAgICAgICAgICAgICAgICAkdWwuYXBwZW5kKHRoaXMuZHJhd0RvbmF0b3IodGhpcy5kb25hdG9yc1F1ZXVlLnNoaWZ0KCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAxc3QgNCBhcmUgZHJhd24gYW5kIGxpc3QgaXMgbm90IHZpc2libGUsIGp1c3QgZXhpdFxuICAgICAgICBpZiAodGhpcy5kb25hdG9yc0RyYXduLmxlbmd0aCAmJiAhdGhpcy50b2dnbGVEb25hdG9yc0FjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGRvbmF0b3JzIHF1ZXVlIGlzIGVtcHR5LCBqdXN0IGV4aXRcbiAgICAgICAgaWYgKCF0aGlzLmRvbmF0b3JzUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGlkZSBmaXJzdCBpdGVtIGluIGxpc3QgJiByZW1vdmUgaXQgd2hlbiBoaWRkZW5cbiAgICAgICAgJHVsLmZpbmQoJz4gbGk6Zmlyc3QnKS5zbGlkZVVwKCdzbG93JywgKCkgPT4geyAkbGkucmVtb3ZlKCk7IH0pO1xuICAgICAgICAvLyBhZGQgYSBuZXcgaXRlbSBpbiBsaXN0XG4gICAgICAgICR1bC5hcHBlbmQodGhpcy5kcmF3RG9uYXRvcih0aGlzLmRvbmF0b3JzUXVldWUuc2hpZnQoKSkpO1xuICAgICAgICAvLyBhbmQgc2hvdyBpdFxuICAgICAgICAkdWwuZmluZCgnPiBsaTpsYXN0JykuaGlkZSgpLnNsaWRlRG93bignc2xvdycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtkcmF3RG9uYXRvcnNRdWV1ZUNhbGxlZCBkZXNjcmlwdGlvbl1cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBkcmF3RG9uYXRvcnNRdWV1ZUNhbGxlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBzbGlkZXJzIG9uIHRoaXMgcGFnZVxuICAgICAqIEBtZXRob2QgaW5pdFNsaWRlcnNcbiAgICAgKi9cbiAgICBpbml0U2xpZGVycygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1N0YXJ0aW5nIG93bC1zbGlkZXInKTtcblxuICAgICAgICAvLyBIUCBoYXMgdHdvIGNhcm91c2VsIHRoYXQgbmVlZCB0byBiZSBzeW5jZWRcbiAgICAgICAgY29uc3QgJHNsaWRlckltZyA9ICQoJyNvd2xDYXJvdXNlbEhQSW1nJyk7XG4gICAgICAgIGNvbnN0ICRzbGlkZXJUeHQgPSAkKCcjb3dsQ2Fyb3VzZWxIUFR4dCcpO1xuXG4gICAgICAgICRzbGlkZXJJbWcub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgYXV0b1BsYXk6IHRydWUsXG4gICAgICAgICAgICBzdG9wT25Ib3ZlcjogZmFsc2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgcGFnaW5hdGlvblNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZ29Ub0ZpcnN0U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBzaW5nbGVJdGVtOiB0cnVlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlOiAnZmFkZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNsaWRlclR4dC5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgICBhdXRvUGxheTogdHJ1ZSxcbiAgICAgICAgICAgIHN0b3BPbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb25TcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGdvVG9GaXJzdFNwZWVkOiAyMDAwLFxuICAgICAgICAgICAgc2luZ2xlSXRlbTogdHJ1ZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25TdHlsZTogJ2ZhZGUnLFxuICAgICAgICAgICAgYWZ0ZXJJbml0OiBmdW5jdGlvbihzbGlkZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRoZSBjb250cm9scyBiZWZvcmUgdGhlIGNvbnRlbnRcbiAgICAgICAgICAgICAgICB0aGlzLm93bENvbnRyb2xzLnByZXBlbmRUbyhzbGlkZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oc2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyID0gdGhpcy5jdXJyZW50SXRlbTtcbiAgICAgICAgICAgICAgICAkc2xpZGVySW1nLnRyaWdnZXIoJ293bC5nb1RvJywgbnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3RvZ2dsZURvbmF0b3JzQWN0aXZlIGRlc2NyaXB0aW9uXVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRvZ2dsZURvbmF0b3JzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbdG9nZ2xlRG9uYXRvcnMgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCB0b2dnbGVEb25hdG9yc1xuICAgICAqL1xuICAgIHRvZ2dsZURvbmF0b3JzKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZURvbmF0b3JzQWN0aXZlID0gIXRoaXMudG9nZ2xlRG9uYXRvcnNBY3RpdmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFRpbWVvdXRUcmVlQ291bnQgZGVzY3JpcHRpb25dXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBzZXRUaW1lb3V0VHJlZUNvdW50ID0gNTAwMDtcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVUcmVlQ291bnQgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCB1cGRhdGVUcmVlQ291bnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgdXBkYXRlVHJlZUNvdW50KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNlbGYudXBkYXRlVHJlZUNvdW50KCk7IH0sIHRoaXMuc2V0VGltZW91dFRyZWVDb3VudCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdDYWxsaW5nIC9zZXJ2aWNlcy90cmVlLWNvdW50Jyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZmV0Y2goJ3RyZWUtY291bnQnKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnVHJlZSBjb3VudCBvYnRhaW5lZDonLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlQ291bnQgPSAoZGF0YS50cmVlQ291bnQubGVuZ3RoIDwgNCkgPyBkYXRhLnRyZWVDb3VudCA6IGRhdGEudHJlZUNvdW50LnJlcGxhY2UoLyhcXGR7M30pJC8sICQxID0+IHsgcmV0dXJuICcuJyArICQxOyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVDb3VudCA9IDEwMC4wMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NldFRpbWVvdXRkb25hdG9yc1F1ZXVlIGRlc2NyaXB0aW9uXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgc2V0VGltZW91dGRvbmF0b3JzUXVldWUgPSAxMDAwMDtcblxuICAgIC8qKlxuICAgICAqIENhbGxzIHNlcnZpY2UgYW5kIG1hbmFnZXMgYXJyYXkgYW5kIGh0bWwgKHJlY3Vyc2l2ZSBlYWNoIGBzZXRUaW1lb3V0ZG9uYXRvcnNRdWV1ZWAgc2Vjb25kcylcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZURvbmF0b3JzUXVldWVcbiAgICAgKi9cbiAgICB1cGRhdGVEb25hdG9yc1F1ZXVlKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNlbGYudXBkYXRlRG9uYXRvcnNRdWV1ZSgpOyB9LCB0aGlzLnNldFRpbWVvdXRkb25hdG9yc1F1ZXVlKTtcbiAgICAgICAgLy8gaWYgSSBzdGlsbCBoYXZlIGRvbmF0b3JzIGluIGxpc3QgYW5kIGh0bWwgaXMgbm90IHZpc2libGUsIGV4aXRcbiAgICAgICAgaWYgKHRoaXMuZG9uYXRvcnNRdWV1ZS5sZW5ndGggPiAwICYmICF0aGlzLnRvZ2dsZURvbmF0b3JzQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9nIGNhbGxcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ0NhbGxpbmcgL3NlcnZpY2VzL2RvbmF0b3ItbGlzdCcpO1xuICAgICAgICAvLyBodHRwIHNlcnZpY2UgY2FsbFxuICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5mZXRjaCgnZG9uYXRvci1saXN0JylcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbG9nIG9idGFpbmVkIGxpc3RcbiAgICAgICAgICAgICAgICBzZWxmLmxvZ2dlci5kZWJ1ZygnRG9uYXRvciBsaXN0IG9idGFpbmVkOicsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgZG9uYXRvcnMgdG8gbGlzdFxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGVuZERvbmF0b3JzUXVldWUoZGF0YS5saXN0KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudCBkcmF3aW5nIGZyb20gYmVpbmcgY2FsbGVkIHR3aWNlIGluIHRoZSBzYW1lIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmRyYXdEb25hdG9yc1F1ZXVlQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYXdlclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kcmF3RG9uYXRvcnNRdWV1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFyayBkcmF3ZXIgYXMgY2FsbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRyYXdEb25hdG9yc1F1ZXVlQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uYXRvcnNRdWV1ZSA9IHNlbGYuZG9uYXRvcnNRdWV1ZSA/IHNlbGYuZG9uYXRvcnNRdWV1ZSA6IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
