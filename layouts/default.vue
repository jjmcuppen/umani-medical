<template>
  <v-app
    :class="_appClass"
  >
    <s-header />
    <v-main>
      <slot>
        <nuxt />
      </slot>
    </v-main>
    <s-footer />
    <s-cookie-law />
    <s-photoswipe
      v-if="_modalOpen"
    />
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  // import manually for now, until vue-loader has been updated
  import { VMain } from 'vuetify/lib';
  
  import SHeader from '@/components/SHeader';
  import SFooter from '@/components/SFooter';
  import SCookieLaw from '@/components/SCookieLaw';
  import SPhotoswipe from '@/components/SPhotoswipe';
  
  export default {
    name: 'Default',

    components: {
      VMain,
      SHeader,
      SFooter,
      SCookieLaw,
      SPhotoswipe
    },
    
    computed: {
      ...mapState({
        '_modalOpen': state => state.photoswipe.modalOpen,
        '_noScroll': state => state.mobile.noScroll
      }),
      
      _appClass() {
        return `theme-${this.$store.state.config.site}`;
      }
    },
  
    watch: {
      '_noScroll': {
        handler(value) {
          if (value) {
            this.scrollY = window.scrollY;
          
            document.documentElement.classList.add('no-scroll');
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollY}px`;
          } else {
            document.documentElement.classList.remove('no-scroll');
            document.body.style.position = '';
            document.body.style.top = '';
          
            window.scrollTo(0, this.scrollY);
          }
        },
        deep: false
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  html {
    min-height: 100%;

    box-sizing: border-box;
  
    &.no-scroll {
      overflow-y: hidden;
    
      body {
        overflow-y: hidden;
      }
    }
  }

  body {
    min-height: 1px;
    width: 100%;
  }

  html, body {
    color: var(--font-color);
    font-family: var(--font-family);
    font-size: var(--font-size) !important;
    font-weight: var(--font-weight);
    line-height: var(--line-height);
    
    text-transform: var(--text-transform);
  }

  a {
    transition: color .2s ease-out;
  }

  .v-application {
    min-height: 100%;

    width: 100%;

    position: relative;
  
    color: var(--font-color) !important;
    font-family: var(--font-family) !important;
    font-size: var(--font-size) !important;
    font-weight: var(--font-weight) !important;
    line-height: var(--line-height) !important;
    
    text-transform: var(--text-transform) !important;

    background: #ffffff !important;
  
    h1, h2, h3, h4, h5, h6 {
      padding-bottom: 0.5rem;
      
      color: var(--heading-font-color);
      font-family: var(--heading-font-family);
      font-weight: var(--heading-font-weight);
      line-height: var(--heading-line-height);
      
      text-transform: var(--heading-text-transform);
      text-decoration: none;
      
      a {
        color: inherit;
      }
    }
    
    $sizes:
      var(--heading-font-size-h1),
      var(--heading-font-size-h2),
      var(--heading-font-size-h3),
      var(--heading-font-size-h4),
      var(--heading-font-size-h5),
      var(--heading-font-size-h6);

    @for $i from 1 through 6 {
      h#{$i} {
        $size: nth($sizes, $i);

        @if $i == 1 {
          font-size: calc(#{$size} - 0.5rem);
        } @else {
          font-size: $size;
        }

        @include breakpoint(md-and-up) {
          font-size: $size;
        }
      }
    }
    
    p {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    a {
      color: var(--link-color);
    }
  }

  .v-main {
    padding-top: var(--header-height-mobile) !important;

    @include breakpoint(md-and-up) {
      padding-top: var(--header-height-desktop) !important;
    }
  }

  .v-select-list .v-list-item .v-list-item__title,
  .v-select-list .v-list-item .v-list-item__subtitle {
    font-size: 0.75rem !important;
  }
</style>
