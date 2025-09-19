<template>
  <div
    :class="_overlayClass"
    @click.prevent="closeNav()"
  />
</template>

<script>
  import {mapState} from 'vuex';
  
  export default {
    name: 'SNavMobileOverlay',
  
    computed: {
      ...mapState({
        '_navMobileOpen': state => state.mobile.navMobileOpen,
        '_navConfiguratorOpen': state => state.mobile.navConfiguratorOpen
      }),
      
      _overlayClass() {
        return {
          's-nav-mobile-overlay': true,
          's-nav-mobile-overlay-open': this._navMobileOpen || this._navConfiguratorOpen
        }
      }
    },
    
    methods: {
      closeNav() {
        this.$store.commit('mobile/setNoScroll', false);
        this.$store.commit('mobile/setNavMobileOpen', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-nav-mobile-overlay {
    height: 100vh;
    width: 100vw;
  
    display: block;
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  
    background-color: rgba(0, 0, 0, 0.25);
  
    visibility: hidden;
    
    opacity: 0;
  
    transition:
      visibility 0s 0.4s ease,
      opacity 0.4s ease;
    
    &.s-nav-mobile-overlay-open {
      visibility: visible;
      
      opacity: 1;
  
      transition:
        opacity 0.4s ease;
    }
  }
</style>