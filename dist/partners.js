System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch', 'lib/app/config', 'lib/view/model/abstract', 'lib/value-converters/array/shuffle.js'], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  'use strict';

  var inject, HttpClient, AppConfig, ViewModelAbstract, ShuffleValueConverter, Component;

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
    }, function (_libValueConvertersArrayShuffleJs) {
      ShuffleValueConverter = _libValueConvertersArrayShuffleJs.ShuffleValueConverter;
    }],
    execute: function () {
      Component = (function (_ViewModelAbstract) {
        _inherits(Component, _ViewModelAbstract);

        function Component(appConfig, http) {
          _classCallCheck(this, _Component);

          _get(Object.getPrototypeOf(_Component.prototype), 'constructor', this).call(this, appConfig);
          this.heading = 'Partenerii nostri';
          this.companies = [];
          this.donators = [];
          this.forestryUnits = [];
          this.institutions = [{ name: 'Primaria Rasnov', url: 'http://www.primariarasnov.ro/portal/', logo: '/dist/assets/img/partners/primaria-rasnov-logo-200x140.png' }, { name: 'Agentia pentru Protectia Mediului Brasov', url: 'http://apmbv.anpm.ro/', logo: '/dist/assets/img/partners/apm-brasov-logo-200x140.png' }, { name: 'Inspectoratul Scolar Judetean Brasov', url: 'http://www.isjbrasov.ro/', logo: '/dist/assets/img/partners/isj-brasov-logo-200x140.png' }, { name: 'Garda Forestiera Brasov', url: 'http://www.gfbrasov.ro/', logo: '/dist/assets/img/partners/GF-BV.png' }, { name: 'Regia Nationala a Padurilor', url: 'http://www.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva.png' }, { name: 'Directia Silvica Brasov', url: 'http://brasov.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva-brasov.png' }, { name: 'Directia Silvica Mures', url: 'http://mures.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva-mures.png' }];
          this.http = appConfig.configHttp(http);
        }

        _createClass(Component, [{
          key: 'activate',
          value: function activate(params, routeConfig) {
            var self = this;
            var shufle = new ShuffleValueConverter();
            _get(Object.getPrototypeOf(_Component.prototype), 'activate', this).call(this, params, routeConfig);
            return Promise.all([this.http.fetch('partners/forestry-units').then(function (response) {
              return response.json();
            }).then(function (data) {
              self.forestryUnits = shufle.toView(data.list);
            }), this.http.fetch('partners/donators').then(function (response) {
              return response.json();
            }).then(function (data) {
              self.donators = shufle.toView(data.list);
            }), this.http.fetch('partners/companies').then(function (response) {
              return response.json();
            }).then(function (data) {
              self.companies = shufle.toView(data.list);
            })]);
          }
        }, {
          key: 'attached',
          value: function attached() {
            $('#forestryUnits').click();
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
//# sourceMappingURL=data:application/json;base64,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LENBQUM7YUFBRSxDQUFDLENBQ3RFLENBQUMsQ0FBQztXQUNOOzs7aUJBRU8sb0JBQUc7QUFDUCxhQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztXQUMvQjs7O3lCQTNFUSxTQUFTO0FBQVQsaUJBQVMsR0FEckIsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FDakIsU0FBUyxLQUFULFNBQVM7ZUFBVCxTQUFTO1NBQVMsaUJBQWlCIiwiZmlsZSI6InBhcnRuZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQbGFudGVhemEgcGVudHJ1IFJvbWFuaWEgKGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLylcbiAqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFByaWV0ZW5paSBQYWR1cmlsb3IgZGluIFJvbWFuaWEgKGh0dHA6Ly9wcmlldGVuaWlwYWR1cmlsb3Iucm8pXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IElUIE1lZGlhIENvbm5lY3QgKGh0dHA6Ly9pdG1lZGlhY29ubmVjdC5ybylcbiAqIEBsaWNlbnNlICAgaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vIy9hcHBsaWNhdGlvbi1saWNlbnNlIENvbW1lcmNpYWxcbiAqL1xuXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XG5pbXBvcnQgJ2ZldGNoJztcblxuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJ2xpYi9hcHAvY29uZmlnJztcbmltcG9ydCB7Vmlld01vZGVsQWJzdHJhY3R9IGZyb20gJ2xpYi92aWV3L21vZGVsL2Fic3RyYWN0JztcblxuaW1wb3J0IHtTaHVmZmxlVmFsdWVDb252ZXJ0ZXJ9IGZyb20gJ2xpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L3NodWZmbGUuanMnO1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgaG9tZVBhZ2VcbiAqXG4gKi9cbkBpbmplY3QoQXBwQ29uZmlnLCBIdHRwQ2xpZW50KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFZpZXdNb2RlbEFic3RyYWN0IHtcbiAgICAvKipcbiAgICAgKiBQYWdlIEhlYWRpbmdcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIGhlYWRpbmcgPSAnUGFydGVuZXJpaSBub3N0cmknO1xuXG4gICAgLyoqXG4gICAgICogRG9uYXRpbmcgQ29tcGFuaWVzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGNvbXBhbmllcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogSW5kaXZpZHVhbCBEb25hdG9yc1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBkb25hdG9ycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBGb3Jlc3RyeSBVbml0c1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBmb3Jlc3RyeVVuaXRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHBhcnRuZXIgaW5zdGl0dXRpb25zXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGluc3RpdHV0aW9ucyA9IFtcbiAgICAgICAgeyBuYW1lOiAnUHJpbWFyaWEgUmFzbm92JywgdXJsOiAnaHR0cDovL3d3dy5wcmltYXJpYXJhc25vdi5yby9wb3J0YWwvJywgbG9nbzogJy9kaXN0L2Fzc2V0cy9pbWcvcGFydG5lcnMvcHJpbWFyaWEtcmFzbm92LWxvZ28tMjAweDE0MC5wbmcnIH0sXG4gICAgICAgIHsgbmFtZTogJ0FnZW50aWEgcGVudHJ1IFByb3RlY3RpYSBNZWRpdWx1aSBCcmFzb3YnLCB1cmw6ICdodHRwOi8vYXBtYnYuYW5wbS5yby8nLCBsb2dvOiAnL2Rpc3QvYXNzZXRzL2ltZy9wYXJ0bmVycy9hcG0tYnJhc292LWxvZ28tMjAweDE0MC5wbmcnIH0sXG4gICAgICAgIHsgbmFtZTogJ0luc3BlY3RvcmF0dWwgU2NvbGFyIEp1ZGV0ZWFuIEJyYXNvdicsIHVybDogJ2h0dHA6Ly93d3cuaXNqYnJhc292LnJvLycsIGxvZ286ICcvZGlzdC9hc3NldHMvaW1nL3BhcnRuZXJzL2lzai1icmFzb3YtbG9nby0yMDB4MTQwLnBuZycgfSxcbiAgICAgICAgLy8geyBuYW1lOiAnUHJpbWFyaWEgTXVuaWNpcGl1bHVpIENvZGxlYScsIHVybDogJ2h0dHA6Ly93d3cucHJpbWFyaWEtY29kbGVhLnJvLycsIGxvZ286ICcvZGlzdC9hc3NldHMvaW1nL3BhcnRuZXJzL3ByaW1hcmlhLWNvZGxlYS1sb2dvLTIwMHgxNDAucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdHYXJkYSBGb3Jlc3RpZXJhIEJyYXNvdicsIHVybDogJ2h0dHA6Ly93d3cuZ2ZicmFzb3Yucm8vJywgbG9nbzogJy9kaXN0L2Fzc2V0cy9pbWcvcGFydG5lcnMvR0YtQlYucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdSZWdpYSBOYXRpb25hbGEgYSBQYWR1cmlsb3InLCB1cmw6ICdodHRwOi8vd3d3LnJvc2lsdmEucm8vJywgbG9nbzogJy9kaXN0L2Fzc2V0cy9pbWcvcGFydG5lcnMvcm9tc2lsdmEucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdEaXJlY3RpYSBTaWx2aWNhIEJyYXNvdicsIHVybDogJ2h0dHA6Ly9icmFzb3Yucm9zaWx2YS5yby8nLCBsb2dvOiAnL2Rpc3QvYXNzZXRzL2ltZy9wYXJ0bmVycy9yb21zaWx2YS1icmFzb3YucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdEaXJlY3RpYSBTaWx2aWNhIE11cmVzJywgdXJsOiAnaHR0cDovL211cmVzLnJvc2lsdmEucm8vJywgbG9nbzogJy9kaXN0L2Fzc2V0cy9pbWcvcGFydG5lcnMvcm9tc2lsdmEtbXVyZXMucG5nJyB9Ly8sXG4gICAgICAgIC8vIHsgbmFtZTogJ1QuRS5OLlQuJywgdXJsOiAnaHR0cDovLycsIGxvZ286ICcnIH1cbiAgICBdXG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjY29uc3RydWN0b3JcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtICB7SHR0cENsaWVudH0gICAgaHR0cCBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB7dGhpc31cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhcHBDb25maWcsIGh0dHApIHtcbiAgICAgICAgc3VwZXIoYXBwQ29uZmlnKTtcbiAgICAgICAgdGhpcy5odHRwID0gYXBwQ29uZmlnLmNvbmZpZ0h0dHAoaHR0cCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNlZSBWaWV3TW9kZWxBYnN0cmFjdCNhY3RpdmF0ZVxuICAgICAqL1xuICAgIGFjdGl2YXRlKHBhcmFtcywgcm91dGVDb25maWcpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc2h1ZmxlID0gbmV3IFNodWZmbGVWYWx1ZUNvbnZlcnRlcigpO1xuICAgICAgICBzdXBlci5hY3RpdmF0ZShwYXJhbXMsIHJvdXRlQ29uZmlnKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5mZXRjaCgncGFydG5lcnMvZm9yZXN0cnktdW5pdHMnKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4geyBzZWxmLmZvcmVzdHJ5VW5pdHMgPSBzaHVmbGUudG9WaWV3KGRhdGEubGlzdCk7IH0pLFxuICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdwYXJ0bmVycy9kb25hdG9ycycpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7IHNlbGYuZG9uYXRvcnMgPSBzaHVmbGUudG9WaWV3KGRhdGEubGlzdCk7IH0pLFxuICAgICAgICAgICAgdGhpcy5odHRwLmZldGNoKCdwYXJ0bmVycy9jb21wYW5pZXMnKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4geyBzZWxmLmNvbXBhbmllcyA9IHNodWZsZS50b1ZpZXcoZGF0YS5saXN0KTsgfSlcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgICQoJyNmb3Jlc3RyeVVuaXRzJykuY2xpY2soKTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
