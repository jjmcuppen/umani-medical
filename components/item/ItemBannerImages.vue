<template>
  <div
    class="item-banner-images"
  >
    <s-image-swiper
      v-if="_src"
      :src="_src"
      :srcset="_srcset"
      :sizes="_sizes"
      :aspect-ratio="_aspectRatio"
      :focus="_focus"
      :alt="_alt"
      preload
      class="image"
    />
    <div
      v-if="item.title || item.text || _link"
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
            v-if="item.title"
            :text="item.title"
            data-swiper-parallax="-400"
            class="heading"
          />
          <s-textarea
            v-if="item.text"
            :text="item.text"
            data-swiper-parallax="-500"
            class="text"
          />
          <div
            v-if="_link"
            data-swiper-parallax="-600"
            class="button"
          >
            <s-button
              :to="_link"
              :theme="_linkStyle"
            >
              {{ item.linkText || $t('link.readMore') }}
            </s-button>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import {
    defaultSrcset
  } from 'assets/js/image';

  import SImageSwiper from '@/components/SImageSwiper';
  import SButton from '@/components/SButton';
  import STextarea from '@/components/STextarea';

  export default {
    name: 'ItemBannerImages',

    components: {
      SImageSwiper,
      SButton,
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
      },
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      _src() {
        return this.item.image && this.item.image.filename;
      },

      _srcset() {
        return defaultSrcset;
      },

      _sizes() {
        return '100vw';
      },

      _aspectRatio() {
        return this.$vuetify.breakpoint.xsOnly ? '1:1' : (this.blok.aspectRatio || '21:9');
      },

      _focus() {
        return this.item.image.focus;
      },

      _alt() {
        return this.item.image.name || this.item.image.alt;
      },

      _link() {
        return this.$isLink(this.item.link) && this.$getLink(this.item.link);
      },

      _linkStyle() {
        return this.item.linkStyle || 'primary';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .item-banner-images {
    height: 100%;

    background-color: var(--content-banner-image-bg-color);

    @include breakpoint(md-and-up) {
      background-color: transparent;
    }

    .content {
      margin: 0;
      padding: 24px 12px 48px 12px;

      position: relative;
      z-index: 2;

      color: var(--font-color);

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

        color: #ffffff;
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
