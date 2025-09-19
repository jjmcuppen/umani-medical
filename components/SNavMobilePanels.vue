<template>
  <div
    class="s-nav-mobile-panels"
  >
    <s-nav-mobile-panel
      v-for="(panel, index) in _panels"
      :key="panel._uid"
      :index="index"
      :panel="panel"
      :panels-opened="panelsOpened"
      @onOpenPanel="_openPanel"
      @onClosePanel="_closePanel"
      @onCloseNav="_closeNav"
    />
  </div>
</template>

<script>
  import SNavMobilePanel from '@/components/SNavMobilePanel';

  export default {
    name: 'SNavMobilePanels',

    components: {
      SNavMobilePanel
    },

    data() {
      return {
        panelsOpened: []
      }
    },

    computed: {
      _items() {
        return this.$store.state.settings.navMain || [];
      },

      _panels() {
        return [{
          name: '',
          children: this._items,
        }].concat(this._flatten(this._items));
      }
    },

    methods: {
      _openPanel(item) {
        this.panelsOpened.push(item._uid);
      },

      _closePanel(item) {
        this.panelsOpened = this.panelsOpened.filter(id => {
          return id !== item._uid;
        });
      },

      _closeNav() {
        this.$store.commit('mobile/setNoScroll', false);
        this.$store.commit('mobile/setNavMobileOpen', false);
      },

      _flatten(items) {
        let tree = [];

        items.forEach(item => {
          if (item.children && item.children.length) {
            tree.push(item);
            tree = tree.concat(this._flatten(item.children));
          }
        });

        return tree;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-nav-mobile-panels {
    height: 100%;
    width: 100%;

    position: relative;
    z-index: 1;

    /*
    max-width: 400px;

    position: fixed;
    top: 0;
    right: -100%;
    z-index: 1002;

    overflow: hidden;

    box-shadow: -5px 0px 10px 0px rgba(0, 0, 0, 0.2);

    transition: right 0.4s ease;

    &.s-nav-mobile-panels-open {
      right: 0;
    }
     */
  }
</style>
