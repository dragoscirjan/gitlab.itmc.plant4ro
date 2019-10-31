System.register(['../lib/view/model/abstract'], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  'use strict';

  var ViewModelAbstract, Component;

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

          this.heading = 'Protectia datelor';
        }

        return Component;
      })(ViewModelAbstract);

      _export('Component', Component);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zL2RhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7eUJBYWEsU0FBUzs7Ozs7Ozs7OztnREFMZCxpQkFBaUI7OztBQUtaLGVBQVM7a0JBQVQsU0FBUzs7aUJBQVQsU0FBUztnQ0FBVCxTQUFTOztxQ0FBVCxTQUFTOztlQUVsQixPQUFPLEdBQUcsbUJBQW1COzs7ZUFGcEIsU0FBUztTQUFTLGlCQUFpQiIsImZpbGUiOiJ0ZXJtcy9kYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQbGFudGVhemEgcGVudHJ1IFJvbWFuaWEgKGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLylcbiAqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFByaWV0ZW5paSBQYWR1cmlsb3IgZGluIFJvbWFuaWEgKGh0dHA6Ly9wcmlldGVuaWlwYWR1cmlsb3Iucm8pXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IElUIE1lZGlhIENvbm5lY3QgKGh0dHA6Ly9pdG1lZGlhY29ubmVjdC5ybylcbiAqIEBsaWNlbnNlICAgaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vIy9hcHBsaWNhdGlvbi1saWNlbnNlIENvbW1lcmNpYWxcbiAqL1xuXG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICcuLi9saWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFZpZXdNb2RlbEFic3RyYWN0IHtcblxuICAgIGhlYWRpbmcgPSAnUHJvdGVjdGlhIGRhdGVsb3InO1xuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
