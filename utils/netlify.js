import domainRedirects from '../assets/config/domain/redirects';

import pageRedirects from '../assets/config/page/redirects';

export const netlifyToml = () => {
  const redirects = [
    ...(domainRedirects[process.env.ROOT] || []),
    ...(pageRedirects[process.env.ROOT] || [])
  ];
  
  return {
    build: {
      functions: 'functions'
    },
    dev: {
      command: 'yarn nuxt'
    },
    redirects
  }
};