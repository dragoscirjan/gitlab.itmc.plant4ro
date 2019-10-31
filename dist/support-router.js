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

          this.heading = 'Implica-te';
        }

        _createClass(Component, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map([{ route: ['', 'index'], name: 'support-index', moduleId: 'support/index', nav: true, title: 'Implica-te' }, { route: 'planteaza', name: 'plant', moduleId: 'donate', nav: true, title: 'Planteaza' }, { route: 'promoveaza', name: 'support-promote', moduleId: 'support/promote', nav: true, title: 'Sustine-ne' }, { route: 'participa', name: 'support-participate', moduleId: 'support/participate', nav: true, title: 'Participa' }]);

            this.router = router;
          }
        }]);

        return Component;
      })(ViewModelAbstract);

      _export('Component', Component);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQtcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O3lCQWFhLFNBQVM7Ozs7Ozs7Ozs7OztnREFMZCxpQkFBaUI7OztBQUtaLGVBQVM7a0JBQVQsU0FBUzs7aUJBQVQsU0FBUztnQ0FBVCxTQUFTOztxQ0FBVCxTQUFTOztlQUVsQixPQUFPLEdBQUcsWUFBWTs7O3FCQUZiLFNBQVM7O2lCQVVILHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDNUIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FDUCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRyxJQUFJLEVBQUUsZUFBZSxFQUFTLFFBQVEsRUFBRSxlQUFlLEVBQVMsR0FBRyxFQUFFLElBQUksRUFBRyxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBRTFILEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBSyxJQUFJLEVBQUUsT0FBTyxFQUFpQixRQUFRLEVBQUUsUUFBUSxFQUFnQixHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDekgsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFJLElBQUksRUFBRSxpQkFBaUIsRUFBTyxRQUFRLEVBQUUsaUJBQWlCLEVBQU0sR0FBRyxFQUFFLElBQUksRUFBRyxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQ3pILEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBSyxJQUFJLEVBQUUscUJBQXFCLEVBQUcsUUFBUSxFQUFFLHFCQUFxQixFQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUc1SCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3hCOzs7ZUF0QlEsU0FBUztTQUFTLGlCQUFpQiIsImZpbGUiOiJzdXBwb3J0LXJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxhbnRlYXphIHBlbnRydSBSb21hbmlhIChodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8pXG4gKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBQcmlldGVuaWkgUGFkdXJpbG9yIGRpbiBSb21hbmlhIChodHRwOi8vcHJpZXRlbmlpcGFkdXJpbG9yLnJvKVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBJVCBNZWRpYSBDb25uZWN0IChodHRwOi8vaXRtZWRpYWNvbm5lY3Qucm8pXG4gKiBAbGljZW5zZSAgIGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLyMvYXBwbGljYXRpb24tbGljZW5zZSBDb21tZXJjaWFsXG4gKi9cblxuaW1wb3J0IHtWaWV3TW9kZWxBYnN0cmFjdH0gZnJvbSAnbGliL3ZpZXcvbW9kZWwvYWJzdHJhY3QnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBWaWV3TW9kZWxBYnN0cmFjdCB7XG5cbiAgICBoZWFkaW5nID0gJ0ltcGxpY2EtdGUnO1xuXG4gICAgLyoqXG4gICAgICogW2NvbmZpZ3VyZVJvdXRlciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAbWV0aG9kIGNvbmZpZ3VyZVJvdXRlclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gICAgICAgIGNvbmZpZyBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB7Um91dGVyfSAgICAgICAgcm91dGVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcbiAgICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICAgICB7IHJvdXRlOiBbJycsICdpbmRleCddLCAgbmFtZTogJ3N1cHBvcnQtaW5kZXgnLCAgICAgICAgbW9kdWxlSWQ6ICdzdXBwb3J0L2luZGV4JywgICAgICAgIG5hdjogdHJ1ZSwgIHRpdGxlOiAnSW1wbGljYS10ZScgfSxcbiAgICAgICAgICAgIC8vIFRPRE86IERvbmF0ZSByb3V0ZSBkb2Vzbid0IHdvcmtcbiAgICAgICAgICAgIHsgcm91dGU6ICdwbGFudGVhemEnLCAgICBuYW1lOiAncGxhbnQnLCAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ2RvbmF0ZScsICAgICAgICAgICAgICAgbmF2OiB0cnVlLCAgdGl0bGU6ICdQbGFudGVhemEnIH0sXG4gICAgICAgICAgICB7IHJvdXRlOiAncHJvbW92ZWF6YScsICAgbmFtZTogJ3N1cHBvcnQtcHJvbW90ZScsICAgICAgbW9kdWxlSWQ6ICdzdXBwb3J0L3Byb21vdGUnLCAgICAgbmF2OiB0cnVlLCAgdGl0bGU6ICdTdXN0aW5lLW5lJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogJ3BhcnRpY2lwYScsICAgIG5hbWU6ICdzdXBwb3J0LXBhcnRpY2lwYXRlJywgIG1vZHVsZUlkOiAnc3VwcG9ydC9wYXJ0aWNpcGF0ZScsICBuYXY6IHRydWUsICB0aXRsZTogJ1BhcnRpY2lwYScgfVxuICAgICAgICAgICAgLy8gICB7IHJvdXRlOiAndXNlcnMnLCAgICAgICAgIG5hbWU6ICd1c2VycycsICAgICAgICAgbW9kdWxlSWQ6ICd1c2VycycsICAgICAgICAgbmF2OiB0cnVlLCB0aXRsZTogJ0dpdGh1YiBVc2VycycgfSxcbiAgICAgICAgICAgIC8vICAgeyByb3V0ZTogJ2NoaWxkLXJvdXRlcicsICBuYW1lOiAnY2hpbGQtcm91dGVyJywgIG1vZHVsZUlkOiAnY2hpbGQtcm91dGVyJywgIG5hdjogdHJ1ZSwgdGl0bGU6ICdDaGlsZCBSb3V0ZXInIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
