<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :story="story"
    :blok="story.content"
  />
</template>

<script>
  import {
    getConfigByPath
  } from '@/assets/js/config';

  const loadData = ({ api, cacheVersion, errorCallback, version, path, language }) => {
    const params = {
      version,
      cv: cacheVersion
    };
    
    // Add language parameter if provided
    if (language) {
      params.language = language;
    }
    
    return api.get(`cdn/stories${path}`, params).then(res => res.data).catch(res => {
      if (!res.response) {
        /* eslint-disable-next-line */
        console.error(res.toString());

        errorCallback({
          statusCode: 404,
          message: 'Failed to receive content form api'
        });
      } else {
        /* eslint-disable-next-line */
        console.error(res.response.data);

        errorCallback({
          statusCode: res.response.status,
          message: res.response.data
        });
      }
    });
  };

  export default {

    beforeRouteUpdate(to, from, next) {
      if (to.hash) {
        const element = document.querySelector(`[data-anchor="${to.hash.replace('#', '')}"]`);
        if (element) {
          this.$scrollTo(element, {
            duration: 1000,
            easing: 'ease',
            offset: -80
          });
        }
      }

      this.$store.commit('route/setTo', to.fullPath);
      this.$store.commit('route/setFrom', from.fullPath);
      next();
    },
    async asyncData({ $config, app, route, store, error }) {
      // Check if we are in the editing mode
      const editMode = app.$preview || false;

      // Ensure config is loaded - get it from the route path
      const configPath = editMode ? route.path : `${$config.ROOT === '/' ? '' : $config.ROOT}${route.path}`;
      const config = getConfigByPath(configPath) || {
        root: '/en',
        lang: 'en',
        prefix: false
      };

      // Construct Storyblok path based on config (matching utils/routes.js logic)
      let path = '';
      if (!editMode) {
        const { root, lang, prefix } = config;
        
        // Build rootPath like utils/routes.js does
        let rootPath = (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');
        
        if (route.path === '/') {
          // For homepage, use the rootPath (e.g., 'en' for English)
          path = rootPath || 'en';
        } else {
          // For other paths, check if route path already starts with the locale
          const routePath = route.path.replace(/^\//, '');
          
          // If route path already starts with rootPath (e.g., /nl when rootPath is 'nl'), use it directly
          if (rootPath && routePath.startsWith(rootPath + '/')) {
            // Route path already includes the locale prefix, use it as-is
            path = routePath;
          } else if (rootPath && routePath === rootPath) {
            // Route path is exactly the locale (e.g., /nl), use rootPath
            path = rootPath;
          } else if (rootPath) {
            // Route path doesn't include locale, prepend rootPath
            path = `${rootPath}/${routePath}`;
          } else {
            // No rootPath, use route path as-is
            path = routePath;
          }
        }
      } else {
        // In edit mode, use route path as-is
        path = route.path === '/' ? 'home' : route.path.replace(/^\//, '');
      }
      
      // Ensure path ends with / for Storyblok API (folders need trailing slash)
      if (!path.endsWith('/')) {
        path += '/';
      }
      
      // Add leading slash for API call format: cdn/stories/{path}
      // The API call uses cdn/stories${path}, so path should start with /
      if (!path.startsWith('/')) {
        path = '/' + path;
      }

      // Get the language code from config (e.g., 'en', 'nl', 'de')
      const language = config.lang || store.state.config?.lang || "nl";

      // Debug logging
      console.log('Storyblok API call:', {
        path,
        language,
        configRoot: config.root,
        routePath: route.path,
        MULTISITE: $config.MULTISITE
      });

      const data = await loadData({
        path,
        api: app.$storyapi,
        cacheVersion: store.state.cacheVersion,
        version: app.$preview ? 'draft' : store.state.version,
        errorCallback: error,
        language
      });

      if (data && data.story) {
        const { story } = data;

        const { language, lang, alternates } = store.state.config;

        console.log(language, lang, alternates);

        const current = {
          language: language,
          lang: lang,
          slug: story.full_slug
        };

        const alts = [];

        for (let alternate of alternates) {
          const item = story.alternates.find(item => item.full_slug.startsWith(alternate));

          const slug = item && item.full_slug ?
            item.full_slug :
            alternate;

          const config = getConfigByPath(`/${slug}`);
          if (!config) {
            continue;
          }

          alts.push({
            language: config.language,
            lang: config.lang,
            slug: slug,
            root: config.root
          });
        }

        store.commit('locale/setCurrent', current);
        store.commit('locale/setAlternates', alts);
      }

      return {
        editMode,
        ...data
      };
    },

    pageTransition: {
      name: 'page',
      mode: 'out-in',
      beforeEnter (el) {
        console.log(el);
        console.log('Before enter...');
      }
    },

    data: () => ({
      story: { content: {} }
    }),

    head() {
      const baseUrl = this.$config.BASE_URL || '';

      const { name, content, alternates, full_slug } = this.story;

      const { iso, hreflang, site } = this.$store.state.config;
      const { siteName } = this.$store.state.settings;

      let link = [];

      if (this.$config.MULTISITE) {
        link = [
          {
            rel: 'canonical',
            href: this.$isLink(content.metaCanonical) && this.$getLink(content.metaCanonical, true) || this.$getSlug(full_slug, true)
          },
          {
            rel: 'alternate',
            hreflang: hreflang,
            href: this.$getSlug(full_slug, true)
          }
        ];

        for (let key of Object.keys(alternates)) {
          let item = alternates[key];

          const config = getConfigByPath(`/${item.full_slug}`);
          if (!config) {
            continue;
          }

          link.push({
            rel: 'alternate',
            hreflang: config.hreflang,
            href: this.$getSlug(item.full_slug, true)
          });
        }
      }

      if (this.$store.state.settings.favicon && this.$store.state.settings.favicon.filename) {
        link.push({
          href: this.$store.state.settings.favicon.filename,
          type: 'image/x-icon',
          rel: 'icon'
        });
      }

      return {
        title: content.metaTitle || `${name === 'Home' ? '' : `${name} - `}${siteName}`,
        link,
        meta: [
          {
            hid: 'google-site-verification',
            name: 'google-site-verification',
            content: 'PeJHeGxsSDW6eUxt8FRDYyNL1oKUUKibF4JSrgXhv2U'
          },
          {
            hid: 'language',
            name: 'language',
            content: iso
          },
          {
            hid: 'description',
            name: 'description',
            content: content.metaDescription || ''
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: content.metaKeywords || ''
          },
          {
            hid: 'robots',
            name: 'robots',
            content: this.$store.state.version === 'draft' ?
              'noindex,nofollow' :
              (content.metaRobots || []).join(',')
          },
          {
            hid: 'ogSiteName',
            property: 'og:site_name',
            content: siteName
          },
          {
            hid: 'ogUrl',
            property: 'og:url',
            content: `${baseUrl}${this.$route.fullPath}`
          },
          {
            hid: 'ogTitle',
            property: 'og:title',
            content: content.ogTitle || name
          },
          {
            hid: 'ogDescription',
            property: 'og:description',
            content: content.ogDescription || ''
          },
          ...(content.ogImage && content.ogImage.filename ? [
            {
              hid: 'ogImage',
              property: 'og:image',
              content: this.$resize(content.ogImage, '1500x0')
            }
          ] : [
            {
              hid: 'ogImageLandscape',
              property: 'og:image',
              content: `${baseUrl}/${site}/opengraph-1200x628.jpg`
            },
            {
              hid: 'ogImageWidthLandscape',
              property: 'og:image:width',
              content: 1200
            },
            {
              hid: 'ogImageHeightLandscape',
              property: 'og:image:height',
              content: 628
            },
            {
              hid: 'ogImagePortrait',
              property: 'og:image',
              content: `${baseUrl}/${site}/opengraph-1080x1920.jpg`
            },
            {
              hid: 'ogImageWidthPortrait',
              property: 'og:image:width',
              content: 1080
            },
            {
              hid: 'ogImageHeightPortrait',
              property: 'og:image:height',
              content: 1920
            }
          ])
        ].filter(meta => !!meta.content)
      };
    },

    mounted() {
      if (!this.$cookies.get('lang-switched')) {
        const navigatorLang = (navigator.language || 'nl').substr(0, 2);
        if (navigatorLang && navigatorLang !== this.$store.state.locale.current.lang) {
          const alt = this.$store.state.locale.alternates?.find(alt => alt.lang === navigatorLang);
          if (alt) {
            window.location = this.$getSlug(alt.slug, true);
          }
        }
      }

      this.$storybridge.on([
        'input',
        'published',
        'change'
      ], event => {
        if (event.action === 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content;
          }
        } else {
          if (!event.slugChanged) {
            window.location.reload();
          }
        }
      });

      if (this.$route.hash && this.$route.hash.startsWith('#')) {
        const element = document.querySelector(`[data-anchor="${this.$route.hash.replace('#', '')}"]`);
        if (element) {
          this.$scrollTo(element, {
            offset: -80
          });
        }
      }
    }
  }
</script>
