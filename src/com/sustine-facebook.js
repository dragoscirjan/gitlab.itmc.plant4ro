/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {ViewModelAbstract} from 'lib/view/model/abstract';

// import {inject} from 'aurelia-framework';
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
// @inject([HttpClient])
export class Facebook extends ViewModelAbstract {

    heading = 'Sustine Proiectul pe Facebook';

    /**
     * because @inject doesn't work.
     * @method inject
     * @return {Array}
     */
    static inject() { return [HttpClient]; }

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(http) {
        super();
        this.mrc = null;
        this.mrp = null;
        this.http = http;
        // console.log('http', this.http, new HttpClient);
    }

    /**
     * Activate event
     * @see ViewModelAbstract#activate
     * @method activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        const self = this;
        return this.fbLoginCheck().then(() => {
            self.fbIsLoggedIn = true;
            self.logger.debug('fb-sdk / permissions granted');
            return self.fbLoadImages().then(() => {
                self.logger.debug('fb-sdk / images loaded');
            }).catch((e) => {
                self.logger.warn('fb-sdk / failed loading images', e);
            });
        }).catch((x, e) => {
            self.logger.warn('fb-sdk / permission denied', x, e);
            self.fbIsLoggedIn = false;
        });
    }

    /**
     * Attached event
     * @see ViewModelAbstract#attached
     * @method attached
     */
    attached() {
        const self = this;
        if (this.mrp) {
            $('.main-profile').each((i, img) => {
                $(img).css('background-image', `url('${self.mrp.data.url}')`);
            });
            if (self.mrc.cover) {
                $('.main-cover').each((i, img) => {
                    $(img).css('background-image', `url('${self.mrc.cover.source}')`);
                });
            } else {
                $('.main-cover:gt(3)').hide();
            }
        }
    }

    /**
     * Load Faceboo Images (Profile Picture and Profile Cover)
     * @method fbLoadImages
     * @return {Promise}
     */
    fbLoadImages() {
        this.logger.debug('fb-sdk / loading images');
        const self = this;
        return new Promise((resolve, reject) => {
            FB.api('/me/picture', 'get', {width: 300, height: 300 }, function(mrp) {
                self.logger.debug('fb-sdk / /me/picture', mrp);
                self.mrp = mrp;
                FB.api('/me?fields=cover', function(mrc) {
                    self.logger.debug('fb-sdk / /me?fields=cover', mrc);
                    self.mrc = mrc;
                    resolve.call(self);
                });
            });
            setTimeout(() => {
                if (!self.mrc) {
                    reject.call(self, new Error('Facebook SDK timeout.'));
                }
            }, 20000);
        });
    }

    /**
     * Check Facebook SDK for Permossions to use the application
     * @method fbLoginCheck
     * @return {Promise}
     */
    fbLoginCheck() {
        this.logger.debug('fb-sdk / check permissions');
        return new Promise((resolve, reject) => {
            FB.getLoginStatus(function(response) {
                switch (response.status) {
                    case 'connected':
                        resolve.call(this);
                        break;
                    case 'not_authorized':
                    default:
                        reject.call(this, response);
                }
            });
        });
    }

    /**
     * Ask Facebook SDK to login to Facebook.
     * @method fbLogin
     */
    fbLogin() {
        this.logger.debug('fb-sdk / attempting login');
        // try facebook login and reload location
        FB.login(() => { location.reload(); }, {scope: 'publish_actions'});
    }

    /**
     * [fbChangePicture description]
     * @method fbChangePicture
     * @return {[type]}        [description]
     */
    fbChangePicture() {
        this.http
            .fetch('/services/index.php/sustine-facebook/1/0')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    // /**
    //  * [fbChangeCover description]
    //  * @method fbChangeCover
    //  * @return {[type]}      [description]
    //  */
    // fbChangeCover() {
    //
    // }

}
