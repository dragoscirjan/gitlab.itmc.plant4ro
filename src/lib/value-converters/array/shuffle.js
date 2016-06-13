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
export class ShuffleValueConverter {

    /**
     * @method toView
     * @param  {Array} array
     * @return {Array}
     *
     * @link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
     * @see Array#slice(from, count)
     */
    toView(array: Array) : Array {
        let currentIndex = array.length;
        let temporaryValue = null;
        let randomIndex = null;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}
