import {
  getConfigsByRoot
} from '../assets/js/config';

export const robots = () => {
  const configs = getConfigsByRoot(process.env.ROOT);

  const count = Object.keys(configs).length;
  if (count === 0) {
    return false;
  }

  return count > 1 ? {
    UserAgent: '*',
    Disallow: '',
    Sitemap: `${process.env.BASE_URL}/sitemapindex.xml`
  } : {
    UserAgent: '*',
    Disallow: '',
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`
  };
}
