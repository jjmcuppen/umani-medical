<template>
  <section
    v-if="_items.length"
    class="breadcrumbs s-breadcrumbs"
  >
    <v-container
      :class="_containerClass"
    >
      <v-row
        no-gutters
      >
        <v-col>
          <ul>
            <li>
              <nuxt-link
                :to="_homePage"
                title="Home"
              >
                Home
              </nuxt-link>
            </li>
            <li
              v-for="(item, index) in _items"
              :key="item.uuid"
            >
              <span v-if="item.is_folder || index === _items.length - 1">
                {{ item.name }}
              </span>
              <nuxt-link
                v-else
                :to="item.slug"
              >
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  export default {
    name: 'SBreadcrumbs',

    props: {
      story: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        mounted: false
      }
    },

    computed: {
      _containerClass() {
        return this.mounted && this.$vuetify.breakpoint.smAndUp ? 'py-4 px-6' : 'py-4 px-2';
      },

      _startsWith() {
        let { lang, root, prefix } = this.$store.state.config;

        return (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');
      },

      _homePage() {
        return this.$getSlug(this._startsWith);
      },

      _items() {
        let slug = this._startsWith === '' ? '' : `${this._startsWith}/`;

        const slices = this.story.full_slug
          .replace('home', '')
          .replace(slug, '')
          .split('/')
          .filter(Boolean);

        const links = Object.values(this.$store.state.links || {});

        const items = [];

        for (const slice of slices) {
          slug += `${slice}/`;

          const withoutTrailingSlash =  slug.replace(/\/$/, '');

          const link = links.find(link => link.slug === slug) || links.find(link => link.slug === withoutTrailingSlash);
          if (!link) {
            break;
          }

          items.push({
            ...link,
            slug: this.$getSlug(link.slug)
          });
        }

        return items;
      }
    },

    mounted() {
      this.mounted = true;
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';

  .s-breadcrumbs {
    position: relative;

    background-color: var(--breadcrumbs-bg-color);

    @if var(--breadcrumbs-bg-color) != transparent {
      .container {
        background-color: var(--breadcrumbs-bg-color) !important;
      }
    }

    ul {
      margin: 0;
      padding: 0;

      display: flex;
      flex-wrap: wrap;

      position: relative;

      list-style: none;

      > li {
        display: none;

        margin: 0;
        padding-left: 30px;

        position: relative;

        color: var(--breadcrumbs-font-color);

        &:before {
          @include material('keyboard_arrow_left');

          display: block;

          position: absolute;
          top: 50%;
          left: 0;

          color: inherit;
          font-size: 24px;

          vertical-align: middle;

          transform: translateY(-50%);
        }

        &:nth-last-child(2) {
          display: inline-block;
        }

        > span {
          height: 100%;

          display: flex;
          align-items: center;

          color: var(--breadcrumbs-font-color-inactive);
          font-family: var(--breadcrumbs-font-family);
          font-weight: var(--breadcrumbs-font-weight);
          font-size: var(--breadcrumbs-font-size);
          line-height: var(--breadcrumbs-line-height);

          vertical-align: middle;
        }

        > a {
          height: 100%;

          display: flex;
          align-items: center;

          margin: 0;
          padding: 0;

          position: relative;

          color: var(--breadcrumbs-font-color);
          font-family: var(--breadcrumbs-font-family);
          font-weight: var(--breadcrumbs-font-weight);
          font-size: var(--breadcrumbs-font-size);
          line-height: var(--breadcrumbs-line-height);

          text-decoration: none;

          vertical-align: middle;

          &:before {
            content: '';

            height: 2px;
            width: 0;

            position: absolute;
            left: 0;
            bottom: 0;

            background-color: var(--breadcrumbs-border-color);

            transition: width 0.1s, left 0.1s;
          }

          &:hover {
            &:before {
              width: 100%;

              left: 0;
            }
          }
        }
      }
    }
  }

  @include breakpoint(md-and-up) {
    .s-breadcrumbs {
      ul > li {
        display: inline-block;

        padding-left: 40px;

        &:before {
          @include material('notes');

          top: 50%;
          left: 12px;

          font-size: 16px;

          transform: translateY(-50%);

        }

        &:first-child {
          padding-left: 0;

          &:before {
            content: none;
          }
        }

        > a {
          padding: 0;
        }
      }
    }
  }
</style>
