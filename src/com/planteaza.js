//import {computedFrom} from 'aurelia-framework';

import 'bootstrap-slider';

export class Planteaza {
    heading = 'Planteaza!';

    /**
     * Attached event
     * @see ViewModelAbstract#attached
     * @method attached
     */
    attached() {
        this.initRangeSlider();
    }

    /**
     * Initialize range slider
     * @return {[type]} [description]
     */
    initRangeSlider() {
        $('#treesQty').slider();
        // Bind slider value to an element
        $("#treesQty").on("slide", function(slideEvt) {
            $("#treesQtyVal").text(slideEvt.value);
        });
    }
}
