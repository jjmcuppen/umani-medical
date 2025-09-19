<template>
  <div
    v-editable="blok"
    :class="_pageClass"
  >
    <s-breadcrumbs
      :story="story"
    />
    <component
      :is="item.component"
      v-for="item in blok.components"
      :key="item._uid"
      :story="story"
      :blok="item"
    />
  </div>
</template>

<script>
  import SBreadcrumbs from '@/components/SBreadcrumbs';

  export default {
    name: 'PageContent',

    components: {
      SBreadcrumbs
    },

    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      }
    },

    computed: {
      _pageClass() {
        return [
          'page-content',
          { 'page-background-color': this.blok.background }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .page-content {
    background-color: #ffffff;

    &.page-background-color {
      background-color: var(--page-bg-color);

      .breadcrumbs {
        > .container {
          background-color: #ffffff;
        }
      }

      .section-banner,
      .section-content {
        &:not(.section-full-width) {
          &.section-background-none > .container {
            background-color: #ffffff;
          }
        }
      }
    }

    .content-banner-image:first-child,
    .content-banner-images:first-child {
      > .container {
        padding-top: 0 !important;
      }
    }
  }
</style>
