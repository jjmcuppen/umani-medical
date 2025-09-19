<template>
  <div
    :class="_imageClass"
  >
    <div
      :style="{ paddingTop: _paddingTop }"
      class="s-image-swiper-sizer"
    />
    <img
      :src="emptyImage"
      :data-src="_src"
      :data-srcset="_srcset"
      :data-sizes="_sizes"
      :alt="alt"
      class="swiper-lazy"
      @load="loaded()"
    >
  </div>
</template>

<script>
  import {
    getSrc,
    getSrcset,
    getPaddingTop,
    getResolution,
    getAspectRatio,
    emptyImage,
    defaultSrcset
  } from 'assets/js/image';

  import {
    isNumeric,
    isAspectRatio
  } from 'assets/js/validate';

  export default {
    name: 'SImageSwiper',

    props: {
      src: {
        type: String,
        required: true
      },
      srcset: {
        type: Array,
        default: () => ([]),
        validator: values => values.every(isNumeric)
      },
      sizes: {
        type: String,
        default: ''
      },
      width: {
        type: [ Number, String ],
        default: undefined,
        validator: isNumeric
      },
      format: {
        type: String,
        default: undefined,
        validator: v => !v || [
          'webp',
          'jpeg',
          'png'
        ].includes(v)
      },
      focus: {
        type: String,
        default: undefined
      },
      quality: {
        type: Number,
        default: 90
      },
      alt: {
        type: String,
        default: ''
      },
      aspectRatio: {
        type: String,
        default: '',
        validator: v => !v || isAspectRatio(v)
      },
      smartCrop: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        emptyImage,

        isLoaded: false
      }
    },

    computed: {
      _imageClass() {
        return [
          's-image-swiper',
          { 's-image-swiper-loaded': this.isLoaded },
          { 's-image-swiper-overlay': this.overlay },
          { 's-image-swiper-preload': this.preload }
        ]
      },

      _src() {
        return getSrc(
          this.src,
          this._width,
          {
            aspectRatio: this._aspectRatio,
            format: this.format,
            focus: this.focus,
            quality: this.quality,
            smartCrop: this.smartCrop
          }
        );
      },

      _srcset() {
        return this.srcset.length > 1 ? getSrcset(
          this.src,
          this.srcset,
          {
            aspectRatio: this._aspectRatio,
            format: this.format,
            focus: this.focus,
            quality: this.quality,
            smartCrop: this.smartCrop
          }
        ) : undefined;
      },

      _sizes() {
        return this.srcset.length > 1 ? this.sizes : undefined;
      },

      _width() {
        return this.width || Math.min(...this.srcset.length ? this.srcset : defaultSrcset);
      },

      _aspectRatio() {
        if (this.aspectRatio) {
          return getAspectRatio(this.aspectRatio);
        }

        return 1;
      },

      _paddingTop() {
        if (this.aspectRatio) {
          return getPaddingTop(this.aspectRatio);
        }

        const [ width, height ] = getResolution(this.src);

        return width && height ? `${(height / width) * 100}%` : '100%';
      }
    },

    methods: {
      loaded() {
        this.isLoaded = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-image-swiper {
    max-width: 100%;

    display: flex;
    flex: 1 0 auto;

    position: relative;

    overflow: hidden;

    &:before {
      content: '';

      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

      background-color: var(--image-overlay-bg-color);

      opacity: 0;

      transition: opacity 0.5s, background-color 0.5s;
    }

    &:after {
      content: '';

      display: none;

      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

      background-color: var(--image-preload-bg-color);

      opacity: 1;

      transition: opacity 0.5s 0.5s ease-in-out;
    }

    &.s-image-swiper-preload:after {
      display: block;
    }

    &.s-image-swiper-loaded {
      &.s-image-swiper-overlay:before {
        opacity: 0.2;
      }

      &.s-image-swiper-preload:after {
        opacity: 0;
      }
    }

    .s-image-swiper-sizer {
      height: 0;
      width: 100%;
    }

    img {
      height: auto;
      width: 100%;
      max-width: 100%;

      display: block;

      position: absolute;
      top: 50%;
      left: 50%;

      object-fit: cover;

      backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -webkit-backface-visibility: hidden;

      transform: translate(-50%, -50%);

      opacity: 0;

      transition: opacity 0.5s 0.5s ease-in-out;

      &.swiper-lazy-loaded {
        opacity: 1;
      }
    }
  }
</style>
