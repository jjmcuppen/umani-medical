<template>
  <div
    :class="_panelClass"
  >
    <div
      class="s-nav-mobile-panel-header"
    >
      <span
        v-if="index > 0"
        class="back"
        @click.prevent="closePanel()"
      />
      <span
        v-if="index > 0"
        class="name"
      >
        {{ panel.name }}
      </span>
      <span
        class="close"
        @click.prevent="closeNav()"
      />
    </div>
    <div
      class="s-nav-mobile-panel-items"
    >
      <ul>
        <li
          v-for="item in panel.children"
          :key="item._uid"
        >
          <s-link
            v-if="_link(item)"
            :to="_link(item)"
            :title="item.name"
            :class="_linkClass(item)"
          >
            <span
              class="name"
            >
              {{ item.name }}
            </span>
            <span
              v-if="_hasChildren(item)"
              class="children"
              @click.prevent="openPanel(item)"
            />
          </s-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SLink from '@/components/SLink';

  export default {
    name: 'SNavMobilePanel',

    components: {
      SLink
    },

    props: {
      index: {
        type: Number,
        required: true
      },
      panel: {
        type: Object,
        required: true
      },
      panelsOpened: {
        type: Array,
        required: true
      }
    },

    computed: {
      _isOpen() {
        return this.index === 0 || this.panelsOpened.includes(this.panel._uid);
      },

      _isSubOpen() {
        let open = false;
        this.panel.children.forEach(child => {
          if (this.panelsOpened.includes(child._uid)) {
            open = true;
          }
        });

        return open;
      },

      _panelClass() {
        return {
          's-nav-mobile-panel': true,
          's-nav-mobile-panel-open': this._isOpen,
          's-nav-mobile-panel-sub-open': this._isSubOpen,
        }
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

      openPanel(item) {
        this.$emit('onOpenPanel', item);
      },

      closePanel() {
        this.$emit('onClosePanel', this.panel);
      },

      closeNav() {
        this.$emit('onCloseNav');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';

  .s-nav-mobile-panel {
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    background-color: var(--nav-mobile-bg-color);

    overflow: hidden;

    transform: translate3d(100%, 0, 0);

    transition:
      transform 0.4s ease,
      -webkit-transform 0.4s ease;

    &.s-nav-mobile-panel-open {
      transform: translate3d(0, 0, 0);
    }

    &.s-nav-mobile-panel-sub-open {
      transform: translate3d(-50%, 0, 0);
    }

    .s-nav-mobile-panel-header {
      height: 60px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      background-color: var(--nav-mobile-header-bg-color);

      .back {
        flex: 0 0 60px;

        position: relative;

        &:before {
          @include material('keyboard_arrow_left');

          position: absolute;
          top: 50%;
          left: 50%;

          color: var(--nav-mobile-header-back-font-color);
          font-size: 2.2rem;
          font-weight: 700;

          transform: translate(-50%, -50%);
        }
      }

      .name {
        flex: 1 1 auto;

        margin: 0;
        padding: 0 16px;

        color: var(--nav-mobile-header-font-color);
        font-family: var(--nav-mobile-header-font-family);
        font-weight: var(--nav-mobile-header-font-weight);
        font-size: var(--nav-mobile-header-font-size);
        line-height: 1;

        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;
      }

      .close {
        flex: 0 0 60px;

        position: relative;

        &:before {
          @include material('close');

          position: absolute;
          top: 50%;
          left: 50%;

          color: var(--nav-mobile-header-close-font-color);
          font-size: 2.2rem;
          font-weight: 700;

          transform: translate(-50%, -50%);
        }
      }
    }

    .s-nav-mobile-panel-items {
      height: calc(100% - 60px);
      width: 100%;

      overflow: scroll;
      overflow-x: hidden;
      overflow-y: auto;

      -webkit-overflow-scrolling: touch;

      ul {
        height: auto;
        min-height: 100%;

        margin: 0;
        padding: 0;

        list-style: none;

        li {
          height: 100%;

          display: block;

          position: relative;

          > a {
            display: block;

            margin: 0;
            padding: 16px 84px 16px 24px;

            position: relative;

            color: var(--nav-mobile-font-color);
            font-family: var(--nav-mobile-font-family);
            font-weight: var(--nav-mobile-font-weight);
            font-size: var(--nav-mobile-font-size);
            line-height: 1.25;

            background-color: var(--nav-mobile-bg-color);

            text-transform: var(--nav-mobile-text-transform);
            text-decoration: none;

            &:hover,
            &.nuxt-link-active:not([href='/']),
            &.nuxt-link-exact-active {
              color: var(--nav-mobile-font-color-hover);

              background-color: var(--nav-mobile-bg-color-hover);
            }

            > span.name {
              height: 100%;
              width: 100%;

              display: block;

              background-color: transparent;

              white-space: nowrap;
              text-overflow: ellipsis;

              overflow: hidden;
            }

            > span.children {
              height: 100%;
              width: 60px;

              display: block;

              position: absolute;
              top: 0;
              right: 0;
              z-index: 1;

              background-color: transparent;

              &:before {
                @include material('keyboard_arrow_right');

                position: absolute;
                top: 50%;
                left: 50%;

                color: var(--nav-mobile-before-color);
                font-size: 2rem;
                font-weight: 500;

                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
    }
  }
</style>
