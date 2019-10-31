System.register(['lib/view/model/abstract'], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  'use strict';

  var ViewModelAbstract, Component;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_libViewModelAbstract) {
      ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
    }],
    execute: function () {
      Component = (function (_ViewModelAbstract) {
        _inherits(Component, _ViewModelAbstract);

        function Component() {
          _classCallCheck(this, Component);

          _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);

          this.heading = 'Termeni si Conditii';
        }

        _createClass(Component, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map([{ route: ['', 'index'], name: 'terms-index', moduleId: 'terms/index', nav: true, title: 'Termeni si Conditii' }, { route: 'protectia-datelor', name: 'terms-data', moduleId: 'terms/data', nav: true, title: 'Protectia Datelor' }, { route: 'politica-cookieurilor', name: 'terms-cookie', moduleId: 'terms/cookie', nav: true, title: 'Politica Cookie-uri' }]);

            this.router = router;
          }
        }]);

        return Component;
      })(ViewModelAbstract);

      _export('Component', Component);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zLXJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt5QkFhYSxTQUFTOzs7Ozs7Ozs7Ozs7Z0RBTGQsaUJBQWlCOzs7QUFLWixlQUFTO2tCQUFULFNBQVM7O2lCQUFULFNBQVM7Z0NBQVQsU0FBUzs7cUNBQVQsU0FBUzs7ZUFFbEIsT0FBTyxHQUFHLHFCQUFxQjs7O3FCQUZ0QixTQUFTOztpQkFVSCx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzVCLGtCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1AsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQVksSUFBSSxFQUFFLGFBQWEsRUFBSSxRQUFRLEVBQUUsYUFBYSxFQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFLHFCQUFxQixFQUFFLEVBQzlILEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFNLElBQUksRUFBRSxZQUFZLEVBQUssUUFBUSxFQUFFLFlBQVksRUFBSyxHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxFQUM1SCxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFHLFFBQVEsRUFBRSxjQUFjLEVBQUcsR0FBRyxFQUFFLElBQUksRUFBRyxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FDakksQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN4Qjs7O2VBbEJRLFNBQVM7U0FBUyxpQkFBaUIiLCJmaWxlIjoidGVybXMtcm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQbGFudGVhemEgcGVudHJ1IFJvbWFuaWEgKGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLylcbiAqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFByaWV0ZW5paSBQYWR1cmlsb3IgZGluIFJvbWFuaWEgKGh0dHA6Ly9wcmlldGVuaWlwYWR1cmlsb3Iucm8pXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IElUIE1lZGlhIENvbm5lY3QgKGh0dHA6Ly9pdG1lZGlhY29ubmVjdC5ybylcbiAqIEBsaWNlbnNlICAgaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vIy9hcHBsaWNhdGlvbi1saWNlbnNlIENvbW1lcmNpYWxcbiAqL1xuXG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICdsaWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFZpZXdNb2RlbEFic3RyYWN0IHtcblxuICAgIGhlYWRpbmcgPSAnVGVybWVuaSBzaSBDb25kaXRpaSc7XG5cbiAgICAvKipcbiAgICAgKiBbY29uZmlndXJlUm91dGVyIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgY29uZmlndXJlUm91dGVyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSAgICAgICAgY29uZmlnIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHtSb3V0ZXJ9ICAgICAgICByb3V0ZXIgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xuICAgICAgICBjb25maWcubWFwKFtcbiAgICAgICAgICAgIHsgcm91dGU6IFsnJywgJ2luZGV4J10sICAgICAgICAgICBuYW1lOiAndGVybXMtaW5kZXgnLCAgIG1vZHVsZUlkOiAndGVybXMvaW5kZXgnLCAgIG5hdjogdHJ1ZSwgIHRpdGxlOiAnVGVybWVuaSBzaSBDb25kaXRpaScgfSxcbiAgICAgICAgICAgIHsgcm91dGU6ICdwcm90ZWN0aWEtZGF0ZWxvcicsICAgICBuYW1lOiAndGVybXMtZGF0YScsICAgIG1vZHVsZUlkOiAndGVybXMvZGF0YScsICAgIG5hdjogdHJ1ZSwgIHRpdGxlOiAnUHJvdGVjdGlhIERhdGVsb3InIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAncG9saXRpY2EtY29va2lldXJpbG9yJywgbmFtZTogJ3Rlcm1zLWNvb2tpZScsICBtb2R1bGVJZDogJ3Rlcm1zL2Nvb2tpZScsICBuYXY6IHRydWUsICB0aXRsZTogJ1BvbGl0aWNhIENvb2tpZS11cmknIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
