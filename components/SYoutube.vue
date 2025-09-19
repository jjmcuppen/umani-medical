<template>
  <iframe
    v-bind="_attrs"
    class="s-youtube"
  />
</template>

<script>
  import {
    stringify
  } from 'qs';
  
  export default {
    name: 'SYoutube',
  
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
          src: `https://www.youtube.com/embed/${this.id}?${this._params}`,
          frameborder: 0,
          allowfullscreen: true
        };
      },
    
      _params() {
        return stringify({
          controls: this.controls,
          autoplay: this.autoplay,
          mute: this.muted,
          loop: this.loop,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          wmode: 'transparant'
        });
      },
    },
  }
</script>