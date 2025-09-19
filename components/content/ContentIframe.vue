<template>
  <section-content
    :blok="blok"
  >
    <div
      class="content-iframe"
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
          <s-iframe
            :src="_src"
            :aspect-ratio="_aspectRatio"
          />
        </v-col>
      </v-row>
    </div>
  </section-content>
</template>

<script>
  import STitle from '@/components/STitle';
  import SIframe from "@/components/SIframe";

  export default {
    name: 'ContentIframe',

    components: {
      STitle,
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
      }
    },

    computed: {
      _src() {
        return this.blok.src || false;
      },

      _aspectRatio() {
        return this.blok.aspectRatio || '1:1';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-iframe {
    height: 100%;

    position: relative;
  }
</style>
