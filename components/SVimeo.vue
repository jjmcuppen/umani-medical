<template>
  <iframe
    v-bind="_attrs"
    class="s-vimeo"
  />
</template>

<script>
  import {
    stringify
  } from 'qs';
  
  export default {
    name: 'SVimeo',
  
    props: {
      id: {
        type: String,
        required: true
      },
      controls: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      muted: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      }
    },
  
    computed: {
      _attrs() {
        return {
          src: `https://player.vimeo.com/video/${this.id}?${this._params}`,
          frameborder: 0,
          allowfullscreen: true
        };
      },
  
      _params() {
        return stringify({
          controls: this.controls,
          autoplay: this.autoplay,
          muted: this.muted,
          loop: this.loop,
          byline: 0,
          playsinline: 1,
          transparent: 1
        })
      },
    },
  }
</script>