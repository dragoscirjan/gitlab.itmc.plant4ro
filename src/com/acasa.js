//import {computedFrom} from 'aurelia-framework';

export class Acasa {
    heading = 'Planteaza pentru Romania';

    /**
     * [constructor description]
     * @method constructor
     * @return {[type]}    [description]
     */
    constructor() {
        this.updateTreeCount();
        this.updateDonatorLit();

        setInterval(() => this.updateTreeCount(), 10000);
        setInterval(() => this.updateDonatorLit(), 30000);

        // revolution(jQuery);
    }

    updateTreeCount() {
        //
    }

    updateDonatorLit() {
        //
    }

    doShowDontaorList() {
        //
    }

    doHideDonatorList() {
        //
    }

    /**
     * [revolution description]
     * @param  {[type]} $ [description]
     * @return {[type]}   [description]
     */
    attached() {
        // Revolution slider initialization
        // $("#slider").revolution({
        //         sliderType: "standard",
        //         sliderLayout: "fullscreen",
        //         delay: 10000,
        //         navigation: {
        //         arrows: {enable: false},
        //         onHoverStop: 'off',
        //     },
        //     responsiveLevels: [1200, 992, 768, 480],
        //     gridwidth: [1200, 992, 768, 480],
        //     gridheight: [500, 450, 400, 350]
        // });
    }

}
