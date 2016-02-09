/**
 *
 */

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('sustine-facebook');

export class App {
    configureRouter(config, router) {
        config.title = 'Planteaza pentru Romania';
        config.map([
            { route: ['', 'acasa'],     name: 'hp',        moduleId: 'acasa',        nav: true,  title: 'Acasa' },
            { route: 'despre-proiect',  name: 'about',      moduleId: 'proiect',      nav: true,  title: 'Despre Proiect' },
            { route: 'parteneri',       name: 'partners',    moduleId: 'parteneri',    nav: true,  title: 'Parteneri' },
            { route: 'planteaza',       name: 'plant',    moduleId: 'planteaza',    nav: true,  title: 'Planteaza' },
            { route: 'sustine',         name: 'support',      moduleId: 'sustine',      nav: true,  title: 'Sustine-ne' },
            { route: 'contact',         name: 'contact',      moduleId: 'contact',      nav: true,  title: 'Contact' },
            { route: 'intrebari',       name: 'faq',    moduleId: 'intrebari',    nav: false, title: 'Intrebari Frecvente' },
            { route: 'termeni',         name: 'terms',      moduleId: 'termeni',      nav: false, title: 'Termeni si Conditii' },
            { route: 'securitate',      name: 'security',   moduleId: 'securitate',   nav: false, title: 'Politica de Securitate' }
        ]);

        this.router = router;

        // logger.debug('router', this.router);
    }

    /**
     * [attached description]
     * @method attached
     * @return {[type]} [description]
     */
    attached() {
        // console.log(this);
        this.menuToggleInit();
        this.fbAttach();
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
        appId: '188346134855747', // test
        // appId: '187326271624400', // live
        status: true, // check login status
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.2'
    };


    /**
     * Attaching Facebook Js API to our application
     * @method fbAttach
     */
    fbAttach() {
        const self = this;
        window.fbAsyncInit = () => { self.fbInit(); };
        $(document.head).append('<script id="facebook-sdk" src="//connect.facebook.net/en_US/sdk.js" />');
    }

    /**
     * Initialize Facebook API
     * @method fbInit
     */
    fbInit() {
        // https://developers.facebook.com/docs/javascript/reference/FB.api
        // https://developers.facebook.com/docs/graph-api/reference/
        FB.init(this.fbConfig);
        logger.debug('Facebook API Initialized', FB);
    }
}
