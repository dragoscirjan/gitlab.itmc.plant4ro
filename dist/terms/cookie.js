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

          this.heading = 'Cookie';
        }

        return Component;
      })(ViewModelAbstract);

      _export('Component', Component);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zL2Nvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt5QkFhYSxTQUFTOzs7Ozs7Ozs7O2dEQUxkLGlCQUFpQjs7O0FBS1osZUFBUztrQkFBVCxTQUFTOztpQkFBVCxTQUFTO2dDQUFULFNBQVM7O3FDQUFULFNBQVM7O2VBRWxCLE9BQU8sR0FBRyxRQUFROzs7ZUFGVCxTQUFTO1NBQVMsaUJBQWlCIiwiZmlsZSI6InRlcm1zL2Nvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxhbnRlYXphIHBlbnRydSBSb21hbmlhIChodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8pXG4gKlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBQcmlldGVuaWkgUGFkdXJpbG9yIGRpbiBSb21hbmlhIChodHRwOi8vcHJpZXRlbmlpcGFkdXJpbG9yLnJvKVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBJVCBNZWRpYSBDb25uZWN0IChodHRwOi8vaXRtZWRpYWNvbm5lY3Qucm8pXG4gKiBAbGljZW5zZSAgIGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLyMvYXBwbGljYXRpb24tbGljZW5zZSBDb21tZXJjaWFsXG4gKi9cblxuaW1wb3J0IHtWaWV3TW9kZWxBYnN0cmFjdH0gZnJvbSAnLi4vbGliL3ZpZXcvbW9kZWwvYWJzdHJhY3QnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBWaWV3TW9kZWxBYnN0cmFjdCB7XG5cbiAgICBoZWFkaW5nID0gJ0Nvb2tpZSc7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
