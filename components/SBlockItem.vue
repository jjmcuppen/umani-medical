<template>
  <v-col
    v-bind="cols"
    class="s-block-item"
  >
    <component
      :is="_component"
      :story="story"
      :blok="blok"
      :item="item"
    />
  </v-col>
</template>

<script>
  export default {
    name: 'SBlockItem',
    
    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      cols: {
        type: Object,
        required: true
      },
      component: {
        type: String,
        default: null
      }
    },
    
    computed: {
      _component() {
        return this.component || this.item.component;
      }
    }
  }
</script>