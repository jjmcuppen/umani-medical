<template>
  <v-col
    v-bind="_cols"
  >
    <div
      class="item-column-image"
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
          :aspect-ratio="_aspectRatio"
          :cover="_size === 'cover'"
          :contain="_size === 'contain'"
          preload
          format="png"
        />
      </div>
    </div>
  </v-col>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';

  import SImage from '@/components/SImage';

  export default {
    name: 'ItemColumnImage',

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
      },
      index: {
        type: Number,
        required: true
      }
    },

    computed: {
      _cols() {
        return {
          'cols': 12,
          'sm': this._colSize
        };
      },

      _colSize() {
        return this.blok.cols.split(';')[this.index] || '6';
      },

      _srcset() {
        return defaultSrcset;
      },

      _sizes() {
        return '(min-width: 960px) 50vw, 100vw';
      },

      _aspectRatio() {
        if (this._size === 'contain') {
          return '';
        }

        return this.item.aspectRatio || '1:1';
      },

      _size() {
        return this.item.size || 'cover';
      },

      _alt() {
        return this.item.image.name || this.item.image.alt;
      }
    }
  }
</script>
