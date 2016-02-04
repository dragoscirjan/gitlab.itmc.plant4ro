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

}
