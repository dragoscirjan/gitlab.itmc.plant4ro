System.register(['aurelia-framework'], function (_export) {
    'use strict';

    var LogManager, App;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_aureliaFramework) {
            LogManager = _aureliaFramework.LogManager;
        }],
        execute: function () {
            App = (function () {
                function App() {
                    _classCallCheck(this, App);

                    this.fbConfig = {
                        appId: '187326271624400',
                        status: true,
                        cookie: true,
                        xfbml: true,
                        version: 'v2.2'
                    };

                    this.logger = LogManager.getLogger('application');
                }

                _createClass(App, [{
                    key: 'configureRouter',
                    value: function configureRouter(config, router) {
                        config.title = 'Planteaza pentru Romania';
                        config.map([{ route: ['', 'acasa'], name: 'hp', moduleId: 'index', nav: true, title: 'Acasa' }, { route: 'despre-proiect', name: 'about', moduleId: 'about', nav: true, title: 'Despre Proiect' }, { route: 'parteneri', name: 'partners', moduleId: 'partners', nav: true, title: 'Parteneri' }, { route: 'implica-te', name: 'support', moduleId: 'support-router', nav: true, title: 'Implica-te' }, { route: 'planteaza', name: 'plant', moduleId: 'donate', nav: true, title: 'Planteaza' }, { route: 'intrebari', name: 'faq', moduleId: 'faq', nav: true, title: 'Intrebari' }, { route: 'blog', name: 'blog', moduleId: 'blog', nav: true, title: 'Stiri' }, { route: 'contact', name: 'contact', moduleId: 'contact', nav: true, title: 'Contact' }, { route: 'planteaza/:t/esuat', name: 'plant', moduleId: 'donate', nav: false, title: 'Transactie Esuata' }, { route: 'diploma/:id/:t/:mode', name: 'diploma', moduleId: 'diploma', nav: false, title: 'Ai Plantat' }, { route: 'termeni-si-conditii', name: 'terms', moduleId: 'terms-router', nav: false, title: 'Termeni si Conditii' }]);

                        this.router = router;
                    }
                }, {
                    key: 'attached',
                    value: function attached() {
                        this.menuToggleInit();
                    }
                }, {
                    key: 'menuToggleInit',
                    value: function menuToggleInit() {
                        $('.navbar-header button, .navbar-header .navbar-nav li').on('click', function () {
                            var $navHeader = $('.navbar-header');
                            if (!$navHeader.hasClass('is-nav-open')) {
                                $navHeader.addClass('is-nav-open');
                                return;
                            }
                            $navHeader.removeClass('is-nav-open');
                        });
                    }
                }, {
                    key: 'fbLoadScript',
                    value: function fbLoadScript() {
                        var _this = this;

                        var self = this;
                        window.fbAsyncInit = function () {
                            self.fbInit();
                        };
                        return new Promise(function (resolve, reject) {
                            var script = document.createElement('script');
                            script.id = 'fb-sdk';
                            script.src = 'https://connect.facebook.net/en_US/sdk.js';
                            script.onload = function () {
                                resolve.call(_this);
                            };
                            document.head.appendChild(script);
                            setTimeout(function () {
                                reject.call(_this, new Error('Script ' + script.src + ' exceeded timeout.'));
                            }, 10000);
                        }).then(function () {
                            self.logger.debug('fb-sdk / script loaded');
                        })['catch'](function (e) {
                            self.logger.error('fb-sdk / script failed', e);
                        });
                    }
                }, {
                    key: 'fbInit',
                    value: function fbInit() {
                        FB.init(this.fbConfig);
                        this.logger.debug('fb-sdk / inited', FB);
                    }
                }]);

                return App;
            })();

            _export('App', App);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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O0FBQ1YsZ0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7eUJBQy9DLENBQUMsU0FBTSxDQUFDLFVBQUMsQ0FBQyxFQUFLO0FBQ1osZ0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNsRCxDQUFDLENBQUM7cUJBQ047OzsyQkFNSyxrQkFBRztBQUdMLDBCQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2Qiw0QkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQzVDOzs7dUJBbkhRLEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICovXG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHAge1xuXG4gICAgLyoqXG4gICAgICogQXBwbGljYXRpb24gY29udHJ1Y3RvclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHt0aGlzfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignYXBwbGljYXRpb24nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbY29uZmlndXJlUm91dGVyIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgY29uZmlndXJlUm91dGVyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSAgICAgICAgY29uZmlnIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICAgICAgICByb3V0ZXIgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xuICAgICAgICBjb25maWcudGl0bGUgPSAnUGxhbnRlYXphIHBlbnRydSBSb21hbmlhJztcbiAgICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICAgICB7IHJvdXRlOiBbJycsICdhY2FzYSddLCAgICAgICAgICAgbmFtZTogJ2hwJywgICAgICAgIG1vZHVsZUlkOiAnaW5kZXgnLCAgICAgICAgICAgbmF2OiB0cnVlLCAgIHRpdGxlOiAnQWNhc2EnIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAnZGVzcHJlLXByb2llY3QnLCAgICAgICAgbmFtZTogJ2Fib3V0JywgICAgIG1vZHVsZUlkOiAnYWJvdXQnLCAgICAgICAgICAgbmF2OiB0cnVlLCAgIHRpdGxlOiAnRGVzcHJlIFByb2llY3QnIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAncGFydGVuZXJpJywgICAgICAgICAgICAgbmFtZTogJ3BhcnRuZXJzJywgIG1vZHVsZUlkOiAncGFydG5lcnMnLCAgICAgICAgbmF2OiB0cnVlLCAgIHRpdGxlOiAnUGFydGVuZXJpJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogJ2ltcGxpY2EtdGUnLCAgICAgICAgICAgIG5hbWU6ICdzdXBwb3J0JywgICBtb2R1bGVJZDogJ3N1cHBvcnQtcm91dGVyJywgIG5hdjogdHJ1ZSwgICB0aXRsZTogJ0ltcGxpY2EtdGUnIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAncGxhbnRlYXphJywgICAgICAgICAgICAgbmFtZTogJ3BsYW50JywgICAgIG1vZHVsZUlkOiAnZG9uYXRlJywgICAgICAgICAgbmF2OiB0cnVlLCAgdGl0bGU6ICdQbGFudGVhemEnIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAnaW50cmViYXJpJywgICAgICAgICAgICAgbmFtZTogJ2ZhcScsICAgICAgIG1vZHVsZUlkOiAnZmFxJywgICAgICAgICAgICAgbmF2OiB0cnVlLCAgIHRpdGxlOiAnSW50cmViYXJpJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogJ2Jsb2cnLCAgICAgICAgICAgICAgICAgIG5hbWU6ICdibG9nJywgICAgICBtb2R1bGVJZDogJ2Jsb2cnLCAgICAgICAgICAgIG5hdjogdHJ1ZSwgICB0aXRsZTogJ1N0aXJpJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogJ2NvbnRhY3QnLCAgICAgICAgICAgICAgIG5hbWU6ICdjb250YWN0JywgICBtb2R1bGVJZDogJ2NvbnRhY3QnLCAgICAgICAgIG5hdjogdHJ1ZSwgICB0aXRsZTogJ0NvbnRhY3QnIH0sXG5cbiAgICAgICAgICAgIHsgcm91dGU6ICdwbGFudGVhemEvOnQvZXN1YXQnLCAgICBuYW1lOiAncGxhbnQnLCAgICAgbW9kdWxlSWQ6ICdkb25hdGUnLCAgICAgICAgICBuYXY6IGZhbHNlLCAgdGl0bGU6ICdUcmFuc2FjdGllIEVzdWF0YScgfSxcbiAgICAgICAgICAgIHsgcm91dGU6ICdkaXBsb21hLzppZC86dC86bW9kZScsICBuYW1lOiAnZGlwbG9tYScsICAgbW9kdWxlSWQ6ICdkaXBsb21hJywgICAgICAgICBuYXY6IGZhbHNlLCAgdGl0bGU6ICdBaSBQbGFudGF0JyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogJ3Rlcm1lbmktc2ktY29uZGl0aWknLCAgIG5hbWU6ICd0ZXJtcycsICAgICBtb2R1bGVJZDogJ3Rlcm1zLXJvdXRlcicsICAgIG5hdjogZmFsc2UsICB0aXRsZTogJ1Rlcm1lbmkgc2kgQ29uZGl0aWknIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICogW2FjdGl2YXRlIGRlc2NyaXB0aW9uXVxuICAgIC8vICAqIEBtZXRob2QgYWN0aXZhdGVcbiAgICAvLyAgKi9cbiAgICAvLyBhY3RpdmF0ZSgpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZmJMb2FkU2NyaXB0KCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogW2F0dGFjaGVkIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgYXR0YWNoZWRcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHRoaXMubWVudVRvZ2dsZUluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBbbWVudUluaXQgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBtZW51SW5pdFxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIG1lbnVUb2dnbGVJbml0KCkge1xuICAgICAgICAkKCcubmF2YmFyLWhlYWRlciBidXR0b24sIC5uYXZiYXItaGVhZGVyIC5uYXZiYXItbmF2IGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCAkbmF2SGVhZGVyID0gJCgnLm5hdmJhci1oZWFkZXInKTtcbiAgICAgICAgICAgIGlmICghJG5hdkhlYWRlci5oYXNDbGFzcygnaXMtbmF2LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICRuYXZIZWFkZXIuYWRkQ2xhc3MoJ2lzLW5hdi1vcGVuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJG5hdkhlYWRlci5yZW1vdmVDbGFzcygnaXMtbmF2LW9wZW4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmFjZWJvb2sgSW5pdCBDb25maWdcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZiQ29uZmlnID0ge1xuICAgICAgICAvLyBhcHBJZDogJzE4ODM0NjEzNDg1NTc0NycsIC8vIHRlc3RcbiAgICAgICAgYXBwSWQ6ICcxODczMjYyNzE2MjQ0MDAnLCAvLyBsaXZlXG4gICAgICAgIHN0YXR1czogdHJ1ZSwgLy8gY2hlY2sgbG9naW4gc3RhdHVzXG4gICAgICAgIGNvb2tpZTogdHJ1ZSwgIC8vIGVuYWJsZSBjb29raWVzIHRvIGFsbG93IHRoZSBzZXJ2ZXIgdG8gYWNjZXNzIHRoZSBzZXNzaW9uXG4gICAgICAgIHhmYm1sOiB0cnVlLCAvLyBwYXJzZSBzb2NpYWwgcGx1Z2lucyBvbiB0aGlzIHBhZ2VcbiAgICAgICAgdmVyc2lvbjogJ3YyLjInXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoaW5nIEZhY2Vib29rIEpzIEFQSSB0byBvdXIgYXBwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIGZiTG9hZFNjcmlwdFxuICAgICAqL1xuICAgIGZiTG9hZFNjcmlwdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5mYkFzeW5jSW5pdCA9ICgpID0+IHsgc2VsZi5mYkluaXQoKTsgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0LmlkID0gJ2ZiLXNkayc7XG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvc2RrLmpzJztcbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7IHJlc29sdmUuY2FsbCh0aGlzKTsgfTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZWplY3QuY2FsbCh0aGlzLCBuZXcgRXJyb3IoYFNjcmlwdCAke3NjcmlwdC5zcmN9IGV4Y2VlZGVkIHRpbWVvdXQuYCkpOyB9LCAxMDAwMCk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5sb2dnZXIuZGVidWcoJ2ZiLXNkayAvIHNjcmlwdCBsb2FkZWQnKTtcbiAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIHNlbGYubG9nZ2VyLmVycm9yKCdmYi1zZGsgLyBzY3JpcHQgZmFpbGVkJywgZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgRmFjZWJvb2sgQVBJXG4gICAgICogQG1ldGhvZCBmYkluaXRcbiAgICAgKi9cbiAgICBmYkluaXQoKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9qYXZhc2NyaXB0L3JlZmVyZW5jZS9GQi5hcGlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2dyYXBoLWFwaS9yZWZlcmVuY2UvXG4gICAgICAgIEZCLmluaXQodGhpcy5mYkNvbmZpZyk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdmYi1zZGsgLyBpbml0ZWQnLCBGQik7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
