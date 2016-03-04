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

    heading = 'Implica-te';

    /**
     * [configureRouter description]
     * @method configureRouter
     * @param  {[type]}        config [description]
     * @param  {Router}        router [description]
     */
    configureRouter(config, router) {
        config.map([
            { route: ['', 'index'],  name: 'support-index',        moduleId: 'support/index',        nav: true,  title: 'Implica-te' },
            // TODO: Donate route doesn't work
            { route: 'planteaza',    name: 'plant',                moduleId: 'donate',               nav: true,  title: 'Planteaza' },
            { route: 'promoveaza',   name: 'support-promote',      moduleId: 'support/promote',     nav: true,  title: 'Sustine-ne' },
            { route: 'participa',    name: 'support-participate',  moduleId: 'support/participate',  nav: true,  title: 'Participa' }
            //   { route: 'users',         name: 'users',         moduleId: 'users',         nav: true, title: 'Github Users' },
            //   { route: 'child-router',  name: 'child-router',  moduleId: 'child-router',  nav: true, title: 'Child Router' }
        ]);

        this.router = router;
    }
}
