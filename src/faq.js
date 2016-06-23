//import {computedFrom} from 'aurelia-framework';

export class Interbari {
    heading = 'Intrebari';

    /**
    * Attached event
    * @see ViewModelAbstract#attached
    * @method attached
    */
    attached() {
        console.log($('.faq__answer a'));
        $('.faq__answer a').attr('href', '').on('click', (e) => {
            console.log(e.target);
            $(e.target)
                .hide()
                .parents('.faq__answer')
                .find('span, div')
                .show();
            e.preventDefault();
        });
    }

}
