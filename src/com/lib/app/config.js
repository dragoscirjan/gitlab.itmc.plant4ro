
export class AppConfig {

    ENV_DEVELOP = 'dev';
    ENV_TESTING = 'tst';
    ENV_STAGING = 'stg';
    ENV_PRODUCT = 'prd';

    env = this.ENV_DEVELOP;

    constructor() {
        this.initDev();

        try {
            const initEnv = this.env.replace(/^(.)/, ($1) => { return $1.toUpperCase(); });
            this[`init${initEnv}`].call(this);
        } catch (e) {
            console.error(e);
        }
    }

    initDev() {
        this.phpAppBase = `//planteazapentruromania.local/services/index.php/`;
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
