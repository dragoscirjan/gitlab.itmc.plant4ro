<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;

use Symfony\Component\HttpFoundation\Request;
use Zend\Mail;

/**
 * Class Index
 */
class Config {

    /**
     * @param Application $app
     * @return Response
     */
    public function configJs(Application $app, Request $request) {
        ob_start();
?>
/**
 * DO NOT EDIT THIS FILE! IT IS GENERATED AUTOMATICALLY WHEN BUILDING THE PROJECT!
 */
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

    ENV_DEVELOP = 'development';
    ENV_TESTING = 'testing';
    ENV_STAGING = 'staging';
    ENV_PRODUCT = 'production';

    env = '<?php echo $app->getEnv(); ?>';

    phpAppBase = '<?php echo $app->getConfig('js.servicesBase'); ?>';

    constructor(http) { }

    /**
     * [configHttp description]
     * @method configHttp
     * @param  {aurelia-fetch-client/HttpClient}   http [description]
     * @return {aurelia-fetch-client/HttpClient}        [description]
     */
    configHttp(http) {
        http.configure(config => {
            config
                // .withBaseUrl('services/index.php/')
                .withBaseUrl(this.phpAppBase)
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'AureliaAPI'
                    }
                });
            // console.log(config);
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

    /**
     * Encoding message to the server side domain
     * @method encode
     * @param  {Object} obj
     * @return {String}
     */
    encode(obj) {
<?php /*if ($app->getEnv() == Application::ENV_DEVELOP
            || $app->getEnv() == Application::ENV_TESTING
) : /**/?>
        return JSON.stringify(obj);
<?php /*else: ?>
        return btoa(JSON.stringify(obj));
<?php endif; /**/?>
    }

    /**
     * Decoding message from the server side domain
     * @method decode
     * @param  {String} str
     * @return {Object}
     */
    decode(str) {
<?php /*if ($app->getEnv() == Application::ENV_DEVELOP
            || $app->getEnv() == Application::ENV_TESTING
) : /**/?>
        return JSON.parse(str);
<?php /*else: ?>
        return JSON.parse(atob(str));
<?php endif; /**/?>
    }
}
<?php
        return new Response(
            ob_get_clean(),
            Response::HTTP_OK,
            [
                'ContentType' => 'text/javascript'
            ]
        );
    }

}
