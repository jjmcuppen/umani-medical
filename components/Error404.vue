<template>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
    :story="story"
  />
</template>

<script>
  export default {
    name: 'Error404',

    async fetch() {
      await this.loadStory();
    },

    data() {
      return {
        story: { content: {} }
      }
    },

    methods: {
      async loadStory() {
        let { lang, root, prefix } = this.$store.state.config;

        let rootPath = (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');

        let { story } = await this.$storyapi.get(`cdn/stories/${rootPath}/404-error`, {
          cv: this.$store.state.cacheVersion,
          version: 'published'
        }).then(res => ({
          story: res.data.story || {}
        }));

        this.story = story;
      }
    },

    head() {
      const { name, content } = this.story;
      const siteName = this.$store.state.settings.siteName;
      const baseUrl = process.env.BASE_URL || '';

      return {
        title: content.metaTitle || `${name === 'Home' ? '' : `${name} - `}${siteName}`,
        meta: [
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
          ...content.ogImage ? [
            {
              hid: 'ogImage',
              property: 'og:image',
              content: this.$resize(content.ogImage, '1500x0')
            }
          ] : [
            {
              hid: 'ogImageLandscape',
              property: 'og:image',
              content: `${baseUrl}/opengraph-1200x628jpg`
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
              content: `${baseUrl}/opengraph-1080x1920jpg`
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
          ]
        ].filter(meta => !!meta.content)
      };
    }
  };
</script>
