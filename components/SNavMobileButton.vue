<template>
  <div
    class="s-nav-mobile-button"
  >
    <div
      @click="openNav"
    >
      <span />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SNavMobileButton',
    
    methods: {
      openNav() {
        this.$store.commit('mobile/setNoScroll', true);
        this.$store.commit('mobile/setNavMobileOpen', true);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-nav-mobile-button {
    height: 100%;
    min-height: var(--header-height-mobile);
  
    margin: 0;
    padding-right: 12px;
    
    position: relative;
    
    vertical-align: top;
    
    div {
      height: var(--header-height-mobile);
      
      display: flex;
      justify-content: flex-end;
      
      margin: 0;
      padding: 0;
      
      position: relative;
      
      &:before,
      &:after,
      span {
        content: '';
        
        height: 5px;
        width: 45px;
        
        display: block;
        
        position: absolute;
        top: 37.5px;
        right: 0;
        
        background-color: var(--nav-mobile-button-bg-color);
        
        border-radius: 3px;
        
        transform: rotate(0);
        
        transition: width 0.25s 0.25s ease-in-out,
          top 0.25s 0.25s ease-in-out,
          opacity 0.25s 0.25s ease-in-out,
          transform 0.25s ease-in-out;
      }
      
      &:before {
        width: 40px;
        
        top: 26px;
      }
      
      &:after {
        width: 35px;
        
        top: 49px;
      }
    }
  }
</style>