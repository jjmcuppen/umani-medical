<template>
  <div class="s-sitemap">
    <ul>
      <s-sitemap-item
        v-for="item in _items"
        :key="item.uuid"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
  import SSitemapItem from '@/components/SSitemapItem';

  export default {
    name: 'SSitemap',

    components: {
      SSitemapItem
    },

    async fetch() {
      await this.loadStory();
      await this.loadStories();
    },

    data() {
      return {
        story: null,
        stories: []
      }
    },

    computed: {
      _items() {
        if (!this.story) {
          return null;
        }

        const links = Object.values(this.$store.state.links || {});

        let home = null;

        if (this.$config.MULTISITE) {
          home = {
            ...links.find(link => link.id === this.story.id),
            children: []
          };
        }

        const tree = this.generateTree(links, this.stories, this.story.parent_id);

        return !home ?
          tree :
          [
            home,
            ...tree
          ];
      },

      _startsWith() {
        let { lang, root, prefix } = this.$store.state.config;

        return (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');
      },

      _contentTypes() {
        return [
          'page-content'
        ];
      }
    },

    methods: {
      async loadStory() {
        const { cacheVersion, version } = this.$store.state;

        let { story } = await this.$storyapi.get(`cdn/stories/${this._startsWith || 'home'}/`, {
          'cv': cacheVersion,
          'version': version,
        }).then(({ data: { story } }) => ({ story }));

        this.story = story;
      },

      async loadStories() {
        let done = false;
        let total = 0;
        let page = 1;
        let items = [];

        const { cacheVersion, version } = this.$store.state;

        try {
          do {
            const { headers, data: { stories } } = await this.$storyapi.get('cdn/stories', {
              'starts_with': this._startsWith,
              'page': page++,
              'per_page': 100,
              'cv': cacheVersion,
              'version': version,
              'filter_query': {
                'component': {
                  'in': this._contentTypes.join(',')
                }
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

          items = items
            .filter(({ content: { metaRobots = [] } }) => !metaRobots.includes('noindex'))
            .map(({ uuid }) => uuid);

        } catch (error) {
          // eslint-disable-next-line
          console.error(!!error && error.toString());
        }

        this.stories = items;
      },

      generateTree(links, stories, parent) {
        let tree = [];

        links.forEach(link => {
          if (link.is_startpage || link.parent_id !== parent) {
            return;
          }

          const children = this.generateTree(links, stories, link.id);

          if (link.is_folder) {
            const start = links.find(l => l.is_startpage && l.parent_id === link.id);
            if (!start) {
              return;
            }

            link = start;
          }

          if (!stories.includes(link.uuid)) {
            return;
          }

          tree.push({
            ...link,
            children
          })
        });

        return tree;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-sitemap ::v-deep {
    ul {
      li {
        a {
          .version {
            padding-left: 20px;

            display: inline-block;

            position: relative;

            color: green;

            &.draft {
              color: red;
            }

            &:before {
              content: '-';

              position: absolute;
              top: 50%;
              left: 7px;

              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }
</style>
