/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('sustine-facebook');

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
export class Facebook {
    heading = 'Sustine Proiectul pe Facebook';

    /**
    * [attached description]
    * @method attached
    * @return {[type]} [description]
    */
    attached() {
        this.fbCanLoadImages();
    }

    /**
     * [fbCanLoadImages description]
     * @method fbCanLoadImages
     * @return {[type]}        [description]
     */
    fbCanLoadImages() {
        const self = this;
        logger.debug('Facebook: Load image attempt');
        this.fbLoginCheck(
            () => {
                self.fbAlertHide();
                self.fbLoadImages();
            },
            () => {
                self.fbAlertShow();
            }
        );
    }

    /**
     * [fbLoadImages description]
     * @method fbLoadImages
     * @return {[type]}     [description]
     */
    fbLoadImages() {
        logger.debug('Facebook: Actually loading the images ;)');
        FB.api('/me/picture', 'get', {width: 300, height: 300 }, function(mrp) {
            logger.debug('Facebook API loaded /me/picture', mrp, mrp.data.url);
            FB.api('/me?fields=cover', function(mrc) {
                logger.debug('Facebook API loaded /me?fields=cover', mrc, mrc.cover.source);
                $('.main-profile').each((i, img) => {
                    $(img).css('background-image', `url('${mrp.data.url}')`);
                });
                $('.main-cover').each((i, img) => {
                    $(img).css('background-image', `url('${mrc.cover.source}')`);
                });
                $('.facebook-choice').removeClass('hide');
            });
        });
    }

    /**
     * [fbLoginCheckAttempts description]
     * @type {Number}
     */
    fbLoginCheckAttempts = 0;

    /**
     * [fbLoginCheck description]
     * @method fbLoginCheck
     * @param  {Function}     resolve [description]
     * @param  {Function}     reject  [description]
     */
    fbLoginCheck(resolve, reject) {
        const self = this;
        logger.debug('Facebook: Checking login permissions', resolve, reject);

        $('.navbar-toggler').addClass('spinner');

        // if FB api does not exists, show a warning message along with FB login button
        if (typeof FB === 'undefined' || !FB) {
            logger.warn('Facebook: FB variable not present. Trying again in .5 s');
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
                    logger.debug('Facebook: Permission granted.');
                    $('.navbar-toggler').removeClass('spinner');
                    resolve.call(null);
                    break;
                case 'not_authorized':
                default:
                    logger.debug('Facebook: Permission denied. Attepmting auth.');
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
        const self = this;
        FB.login(() => {
            self.fbCanLoadImages();
        }, {scope: 'publish_actions'});
    }

    /**
     * [fbAlertHide description]
     * @method fbAlertHide
     * @return {[type]}    [description]
     */
    fbAlertHide() {
        $('.alert-facebook-auth').removeClass('show');
    }

    /**
     * [fbAlertShow description]
     * @method fbAlertShow
     * @return {[type]}    [description]
     */
    fbAlertShow() {
        $('.alert-facebook-auth').removeClass('hide');
    }

    /**
     * [fbChangePicture description]
     * @method fbChangePicture
     * @return {[type]}        [description]
     */
    fbChangePicture() {

    }

    /**
     * [fbChangeCover description]
     * @method fbChangeCover
     * @return {[type]}      [description]
     */
    fbChangeCover() {

    }

}
