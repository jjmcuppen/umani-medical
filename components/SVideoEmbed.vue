<template>
  <component
    :is="_type"
    :id="id"
    :controls="controls"
    :autoplay="autoplay"
    :muted="muted"
    :loop="loop"
    class="s-video-embed"
  />
</template>

<script>
  import getVideoId from 'get-video-id';
  
  import SVimeo from '@/components/SVimeo';
  import SYoutube from '@/components/SYoutube';
  
  export default {
    name: 'SVideoEmbed',
    
    components: {
      SVimeo,
      SYoutube
    },
    
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
    
    data() {
      const data = getVideoId(this.src);
      
      return {
        id: data.id,
        type: data.service
      }
    },
  
    computed: {
      _type() {
        return `s-${this.type}`;
      }
    }
  }
</script>