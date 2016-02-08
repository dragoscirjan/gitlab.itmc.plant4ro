/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('sustine-facebook');

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

//import {computedFrom} from 'aurelia-framework';
// https://developers.facebook.com/docs/graph-api/using-graph-api
// https://developers.facebook.com/docs/php/howto/uploadphoto
// https://developers.facebook.com/docs/php/howto/uploadphoto
// https://developers.facebook.com/docs/javascript
// https://developers.facebook.com/docs/javascript/howto/jquery
// https://developers.facebook.com/docs/javascript/howto/jquery/v2.5

/**
 * Component for changing Facebook Profile Picture or Profile Cover
 *
 */
@inject([HttpClient])
export class Facebook {

    heading = 'Sustine Proiectul pe Facebook';

    /**
     * [constructor description]
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}               [description]
     */
    constructor(http) {
    }

    /**
     * [activate description]
     * @method activate
     * @return {[type]} [description]
     */
    activate(params, routeConfig) {
        const self = this;

        this.router = routeConfig.navModel.router;
        // console.log(routeConfig.navModel);

        return new Promise((resolve, reject) => {
            self.fbLoginCheck(resolve, reject);
        }).then(() => {
            self.fbIsLoggedIn = true;
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('Pics loaded here');
                    resolve2.call(null);
                }, 3000);
                // return self.fbLoadImages(resolved, reject);
            })
        }).catch(() => {
            self.fbIsLoggedIn = false;
        });
    }


    // /**
    //  * [fbLoadImages description]
    //  * @method fbLoadImages
    //  * @return {[type]}     [description]
    //  */
    // fbLoadImages() {
    //     this.router.isNavigating = true;
    //     logger.debug('Facebook: Actually loading the images ;)');
    //     FB.api('/me/picture', 'get', {width: 300, height: 300 }, function(mrp) {
    //         logger.debug('Facebook API loaded /me/picture', mrp, mrp.data.url);
    //         FB.api('/me?fields=cover', function(mrc) {
    //             logger.debug('Facebook API loaded /me?fields=cover', mrc, mrc.cover.source);
    //             // self.router.isNavigating = false;
    //             $('.main-profile').each((i, img) => {
    //                 $(img).css('background-image', `url('${mrp.data.url}')`);
    //             });
    //             $('.main-cover').each((i, img) => {
    //                 $(img).css('background-image', `url('${mrc.cover.source}')`);
    //             });
    //             $('.facebook-choice').removeClass('hide');
    //         });
    //     });
    // }

    /**
     * [fbLoginCheckAttempts description]
     * @type {Number}
     */
    fbLoginCheckAttempts = 0;

    /**
     * [fbIsLoggedIn description]
     * @type {Boolean}
     */
    fbIsLoggedIn = false;

    /**
     * Recursively (only if Facebook SDK has not been loaded yet), try to determine if the application has access
     * to Facebook or not
     *
     * @method fbLoginCheck
     * @param  {Function}     resolve [description]
     * @param  {Function}     reject  [description]
     */
    fbLoginCheck(resolve, reject) {
        const self = this;
        logger.debug('Facebook SDK: Checking login permissions');

        // if FB api does not exists, show a warning message along with FB login button
        if (typeof FB === 'undefined' || !FB) {
            logger.warn('Facebook SDK: "FB" not present. Trying again in .5 s');
            if (this.fbLoginCheckAttempts++ < 10) {
                setTimeout(() => { self.fbLoginCheck(resolve, reject); }, 500);
            } else {
                reject.call(null);
            }
            return;
        }

        FB.getLoginStatus(function(response) {
            switch (response.status) {
                case 'connected':
                    logger.debug('Facebook SDK: Permission granted.');
                    resolve.call(null);
                    break;
                case 'not_authorized':
                default:
                    logger.debug('Facebook SDK: Permission denied.');
                    reject.call(null);
            }
        });
    }

    /**
     * [facebookLogin description]
     * @method fbLogin
     * @param  {Function}    callback [description]
     */
    fbLogin() {
        logger.debug('Facebook SDK: Attempting login.');
        // try facebook login and reload location
        FB.login(() => { location.reload(); }, {scope: 'publish_actions'});
    }

    // /**
    //  * [fbChangePicture description]
    //  * @method fbChangePicture
    //  * @return {[type]}        [description]
    //  */
    // fbChangePicture() {
    //
    // }
    //
    // /**
    //  * [fbChangeCover description]
    //  * @method fbChangeCover
    //  * @return {[type]}      [description]
    //  */
    // fbChangeCover() {
    //
    // }

}
