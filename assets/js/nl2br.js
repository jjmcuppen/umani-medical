/**
 * Newline to <br> tag
 *
 * @param {?string} value
 *
 * @returns {string}
 */
export default value => String(value).replace(/\r\n|\r|\n/g, '<br>');
