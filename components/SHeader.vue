<template>
  <header
    class="s-header"
  >
    <s-header-desktop />
    <s-header-mobile />
  </header>
</template>

<script>
  import SHeaderDesktop from '@/components/SHeaderDesktop';
  import SHeaderMobile from '@/components/SHeaderMobile';
  
  export default {
    name: 'SHeader',
    
    components: {
      SHeaderDesktop,
      SHeaderMobile
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .s-header {
    width: 100%;
    
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
  
    background-color: var(--header-bg-color);
    
    box-shadow: var(--header-shadow);
    
    ::v-deep {
      .s-header-desktop {
        display: none;
      }
      
      .s-header-mobile {
        display: flex;
      }
      
      @include breakpoint(lg-and-up) {
        .s-header-desktop {
          display: flex;
        }
        
        .s-header-mobile {
          display: none;
        }
      }
    }
  }
</style>