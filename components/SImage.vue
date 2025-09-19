<template>
  <div
    v-observe-visibility="!isVisible && visibility"
    :class="_imageClass"
  >
    <div
      :style="{ paddingTop: _paddingTop }"
      class="s-image-sizer"
    />
    <img
      v-if="isVisible"
      :src="_src"
      :srcset="_srcset"
      :sizes="_sizes"
      :alt="alt"
      class="s-image-img"
      @load="loaded()"
    >
  </div>
</template>

<script>
import {
  getSrc,
  getSrcset,
  getResolution,
  getPaddingTop,
  getAspectRatio,
  defaultSrcset
} from '@/assets/js/image';

import {
  isNumeric,
  isAspectRatio
} from '@/assets/js/validate';

export default {
  name: 'SImage',

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
    lazy: {
      type: Boolean,
      default: true
    },
    cover: {
      type: Boolean,
      default: false
    },
    contain: {
      type: Boolean,
      default: false
    },
    containPosition: {
      type: String,
      default: 'center',
      validator: v => !v || [
        'left top',
        'left',
        'left bottom',
        'top',
        'center',
        'bottom',
        'right top',
        'right',
        'right bottom'
      ].includes(v)
    },
    smartCrop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: false
    },
    preload: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isVisible: !this.lazy,
      isLoaded: false
    };
  },

  computed: {
    _imageClass() {
      return [
        's-image',
        { 's-image-visible': this.isVisible },
        { 's-image-loaded': this.isLoaded },
        { 's-image-cover': this.cover },
        { 's-image-contain': this.contain },
        { 's-image-overlay': this.overlay },
        { 's-image-preload': this.preload },
        { [this.containPosition]: this.contain && !!this.containPosition }
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

    // _aspectRatio() {
    //   if (this.contain) {
    //     const [ width, height ] = getResolution(this.src);
    //
    //     return width && height ? width / height : undefined;
    //   }
    //
    //   if (this.aspectRatio) {
    //     return getAspectRatio(this.aspectRatio);
    //   }
    //
    //   return 1;
    // },

    _aspectRatio() {
      if (this.aspectRatio) {
        return getAspectRatio(this.aspectRatio);
      }

      // if (this.contain) {
      const [ width, height ] = getResolution(this.src);

      return width && height ? width / height : undefined;
      // }
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
    visibility(visible) {
      if (visible) {
        this.isVisible = true;
      }
    },

    loaded() {
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-image {
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

      transition: opacity 0.5s ease-in-out 0.5s;
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

      transition: opacity 0.5s ease-in-out 0.5s;
    }

    &.s-image-preload:after {
      display: block;
    }

    &.s-image-loaded {
      &.s-image-overlay:before {
        opacity: 0.2;
      }

      &.s-image-preload:after {
        opacity: 0;
      }

      .s-image-img {
        opacity: 1;
      }
    }

    &.s-image-cover {
      .s-image-img {
        height: auto;
        width: 100%;
        max-width: 100%;

        top: 50%;
        left: 50%;

        object-fit: cover;

        transform: translate(-50%, -50%);
      }
    }

    &.s-image-contain {
      .s-image-sizer {
        margin: auto;
      }

      .s-image-img {
        height: auto;
        width: auto;
        max-height: 100%;
        max-width: 100%;

        margin: auto;

        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      @each $position in top right bottom left {
        &.#{$position} .s-image-sizer,
        &.#{$position} .s-image-img {
          margin-#{$position}: 0;
        }
      }
    }

    .s-image-sizer {
      height: 0;
      width: 100%;
    }

    .s-image-img {
      display: block;

      position: absolute;

      opacity: 0;

      backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -webkit-backface-visibility: hidden;

      transform: translateZ(0);

      transition: opacity 0.5s ease-in-out 0.5s;
    }
  }
</style>
