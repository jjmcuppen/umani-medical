<template>
  <div
    class="s-nav-mobile"
  >
    <s-nav-mobile-button />
    <s-nav-mobile-overlay />
    <s-nav-mobile-wrapper />
  </div>
</template>

<script>
  import SNavMobileButton from '@/components/SNavMobileButton';
  import SNavMobileOverlay from '@/components/SNavMobileOverlay';
  import SNavMobileWrapper from '@/components/SNavMobileWrapper';

  export default {
    name: 'SNavMobile',

    components: {
      SNavMobileButton,
      SNavMobileOverlay,
      SNavMobileWrapper
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-nav-mobile {
    height: 100%;
    min-height: var(--header-height-mobile);

    position: relative;
    z-index: 1001;
  }
</style>
