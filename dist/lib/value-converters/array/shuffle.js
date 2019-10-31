System.register([], function (_export) {
  /**
   * Planteaza pentru Romania (http://planteazapentruromania.ro/)
   *
   * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
   * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
   * @license   http://planteazapentruromania.ro/#/application-license Commercial
   */

  "use strict";

  var ShuffleValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      ShuffleValueConverter = (function () {
        function ShuffleValueConverter() {
          _classCallCheck(this, ShuffleValueConverter);
        }

        _createClass(ShuffleValueConverter, [{
          key: "toView",
          value: function toView(array) {
            var currentIndex = array.length;
            var temporaryValue = null;
            var randomIndex = null;

            while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          }
        }]);

        return ShuffleValueConverter;
      })();

      _export("ShuffleValueConverter", ShuffleValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L3NodWZmbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7TUFXYSxxQkFBcUI7Ozs7Ozs7OztBQUFyQiwyQkFBcUI7aUJBQXJCLHFCQUFxQjtnQ0FBckIscUJBQXFCOzs7cUJBQXJCLHFCQUFxQjs7aUJBVXhCLGdCQUFDLEtBQVksRUFBVTtBQUN6QixnQkFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxnQkFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7O0FBR3ZCLG1CQUFPLFlBQVksS0FBSyxDQUFDLEVBQUU7QUFHdkIseUJBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUN2RCwwQkFBWSxJQUFJLENBQUMsQ0FBQzs7QUFHbEIsNEJBQWMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsbUJBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekMsbUJBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFjLENBQUM7YUFDdkM7O0FBRUQsbUJBQU8sS0FBSyxDQUFDO1dBQ2hCOzs7ZUE3QlEscUJBQXFCIiwiZmlsZSI6ImxpYi92YWx1ZS1jb252ZXJ0ZXJzL2FycmF5L3NodWZmbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBsYW50ZWF6YSBwZW50cnUgUm9tYW5pYSAoaHR0cDovL3BsYW50ZWF6YXBlbnRydXJvbWFuaWEucm8vKVxuICpcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgUHJpZXRlbmlpIFBhZHVyaWxvciBkaW4gUm9tYW5pYSAoaHR0cDovL3ByaWV0ZW5paXBhZHVyaWxvci5ybylcbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgSVQgTWVkaWEgQ29ubmVjdCAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwOi8vcGxhbnRlYXphcGVudHJ1cm9tYW5pYS5yby8jL2FwcGxpY2F0aW9uLWxpY2Vuc2UgQ29tbWVyY2lhbFxuICovXG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFNodWZmbGVWYWx1ZUNvbnZlcnRlciB7XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvVmlld1xuICAgICAqIEBwYXJhbSAge0FycmF5fSBhcnJheVxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqXG4gICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc2xpY2VcbiAgICAgKiBAc2VlIEFycmF5I3NsaWNlKGZyb20sIGNvdW50KVxuICAgICAqL1xuICAgIHRvVmlldyhhcnJheTogQXJyYXkpIDogQXJyYXkge1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICBsZXQgdGVtcG9yYXJ5VmFsdWUgPSBudWxsO1xuICAgICAgICBsZXQgcmFuZG9tSW5kZXggPSBudWxsO1xuXG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT09IDApIHtcblxuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
