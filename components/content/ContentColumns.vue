<template>
  <section-content
    :blok="blok"
  >
    <div
      class="content-columns"
    >
      <v-row
        :align="_align"
        no-gutters
      >
        <component
          :is="item.component"
          v-for="(item, index) in _items"
          :key="item._uid"
          :story="story"
          :blok="blok"
          :item="item"
          :index="index"
        />
      </v-row>
    </div>
  </section-content>
</template>

<script>
  export default {
    name: 'ContentColumns',
    
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
      _items() {
        return this.blok.blocks || [];
      },
      
      _align() {
        return this.blok.align || 'center';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-columns {
    height: 100%;
  
    position: relative;
  }
</style>
