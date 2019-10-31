System.register([], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  "use strict";

  var FilterOnPropertyValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      FilterOnPropertyValueConverter = (function () {
        function FilterOnPropertyValueConverter() {
          _classCallCheck(this, FilterOnPropertyValueConverter);
        }

        _createClass(FilterOnPropertyValueConverter, [{
          key: "toView",
          value: function toView(array, key, value) {
            console.log(key, value);
            return array.filter(function (item) {
              return item[key] === value;
            });
          }
        }]);

        return FilterOnPropertyValueConverter;
      })();

      _export("FilterOnPropertyValueConverter", FilterOnPropertyValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L2ZpbHRlck9uUHJvcGVydHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7TUFXYSw4QkFBOEI7Ozs7Ozs7OztBQUE5QixvQ0FBOEI7aUJBQTlCLDhCQUE4QjtnQ0FBOUIsOEJBQThCOzs7cUJBQTlCLDhCQUE4Qjs7aUJBRWpDLGdCQUFDLEtBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFVO0FBQ3JELG1CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QixtQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTtxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSzthQUFBLENBQUMsQ0FBQztXQUN0RDs7O2VBTFEsOEJBQThCIiwiZmlsZSI6ImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L2ZpbHRlck9uUHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEZpbHRlck9uUHJvcGVydHlWYWx1ZUNvbnZlcnRlciB7XG5cbiAgICB0b1ZpZXcoYXJyYXk6IEFycmF5LCBrZXk6IFN0cmluZywgdmFsdWU6IFN0cmluZykgOiBBcnJheSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChpdGVtKSA9PiBpdGVtW2tleV0gPT09IHZhbHVlKTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
