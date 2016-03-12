/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {ViewModelAbstract} from 'lib/view/model/abstract';

/**
 *
 */
export class Component extends ViewModelAbstract {

    heading = 'Termeni si Conditii';

    /**
     * [configureRouter description]
     * @method configureRouter
     * @param  {[type]}        config [description]
     * @param  {Router}        router [description]
     */
    configureRouter(config, router) {
        config.map([
            { route: ['', 'index'],           name: 'terms-index',   moduleId: 'terms/index',   nav: true,  title: 'Termeni si Conditii' },
            { route: 'protectia-datelor',     name: 'terms-data',    moduleId: 'terms/data',    nav: true,  title: 'Protectia Datelor' },
            { route: 'politica-cookieurilor', name: 'terms-cookie',  moduleId: 'terms/cookie',  nav: true,  title: 'Politica Cookie-uri' }
        ]);

        this.router = router;
    }
}
