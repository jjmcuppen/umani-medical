<template>
  <v-col
    v-bind="_cols"
  >
    <div
      class="item-column-iframe"
    >
      <s-iframe
        :src="_src"
        :aspect-ratio="_aspectRatio"
      />
    </div>
  </v-col>
</template>

<script>
  import SIframe from '@/components/SIframe';

  export default {
    name: 'ItemColumnIframe',

    components: {
      SIframe
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

      _src() {
        return this.item.src || false;
      },

      _aspectRatio() {
        return this.item.aspectRatio || '1:1';
      }
    }
  }
</script>
