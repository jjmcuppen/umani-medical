import {
  getRoutes
} from './routes';

import {
  getConfigsByRoot
} from '../assets/js/config';

/**
 * Included content types
 * @type {string[]}
 */
const contentTypes = [
  'page-content',
  'page-sitemap'
];

/**
 * Included paths
 * @type {*[]}
 */
const includes = [];

/**
 * Excluded paths
 * @type {*[]}
 */
const excludes = [];

/**
 * Get routes to generate
 *
 * @returns {Promise<string[]|[]>}
 */
export const generate = async () => {
  const configs = getConfigsByRoot(process.env.ROOT);

  const count = Object.keys(configs).length;
  if (count === 0) {
    return ['/'];
  }

  let routes = [];

  for (let [key, config] of Object.entries(configs)) {
    const prefix = config.prefix ?
      `/${config.lang}` :
      '';

    const includeUrls = includes
      .map(url => `${prefix}${url}`);

    const excludeUrls = excludes
      .map(url => `${prefix}${url}`);

    const items = (await getRoutes(config, contentTypes))
      .filter(route =>
        ![...excludeUrls].some(value => route.url.includes(value))
      )
      .map(({ url }) => url);

    routes = [
      ...includeUrls,
      ...routes,
      ...items
    ];
  }

  return routes;
};
