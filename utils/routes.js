import {
  api,
  getCacheVersion,
  getVersion
} from '../lib/storyblok';

/**
 * Get routes
 *
 * @param config
 * @param contentTypes
 * @param noindex
 * @returns {Promise<Array>}
 */
export const getRoutes = async (config, contentTypes, noindex = false ) => {

  let { lang, root, prefix } = config;

  let rootPath = (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');

  let done = false;
  let total = 0;
  let page = 1;
  let items = [];

  const cacheVersion = await getCacheVersion();
  const version = getVersion();

  try {
    do {
      const { headers, data: { stories } } = await api.get('cdn/stories', {
        'params': {
          'starts_with': rootPath,
          'page': page++,
          'per_page': 100,
          'cv': cacheVersion,
          'version': version,
          'filter_query[component][in]': contentTypes.join(',')
        }
      });

      items = [
        ...items,
        ...stories
      ];

      total += stories.length;
      done = !headers.total || total >= headers.total;
    }
    while (!done);

    if (noindex) {
      items = items
        .filter(({ content: { metaRobots = [] } }) => !metaRobots.includes('noindex'))
    }

    items = items
      // .filter(({ content: { metaRobots = [] } }) => noindex && !metaRobots.includes('noindex'))
      .map(({ full_slug }) => {

        const url = `/${full_slug
          .replace(new RegExp(`^${root.replace(/^\//g, '')}`), '')
          .replace(/^\/|\/$|^home$/gi, '')}`;

        const slug = `/${full_slug
          .replace(/^\/|\/$|^home$/gi, '')}`;

        return {
          url: url,
          priority: Math.max(0.5, 1 - ((slug.split('/').filter(Boolean).length - rootPath.split('/').filter(Boolean).length) * .1))
        };
      });

  } catch (error) {
    // eslint-disable-next-line
    console.error(!!error && error.toString());
  }

  return items
    .sort((a, b) => a.url.localeCompare(b.url));
};
