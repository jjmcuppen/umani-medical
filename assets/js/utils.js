/**
 * Dashify
 *
 * @param {?string} value
 *
 * @returns {string}
 */
export const dashify = value => String(value)
  .replace(/([A-Z])/g, ' $1')
  .trim()
  .toLowerCase()
  .replace(/[ _]/g, '-');

/**
 * Get padding top
 *
 * @param {string} aspectRatio
 * @param {?string|?number} [defaultValue]
 *
 * @returns {?string}
 */
export const getPaddingTop = (aspectRatio, defaultValue) => {
  const [ width, height ] = (aspectRatio || '').split(':').map(Number);
  
  return width && height ? `${(height / width) * 100}%` : defaultValue;
};

/**
 * Get aspect ratio
 *
 * @param {string} aspectRatio
 * @param {?number} [defaultValue]
 *
 * @returns {?number}
 */
export const getAspectRatio = (aspectRatio, defaultValue) => {
  const [ width, height ] = (aspectRatio || '').split(':').map(Number);
  
  return width && height ? width / height : defaultValue;
};
