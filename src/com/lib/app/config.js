/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

/**
 * Component for donations
 *
 */
export class AppConfig {

    ENV_DEVELOP = 'dev';
    ENV_TESTING = 'tst';
    ENV_STAGING = 'stg';
    ENV_PRODUCT = 'prd';

    env = this.ENV_DEVELOP;

    constructor(http) {
        this.initDev();

        try {
            const initEnv = this.env.replace(/^(.)/, ($1) => { return $1.toUpperCase(); });
            this[`init${initEnv}`].call(this);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * [initDev description]
     * @method initDev
     */
    initDev() {
        this.phpAppBase = '//planteazapentruromania.local/services/index.php/';
    }

    /**
     * [initStg description]
     * @method initStg
     */
    initStg() {
        this.phpAppBase = '//20160315.planteazapentruromania.ro/services/index.php/';
    }

    /**
     * [configHttp description]
     * @method configHttp
     * @param  {aurelia-fetch-client/HttpClient}   http [description]
     * @return {aurelia-fetch-client/HttpClient}        [description]
     */
    configHttp(http) {
        http.configure(config => {
            config
                .withBaseUrl('services/index.php/')
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'AureliaAPI'
                    }
                });
        });
        return http;
    }

    /**
     * [getPhpUrl description]
     * @method getPhpUrl
     * @param  {String}  route [description]
     * @return {String}        [description]
     */
    getPhpUrl(route) {
        return this.phpAppBase + route;
    }
}
