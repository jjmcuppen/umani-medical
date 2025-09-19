import { createHash } from 'crypto';

export const emptyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

// https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3
export const defaultSrcset = [ 640, 768, 1024, 1366, 1600, 1920 ];

/**
 * Resize
 *
 * @param {string} src
 * @param {string} option
 *
 * @returns {?string}
 */
export const resize = (src, option) => {
  if (typeof src === 'undefined') {
    return null;
  }
  
  if (/\.svg$/.test(src)) {
    return src;
  }
  
  return `//img2.storyblok.com/${option}${src.replace('https://a.storyblok.com', '').replace('//a.storyblok.com', '')}`;
};

/**
 * Get src
 *
 * @param {string} src
 * @param {number} width
 * @param {{}} [options = {}]
 * @param {?string} [options.aspectRatio]
 * @param {?string} [options.format]
 * @param {?number} [options.quality = 100]
 * @param {?boolean} [options.smartCrop = true]
 *
 * @returns {string}
 */
export const getSrc = (src, width, {
  aspectRatio,
  format,
  focus,
  quality = 90,
  smartCrop = true
} = {}) => {
  const height = Math.round(width / aspectRatio);
  
  const filters = [
    ...format ? [ `format(${format})` ] : [],
    ...focus ? [ `focal(${focus})` ] : [],
    ...quality ? [ `quality(${quality})` ] : []
  ];
  
  const options = [
    `${width}x${height}`,
    smartCrop ? 'smart' : '',
    ...filters.length ? [ `filters:${filters.join(':')}` ] : []
  ];
  
  return `${resize(src, options.join('/'))}`;
};

/**
 * Get srcset
 *
 * @param {string} src
 * @param {number[]} srcset
 * @param {{}} [options = {}]
 * @param {?string} [options.aspectRatio]
 * @param {?string} [options.format]
 * @param {?number} [options.quality = 100]
 * @param {?boolean} [options.smartCrop = true]
 *
 * @returns {string}
 */
export const getSrcset = (src, srcset, {
  aspectRatio,
  format,
  focus,
  quality = 90,
  smartCrop = true
} = {}) => {
  return srcset.map(width => {
    return `${getSrc(src, width, { aspectRatio, format, focus, quality, smartCrop })} ${width}w`;
  }).join(',');
};

/**
 * Get resolution
 *
 * @param {string} src
 *
 * @returns {number[]}
 */
export const getResolution = src => {
  return ((src || '')
    .split('/')
    .find(value => /^\d+x[1-9](\d+)?$/.test(value)) || '')
    .split('x')
    .map(Number);
};

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

const cache = new Map();

/**
 * Load image
 *
 * @param {string} src
 * @param {?string} [srcset]
 * @param {string} [sizes = 'auto']
 *
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (src, srcset, sizes = 'auto') => new Promise((resolve, reject) => {
  const cacheName = createHash('md5')
    .update(`${src}${srcset || ''}${sizes || ''}`)
    .digest('hex');
  
  if (cache.has(cacheName)) {
    return resolve(cache.get(cacheName));
  }
  
  const image = new Image();
  image.addEventListener('load', () => {
    cache.set(cacheName, image);
    
    resolve(image);
  });
  
  image.addEventListener('error', reject);
  
  if (srcset) {
    image.setAttribute('srcset', srcset);
    
    if (sizes) {
      image.setAttribute('sizes', sizes);
    }
  }
  
  image.setAttribute('src', src);
});
