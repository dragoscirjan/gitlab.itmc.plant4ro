System.register(['lib/view/model/abstract'], function (_export) {
  'use strict';

  var ViewModelAbstract, Proiect;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_libViewModelAbstract) {
      ViewModelAbstract = _libViewModelAbstract.ViewModelAbstract;
    }],
    execute: function () {
      Proiect = (function (_ViewModelAbstract) {
        _inherits(Proiect, _ViewModelAbstract);

        function Proiect() {
          _classCallCheck(this, Proiect);

          _get(Object.getPrototypeOf(Proiect.prototype), 'constructor', this).apply(this, arguments);

          this.heading = 'Planteaza pentru Romania';
        }

        return Proiect;
      })(ViewModelAbstract);

      _export('Proiect', Proiect);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5QkFJYSxPQUFPOzs7Ozs7Ozs7O2dEQUZaLGlCQUFpQjs7O0FBRVosYUFBTztrQkFBUCxPQUFPOztpQkFBUCxPQUFPO2dDQUFQLE9BQU87O3FDQUFQLE9BQU87O2VBS2hCLE9BQU8sR0FBRywwQkFBMEI7OztlQUwzQixPQUFPO1NBQVMsaUJBQWlCIiwiZmlsZSI6ImFib3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQge2NvbXB1dGVkRnJvbX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5pbXBvcnQge1ZpZXdNb2RlbEFic3RyYWN0fSBmcm9tICdsaWIvdmlldy9tb2RlbC9hYnN0cmFjdCc7XG5cbmV4cG9ydCBjbGFzcyBQcm9pZWN0IGV4dGVuZHMgVmlld01vZGVsQWJzdHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBoZWFkaW5nID0gJ1BsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSc7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
