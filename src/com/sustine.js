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
export class Sustine extends ViewModelAbstract {

    heading = 'Sustine-ne';

    /**
     * [configureRouter description]
     * @method configureRouter
     * @param  {[type]}        config [description]
     * @param  {Router}        router [description]
     */
    configureRouter(config, router) {
        config.map([
            { route: ['', 'facebook'], name: 'facebook', moduleId: 'sustine-facebook', nav: true, title: 'Facebook' } //,
            //   { route: 'users',         name: 'users',         moduleId: 'users',         nav: true, title: 'Github Users' },
            //   { route: 'child-router',  name: 'child-router',  moduleId: 'child-router',  nav: true, title: 'Child Router' }
        ]);

        this.router = router;
    }
}
