/**
 *
 */

import {LogManager} from 'aurelia-framework';

/**
 *
 */
export class App {

    /**
     * Application contructor
     * @method constructor
     * @return {this}      [description]
     */
    constructor() {
        this.logger = LogManager.getLogger('application');
    }

    /**
     * [configureRouter description]
     * @method configureRouter
     * @param  {[type]}        config [description]
     * @param  {[type]}        router [description]
     */
    configureRouter(config, router) {
        config.title = 'Planteaza pentru Romania';
        config.map([
            { route: ['', 'acasa'],          name: 'hp',        moduleId: 'index',           nav: true,   title: 'Acasa' },
            { route: 'despre-proiect',       name: 'about',     moduleId: 'about',           nav: true,   title: 'Despre Proiect' },
            { route: 'parteneri',            name: 'partners',  moduleId: 'partners',        nav: true,   title: 'Parteneri' },
            { route: 'implica-te',           name: 'support',   moduleId: 'support-router',  nav: true,   title: 'Implica-te' },
            { route: 'planteaza',            name: 'plant',     moduleId: 'donate',          nav: true,   title: 'Planteaza' },
            { route: 'planteaza/:t/esuat',   name: 'plant',     moduleId: 'donate',          nav: false,  title: 'Transactie Esuata' },
            { route: 'diploma/:id/:t',       name: 'diploma',   moduleId: 'diploma',         nav: false,  title: 'Ai Plantat' },
            { route: 'contact',              name: 'contact',   moduleId: 'contact',         nav: true,   title: 'Contact' },
            { route: 'intrebari',            name: 'faq',       moduleId: 'faq',             nav: false,  title: 'Intrebari Frecvente' },
            { route: 'termeni-si-conditii',  name: 'terms',     moduleId: 'terms-router',    nav: false,  title: 'Termeni si Conditii' }
        ]);

        this.router = router;
    }

    /**
     * [activate description]
     * @method activate
     */
    activate() {
        return this.fbLoadScript();
    }

    /**
     * [attached description]
     * @method attached
     * @return {[type]} [description]
     */
    attached() {
        // console.log(this);
        this.menuToggleInit();
    }

    /**
     * [menuInit description]
     * @method menuInit
     * @return {[type]} [description]
     */
    menuToggleInit() {
        $('.navbar-header button, .navbar-header .navbar-nav li').on('click', function() {
            const $navHeader = $('.navbar-header');
            if (!$navHeader.hasClass('is-nav-open')) {
                $navHeader.addClass('is-nav-open');
                return;
            }
            $navHeader.removeClass('is-nav-open');
        });
    }

    /**
     * Facebook Init Config
     * @type {Object}
     */
    fbConfig = {
        // appId: '188346134855747', // test
        appId: '187326271624400', // live
        status: true, // check login status
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.2'
    };


    /**
     * Attaching Facebook Js API to our application
     * @method fbLoadScript
     */
    fbLoadScript() {
        const self = this;
        window.fbAsyncInit = () => { self.fbInit(); };
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.id = 'fb-sdk';
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            script.onload = () => { resolve.call(this); };
            document.head.appendChild(script);
            setTimeout(() => { reject.call(this, new Error(`Script ${script.src} exceeded timeout.`)); }, 10000);
        }).then(() => {
            self.logger.debug('fb-sdk / script loaded');
        }).catch((e) => {
            self.logger.error('fb-sdk / script failed', e);
        });
    }

    /**
     * Initialize Facebook API
     * @method fbInit
     */
    fbInit() {
        // https://developers.facebook.com/docs/javascript/reference/FB.api
        // https://developers.facebook.com/docs/graph-api/reference/
        FB.init(this.fbConfig);
        this.logger.debug('fb-sdk / inited', FB);
    }
}
