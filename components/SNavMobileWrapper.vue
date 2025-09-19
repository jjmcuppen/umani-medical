<template>
  <div
    :class="_wrapperClass"
  >
    <s-nav-mobile-panels />
    <s-nav-mobile-locales />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import SNavMobilePanels from '@/components/SNavMobilePanels';
  import SNavMobileLocales from '@/components/SNavMobileLocales';

  export default {
    name: 'SNavMobileWrapper',

    components: {
      SNavMobilePanels,
      SNavMobileLocales
    },

    computed: {
      ...mapState({
        '_navOpen': state => state.mobile.navMobileOpen
      }),

      _wrapperClass() {
        return {
          's-nav-mobile-wrapper': true,
          's-nav-mobile-wrapper-open': this._navOpen
        }
      }
    },

    watch: {
      $route() {
        if (this._navOpen) {
          this.$store.commit('mobile/setNoScroll', false);
          this.$store.commit('mobile/setNavMobileOpen', false);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-nav-mobile-wrapper {
    height: 100%;
    width: 90%;
    max-width: 400px;

    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    right: -100%;
    z-index: 1002;

    background-color: var(--nav-mobile-bg-color);

    overflow: hidden;

    box-shadow: -5px 0px 10px 0px rgba(0, 0, 0, 0.2);

    transition: right 0.4s ease;

    &.s-nav-mobile-wrapper-open {
      right: 0;
    }
  }
</style>
