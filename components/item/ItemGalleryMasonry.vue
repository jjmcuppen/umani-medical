<template>
  <div
    class="item-gallery-masonry"
  >
    <div
      v-if="item.image && item.image.filename"
      class="image"
    >
      <s-image
        :src="item.image.filename"
        :srcset="_srcset"
        :sizes="_sizes"
        :focus="item.image.focus"
        :alt="_alt"
        preload
        contain
      />
    </div>
  </div>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';

  import SImage from '@/components/SImage';

  export default {
    name: 'ItemGalleryMasonry',

    components: {
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
      },
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      _srcset() {
        return defaultSrcset;
      },

      _alt() {
        return this.item.image.name || this.item.image.alt;
      },

      _sizes() {
        return '(min-width: 1300px) 33.3vw, (min-width: 960px) 50vw, 100vw';
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .item-gallery-masonry {
    margin: 0;
    padding: 0;

    border-bottom: 12px solid transparent;

    cursor: pointer;

    ::v-deep {
      .image {
        &:hover {
          img {
            transform: scale(1.1);
          }
        }

        img {
          backface-visibility: hidden;

          transition: transform 0.5s;
        }
      }
    }
  }
</style>
