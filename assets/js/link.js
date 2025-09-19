import {
  getConfigByPath
} from '~/assets/js/config';

import {
  isEmail,
  isUrl,
  isImage
} from '~/assets/js/validate';

/**
 * Is valid
 *
 * @param {?{}} link
 * @param {string} type
 * @param {string} [property = 'url']
 *
 * @returns {boolean}
 */
export function isValid(link, type, property = 'url') {
  return typeof link !== 'undefined' && link.linktype === type && !!link[property];
}

/**
 * Is link
 *
 * @param {?{}} link
 * @param {string} link.linktype
 * @param {string} link.id
 * @param {string} link.url
 * @param {string} link.email
 *
 * @returns {boolean}
 */
export function isLink(link) {
  if (typeof link === 'undefined') {
    return false;
  }

  switch (link.linktype) {
    case 'story': {
      return !!this.$store.state.links[link.id];
    }

    case 'email': return !!link.email;

    default: return !!link.url;
  }
}

/**
 * Get story
 *
 * @param {?{}} link
 * @param {boolean} root
 * @param {boolean} host
 *
 * @returns {?string}
 */
export function getStory(link, root = false, host = false) {
  if (typeof link === 'undefined' || link.linktype !== 'story') {
    return null;
  }

  const links = this.$store.state.links;

  if (!links[link.id]) {
    return null;
  }

  const slug = `${links[link.id].slug}${link.anchor ? `#${link.anchor}` : ''}`;

  if (root) {
    return slug;
  }

  return this.$getSlug(slug, host);
}

/**
 * Get url
 *
 * @param {?{}} link
 * @param {string} link.url
 *
 * @returns {?string}
 */
export function getUrl(link) {
  if (!isValid(link, 'url') || !isUrl(link.url)) {
    return null;
  }

  return link.url;
}

/**
 * Get email
 *
 * @param {?{}} link
 * @param {string} link.email
 *
 * @returns {?string}
 */
export function getEmail(link) {
  if (!isValid(link, 'email', 'email') || !isEmail(link.email)) {
    return null;
  }

  return `mailto:${link.email}`;
}

/**
 * Get asset
 *
 * @param {?{}} link
 * @param {string} link.url
 *
 * @returns {?string}
 */
export function getAsset(link) {
  if (!isValid(link, 'asset')) {
    return null;
  }

  if (this.$config.ASSET_URL && isImage(link.url)) {
    return link.url.replace('https://a.storyblok.com', this.$config.ASSET_URL);
  }

  return link.url;
}

/**
 * Get link
 *
 * @param {?{}} link
 * @param {boolean} root
 * @param {boolean} host
 *
 * @returns {?string}
 */
export function getLink(link, root = false, host = false) {
  return this.$getStory(link, root, host) || this.$getUrl(link) || this.$getEmail(link) || this.$getAsset(link);
}

/**
 * Get translated slug
 *
 * @param slug
 * @param host
 * @returns {string}
 */
export function getSlug(slug, host = false) {
  slug = `/${slug.replace(/^\/|\/$|^home$/gi, '')}`;

  if (!this.$store.state.editMode) {
    const config = getConfigByPath(slug);

    if (!config) {
      console.warn(`Unable to translate slug ${slug}`);
      return slug;
    }

    const root = this.$store.state.config.root;

    if (slug === root || slug === '/') {
      return '/';
    }

    if (host || root !== config.root) {
      return `https://${config.host}${slug.replace(new RegExp(`^${config.root}`), '')}/`;
    }

    return `${slug.replace(new RegExp(`^${root}`), '')}/`;
  }

  return `${slug}/`;
}
