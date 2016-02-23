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
            { route: ['', 'acasa'],     name: 'hp',        moduleId: 'acasa',        nav: true,   title: 'Acasa' },
            { route: 'despre-proiect',  name: 'about',     moduleId: 'proiect',      nav: true,   title: 'Despre Proiect' },
            { route: 'parteneri',       name: 'partners',  moduleId: 'parteneri',    nav: true,   title: 'Parteneri' },
            { route: 'planteaza',       name: 'plant',     moduleId: 'planteaza',    nav: true,   title: 'Planteaza' },
            { route: 'multumim',        name: 'thnkas',    moduleId: 'multumim',     nav: false,  title: 'Ai Plantat' },
            { route: 'sustine',         name: 'support',   moduleId: 'sustine',      nav: true,   title: 'Sustine-ne' },
            { route: 'contact',         name: 'contact',   moduleId: 'contact',      nav: true,   title: 'Contact' },
            { route: 'intrebari',       name: 'faq',       moduleId: 'intrebari',    nav: false,  title: 'Intrebari Frecvente' },
            { route: 'termeni',         name: 'terms',     moduleId: 'termeni',      nav: false,  title: 'Termeni si Conditii' },
            { route: 'securitate',      name: 'security',  moduleId: 'securitate',   nav: false,  title: 'Politica de Securitate' },
            { route: 'cookie',          name: 'cookie',    moduleId: 'cookie',       nav: false,  title: 'Cookie' }
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
            script.src = '//connect.facebook.net/en_US/sdk.js';
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
