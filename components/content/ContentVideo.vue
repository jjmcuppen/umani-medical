<template>
  <section-content
    :blok="blok"
    :cols="_cols"
  >
    <div
      class="content-video"
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
      <v-row
        align-md="center"
      >
        <v-col>
          <s-video-player
            :item="_video"
            :aspect-ratio="_aspectRatio"
            class="video"
          />
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
  import STitle from '@/components/STitle';
  import SVideoPlayer from '@/components/SVideoPlayer';

  export default {
    name: 'ContentVideo',

    components: {
      STitle,
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
        switch(this.blok.sizing) {
          case 'small': return 6;
          case 'medium': return 8;
          default: return 12;
        }
      },

      _colOffset() {
        switch(this.blok.alignment) {
          case 'center': return (12 - this._colSize) / 2;
          case 'right': return 12 - this._colSize;
          default: return 0;
        }
      },

      _video() {
        return {
          image: this.blok.image || null,
          video: this.blok.video || null,
          url: this.blok.url || null,
          controls: this.blok.controls || false,
          autoplay: this.blok.autoplay || false,
          loop: this.blok.loop || false,
          muted: this.blok.muted || false
        }
      },

      _aspectRatio() {
        return '16:9';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-video {
    height: 100%;

    position: relative;

    .description {
      margin-top: 1rem;

      color: var(--content-video-font-color);
      font-family: var(--content-video-font-family);
      font-weight: var(--content-video-font-weight);
      font-size: var(--content-video-font-size);
      line-height: var(--content-video-line-height);
    }
  }
</style>
