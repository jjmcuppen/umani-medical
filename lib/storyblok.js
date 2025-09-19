import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.storyblok.com/v1/',
  params: {
    token: process.env.STORYBLOK_ACCESS_TOKEN
  }
});

export const mapi = axios.create({
  baseURL: `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}/`,
  headers: {
    Authorization: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN
  }
});

export const gapi = axios.create({
  baseURL: 'https://gapi.storyblok.com/v1/api',
  headers: {
    Token: process.env.STORYBLOK_ACCESS_TOKEN
  }
});

/**
 * GraphQL
 *
 * @param {string} query
 * @param {string} [version = 'published']
 *
 * @returns {Promise<Object>}
 */
export const graphql = async (query, version = 'published') => {
  const { data, errors } = await gapi.post('', {
    query
  }, {
    headers: {
      Version: version
    }
  }).then(({ data }) => data);
  
  if (errors) {
    throw errors;
  }
  
  return data;
};

const cache = new Map();

/**
 * Get cache version
 *
 * @returns {Promise<string>}
 */
export const getCacheVersion = async () => {
  if (!cache.has('cacheVersion')) {
    const { space } = await api.get('cdn/spaces/me').then(({ data }) => data);
    
    const cacheVersion = !!space && space.version;
    
    if (!cacheVersion) {
      throw 'Unable to retrieve cache version';
    }
    
    cache.set('cacheVersion', cacheVersion);
  }
  
  return cache.get('cacheVersion');
};

/**
 * Get version
 *
 * @returns {string}
 */
export const getVersion = () => {
  if (!cache.has('version')) {
    const version = process.env.STORYBLOK_VERSION || (process.env.NODE_ENV === 'development' ? 'draft' : 'published');
    
    cache.set('version', version);
  }
  
  return cache.get('version');
};

/**
 * Get links
 *
 * @returns {Promise<Object>}
 */
export const getLinks = async () => {
  if (!cache.has('links')) {
    const data = await api.get('cdn/links').then(({ data }) => data);
    
    cache.set('links', data.links || {});
  }
  
  return cache.get('links');
};
