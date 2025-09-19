<template>
  <component
    :is="_component"
    :class="_classes"
    v-bind="_attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    name: 'SButton',
    
    props: {
      to: {
        type: [ Object, String ],
        default: null
      },
      target: {
        type: String,
        default: '_blank',
        validator: value => [
          '_blank',
          '_self',
          '_top',
          '_parent'
        ].includes(value)
      },
      theme: {
        type: String,
        default: 'primary'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    
    computed: {
      _classes() {
        return [
          's-button',
          { 's-button-primary': this.theme === 'primary' },
          { 's-button-secondary': this.theme === 'secondary' },
          { 's-button-disabled': this._component !== 'button' && this.disabled }
        ];
      },
      
      _component() {
        return typeof this.to === 'string' && this.to.includes(':') ? 'a' : (this.to ? 'nuxt-link' : 'button');
      },
      
      _attrs() {
        switch (this._component) {
          case 'a': return {
            href: this.to,
            target: this.to.includes('://') ? this.target : null,
            rel: 'noopener'
          };
  
          case 'nuxt-link': return {
            to: this.to
          };
          
          default: return {
            disabled: this.disabled
          };
        }
      },
      
      _to() {
        if (typeof this.to === 'string' && !this.to.startsWith('/')) {
          return `/${this.to}`;
        }
        
        return this.to;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';
  
  .s-button {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
  
    position: relative;
    z-index: 1;
    
    cursor: pointer;
    
    outline: none;
    
    appearance: none;
    
    text-decoration: none;
    
    vertical-align: top;
    
    overflow: hidden;
    
    &:disabled,
    &.s-button-disabled {
      opacity: .5;
      
      cursor: default;
    }
    
    &.s-button-primary {
      margin: 0;
      padding: 15px 25px;
      
      color: var(--button-primary-font-color);
      font-family: var(--button-primary-font-family);
      font-weight: var(--button-primary-font-weight);
      font-size: var(--button-primary-font-size);
      line-height: var(--button-primary-line-height);
      
      text-transform: none;
      
      background-color: var(--button-primary-bg-color);
      
      border: var(--button-primary-border);
      border-radius: var(--button-primary-border-radius);
      
      &:hover,
      &:focus {
        background-color: var(--button-primary-bg-color-hover);
      }
    }
    
    &.s-button-secondary {
      margin: 0;
      padding: 15px 25px;
      
      color: var(--button-secondary-font-color);
      font-family: var(--button-secondary-font-family);
      font-weight: var(--button-secondary-font-weight);
      font-size: var(--button-secondary-font-size);
      line-height: var(--button-secondary-line-height);
      
      text-transform: none;
      
      background-color: var(--button-secondary-bg-color);
      
      border: var(--button-secondary-border);
      border-radius: var(--button-secondary-border-radius);
      
      &:hover,
      &:focus {
        background-color: var(--button-secondary-bg-color-hover);
      }
    }
  }
</style>
