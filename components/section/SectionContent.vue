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
    name: 'SectionContent',

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
          'section-content',
          { 'section-full-width': this._width === 'full' },
          {
            [`section-background-${this.blok.background}`]: !!this.blok.background
          }
        ]
      },

      _containerClass() {
        return this._width === 'full' ? 'container--fluid pa-0' : (this.mounted && this.$vuetify.breakpoint.smAndUp ? 'py-8 px-6' : 'py-8 px-2');
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

  .section-content {
    height: 100%;

    background-color: transparent;

    position: relative;

    overflow: hidden;

    &.section-background-none {
      background-color: var(--section-bg-color-none);
    }

    &.section-background-white {
      background-color: var(--section-bg-color-white);
    }

    &.section-background-primary {
      background-color: var(--section-bg-color-primary);
    }

    &.section-background-secondary {
      background-color: var(--section-bg-color-secondary);
    }
  }
</style>
