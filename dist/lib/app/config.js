System.register([], function (_export) {
    /**
     * Planteaza pentru Romania (http://planteazapentruromania.ro/)
     *
     * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
     * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
     * @license   http://planteazapentruromania.ro/#/application-license Commercial
     */

    'use strict';

    var AppConfig;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            AppConfig = (function () {
                function AppConfig(http) {
                    _classCallCheck(this, AppConfig);

                    this.ENV_DEVELOP = 'development';
                    this.ENV_TESTING = 'testing';
                    this.ENV_STAGING = 'staging';
                    this.ENV_PRODUCT = 'production';
                    this.env = 'production';
                    this.phpAppBase = '//planteazapentruromania.ro/services/index.php/';
                }

                _createClass(AppConfig, [{
                    key: 'configHttp',
                    value: function configHttp(http) {
                        var _this = this;

                        http.configure(function (config) {
                            config.withBaseUrl(_this.phpAppBase).withDefaults({
                                headers: {
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'AureliaAPI'
                                }
                            });
                            console.log(config);
                        });
                        return http;
                    }
                }, {
                    key: 'getPhpUrl',
                    value: function getPhpUrl(route) {
                        return this.phpAppBase + route;
                    }
                }, {
                    key: 'encode',
                    value: function encode(obj) {
                        return JSON.stringify(obj);
                    }
                }, {
                    key: 'decode',
                    value: function decode(str) {
                        return JSON.parse(str);
                    }
                }]);

                return AppConfig;
            })();

            _export('AppConfig', AppConfig);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcHAvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1FBZWEsU0FBUzs7Ozs7Ozs7O0FBQVQscUJBQVM7QUFXUCx5QkFYRixTQUFTLENBV04sSUFBSSxFQUFFOzBDQVhULFNBQVM7O3lCQUVsQixXQUFXLEdBQUcsYUFBYTt5QkFDM0IsV0FBVyxHQUFHLFNBQVM7eUJBQ3ZCLFdBQVcsR0FBRyxTQUFTO3lCQUN2QixXQUFXLEdBQUcsWUFBWTt5QkFFMUIsR0FBRyxHQUFHLFlBQVk7eUJBRWxCLFVBQVUsR0FBRyxpREFBaUQ7aUJBRXpDOzs2QkFYWixTQUFTOzsyQkFtQlIsb0JBQUMsSUFBSSxFQUFFOzs7QUFDYiw0QkFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNyQixrQ0FBTSxDQUVELFdBQVcsQ0FBQyxNQUFLLFVBQVUsQ0FBQyxDQUM1QixZQUFZLENBQUM7QUFDVix1Q0FBTyxFQUFFO0FBQ0wsNENBQVEsRUFBRSxrQkFBa0I7QUFDNUIsc0RBQWtCLEVBQUUsWUFBWTtpQ0FDbkM7NkJBQ0osQ0FBQyxDQUFDO0FBQ1AsbUNBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3ZCLENBQUMsQ0FBQztBQUNILCtCQUFPLElBQUksQ0FBQztxQkFDZjs7OzJCQVFRLG1CQUFDLEtBQUssRUFBRTtBQUNiLCtCQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO3FCQUNsQzs7OzJCQVFLLGdCQUFDLEdBQUcsRUFBRTtBQUNSLCtCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCOzs7MkJBUUssZ0JBQUMsR0FBRyxFQUFFO0FBQ1IsK0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUI7Ozt1QkEvRFEsU0FBUyIsImZpbGUiOiJsaWIvYXBwL2NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRE8gTk9UIEVESVQgVEhJUyBGSUxFISBJVCBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWSBXSEVOIEJVSUxESU5HIFRIRSBQUk9KRUNUIVxuICovXG4vKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbi8qKlxuICogQ29tcG9uZW50IGZvciBkb25hdGlvbnNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBDb25maWcge1xuXG4gICAgRU5WX0RFVkVMT1AgPSAnZGV2ZWxvcG1lbnQnO1xuICAgIEVOVl9URVNUSU5HID0gJ3Rlc3RpbmcnO1xuICAgIEVOVl9TVEFHSU5HID0gJ3N0YWdpbmcnO1xuICAgIEVOVl9QUk9EVUNUID0gJ3Byb2R1Y3Rpb24nO1xuXG4gICAgZW52ID0gJ3Byb2R1Y3Rpb24nO1xuXG4gICAgcGhwQXBwQmFzZSA9ICcvL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vc2VydmljZXMvaW5kZXgucGhwLyc7XG5cbiAgICBjb25zdHJ1Y3RvcihodHRwKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFtjb25maWdIdHRwIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgY29uZmlnSHR0cFxuICAgICAqIEBwYXJhbSAge2F1cmVsaWEtZmV0Y2gtY2xpZW50L0h0dHBDbGllbnR9ICAgaHR0cCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7YXVyZWxpYS1mZXRjaC1jbGllbnQvSHR0cENsaWVudH0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25maWdIdHRwKGh0dHApIHtcbiAgICAgICAgaHR0cC5jb25maWd1cmUoY29uZmlnID0+IHtcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgICAgICAgIC8vIC53aXRoQmFzZVVybCgnc2VydmljZXMvaW5kZXgucGhwLycpXG4gICAgICAgICAgICAgICAgLndpdGhCYXNlVXJsKHRoaXMucGhwQXBwQmFzZSlcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0F1cmVsaWFBUEknXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaHR0cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbZ2V0UGhwVXJsIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgZ2V0UGhwVXJsXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgcm91dGUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXRQaHBVcmwocm91dGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGhwQXBwQmFzZSArIHJvdXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuY29kaW5nIG1lc3NhZ2UgdG8gdGhlIHNlcnZlciBzaWRlIGRvbWFpblxuICAgICAqIEBtZXRob2QgZW5jb2RlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZW5jb2RlKG9iaikge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGluZyBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciBzaWRlIGRvbWFpblxuICAgICAqIEBtZXRob2QgZGVjb2RlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVjb2RlKHN0cikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
