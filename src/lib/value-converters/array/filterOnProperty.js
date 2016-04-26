/**
 * Planteaza pentru Romania (http://planteazapentruromania.ro/)
 *
 * @copyright Copyright (c) 2016-present Prietenii Padurilor din Romania (http://prieteniipadurilor.ro)
 * @copyright Copyright (c) 2016-present IT Media Connect (http://itmediaconnect.ro)
 * @license   http://planteazapentruromania.ro/#/application-license Commercial
 */

/**
 *
 */
export class FilterOnPropertyValueConverter {

    toView(array: Array, key: String, value: String) : Array {
        console.log(key, value);
        return array.filter((item) => item[key] === value);
    }

}
