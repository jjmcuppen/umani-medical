<template>
  <component
    :is="_titleTag"
    :class="_titleClass"
  >
    {{ blok.title }}
  </component>
</template>

<script>
  export default {
    name: 'STitle',
    
    props: {
      blok: {
        type: Object,
        required: true
      },
    },
    
    computed: {
      _titleTag() {
        return this.blok.titleTag || 'h1';
      },
  
      _titleClass() {
        return [
          's-title',
          `s-title-color-${this.blok.titleColor}`,
          {
            [`s-title-border-${this.blok.borderColor}`]: !!this.blok.borderVisible
          }
        ];
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .s-title {
    display: inline-block;
    
    margin: 0;
    padding-bottom: 0;
    
    position: relative;
  
    &.s-title-color-primary {
      color: var(--heading-font-color-primary);
    }
  
    &.s-title-color-secondary {
      color: var(--heading-font-color-secondary);
    }
  
    &.s-title-border-primary {
      padding-bottom: 1rem;
    
      &:before {
        display: block;
      
        background-color: var(--heading-before-color-primary);
      }
    }
  
    &.s-title-border-secondary {
      padding-bottom: 1rem;
    
      &:before {
        display: block;
      
        background-color: var(--heading-before-color-secondary);
      }
    }
  
    &:before {
      content: '';
    
      height: 4px;
      width: 100%;
    
      display: none;
    
      margin: 0;
      padding: 0;
    
      position: absolute;
      bottom: calc(0.5rem - 2px);
    
      background-color: var(--heading-before-color);
    }
  }
</style>