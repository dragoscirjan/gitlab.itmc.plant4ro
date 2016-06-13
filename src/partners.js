/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from 'lib/view/model/abstract';

import {ShuffleValueConverter} from 'lib/value-converters/array/shuffle.js';

/**
 * Component for homePage
 *
 */
@inject(AppConfig, HttpClient)
export class Component extends ViewModelAbstract {
    /**
     * Page Heading
     * @type {String}
     */
    heading = 'Partenerii nostri';

    /**
     * Donating Companies
     * @type {Array}
     */
    companies = [];

    /**
     * Individual Donators
     * @type {Array}
     */
    donators = [];

    /**
     * List of Forestry Units
     * @type {Array}
     */
    forestryUnits = [];

    /**
     * List of partner institutions
     * @type {Array}
     */
    institutions = [
        { name: 'Primaria Rasnov', url: 'http://www.primariarasnov.ro/portal/', logo: '/dist/assets/img/partners/primaria-rasnov-logo-200x140.png' },
        { name: 'Agentia pentru Protectia Mediului Brasov', url: 'http://apmbv.anpm.ro/', logo: '/dist/assets/img/partners/apm-brasov-logo-200x140.png' },
        { name: 'Inspectoratul Scolar Judetean Brasov', url: 'http://www.isjbrasov.ro/', logo: '/dist/assets/img/partners/isj-brasov-logo-200x140.png' },
        // { name: 'Primaria Municipiului Codlea', url: 'http://www.primaria-codlea.ro/', logo: '/dist/assets/img/partners/primaria-codlea-logo-200x140.png' },
        { name: 'Garda Forestiera Brasov', url: 'http://www.gfbrasov.ro/', logo: '/dist/assets/img/partners/GF-BV.png' },
        { name: 'Regia Nationala a Padurilor', url: 'http://www.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva.png' },
        { name: 'Directia Silvica Brasov', url: 'http://brasov.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva-brasov.png' },
        { name: 'Directia Silvica Mures', url: 'http://mures.rosilva.ro/', logo: '/dist/assets/img/partners/romsilva-mures.png' }//,
        // { name: 'T.E.N.T.', url: 'http://', logo: '' }
    ]

    /**
     * constructor
     * @see ViewModelAbstract#constructor
     * @method constructor
     * @param  {HttpClient}    http [description]
     * @return {this}
     */
    constructor(appConfig, http) {
        super(appConfig);
        this.http = appConfig.configHttp(http);
    }

    /**
     * @see ViewModelAbstract#activate
     */
    activate(params, routeConfig) {
        let self = this;
        var shufle = new ShuffleValueConverter();
        super.activate(params, routeConfig);
        return Promise.all([
            this.http.fetch('partners/forestry-units')
                .then(response => response.json())
                .then((data) => { self.forestryUnits = shufle.toView(data.list); }),
            this.http.fetch('partners/donators')
                .then(response => response.json())
                .then((data) => { self.donators = shufle.toView(data.list); }),
            this.http.fetch('partners/companies')
                .then(response => response.json())
                .then((data) => { self.companies = shufle.toView(data.list); })
        ]);
    }

    attached() {
        $('#forestryUnits').click();
    }

}
