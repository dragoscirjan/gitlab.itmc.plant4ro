System.register([], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  "use strict";

  var SliceValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      SliceValueConverter = (function () {
        function SliceValueConverter() {
          _classCallCheck(this, SliceValueConverter);
        }

        _createClass(SliceValueConverter, [{
          key: "toView",
          value: function toView(array, from, count) {
            return array.slice(from, count);
          }
        }]);

        return SliceValueConverter;
      })();

      _export("SliceValueConverter", SliceValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L3NsaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O01BV2EsbUJBQW1COzs7Ozs7Ozs7QUFBbkIseUJBQW1CO2lCQUFuQixtQkFBbUI7Z0NBQW5CLG1CQUFtQjs7O3FCQUFuQixtQkFBbUI7O2lCQVl0QixnQkFBQyxLQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBVTtBQUN0RCxtQkFBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztXQUNuQzs7O2VBZFEsbUJBQW1CIiwiZmlsZSI6ImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L3NsaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQbGFudGVhemEgcGVudHJ1IFJvbWFuaWEgKGh0dHA6Ly9wbGFudGVhemFwZW50cnVyb21hbmlhLnJvLylcbiAqXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFByaWV0ZW5paSBQYWR1cmlsb3IgZGluIFJvbWFuaWEgKGh0dHA6Ly9wcmlldGVuaWlwYWR1cmlsb3Iucm8pXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IElUIE1lZGlhIENvbm5lY3QgKGh0dHA6Ly9pdG1lZGlhY29ubmVjdC5ybylcbiAqIEBsaWNlbnNlICAgaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vIy9hcHBsaWNhdGlvbi1saWNlbnNlIENvbW1lcmNpYWxcbiAqL1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBTbGljZVZhbHVlQ29udmVydGVyIHtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9WaWV3XG4gICAgICogQHBhcmFtICB7QXJyYXl9IGFycmF5XG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBmcm9tXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBjb3VudFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqXG4gICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc2xpY2VcbiAgICAgKiBAc2VlIEFycmF5I3NsaWNlKGZyb20sIGNvdW50KVxuICAgICAqL1xuICAgIHRvVmlldyhhcnJheTogQXJyYXksIGZyb206IE51bWJlciwgY291bnQ6IE51bWJlcikgOiBBcnJheSB7XG4gICAgICAgIHJldHVybiBhcnJheS5zbGljZShmcm9tLCBjb3VudCk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
