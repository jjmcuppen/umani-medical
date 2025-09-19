<template>
  <component
    :is="_component"
    v-bind="_attrs"
    class="s-link"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    name: 'SLink',

    props: {
      to: {
        type: [ Object, String ],
        required: true
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
      }
    },

    computed: {
      _component() {
        return typeof this.to === 'string' && this.to.includes(':') ? 'a' : 'nuxt-link';
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

          default: return {};
        }
      }
    }
  }
</script>
