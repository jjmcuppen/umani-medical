/**
 * Is email
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isEmail = value => /^[^@]+@[^.]+\..{2,}$/.test(value);

/**
 * Is url
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isUrl = value => /^[a-z]+:(\/{1,2})?.+$/.test(value);

/**
 * Is numeric
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export const isNumeric = value => /^\d+$/.test(value);

/**
 * Is image
 *
 * @param value
 *
 * @returns {boolean}
 */
export const isImage = value => /\.(jpg|jpeg|gif|png|bmp|tif|tiff)$/.test(value);

/**
 * Is aspect ratio
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isAspectRatio = value => /^\d{1,4}:\d{1,4}$/.test(value);

/**
 * Is zip code
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isZipCode = value => /^\d{4}\s?[a-zA-Z]{2}$/.test(value);

/**
 * Is date
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isDate = value => /^\d{2}-\d{2}-\d{4}$/.test(value);

/**
 * Is password
 *
 * @param {string} value
 *
 * @returns {boolean}
 */
export const isPassword = value => /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*){8,}$/.test(value);