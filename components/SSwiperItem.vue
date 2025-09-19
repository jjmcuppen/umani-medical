<template>
  <div
    class="swiper-slide"
  >
    <component
      :is="_component"
      :story="story"
      :blok="blok"
      :item="item"
    />
  </div>
</template>

<script>
  export default {
    name: 'SSwiperItem',
    
    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      component: {
        type: String,
        default: null
      }
    },
    
    computed: {
      _component() {
        return this.component || this.item.component;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .swiper-slide {
    height: auto;
    width: 100%;
  }
</style>