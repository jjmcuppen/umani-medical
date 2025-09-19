<template>
  <li>
    <nuxt-link
      :to="_to"
    >
      {{ item.name }}
    </nuxt-link>
    <ul
      v-if="item.children.length"
    >
      <s-sitemap-item
        v-for="child in item.children"
        :key="child.uuid"
        :item="child"
      />
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'SSitemapItem',

    props: {
      item: {
        type: Object,
        required: true
      }
    },
  
    computed: {
      _to() {
        return this.$getSlug(this.item.slug);
      }
    }
  }
</script>
