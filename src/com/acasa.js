/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {ViewModelAbstract} from 'lib/view/model/abstract';

// import {LogManager} from 'aurelia-framework';
// let logger = LogManager.getLogger('acasa-view');

//import {computedFrom} from 'aurelia-framework';

export class Acasa extends ViewModelAbstract {
    heading = 'Planteaza pentru Romania';

    /**
     * [constructor description]
     * @method constructor
     * @return {[type]}    [description]
     */
    constructor() {
        super();
        // this.updateTreeCount();
        // this.updateDonatorLit();
        // setInterval(() => this.updateTreeCount(), 10000);
        // setInterval(() => this.updateDonatorLit(), 30000);

        // revolution(jQuery);
    }

    // updateTreeCount() {
    //     //
    // }
    //
    // updateDonatorLit() {
    //     //
    // }
    //
    // doShowDontaorList() {
    //     //
    // }
    //
    // doHideDonatorList() {
    //     //
    // }

    // /**
    //  * [activate description]
    //  * @method activate
    //  * @return {[type]} [description]
    //  */
    // activate(params, routeConfig) {
    //     console.log(routeConfig);
    //     // return new Promise((resolve, reject) => {
    //     //     const script = document.createElement('script');
    //     //     script.src = '/src/assets/plugins/revolution/js/jquery.themepunch.revolution.min.js';
    //     //     script.onload = () => {
    //     //         resolve.call(null);
    //     //         // const script2 = document.createElement('script');
    //     //         // script2.src = '/src/assets/plugins/revolution/js/jquery.themepunch.revolution.min.js';
    //     //         // script2.onload = () => {
    //     //         //     resolve.call(null);
    //     //         // };
    //     //         // document.head.appendChild(script2);
    //     //     };
    //     //     document.head.appendChild(script);
    //     // });
    // }


    // /**
    //  * [revolution description]
    //  * @param  {[type]} $ [description]
    //  * @return {[type]}   [description]
    //  */
    // attached() {
    //     // const script = document.createElement('script');
    //     // script.src = '/src/assets/plugins/revolution/js/jquery.themepunch.revolution.min.js';
    //     // script.onload = () => {
    //     //     const script2 = document.createElement('script');
    //     //     script2.src = '/src/assets/plugins/revolution/js/jquery.themepunch.revolution.min.js';
    //     //     script2.onload = () => {
    //     //         logger.debug('launching revolution ...');
    //     //         $('#slider').revolution({
    //     //             sliderType: 'standard',
    //     //             sliderLayout: 'fullscreen',
    //     //             delay: 10000,
    //     //             navigation: {
    //     //                 arrows: {
    //     //                     enable: false
    //     //                 },
    //     //                 onHoverStop: 'off'
    //     //             },
    //     //             responsiveLevels: [1200, 992, 768, 480],
    //     //             gridwidth: [1200, 992, 768, 480],
    //     //             gridheight: [500, 450, 400, 350]
    //     //         });
    //     //         console.log($('#slider'));
    //     //     };
    //     //     document.head.appendChild(script2);
    //     // };
    //     // document.head.appendChild(script);
    // }

}
