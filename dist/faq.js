System.register([], function (_export) {
    'use strict';

    var Interbari;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            Interbari = (function () {
                function Interbari() {
                    _classCallCheck(this, Interbari);

                    this.heading = 'Intrebari';
                }

                _createClass(Interbari, [{
                    key: 'attached',
                    value: function attached() {
                        console.log($('.faq__answer a'));
                        $('.faq__answer a').attr('href', '').on('click', function (e) {
                            console.log(e.target);
                            $(e.target).hide().parents('.faq__answer').find('span, div').show();
                            e.preventDefault();
                        });
                    }
                }]);

                return Interbari;
            })();

            _export('Interbari', Interbari);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhcS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFFYSxTQUFTOzs7Ozs7Ozs7QUFBVCxxQkFBUzt5QkFBVCxTQUFTOzBDQUFULFNBQVM7O3lCQUNsQixPQUFPLEdBQUcsV0FBVzs7OzZCQURaLFNBQVM7OzJCQVFWLG9CQUFHO0FBQ1AsK0JBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUNqQyx5QkFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ3BELG1DQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0Qiw2QkFBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDTixJQUFJLEVBQUUsQ0FDTixPQUFPLENBQUMsY0FBYyxDQUFDLENBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDakIsSUFBSSxFQUFFLENBQUM7QUFDWiw2QkFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO3lCQUN0QixDQUFDLENBQUM7cUJBQ047Ozt1QkFuQlEsU0FBUyIsImZpbGUiOiJmYXEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7Y29tcHV0ZWRGcm9tfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmJhcmkge1xuICAgIGhlYWRpbmcgPSAnSW50cmViYXJpJztcblxuICAgIC8qKlxuICAgICogQXR0YWNoZWQgZXZlbnRcbiAgICAqIEBzZWUgVmlld01vZGVsQWJzdHJhY3QjYXR0YWNoZWRcbiAgICAqIEBtZXRob2QgYXR0YWNoZWRcbiAgICAqL1xuICAgIGF0dGFjaGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygkKCcuZmFxX19hbnN3ZXIgYScpKTtcbiAgICAgICAgJCgnLmZhcV9fYW5zd2VyIGEnKS5hdHRyKCdocmVmJywgJycpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgICAgICAgICAkKGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgIC5oaWRlKClcbiAgICAgICAgICAgICAgICAucGFyZW50cygnLmZhcV9fYW5zd2VyJylcbiAgICAgICAgICAgICAgICAuZmluZCgnc3BhbiwgZGl2JylcbiAgICAgICAgICAgICAgICAuc2hvdygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
