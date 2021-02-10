/**
 * Transforms a Google Apps Script iterator into an ECMAScript 6 iterator.
 * This allows the user to iterate using `for ... of`. Example:
 * ```
 * for (let file of it(folder.getFiles())) {
 *  // use file
 * }
 * ```
 *
 * @param gasIt The Google Apps Script iterator
 * @returns A native ES6 iterable
 */
function iter(gasIt) {
    return {
        *[Symbol.iterator]() {
            while (gasIt.hasNext()) {
                yield gasIt.next()
            }
        }
    }
}
