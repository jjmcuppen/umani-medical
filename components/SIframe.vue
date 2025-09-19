<template>
  <div
    v-if="src"
    :style="{ 'padding-top': _paddingTop }"
    class="s-iframe"
  >
    <iframe
      :src="src"
      frameBorder="0"
    />
  </div>
</template>

<script>
  import {
    isAspectRatio
  } from '@/assets/js/validate';
  
  export default {
    name: 'SIframe',
    
    props: {
      src: {
        type: String,
        required: true
      },
      aspectRatio: {
        type: String,
        default: '',
        validator: v => !v || isAspectRatio(v)
      },
    },
    
    computed: {
      _paddingTop() {
        const [ width, height ] = this.aspectRatio.split(':').map(value => parseInt(value, 10));
    
        return width && height ? `${(height / width) * 100}%` : '100%';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .s-iframe {
    width: 100%;
    height: 100%;
    
    position: relative;
  
    > iframe {
      height: 100%;
      width: 100%;
      
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }
  }
</style>