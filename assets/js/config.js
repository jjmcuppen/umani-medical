import locales  from '../config/domain/locales.json';

/**
 * get config item by path
 * @param path
 * @returns {{}}
 */
export const getConfigByPath = (path) => {
  const key = Object.keys(locales).find(root => path.startsWith(root));
  
  return locales[key];
};

/**
 * get config item by path
 * @param root
 * @returns {{}}
 */
export const getConfigsByRoot = (root) => {
  let configs = {};

  for (const [key, value] of Object.entries(locales)) {
    if (!key.startsWith(root)) {
      continue;
    }

    Object.assign(configs, { [key]: value });
  }

  return configs;
};