<template>
  <div
    v-editable="blok"
    class="page-sitemap"
  >
    <s-breadcrumbs
      :story="story"
    />
    <section
      class="content-sitemap"
    >
      <v-container
        py-0
        px-6
      >
        <v-row
          no-gutters
        >
          <v-col>
            <div
              class="content"
            >
              <h1>{{ blok.title }}</h1>
            </div>
            <div
              class="sitemap"
            >
              <s-sitemap />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import SBreadcrumbs from '@/components/SBreadcrumbs';
  import SSitemap from '@/components/SSitemap'

  export default {
    name: 'PageSitemap',

    components: {
      SBreadcrumbs,
      SSitemap
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
      layoutClass() {
        return `layout-color-${this.blok.layoutColor}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .page-sitemap {
    .content-sitemap {
      height: 100%;
  
      position: relative;
  
      overflow: hidden;
    }
  }
</style>
