System.register(['aurelia-framework', 'lib/app/config', '../lib/view/model/abstract'], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var inject, AppConfig, ViewModelAbstract, Component;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_libAppConfig) {
            AppConfig = _libAppConfig.AppConfig;
        }, function (_libViewModelAbstract) {
            ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
        }],
        execute: function () {
            Component = (function (_ViewModelAbstract) {
                _inherits(Component, _ViewModelAbstract);

                function Component() {
                    _classCallCheck(this, _Component);

                    _get(Object.getPrototypeOf(_Component.prototype), 'constructor', this).apply(this, arguments);

                    this.heading = 'Participa la plantat';
                    this.scriptsStoreLocator = ['https://maps.googleapis.com/maps/api/js?libraries=places,geometry', 'dist/assets/scripts/shopLocator.js', '3rdpt/jquery-shop-locator/src/dependences/infobubble.js', '3rdpt/jquery-shop-locator/src/dependences/markerclusterer.js'];
                }

                _createClass(Component, [{
                    key: 'activate',
                    value: function activate(params, routeConfig) {
                        _get(Object.getPrototypeOf(_Component.prototype), 'activate', this).call(this, params, routeConfig);

                        return this.initJsStoreLocator();
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        this.initStoreLocator();
                    }
                }, {
                    key: 'initJsStoreLocator',
                    value: function initJsStoreLocator() {
                        var self = this;

                        return new Promise(function (resolve, reject) {
                            var script = document.createElement('script');
                            script.src = self.scriptsStoreLocator.shift();
                            script.async = true;
                            script.onload = function (event) {
                                if (self.scriptsStoreLocator.length) {
                                    self.initJsStoreLocator().then(function (events) {
                                        resolve(events + [event]);
                                    });
                                } else {
                                    resolve([event]);
                                }
                            };
                            document.head.appendChild(script);
                        });
                    }
                }, {
                    key: 'initStoreLocator',
                    value: function initStoreLocator() {
                        $('#map').ShopLocator({
                            json: '/services/index.php/event-locations',
                            pluginStyle: 'metro',
                            paginationStyle: 1,
                            infoBubble: {
                                visible: true,
                                backgroundColor: 'transparent',
                                arrowSize: 0,
                                arrowPosition: 50,
                                minHeight: 127,
                                maxHeight: 135,
                                minWidth: 170,
                                maxWidth: 250,
                                hideCloseButton: false,
                                closeSrc: '3rdpt/jquery-shop-locator/src/style/closeButton.svg'
                            },
                            map: {
                                mapStyle: [{
                                    'featureType': 'landscape',
                                    'stylers': [{ 'saturation': -100 }, { 'lightness': 65 }, { 'visibility': 'on' }]
                                }, {
                                    'featureType': 'poi',
                                    'stylers': [{ 'saturation': -100 }, { 'lightness': 51 }, { 'visibility': 'simplified' }]
                                }, {
                                    'featureType': 'road.highway',
                                    'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }]
                                }, {
                                    'featureType': 'road.arterial',
                                    'stylers': [{ 'saturation': -100 }, { 'lightness': 30 }, { 'visibility': 'on' }]
                                }, {
                                    'featureType': 'road.local',
                                    'stylers': [{ 'saturation': -100 }, { 'lightness': 40 }, { 'visibility': 'on' }]
                                }, {
                                    'featureType': 'transit',
                                    'stylers': [{ 'saturation': -100 }, { 'visibility': 'simplified' }]
                                }, {
                                    'featureType': 'administrative.province',
                                    'stylers': [{ 'visibility': 'off' }]
                                }, {
                                    'featureType': 'water',
                                    'elementType': 'labels',
                                    'stylers': [{ 'visibility': 'on' }, { 'lightness': -25 }, { 'saturation': -100 }]
                                }, {
                                    'featureType': 'water',
                                    'elementType': 'geometry',
                                    'stylers': [{ 'hue': '#ffff00' }, { 'lightness': -25 }, { 'saturation': -97 }]
                                }]
                            },
                            markersIcon: 'dist/assets/img/icons/marker.png',
                            cluster: {
                                enable: true,
                                gridSize: 60,
                                style: {
                                    textColor: '#f2f1ee',
                                    textSize: 18,
                                    heightSM: 54,
                                    widthSM: 54,
                                    heightMD: 64,
                                    widthMD: 64,
                                    heightBIG: 74,
                                    widthBIG: 74,
                                    iconSmall: 'dist/assets/img/icons/clusterSmall.png',
                                    iconMedium: 'dist/assets/img/icons/clusterMedium.png',
                                    iconBig: 'dist/assets/img/icons/clusterBig.png'
                                }
                            },
                            sidebar: {
                                visible: true,
                                selectSection: {
                                    pathToJSONDirectory: this.appConfig.getPhpUrl('event-locations') + '/',
                                    difFiles: [['Toate', 'all'], ['Jud. Fagaras', 'fagaras'], ['Jud. Prahova', 'prahova']],
                                    fileTypes: '',
                                    visible: true
                                },
                                searchBox: {
                                    visible: true,
                                    search: true
                                },
                                results: {
                                    pageSize: 8,
                                    paginationItems: 5
                                }
                            }
                        });
                    }
                }]);

                var _Component = Component;
                Component = inject(AppConfig)(Component) || Component;
                return Component;
            })(ViewModelAbstract);

            _export('Component', Component);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvcGFydGljaXBhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OENBYWEsU0FBUzs7Ozs7Ozs7Ozs7O3VDQUxkLE1BQU07O3NDQUNOLFNBQVM7O3NEQUNULGlCQUFpQjs7O0FBR1oscUJBQVM7MEJBQVQsU0FBUzs7eUJBQVQsU0FBUzs7Ozs7eUJBRWxCLE9BQU8sR0FBRyxzQkFBc0I7eUJBeUJoQyxtQkFBbUIsR0FBRyxzT0FNckI7Ozs2QkFqQ1EsU0FBUzs7MkJBT1Ysa0JBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRTtBQUMxQix1R0FBZSxNQUFNLEVBQUUsV0FBVyxFQUFFOztBQUdwQywrQkFBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztxQkFDcEM7OzsyQkFNTyxvQkFBRztBQUNQLDRCQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztxQkFFM0I7OzsyQkFrQmlCLDhCQUFHO0FBQ2pCLDRCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLCtCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUNwQyxnQ0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxrQ0FBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDOUMsa0NBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGtDQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsS0FBSyxFQUFLO0FBQ3ZCLG9DQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7QUFDakMsd0NBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUFFLCtDQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztxQ0FBRSxDQUFDLENBQUM7aUNBQzlFLE1BQU07QUFD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QUFTO2VBQVMsaUJBQWlCIiwiZmlsZSI6InN1cHBvcnQvcGFydGljaXBhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnbGliL2FwcC9jb25maWcnO1xuaW1wb3J0IHtWaWV3TW9kZWxBYnN0cmFjdH0gZnJvbSAnLi4vbGliL3ZpZXcvbW9kZWwvYWJzdHJhY3QnO1xuXG5AaW5qZWN0KEFwcENvbmZpZylcbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBWaWV3TW9kZWxBYnN0cmFjdCB7XG5cbiAgICBoZWFkaW5nID0gJ1BhcnRpY2lwYSBsYSBwbGFudGF0JztcblxuICAgIC8qKlxuICAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjYWN0aXZhdGVcbiAgICAgKi9cbiAgICBhY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnKSB7XG4gICAgICAgIHN1cGVyLmFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcpO1xuICAgICAgICAvLyBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLmluaXRKc0dvb2dsZU1hcHMoKS50aGVuKChnbUV2ZW50KSA9PiB7IHNlbGYuaW5pdEpzSnF1ZXJ5U3RvcmVMb2NhdG9yKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0SnNTdG9yZUxvY2F0b3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbYXR0YWNoZWQgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBhdHRhY2hlZFxuICAgICAqL1xuICAgIGF0dGFjaGVkKCkge1xuICAgICAgICB0aGlzLmluaXRTdG9yZUxvY2F0b3IoKTtcbiAgICAgICAgLy8gdGhpcy5pbml0SnNTdG9yZUxvY2F0b3IoKS50aGVuKCgpID0+IHsgY29uc29sZS5sb2coYXJndW1lbnRzKTsgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW3NjcmlwdHNTdG9yZUxvY2F0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHNjcmlwdHNTdG9yZUxvY2F0b3IgPSBbXG4gICAgICAgIGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/bGlicmFyaWVzPXBsYWNlcyxnZW9tZXRyeWAsXG4gICAgICAgIC8vIGAzcmRwdC9qcXVlcnktc2hvcC1sb2NhdG9yL3NyYy9zaG9wLWxvY2F0b3IuanNgLFxuICAgICAgICBgZGlzdC9hc3NldHMvc2NyaXB0cy9zaG9wTG9jYXRvci5qc2AsXG4gICAgICAgIGAzcmRwdC9qcXVlcnktc2hvcC1sb2NhdG9yL3NyYy9kZXBlbmRlbmNlcy9pbmZvYnViYmxlLmpzYCxcbiAgICAgICAgYDNyZHB0L2pxdWVyeS1zaG9wLWxvY2F0b3Ivc3JjL2RlcGVuZGVuY2VzL21hcmtlcmNsdXN0ZXJlci5qc2BcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpbml0SnNTdG9yZUxvY2F0b3JcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGluaXRKc1N0b3JlTG9jYXRvcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNjcmlwdHNTdG9yZUxvY2F0b3JbMF0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHNlbGYuc2NyaXB0c1N0b3JlTG9jYXRvci5zaGlmdCgpO1xuICAgICAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JpcHRzU3RvcmVMb2NhdG9yLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXRKc1N0b3JlTG9jYXRvcigpLnRoZW4oKGV2ZW50cykgPT4geyByZXNvbHZlKGV2ZW50cyArIFtldmVudF0pOyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtldmVudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIE1hcFxuICAgICAqIEBtZXRob2QgaW5pdFN0b3JlTG9jYXRvclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgaW5pdFN0b3JlTG9jYXRvcigpIHtcbiAgICAgICAgLy8gM3JkcHQvanF1ZXJ5LXNob3AtbG9jYXRvci9cbiAgICAgICAgJCgnI21hcCcpLlNob3BMb2NhdG9yKHtcbiAgICAgICAgICAgIC8vIGpzb246ICczcmRwdC9qcXVlcnktc2hvcC1sb2NhdG9yL3NyYy9qc29uL21hcmtlcnMuanNvbicsXG4gICAgICAgICAgICBqc29uOiAnL3NlcnZpY2VzL2luZGV4LnBocC9ldmVudC1sb2NhdGlvbnMnLFxuICAgICAgICAgICAgcGx1Z2luU3R5bGU6ICdtZXRybycsXG4gICAgICAgICAgICBwYWdpbmF0aW9uU3R5bGU6IDEsXG4gICAgICAgICAgICBpbmZvQnViYmxlOiB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgYXJyb3dTaXplOiAwLFxuICAgICAgICAgICAgICAgIGFycm93UG9zaXRpb246IDUwLFxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogMTI3LFxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogMTM1LFxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAxNzAsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IDI1MCxcbiAgICAgICAgICAgICAgICBoaWRlQ2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsb3NlU3JjOiAnM3JkcHQvanF1ZXJ5LXNob3AtbG9jYXRvci9zcmMvc3R5bGUvY2xvc2VCdXR0b24uc3ZnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDoge1xuICAgICAgICAgICAgICAgIG1hcFN0eWxlOiBbe1xuICAgICAgICAgICAgICAgICAgICAnZmVhdHVyZVR5cGUnOiAnbGFuZHNjYXBlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlcnMnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICdzYXR1cmF0aW9uJzogLTEwMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyAnbGlnaHRuZXNzJzogNjUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ3Zpc2liaWxpdHknOiAnb24nIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogJ3BvaScsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZXJzJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyAnc2F0dXJhdGlvbic6IC0xMDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ2xpZ2h0bmVzcyc6IDUxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICd2aXNpYmlsaXR5JzogJ3NpbXBsaWZpZWQnIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogJ3JvYWQuaGlnaHdheScsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZXJzJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyAnc2F0dXJhdGlvbic6IC0xMDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ3Zpc2liaWxpdHknOiAnc2ltcGxpZmllZCcgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAnZmVhdHVyZVR5cGUnOiAncm9hZC5hcnRlcmlhbCcsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZXJzJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyAnc2F0dXJhdGlvbic6IC0xMDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ2xpZ2h0bmVzcyc6IDMwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICd2aXNpYmlsaXR5JzogJ29uJyB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICdmZWF0dXJlVHlwZSc6ICdyb2FkLmxvY2FsJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlcnMnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICdzYXR1cmF0aW9uJzogLTEwMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyAnbGlnaHRuZXNzJzogNDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ3Zpc2liaWxpdHknOiAnb24nIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogJ3RyYW5zaXQnLFxuICAgICAgICAgICAgICAgICAgICAnc3R5bGVycyc6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ3NhdHVyYXRpb24nOiAtMTAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICd2aXNpYmlsaXR5JzogJ3NpbXBsaWZpZWQnIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogJ2FkbWluaXN0cmF0aXZlLnByb3ZpbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlcnMnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICd2aXNpYmlsaXR5JzogJ29mZicgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAnZmVhdHVyZVR5cGUnOiAnd2F0ZXInLFxuICAgICAgICAgICAgICAgICAgICAnZWxlbWVudFR5cGUnOiAnbGFiZWxzJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlcnMnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICd2aXNpYmlsaXR5JzogJ29uJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyAnbGlnaHRuZXNzJzogLTI1IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICdzYXR1cmF0aW9uJzogLTEwMCB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICdmZWF0dXJlVHlwZSc6ICd3YXRlcicsXG4gICAgICAgICAgICAgICAgICAgICdlbGVtZW50VHlwZSc6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZXJzJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyAnaHVlJzogJyNmZmZmMDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICdsaWdodG5lc3MnOiAtMjUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJ3NhdHVyYXRpb24nOiAtOTcgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXJrZXJzSWNvbjogJ2Rpc3QvYXNzZXRzL2ltZy9pY29ucy9tYXJrZXIucG5nJyxcbiAgICAgICAgICAgIGNsdXN0ZXI6IHtcbiAgICAgICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZ3JpZFNpemU6IDYwLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvcjogJyNmMmYxZWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogMTgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodFNNOiA1NCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGhTTTogNTQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodE1EOiA2NCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGhNRDogNjQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodEJJRzogNzQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoQklHOiA3NCxcbiAgICAgICAgICAgICAgICAgICAgaWNvblNtYWxsOiAnZGlzdC9hc3NldHMvaW1nL2ljb25zL2NsdXN0ZXJTbWFsbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBpY29uTWVkaXVtOiAnZGlzdC9hc3NldHMvaW1nL2ljb25zL2NsdXN0ZXJNZWRpdW0ucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbkJpZzogJ2Rpc3QvYXNzZXRzL2ltZy9pY29ucy9jbHVzdGVyQmlnLnBuZydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2lkZWJhcjoge1xuICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VsZWN0U2VjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoVG9KU09ORGlyZWN0b3J5OiAnM3JkcHQvanF1ZXJ5LXNob3AtbG9jYXRvci9zcmMvanNvbi8nLFxuICAgICAgICAgICAgICAgICAgICBwYXRoVG9KU09ORGlyZWN0b3J5OiB0aGlzLmFwcENvbmZpZy5nZXRQaHBVcmwoJ2V2ZW50LWxvY2F0aW9ucycpICsgJy8nLFxuICAgICAgICAgICAgICAgICAgICBkaWZGaWxlczogW1snVG9hdGUnLCAnYWxsJ10sIFsnSnVkLiBGYWdhcmFzJywgJ2ZhZ2FyYXMnXSwgWydKdWQuIFByYWhvdmEnLCAncHJhaG92YSddXSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZVR5cGVzOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB7XG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogOCxcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkl0ZW1zOiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
