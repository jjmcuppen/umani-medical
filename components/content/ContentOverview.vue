<template>
  <section-content
    ref="overview"
    :blok="blok"
  >
    <div
      class="content-overview"
    >
      <v-row
        v-if="blok.title"
        no-gutters
      >
        <v-col>
          <s-title
            :blok="blok"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <s-block>
            <s-block-item
              v-for="item in items"
              :key="item._uid"
              :story="story"
              :blok="blok"
              :item="item"
              :cols="_cols"
              :component="'item-block'"
            />
          </s-block>
        </v-col>
      </v-row>
      <v-row
        v-if="_link"
      >
        <v-col>
          <div
            class="button"
          >
            <s-button
              :to="_link"
              :theme="_linkStyle"
            >
              {{ blok.linkText || $t('link.readMore') }}
            </s-button>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="!_hidePagination"
      >
        <v-col>
          <s-pagination
            :length="_totalPages"
            :adjacent="_adjacent"
          />
        </v-col>
      </v-row>
    </div>
  </section-content>
</template>

<script>
  import {
    gql
  } from 'graphql-request';

  import STitle from '@/components/STitle';
  import SBlock from '@/components/SBlock';
  import SBlockItem from '@/components/SBlockItem';
  import SButton from "@/components/SButton";
  import SPagination from '@/components/SPagination';

  export default {
    name: 'ContentOverview',

    components: {
      STitle,
      SBlock,
      SBlockItem,
      SButton,
      SPagination
    },

    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        items: [],
        total: 0
      }
    },

    async fetch() {
      await this.loadItems();
    },

    computed: {
      _cols() {
        return {
          'cols': 12,
          'sm': 6,
          'lg': 4
        }
      },

      _story() {
        return this.blok.story || {};
      },

      _startsWith() {
        const link = this.$isLink(this._story) && this.$getLink(this._story, true);

        return link && !link.includes(':') ? link.replace(/^\//, '') : '';
      },

      _sortBy() {
        return this.blok.sortBy || 'position:asc';
      },

      _page() {
        return Number(this.$route.query.page) || 1;
      },

      _perPage() {
        return Number(this.blok.perPage) || 6;
      },

      _totalPages() {
        return Math.ceil(this.total / this._perPage);
      },

      _overviewDate() {
        if (this._sortBy === 'position:asc') {
          return '';
        }

        return this._sortBy === 'content.overviewDate:asc' ?
          `gt_date: "${this._dateYesterday}"` :
          `lt_date: "${this._dateTomorrow}"`;
      },

      _adjacent() {
        if (this.$vuetify.breakpoint.xsOnly) {
          return 1;
        }

        return this.$vuetify.breakpoint.mdAndUp ? 3 : 2;
      },

      _link() {
        return this.$isLink(this.blok.link) && this.$getLink(this.blok.link);
      },

      _linkStyle() {
        return this.blok.linkStyle || 'primary';
      },

      _hidePagination() {
        return this.blok.hidePagination || false;
      },

      _dateYesterday() {
        return this.$dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD 00:00')
      },

      _dateTomorrow() {
        return this.$dayjs()
          .add(1, 'day')
          .format('YYYY-MM-DD 00:00')
      }
    },

    watch: {
      async _startsWith() {
        await this.$fetch();
      },

      async _sortBy() {
        await this.$fetch();
      },

      async _page() {
        await this.$fetch();
      },

      async _perPage() {
        await this.$fetch();
      },

      async _overviewDate() {
        await this.$fetch();
      }
    },

    methods: {
      async loadItems() {
        const { total, items } = await this.$graphql.website.request(
          gql`query FetchStories($startsWith: String!, $sortBy: String!, $page: Int!, $perPage: Int!) {
            PagecontentItems(
              starts_with: $startsWith,
              is_startpage: "false",
              sort_by: $sortBy,
              page: $page,
              per_page: $perPage,
              filter_query: {
                overviewDate: {
                  ${this._overviewDate}
                }
              }
            ) {
              total
              items {
                uuid
                position
                full_slug
                content {
                  _uid
                  overviewImage { id, name, filename, title, copyright, focus, alt }
                  overviewDate
                  overviewTitle
                  overviewText
                }
              }
            }
          }`, {
            startsWith: this._startsWith,
            page: this._page,
            perPage: this._perPage,
            sortBy: this._sortBy
          }, {
            version: this.$store.state.version
          }
        ).then(({ PagecontentItems: { total, items }}) => ({
          total,
          items: items
            .filter(({ content }) => !!content.overviewTitle)
            .map(({uuid, full_slug, content}) => ({
              id: `${uuid}-${content._uid}`,
              image: content.overviewImage,
              date: content.overviewDate,
              title: content.overviewTitle,
              text: content.overviewText,
              link: this.$getSlug(full_slug)
            }))
        }));

        this.total = total;
        this.items = items;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-overview {
    height: 100%;

    position: relative;

    .button {
      display: flex;
      justify-content: center;
    }
  }
</style>
