<template>
  <section-banner
    :blok="blok"
  >
    <div
      class="content-banner-images"
    >
      <s-swiper
        ref="swiper"
        :unique-id="uniqueId"
        :options="_swiperOptions"
      >
        <s-swiper-item
          v-for="item in _items"
          :key="item._uid"
          :story="story"
          :blok="blok"
          :item="item"
        />
      </s-swiper>
    </div>
  </section-banner>
</template>

<script>
  import SSwiper from '@/components/SSwiper';
  import SSwiperItem from '@/components/SSwiperItem';

  export default {
    name: 'ContentBannerImages',

    components: {
      SSwiper,
      SSwiperItem
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

    data() {
      const uniqueId = `swiper-${Date.now()}-${Math.floor(Math.random() * Date.now())}`;

      return {
        uniqueId: uniqueId
      }
    },

    computed: {
      _items() {
        return this.blok.blocks || [];
      },

      _swiper() {
        return this.$refs.swiper[this.uniqueId];
      },

      _swiperOptions() {
        return {
          autoplay: this._autoplay ? {
            delay: 5000
          } : false,
          centeredSlides: true,
          effect: this._effect,
          fadeEffect: {
            crossFade: true
          },
          lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
          },
          // lazy: true,
          loop: this._loop,
          loopedSlides: 1,
          pagination: {
            el: `.${this.uniqueId}-pagination`,
            clickable: true
          },
          preloadImages: false,
          preventClicks: false,
          preventClicksPropagation: false,
          slideToClickedSlide: true,
          slidesPerView: 1,
          speed: 600,
          watchOverflow: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        }
      },

      _autoplay() {
        return this.blok.autoplay && this.blok.blocks.length > 1;
      },

      _loop() {
        return this.blok.loop && this.blok.blocks.length > 1;
      },

      _effect() {
        return this.blok.effect;
      }
    },

    watch: {
      '$vuetify.breakpoint.xsOnly': {
        async handler() {
          this.uniqueId = `swiper-${Date.now()}-${Math.floor(Math.random() * Date.now())}`;
        },
        immediate: false
      },

      _autoplay() {
        this.uniqueId = `swiper-${Date.now()}-${Math.floor(Math.random() * Date.now())}`;
      },

      _loop() {
        this.uniqueId = `swiper-${Date.now()}-${Math.floor(Math.random() * Date.now())}`;
      },

      _effect() {
        this.uniqueId = `swiper-${Date.now()}-${Math.floor(Math.random() * Date.now())}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-banner-images {
    height: 100%;

    position: relative;
  }
</style>
