<template>
  <ul
    v-observe-visibility="visibility"
    :class="{ right: right }"
  >
    <li
      v-for="item in items"
      :key="item._uid"
    >
      <s-link
        v-if="_link(item)"
        :to="_link(item)"
        :title="item.name"
        :class="_linkClass(item)"
      >
        <span
          v-if="item.icon && item.icon.selected"
          class="material-icons icon"
        >
          {{ item.icon.selected }}
        </span>
        <span
          v-if="!item.hideNameDesktop"
          class="name"
        >
          {{ item.name }}
        </span>
      </s-link>
      <s-nav-desktop-items
        v-if="_hasChildren(item)"
        :items="item.children"
      />
    </li>
  </ul>
</template>

<script>
  import SLink from '@/components/SLink';

  export default {
    name: 'SNavDesktopItems',

    components: {
      SLink
    },

    props: {
      items: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        right: false
      }
    },
    
    methods: {
      _linkClass(item) {
        return [
          { 'call-to-action': item.callToAction },
          { 'has-children': item.children && item.children.length },
        ]
      },
      
      _link(item) {
        return this.$isLink(item.link) && this.$getLink(item.link);
      },
      
      _hasChildren(item) {
        return item.children && item.children.length;
      },
  
      visibility(visible, entry) {
        if (visible) {
          const target = entry.target;
          const bounding = target.getBoundingClientRect();
          
          // Right side is out of viewport
          if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
            this.right = true;
          }
          
        } else {
          this.right = false;
        }
      }
    }
  }
</script>