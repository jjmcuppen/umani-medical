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
  'page-content'
];

/**
 * Excluded paths
 * @type {*[]}
 */
const excludes = [
  '/404-error'
];

/**
 * Get sitempas
 *
 * @returns {Promise<boolean|[]|{path: string, hostname: *, sitemaps: [], cacheTime: number}>}
 */
export const sitemap = async () => {
  const configs = getConfigsByRoot(process.env.ROOT);

  const count = Object.keys(configs).length;
  if (count === 0) {
    return false;
  }

  let sitemaps = [];

  for (let [key, config] of Object.entries(configs)) {
    const prefix = config.prefix ?
      `/${config.lang}` :
      '';

    const path = count <= 1 ?
      `/sitemap.xml` :
      `/sitemap-${config.lang}.xml`;

    const excludeUrls = excludes
      .map(url => `${prefix}${url}`);

    const routes = (await getRoutes(config, contentTypes, true))
      .filter(route =>
        ![...excludeUrls].some(value => route.url.includes(value))
      )
      .map(({ url }) => url);

    sitemaps.push({
      hostname: `https://${config.host}`,
      path: path,
      cacheTime: -1,
      trailingSlash: true,
      routes: routes
    });
  }

  return sitemaps.length <= 1 ?
    sitemaps :
    {
      hostname: process.env.BASE_URL,
      path: '/sitemapindex.xml',
      cacheTime: -1,
      sitemaps
    };
};
