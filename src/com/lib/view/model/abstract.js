
import {LogManager} from 'aurelia-framework';

export class ViewModelAbstract  {

    /**
     * [constructor description]
     * @method constructor
     * @return {this}    [description]
     */
    constructor() {
        this.logger = LogManager.getLogger('view-model-abstract');
    }

    /**
     * [activate description]
     * @method activate
     * @param  {[type]} params                [description]
     * @param  {[type]} routeConfig           [description]
     * @param  {[type]} navigationInstruction [description]
     * @return {[type]}                       [description]
     */
    activate(params, routeConfig, navigationInstruction) {
        this.routeConfig = routeConfig;
        this.logger = LogManager.getLogger(`view-model-${this.routeConfig.name}`);

        this.routeConfig.navModel.router.activeRoute = this.routeConfig;
        console.log('Bai PULA!', this.routeConfig);
    }

    /**
     * [canActivate description]
     * @method canActivate
     * @param  {[type]}    params                [description]
     * @param  {[type]}    routeConfig           [description]
     * @param  {[type]}    navigationInstruction [description]
     * @return {[type]}                          [description]
     */
    // canActivate(params, routeConfig, navigationInstruction) {  }

    /**
     * [canDeactivate description]
     * @method canDeactivate
     * @return {[type]}      [description]
     */
    // canDeactivate() {  }

    /**
     * [decativate description]
     * @method decativate
     * @return {[type]}   [description]
     */
    // decativate() {  }

    /**
     * [loadScript description]
     * @method loadScript
     * @param  {String}    id  [description]
     * @param  {String}    src [description]
     * @return {Promise}       [description]
     */
    loadScript(id, src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.onload = () => { resolve.call(this); };
            document.head.appendChild(script);
            setTimeout(() => { reject.call(this, new Error(`Script ${src} exceeded timeout.`)); }, 10000);
        });
    }
}