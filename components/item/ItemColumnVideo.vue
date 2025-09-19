<template>
  <v-col
    v-bind="_cols"
  >
    <div
      class="item-column-video"
    >
      <s-video-player
        :item="_video"
        :aspect-ratio="_aspectRatio"
        class="video"
      />
    </div>
  </v-col>
</template>

<script>
  import SVideoPlayer from '@/components/SVideoPlayer';

  export default {
    name: 'ItemColumnVideo',

    components: {
      SVideoPlayer
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

      _video() {
        return {
          image: this.item.image || null,
          video: this.item.video || null,
          url: this.item.url || null,
          controls: this.item.controls || false,
          autoplay: this.item.autoplay || false,
          loop: this.item.loop || false,
          muted: this.item.muted || false
        }
      },

      _aspectRatio() {
        return '16:9';
      }
    }
  }
</script>
