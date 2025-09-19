<template>
  <video
    v-bind="_attrs"
    class="s-video"
  >
    <source
      :src="src"
      type="video/mp4"
    >
  </video>
</template>

<script>
  export default {
    name: 'SVideo123',
  
    props: {
      src: {
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
          ...(this.controls ? { controls: true } : {}),
          ...(this.autoplay ? { autoplay: true } : {}),
          ...(this.muted ? { muted: true } : {}),
          ...(this.loop ? { loop: true } : {}),
          preload: 'none'
        }
      }
    }
  }
</script>