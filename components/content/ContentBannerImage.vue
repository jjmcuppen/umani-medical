<template>
  <section-banner
    :blok="blok"
  >
    <div
      class="content-banner-image"
    >
      <div
        v-if="blok.image && blok.image.filename"
        class="image"
      >
        <s-image
          :src="blok.image.filename"
          :srcset="_srcset"
          :sizes="_sizes"
          :aspect-ratio="_aspectRatio"
          :focus="_focus"
          :alt="_alt"
          :cover="_size === 'cover'"
          :contain="_size === 'contain'"
          preload
        />
      </div>
      <div
        v-if="blok.title || blok.text || _link"
        class="content"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            md="8"
            xl="6"
            offset-md="1"
            offset-xl="1"
          >
            <s-textarea
              v-if="blok.title"
              :text="blok.title"
              class="heading"
            />
            <s-textarea
              v-if="blok.text"
              :text="blok.text"
              class="text"
            />
            <div
              v-if="_link"
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
    </div>
  </section-banner>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';

  import SButton from '@/components/SButton';
  import SImage from '@/components/SImage';
  import STextarea from '@/components/STextarea';

  export default {
    name: 'ContentBannerImage',

    components: {
      SButton,
      SImage,
      STextarea
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
        mobile: false
      }
    },

    computed: {
      _size() {
        return this.blok.size || 'cover';
      },

      _srcset() {
        return defaultSrcset;
      },

      _sizes() {
        return '100vw';
      },

      _aspectRatio() {
        if (this._size === 'contain') {
          return '';
        }

        return this.mobile && this._size === 'cover' ? '1:1' : this.blok.aspectRatio || '21:9';
      },

      _focus() {
        return this.blok.image.focus;
      },

      _alt() {
        return this.blok.image.name || this.blok.image.alt;
      },

      _link() {
        return this.$isLink(this.blok.link) && this.$getLink(this.blok.link);
      },

      _linkStyle() {
        return this.blok.linkStyle || 'primary';
      }
    },

    watch: {
      '$vuetify.breakpoint.xsOnly': {
        async handler(value) {
          this.mobile = value;
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-banner-image {
    height: 100%;

    position: relative;

    background-color: var(--content-banner-image-bg-color);

    @include breakpoint(md-and-up) {
      background-color: transparent;
    }

    .image {
      position: relative;
      z-index: 0;
    }

    .content {
      margin: 0;
      padding: 24px 12px;

      position: relative;
      z-index: 2;

      overflow: hidden;

      @include breakpoint(md-and-up) {
        display: flex;
        align-items: center;

        padding: 0;

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
      }

      .heading {
        padding-bottom: .5rem;

        color: var(--content-banner-image-heading-font-color);
        font-family: var(--content-banner-image-heading-font-family);
        font-weight: var(--content-banner-image-heading-font-weight);
        font-size: var(--content-banner-image-heading-font-size);
        line-height: var(--content-banner-image-heading-line-height);

        text-transform: var(--content-banner-image-heading-text-transform);
        text-decoration: none;
      }

      .text {
        padding-bottom: 1rem;

        color: var(--content-banner-image-font-color);
        font-family: var(--content-banner-image-font-family);
        font-weight: var(--content-banner-image-font-weight);
        font-size: var(--content-banner-image-font-size);
        line-height: var(--content-banner-image-line-height);

        text-transform: var(--content-banner-image-text-transform);
        text-decoration: none;
      }
    }
  }
</style>
