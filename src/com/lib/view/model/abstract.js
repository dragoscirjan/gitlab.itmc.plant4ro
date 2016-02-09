
export class ViewModelAbstract  {

    /**
     * [constructor description]
     * @method constructor
     * @return {this}    [description]
     */
    constructor() {}

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
     * [activate description]
     * @method activate
     * @param  {[type]} params                [description]
     * @param  {[type]} routeConfig           [description]
     * @param  {[type]} navigationInstruction [description]
     * @return {[type]}                       [description]
     */
    activate(params, routeConfig, navigationInstruction) {
        this.routeConfig = routeConfig;
        console.log('PULA BA!', this.routeConfig);
    }

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
}
