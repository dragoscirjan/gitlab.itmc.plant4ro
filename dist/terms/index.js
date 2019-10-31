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

          this.heading = 'Termeni si Conditii';
        }

        return Component;
      })(ViewModelAbstract);

      _export('Component', Component);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O3lCQWFhLFNBQVM7Ozs7Ozs7Ozs7Z0RBTGQsaUJBQWlCOzs7QUFLWixlQUFTO2tCQUFULFNBQVM7O2lCQUFULFNBQVM7Z0NBQVQsU0FBUzs7cUNBQVQsU0FBUzs7ZUFFbEIsT0FBTyxHQUFHLHFCQUFxQjs7O2VBRnRCLFNBQVM7U0FBUyxpQkFBaUIiLCJmaWxlIjoidGVybXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbmltcG9ydCB7Vmlld01vZGVsQWJzdHJhY3R9IGZyb20gJy4uL2xpYi92aWV3L21vZGVsL2Fic3RyYWN0JztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgVmlld01vZGVsQWJzdHJhY3Qge1xuXG4gICAgaGVhZGluZyA9ICdUZXJtZW5pIHNpIENvbmRpdGlpJztcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
