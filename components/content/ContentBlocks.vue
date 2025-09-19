<template>
  <section-content
    :blok="blok"
  >
    <div
      class="content-blocks"
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
        <v-col
          no-gutters
        >
          <s-block>
            <s-block-item
              v-for="item in _items"
              :key="item._uid"
              :story="story"
              :blok="blok"
              :item="item"
              :cols="_cols"
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
    </div>
  </section-content>
</template>

<script>
  import STitle from '@/components/STitle';
  import SBlock from '@/components/SBlock';
  import SBlockItem from '@/components/SBlockItem';
  import SButton from '@/components/SButton';

  export default {
    name: 'ContentBlocks',

    components: {
      STitle,
      SBlock,
      SBlockItem,
      SButton
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

    computed: {
      _items() {
        return (this.blok.blocks || []).map(item => ({
          ...item,
          link: this.$isLink(item.link) && this.$getLink(item.link)
        }));
      },

      _cols() {
        switch (this.blok.perRow) {
          case '4':
            return {
              'cols': 12,
              'sm': 6,
              'lg': 3
            };

          case '3':
            return {
              'cols': 12,
              'sm': 6,
              'lg': 4
            };

          default:
            return {
              'cols': 12,
              'sm': 6
            };
        }
      },

      _link() {
        return this.$isLink(this.blok.link) && this.$getLink(this.blok.link);
      },

      _linkStyle() {
        return this.blok.linkStyle || 'primary';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-blocks {
    height: 100%;

    position: relative;

    .button {
      display: flex;
      justify-content: center;
    }
  }
</style>
