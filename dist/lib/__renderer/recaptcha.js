System.register(['aurelia-framework'], function (_export) {
  /**
   * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
   *
   * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
   * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
   * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
   * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
   */

  'use strict';

  var inject, noView, bindable, recaptchaCallbackName, ready, script, Recaptcha;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      recaptchaCallbackName = 'setRecaptchaReady';
      ready = new Promise(function (resolve) {
        return window[recaptchaCallbackName] = resolve;
      });
      script = document.createElement('script');

      script.src = 'https://www.google.com/recaptcha/api.js?onload=' + recaptchaCallbackName + '&render=explicit&hl=' + (document.getElementsByTagName('html')[0].getAttribute('lang') || 'en');
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      Recaptcha = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Recaptcha, [{
          key: 'callback',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'expiredCallback',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'size',
          decorators: [bindable],
          initializer: function initializer() {
            return 'normal';
          },
          enumerable: true
        }, {
          key: 'tabindex',
          decorators: [bindable],
          initializer: function initializer() {
            return 0;
          },
          enumerable: true
        }, {
          key: 'theme',
          decorators: [bindable],
          initializer: function initializer() {
            return 'light';
          },
          enumerable: true
        }, {
          key: 'type',
          decorators: [bindable],
          initializer: function initializer() {
            return 'image';
          },
          enumerable: true
        }, {
          key: 'sitekey',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Recaptcha(element) {
          _classCallCheck(this, _Recaptcha);

          _defineDecoratedPropertyDescriptor(this, 'callback', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'expiredCallback', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'size', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'tabindex', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'theme', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'sitekey', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(Recaptcha, [{
          key: 'attached',
          value: function attached() {
            var _this = this;

            ready.then(function () {
              grecaptcha.render(_this.element, {
                callback: _this.callback,
                'expired-callback': _this.expiredCallback,
                sitekey: _this.sitekey,
                size: _this.size,
                tabindex: _this.tabindex,
                theme: _this.theme,
                type: _this.type
              });
            });
          }
        }], null, _instanceInitializers);

        var _Recaptcha = Recaptcha;
        Recaptcha = inject(Element)(Recaptcha) || Recaptcha;
        Recaptcha = noView()(Recaptcha) || Recaptcha;
        return Recaptcha;
      })();

      _export('Recaptcha', Recaptcha);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9fX3JlbmRlcmVyL3JlY2FwdGNoYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0NBV00scUJBQXFCLEVBQ3JCLEtBQUssRUFPUCxNQUFNLEVBa0JHLFNBQVM7Ozs7Ozs7Ozs7aUNBNUJkLE1BQU07aUNBQUUsTUFBTTttQ0FBRSxRQUFROzs7QUFFMUIsMkJBQXFCLEdBQUcsbUJBQW1CO0FBQzNDLFdBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87ZUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxPQUFPO09BQUEsQ0FBQztBQU96RSxZQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O0FBQzdDLFlBQU0sQ0FBQyxHQUFHLHVEQUFxRCxxQkFBcUIsNkJBQXVCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFBLEFBQUUsQ0FBQztBQUNuTCxZQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNwQixZQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNwQixjQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFjckIsZUFBUzs7Ozs4QkFBVCxTQUFTOzt1QkFDakIsUUFBUTs7Ozs7dUJBQ1IsUUFBUTs7Ozs7dUJBQ1IsUUFBUTs7bUJBQVEsUUFBUTs7Ozs7dUJBQ3hCLFFBQVE7O21CQUFZLENBQUM7Ozs7O3VCQUNyQixRQUFROzttQkFBUyxPQUFPOzs7Ozt1QkFDeEIsUUFBUTs7bUJBQVEsT0FBTzs7Ozs7dUJBQ3ZCLFFBQVE7O21CQUFXLEVBQUU7Ozs7O0FBUVgsaUJBZkYsU0FBUyxDQWVOLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDakIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDMUI7OzhCQWpCUSxTQUFTOztpQkF1QlYsb0JBQUc7OztBQUNQLGlCQUFLLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDYix3QkFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFLLE9BQU8sRUFBRTtBQUM1Qix3QkFBUSxFQUFFLE1BQUssUUFBUTtBQUN2QixrQ0FBa0IsRUFBRSxNQUFLLGVBQWU7QUFDeEMsdUJBQU8sRUFBRSxNQUFLLE9BQU87QUFDckIsb0JBQUksRUFBRSxNQUFLLElBQUk7QUFDZix3QkFBUSxFQUFFLE1BQUssUUFBUTtBQUN2QixxQkFBSyxFQUFFLE1BQUssS0FBSztBQUNqQixvQkFBSSxFQUFFLE1BQUssSUFBSTtlQUNsQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7V0FDTjs7O3lCQW5DUSxTQUFTO0FBQVQsaUJBQVMsR0FEckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFNBQVMsS0FBVCxTQUFTO0FBQVQsaUJBQVMsR0FGckIsTUFBTSxFQUFFLENBRUksU0FBUyxLQUFULFNBQVM7ZUFBVCxTQUFTIiwiZmlsZSI6ImxpYi9fX3JlbmRlcmVyL3JlY2FwdGNoYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXVyZWxpYSBQbHVnaW4gOjogR29vZ2xlIFJlY2FwdGNoYSAoaHR0cDovL2l0bWVkaWFjb25uZWN0LnJvL2F1cmVsaWEvYXVyZWxpYS1nb29nbGUtcmVjYXB0Y2hhKVxuICpcbiAqIEBsaW5rICAgICAgaHR0cDovL2dpdGh1Yi5jb20vaXRtY2Rldi9hdXJlbGlhLWdvb2dsZS1yZSBjYXB0Y2hhIGZvciB0aGUgY2Fub25pY2FsIHNvdXJjZSByZXBvc2l0b3J5XG4gKiBAbGluayAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9JVE1DZGV2L2F1cmVsaWEtZ29vZ2xlLXJlY2FwdGNoYS9pc3N1ZXMgZm9yIGlzc3Vlc1xuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNiBJVCBNZWRpYSBDb25uZWN0IFMuUi5MLiBSb21hbmlhIChodHRwOi8vd3d3Lml0bWVkaWFjb25uZWN0LnJvKVxuICogQGxpY2Vuc2UgICBodHRwczovL2dpdGh1Yi5jb20vSVRNQ2Rldi9hdXJlbGlhLWdvb2dsZS1yZWNhcHRjaGEvYmxvYi9tYXN0ZXIvTElDRU5TRSBNSVQgTGljZW5zZVxuICovXG5cbmltcG9ydCB7aW5qZWN0LCBub1ZpZXcsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmNvbnN0IHJlY2FwdGNoYUNhbGxiYWNrTmFtZSA9ICdzZXRSZWNhcHRjaGFSZWFkeSc7XG5jb25zdCByZWFkeSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gd2luZG93W3JlY2FwdGNoYUNhbGxiYWNrTmFtZV0gPSByZXNvbHZlKTtcblxuLyoqXG4gKiBHb29nbGUgUmVjYXB0Y2hhIFNjcmlwdFxuICogQHZhciB7RG9jdW1lbnRFbGVtZW50fVxuICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcmVjYXB0Y2hhL2RvY3MvZGlzcGxheVxuICovXG5sZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5zY3JpcHQuc3JjID0gYGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhL2FwaS5qcz9vbmxvYWQ9JHtyZWNhcHRjaGFDYWxsYmFja05hbWV9JnJlbmRlcj1leHBsaWNpdCZobD0ke2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uZ2V0QXR0cmlidXRlKCdsYW5nJykgfHwgJ2VuJ31gO1xuc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbnNjcmlwdC5kZWZlciA9IHRydWU7XG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbi8qKlxuICogR29vZ2xlIFJlY2FwdGNoYSBwbHVnaW4sIG9yaWdpbmFsbHkgZGV2ZWxvcGVkIGJ5IEplcmVteSBEYW55b3cgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS91c2Vycy83MjU4NjYvamVyZW15LWRhbnlvdylcbiAqIGFuZCBleHRlbmRlZCBieSBEcmFnb3MgQ2lyamFuIChodHRwOi8vZ2l0aHViLmNvbS9kcmFnb3NjaXJqYW4pXG4gKlxuICogQGxpbmsgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTQ0MTc4Ny91c2UtZ29vZ2xlcy1yZWNhcHRjaGEtaW4tYW4tYXVyZWxpYS1hcHBsaWNhdGlvblxuICogQGxpbmsgaHR0cDovL3BsbmtyLmNvL2VkaXQvclhxTmRoP3A9aW5mb1xuICpcbiAqIEBtZXRob2Qgbm9WaWV3XG4gKiBAbWV0aG9kIGluamVjdFxuICovXG5Abm9WaWV3KClcbkBpbmplY3QoRWxlbWVudClcbmV4cG9ydCBjbGFzcyBSZWNhcHRjaGEge1xuICAgIEBiaW5kYWJsZSBjYWxsYmFjaztcbiAgICBAYmluZGFibGUgZXhwaXJlZENhbGxiYWNrO1xuICAgIEBiaW5kYWJsZSBzaXplID0gJ25vcm1hbCc7XG4gICAgQGJpbmRhYmxlIHRhYmluZGV4ID0gMDtcbiAgICBAYmluZGFibGUgdGhlbWUgPSAnbGlnaHQnO1xuICAgIEBiaW5kYWJsZSB0eXBlID0gJ2ltYWdlJztcbiAgICBAYmluZGFibGUgc2l0ZWtleSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudEVsZW1lbnR9ICAgIGVsZW1lbnQgRWxlbWVudCB0byByZW5kZXIgcmVjYXB0Y2hhXG4gICAgICogQHJldHVybiB7dGhpc31cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZWQgZXZlbnQgKHNlZSBBdXJlbGlhIENvbXBvbmVudCBEb2N1bWVudGF0aW9uKVxuICAgICAqIEBtZXRob2QgYXR0YWNoZWRcbiAgICAgKi9cbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgICAgcmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBncmVjYXB0Y2hhLnJlbmRlcih0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdGhpcy5jYWxsYmFjayxcbiAgICAgICAgICAgICAgICAnZXhwaXJlZC1jYWxsYmFjayc6IHRoaXMuZXhwaXJlZENhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHNpdGVrZXk6IHRoaXMuc2l0ZWtleSxcbiAgICAgICAgICAgICAgICBzaXplOiB0aGlzLnNpemUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IHRoaXMudGFiaW5kZXgsXG4gICAgICAgICAgICAgICAgdGhlbWU6IHRoaXMudGhlbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
