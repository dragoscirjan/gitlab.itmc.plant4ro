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
export class SliceValueConverter {

    /**
     * @method toView
     * @param  {Array} array
     * @param  {Number} from
     * @param  {Number} count
     * @return {Array}
     *
     * @link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
     * @see Array#slice(from, count)
     */
    toView(array: Array, from: Number, count: Number) : Array {
        return array.slice(from, count);
    }

}
