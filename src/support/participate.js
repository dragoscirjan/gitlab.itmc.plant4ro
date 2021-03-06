/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

import {inject} from 'aurelia-framework';
import {AppConfig} from 'lib/app/config';
import {ViewModelAbstract} from '../lib/view/model/abstract';

@inject(AppConfig)
export class Component extends ViewModelAbstract {

    heading = 'Participa la plantat';

    /**
     * @see ViewModelAbstract#activate
     */
    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        // let self = this;
        // return this.initJsGoogleMaps().then((gmEvent) => { self.initJsJqueryStoreLocator(); });
        return this.initJsStoreLocator();
    }

    /**
     * [attached description]
     * @method attached
     */
    attached() {
        this.initStoreLocator();
        // this.initJsStoreLocator().then(() => { console.log(arguments); });
    }

    /**
     * [scriptsStoreLocator description]
     * @type {Array}
     */
    scriptsStoreLocator = [
        `https://maps.googleapis.com/maps/api/js?libraries=places,geometry`,
        // `3rdpt/jquery-shop-locator/src/shop-locator.js`,
        `dist/assets/scripts/shopLocator.js`,
        `3rdpt/jquery-shop-locator/src/dependences/infobubble.js`,
        `3rdpt/jquery-shop-locator/src/dependences/markerclusterer.js`
    ];

    /**
     * @method initJsStoreLocator
     * @return {Promise}
     */
    initJsStoreLocator() {
        let self = this;
        // console.log(this.scriptsStoreLocator[0]);
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = self.scriptsStoreLocator.shift();
            script.async = true;
            script.onload = (event) => {
                if (self.scriptsStoreLocator.length) {
                    self.initJsStoreLocator().then((events) => { resolve(events + [event]); });
                } else {
                    resolve([event]);
                }
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Generate Map
     * @method initStoreLocator
     * @return {[type]}         [description]
     */
    initStoreLocator() {
        // 3rdpt/jquery-shop-locator/
        $('#map').ShopLocator({
            // json: '3rdpt/jquery-shop-locator/src/json/markers.json',
            json: '/services/index.php/event-locations',
            pluginStyle: 'metro',
            paginationStyle: 1,
            infoBubble: {
                visible: true,
                backgroundColor: 'transparent',
                arrowSize: 0,
                arrowPosition: 50,
                minHeight: 127,
                maxHeight: 135,
                minWidth: 170,
                maxWidth: 250,
                hideCloseButton: false,
                closeSrc: '3rdpt/jquery-shop-locator/src/style/closeButton.svg'
            },
            map: {
                mapStyle: [{
                    'featureType': 'landscape',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'lightness': 65 },
                        { 'visibility': 'on' }
                    ]
                }, {
                    'featureType': 'poi',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'lightness': 51 },
                        { 'visibility': 'simplified' }
                    ]
                }, {
                    'featureType': 'road.highway',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'visibility': 'simplified' }
                    ]
                }, {
                    'featureType': 'road.arterial',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'lightness': 30 },
                        { 'visibility': 'on' }
                    ]
                }, {
                    'featureType': 'road.local',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'lightness': 40 },
                        { 'visibility': 'on' }
                    ]
                }, {
                    'featureType': 'transit',
                    'stylers': [
                        { 'saturation': -100 },
                        { 'visibility': 'simplified' }
                    ]
                }, {
                    'featureType': 'administrative.province',
                    'stylers': [
                        { 'visibility': 'off' }
                    ]
                }, {
                    'featureType': 'water',
                    'elementType': 'labels',
                    'stylers': [
                        { 'visibility': 'on' },
                        { 'lightness': -25 },
                        { 'saturation': -100 }
                    ]
                }, {
                    'featureType': 'water',
                    'elementType': 'geometry',
                    'stylers': [
                        { 'hue': '#ffff00' },
                        { 'lightness': -25 },
                        { 'saturation': -97 }
                    ]
                }]
            },
            markersIcon: 'dist/assets/img/icons/marker.png',
            cluster: {
                enable: true,
                gridSize: 60,
                style: {
                    textColor: '#f2f1ee',
                    textSize: 18,
                    heightSM: 54,
                    widthSM: 54,
                    heightMD: 64,
                    widthMD: 64,
                    heightBIG: 74,
                    widthBIG: 74,
                    iconSmall: 'dist/assets/img/icons/clusterSmall.png',
                    iconMedium: 'dist/assets/img/icons/clusterMedium.png',
                    iconBig: 'dist/assets/img/icons/clusterBig.png'
                }
            },
            sidebar: {
                visible: true,
                selectSection: {
                    // pathToJSONDirectory: '3rdpt/jquery-shop-locator/src/json/',
                    pathToJSONDirectory: this.appConfig.getPhpUrl('event-locations') + '/',
                    difFiles: [['Toate', 'all'], ['Jud. Fagaras', 'fagaras'], ['Jud. Prahova', 'prahova']],
                    fileTypes: '',
                    visible: true
                },
                searchBox: {
                    visible: true,
                    search: true
                },
                results: {
                    pageSize: 8,
                    paginationItems: 5
                }
            }
        });
    }

}
