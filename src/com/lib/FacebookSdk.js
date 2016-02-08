
import {LogManager} from 'aurelia-framework';

export class FacebookSdk
{

    constructor() {
        this.logger = LogManager.getLogger('facebook-sdk');
        this.logger.debug('Facebook SDK instance created');
    }

    static script = null;
    static FB = null;

    /**
     * Attaching Facebook Js API to our application
     * @method fbAttach
     */
    attachScript(config) {
        const self = this;
        window.fbAsyncInit = () => { self.init(config); };
        $(document.head).append('<script id="facebook-sdk" src="//connect.facebook.net/en_US/sdk.js" />');
        FacebookSdk.script = $('#facebook-sdk');
        this.logger.debug('Facebook SDK script attached', FacebookSdk.script);
    }

    /**
     * [init description]
     * @method init
     * @param  {[type]} config [description]
     * @return {[type]}        [description]
     */
    init(config) {
        // https://developers.facebook.com/docs/javascript/reference/FB.api
        // https://developers.facebook.com/docs/graph-api/reference/
        FB.init(this.fbConfig);
        FacebookSdk.FB = FB;
        this.logger.debug('Facebook API Initialized', FB);
    }

    /**
     * [loginCheck description]
     * @method loginCheck
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    loginCheck(callback) {
        const self = this;
        if (typeof FB === 'undefined' || !FB) {
            this.logger.debug('Facebook API no initialized yet, waiting for API');
            FacebookSdk.script.get(0).onload = () => {
                self.logger.debug('Facebook API no initialized yet, API finally loaded');
                // setTimeout(() => { self.loginCheck(callback); }, 200);
            };
            return;
        }
        // this.logger.debug('Facebook API => running loginCheck');
        // FB.loginCheck(callback);
    }
}
