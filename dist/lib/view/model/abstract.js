System.register(['aurelia-framework', 'lib/app/config'], function (_export) {
  'use strict';

  var inject, LogManager, AppConfig, ViewModelAbstract;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_libAppConfig) {
      AppConfig = _libAppConfig.AppConfig;
    }],
    execute: function () {
      ViewModelAbstract = (function () {
        function ViewModelAbstract(appConfig) {
          _classCallCheck(this, _ViewModelAbstract);

          this.appConfig = appConfig;
          this.logger = LogManager.getLogger('view-model-abstract');
        }

        _createClass(ViewModelAbstract, [{
          key: 'activate',
          value: function activate(params, routeConfig, navigationInstruction) {
            this.routeConfig = routeConfig;
            this.logger = LogManager.getLogger('view-model-' + this.routeConfig.name);

            this.routeConfig.navModel.router.activeRoute = this.routeConfig;
          }
        }, {
          key: 'loadScript',
          value: function loadScript(id, src) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              var script = document.createElement('script');
              script.id = id;
              script.src = src;
              script.onload = function () {
                resolve.call(_this);
              };
              document.head.appendChild(script);
              setTimeout(function () {
                reject.call(_this, new Error('Script ' + src + ' exceeded timeout.'));
              }, 10000);
            });
          }
        }]);

        var _ViewModelAbstract = ViewModelAbstract;
        ViewModelAbstract = inject(AppConfig)(ViewModelAbstract) || ViewModelAbstract;
        return ViewModelAbstract;
      })();

      _export('ViewModelAbstract', ViewModelAbstract);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi92aWV3L21vZGVsL2Fic3RyYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQ0FPYSxpQkFBaUI7Ozs7Ozs7O2lDQU50QixNQUFNO3FDQUNOLFVBQVU7O2dDQUVWLFNBQVM7OztBQUdKLHVCQUFpQjtBQWNmLGlCQWRGLGlCQUFpQixDQWNkLFNBQVMsRUFBRTs7O0FBQ25CLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzdEOztxQkFqQlEsaUJBQWlCOztpQkEyQmxCLGtCQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUU7QUFDakQsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQy9CLGdCQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLGlCQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFHLENBQUM7O0FBRTFFLGdCQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7V0FDbkU7OztpQkFpQ1Msb0JBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTs7O0FBQ2hCLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUNwQyxrQkFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxvQkFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDZixvQkFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDakIsb0JBQU0sQ0FBQyxNQUFNLEdBQUcsWUFBTTtBQUFFLHVCQUFPLENBQUMsSUFBSSxPQUFNLENBQUM7ZUFBRSxDQUFDO0FBQzlDLHNCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQyx3QkFBVSxDQUFDLFlBQU07QUFBRSxzQkFBTSxDQUFDLElBQUksUUFBTyxJQUFJLEtBQUssYUFBVyxHQUFHLHdCQUFxQixDQUFDLENBQUM7ZUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2pHLENBQUMsQ0FBQztXQUNOOzs7aUNBMUVRLGlCQUFpQjtBQUFqQix5QkFBaUIsR0FEN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUNMLGlCQUFpQixLQUFqQixpQkFBaUI7ZUFBakIsaUJBQWlCIiwiZmlsZSI6ImxpYi92aWV3L21vZGVsL2Fic3RyYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICdsaWIvYXBwL2NvbmZpZyc7XG5cbkBpbmplY3QoQXBwQ29uZmlnKVxuZXhwb3J0IGNsYXNzIFZpZXdNb2RlbEFic3RyYWN0ICB7XG5cbiAgICAvKipcbiAgICAgKiBbaW5qZWN0IGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgaW5qZWN0XG4gICAgICogQHJldHVybiB7QXJyYXl9IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICAvLyBzdGF0aWMgaW5qZWN0KCkgeyByZXR1cm4gW0FwcENvbmZpZ107IH1cblxuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHJldHVybiB7dGhpc30gICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgICAgICB0aGlzLmFwcENvbmZpZyA9IGFwcENvbmZpZztcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcigndmlldy1tb2RlbC1hYnN0cmFjdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFthY3RpdmF0ZSBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGFjdGl2YXRlXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBwYXJhbXMgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gcm91dGVDb25maWcgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG5hdmlnYXRpb25JbnN0cnVjdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcsIG5hdmlnYXRpb25JbnN0cnVjdGlvbikge1xuICAgICAgICB0aGlzLnJvdXRlQ29uZmlnID0gcm91dGVDb25maWc7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoYHZpZXctbW9kZWwtJHt0aGlzLnJvdXRlQ29uZmlnLm5hbWV9YCk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZUNvbmZpZy5uYXZNb2RlbC5yb3V0ZXIuYWN0aXZlUm91dGUgPSB0aGlzLnJvdXRlQ29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtjYW5BY3RpdmF0ZSBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGNhbkFjdGl2YXRlXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSAgICBwYXJhbXMgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gICAgcm91dGVDb25maWcgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICAgIG5hdmlnYXRpb25JbnN0cnVjdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIC8vIGNhbkFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcsIG5hdmlnYXRpb25JbnN0cnVjdGlvbikgeyAgfVxuXG4gICAgLyoqXG4gICAgICogW2NhbkRlYWN0aXZhdGUgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBjYW5EZWFjdGl2YXRlXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICAvLyBjYW5EZWFjdGl2YXRlKCkgeyAgfVxuXG4gICAgLyoqXG4gICAgICogW2RlY2F0aXZhdGUgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBkZWNhdGl2YXRlXG4gICAgICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICAvLyBkZWNhdGl2YXRlKCkgeyAgfVxuXG4gICAgLyoqXG4gICAgICogW2xvYWRTY3JpcHQgZGVzY3JpcHRpb25dXG4gICAgICogQG1ldGhvZCBsb2FkU2NyaXB0XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgICBpZCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgc3JjIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgbG9hZFNjcmlwdChpZCwgc3JjKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdC5pZCA9IGlkO1xuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7IHJlc29sdmUuY2FsbCh0aGlzKTsgfTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZWplY3QuY2FsbCh0aGlzLCBuZXcgRXJyb3IoYFNjcmlwdCAke3NyY30gZXhjZWVkZWQgdGltZW91dC5gKSk7IH0sIDEwMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
