<template>
  <section
    v-editable="blok"
    :class="_sectionClass"
  >
    <v-container
      :class="_containerClass"
    >
      <v-row
        no-gutters
      >
        <v-col
          v-bind="cols"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  export default {
    name: 'SectionBanner',
    
    props: {
      blok: {
        type: Object,
        required: true
      },
      cols: {
        type: Object,
        default: () => ({
          'cols': 12
        })
      }
    },
  
    data() {
      return {
        mounted: false
      }
    },
  
    computed: {
      _sectionClass() {
        return [
          'section-banner',
          { 'section-full-width': this._width === 'full' },
          {
            [`section-background-${this.blok.background}`]: !!this.blok.background
          }
        ]
      },
      
      _containerClass() {
        return this._width === 'full' ? 'container--fluid pa-0' : (this.mounted && this.$vuetify.breakpoint.smAndUp ? 'py-4 px-6' : 'py-0 px-2');
      },
      
      _width() {
        return this.blok.width || 'inline';
      }
    },
  
    mounted() {
      this.mounted = true;
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .section-banner {
    height: 100%;
    
    background-color: transparent;
    
    position: relative;
    
    &.section-full-width {
      ::v-deep .s-swiper {
        .swiper-button-prev {
          left: 0;
        }
        
        .swiper-button-next {
          right: 0;
        }
      }
    }
  
    &.section-background-white {
      background-color: #ffffff;
    }
  
    &.section-background-primary {
      background-color: var(--section-bg-color-primary);
    }
  
    &.section-background-secondary {
      background-color: var(--section-bg-color-secondary);
    }
  }
</style>