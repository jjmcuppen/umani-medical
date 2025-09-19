<template>
  <div
    class="s-swiper"
  >
    <div
      :key="uniqueId"
      v-swiper:[uniqueId]="options"
      :class="_swiperClass"
    >
      <div
        class="swiper-wrapper"
      >
        <slot />
      </div>
      <div
        v-if="_showPagination"
        slot="pagination"
        :class="_paginationClass"
      />
    </div>
    <div
      v-if="_showNavigation"
      slot="button-prev"
      :class="_navigationPrevClass"
    />
    <div
      v-if="_showNavigation"
      slot="button-next"
      :class="_navigationNextClass"
    />
  </div>
</template>

<script>
  export default {
    name: 'SSwiper',
    
    props: {
      uniqueId: {
        type: String,
        required: true,
      },
      options: {
        type: Object,
        required: true
      }
    },
    
    computed: {
      _swiper() {
        return this[this.uniqueId];
      },
      
      _swiperClass() {
        return [
          'swiper-container',
          {
            [`${this.uniqueId}`]: !!this.uniqueId
          }
        ]
      },
      
      _navigationPrevClass() {
        return [
          'swiper-button-prev',
          {
            [`${this.uniqueId}-prev`]: !!this.uniqueId
          }
        ];
      },
      
      _navigationNextClass() {
        return [
          'swiper-button-next',
          {
            [`${this.uniqueId}-next`]: !!this.uniqueId
          }
        ];
      },
      
      _paginationClass() {
        return [
          'swiper-pagination',
          {
            [`${this.uniqueId}-pagination`]: !!this.uniqueId
          }
        ];
      },
      
      _showPagination() {
        return this.options.pagination && Object.entries(this.options.pagination).length;
      },
      
      _showNavigation() {
        return this.options.navigation && Object.entries(this.options.navigation).length;
      }
    },
    
    beforeDestroy() {
      this._swiper.destroy(true, false);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';
  
  .s-swiper {
    height: auto;
    
    position: relative;
    
    .swiper-container {
      height: 100%;
      width: 100%;
  
      .swiper-wrapper {
        height: 100%;
        width: 100%;
    
        display: flex;
        flex: 1 1 auto;
    
        position: relative;
        z-index: 1;
    
        box-sizing: inherit;
      }
      
      .swiper-pagination {
        ::v-deep .swiper-pagination-bullet {
          height: 12px;
          width: 12px;
          
          background: var(--swiper-pagination-bg-color);
          
          opacity: 1;
  
          outline: none;
          
          &.swiper-pagination-bullet-active {
            opacity: 1;
            
            background: var(--swiper-pagination-bg-color-active);
          }
        }
      }
    }
    
    .swiper-button-prev,
    .swiper-button-next {
      height: 40px;
      width: 40px;
      
      display: flex;
      align-items: center;
      justify-content: center;
      
      position: absolute;
      top: 50%;
      z-index: 101;
      
      background-image: none;
      background-color: var(--swiper-navigation-bg-color);
      
      outline: none;
    }
    
    .swiper-button-prev {
      left: 10px;
      
      @include breakpoint(md-and-up) {
        left: -60px;
      }
      
      &:after {
        @include material('keyboard_arrow_left');
        
        color: var(--swiper-navigation-after-color);
        font-size: 1.5rem;
      }
    }
    
    .swiper-button-next {
      right: 10px;
      
      @include breakpoint(md-and-up) {
        right: -60px;
      }
      
      &:after {
        @include material('keyboard_arrow_right');
        
        color: var(--swiper-navigation-after-color);
        font-size: 1.5rem;
      }
    }
  }
</style>