<template>
  <div
    class="s-video-player"
    :style="{ 'padding-top': _paddingTop }"
  >
    <s-image
      v-if="!playing && (item.image && item.image.filename)"
      :src="item.image.filename"
      :srcset="_srcset"
      :sizes="_sizes"
      :focus="item.image.focus"
      :aspect-ratio="aspectRatio"
      :alt="_alt"
      cover
      @click.native="play"
    />
    <s-video
      v-if="_showVideo"
      :src="item.video.filename"
      :controls="item.controls"
      :autoplay="item.autoplay"
      :muted="item.muted"
      :loop="item.loop"
    />
    <s-video-embed
      v-else-if="_showEmbed"
      :src="item.url"
      :controls="item.controls"
      :autoplay="item.autoplay"
      :muted="item.muted"
      :loop="item.loop"
    />
  </div>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';
  
  import SImage from '@/components/SImage';
  import SVideo from '@/components/SVideo';
  import SVideoEmbed from '@/components/SVideoEmbed';
  
  export default {
    name: 'SVideoPlayer',
    
    components: {
      SImage,
      SVideo,
      SVideoEmbed
    },
    
    props: {
      item: {
        type: Object,
        required: true
      },
      aspectRatio: {
        type: String,
        default: '16:9',
        validator: value => /^\d{1,3}:\d{1,3}$/.test(value)
      }
    },
    
    data() {
      return {
        playing: false
      }
    },
    
    computed: {
      _showVideo() {
        return this.item.video && this.item.video.filename && (this.playing || !(this.item.image && this.item.image.filename));
      },
      
      _showEmbed() {
        return this.item.url && (this.playing || !(this.item.image && this.item.image.filename));
      },
      
      _srcset() {
        return defaultSrcset;
      },
      
      _sizes() {
        return '100vw';
      },
      
      _alt() {
        return this.item.image.name || this.item.image.alt;
      },
      
      _paddingTop() {
        const [ width, height ] = this.aspectRatio.split(':');
        
        if (!width || !height) {
          return null;
        }
        
        return `${(height / width) * 100}%`;
      }
    },
    
    mounted() {
      if (this.item.autoplay) {
        this.playing = true;
      }
    },
    
    methods: {
      play() {
        this.item.autoplay = true;
        
        this.playing = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';
  
  .s-video-player {
    height: 0;
    width: 100%;
    
    display: block;
    
    padding: 0;
    
    position: relative;
    
    overflow: hidden;
    
    .s-image {
      height: 100%;
      width: auto;
      min-width: 100%;
      
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      
      border: 0;
      
      transform: translate(-50%, -50%);
      
      cursor: pointer ;
      
      &:before {
        @include material('play_circle_filled');
        
        display: block;
        
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        
        color: #fff;
        font-size: 120px;
        
        vertical-align: middle;
        
        transform: translate(-50%, -50%);
      }
    }
    
    .s-video,
    .s-video-embed {
      height: 100%;
      width: 100%;
      
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      border: none;
    }
  }
</style>