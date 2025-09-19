<template>
  <section-content
    :blok="blok"
    :cols="_cols"
  >
    <div
      class="content-image"
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
          <div
            v-if="blok.image && blok.image.filename"
            class="image"
          >
            <s-image
              :src="blok.image.filename"
              :srcset="_srcset"
              :sizes="_sizes"
              :focus="blok.image.focus"
              :alt="_alt"
              contain
            />
          </div>
          <div
            v-if="blok.description"
            class="description"
          >
            {{ blok.description }}
          </div>
        </v-col>
      </v-row>
    </div>
  </section-content>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';

  import STitle from '@/components/STitle';
  import SImage from '@/components/SImage';

  export default {
    name: 'ContentImage',

    components: {
      STitle,
      SImage
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
      _cols() {
        return {
          'cols': 12,
          'md': this._colSize,
          'offset-md': this._colOffset
        };
      },

      _colSize() {
        switch (this.blok.sizing) {
          case 'small': return 6;
          case 'medium': return 8;
          default: return 12;
        }
      },

      _colOffset() {
        switch (this.blok.alignment) {
          case 'center': return (12 - this._colSize) / 2;
          case 'right': return (12 - this._colSize);
          default: return 0;
        }
      },

      _srcset() {
        return defaultSrcset;
      },

      _sizes() {
        switch (this.blok.sizing) {
          case 'small': return '(min-width: 960px) 50vw, 100vw';
          case 'medium': return '(min-width: 960px) 66.6vw, 100vw';
          default: return '100vw';
        }
      },

      _alt() {
        return this.blok.image.name || this.blok.image.alt;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-image {
    height: 100%;

    position: relative;

    .description {
      margin-top: 1rem;

      color: var(--content-image-font-color);
      font-family: var(--content-image-font-family);
      font-weight: var(--content-image-font-weight);
      font-size: var(--content-image-font-size);
      line-height: var(--content-image-line-height);
    }
  }
</style>
