<template>
  <div
    :class="_navClass"
    class="s-nav-desktop"
  >
    <nav>
      <s-nav-desktop-items
        :items="_items"
      />
    </nav>
    <s-nav-desktop-locales />
  </div>
</template>

<script>
  import SNavDesktopItems from '@/components/SNavDesktopItems';
  import SNavDesktopLocales from "@/components/SNavDesktopLocales";

  export default {
    name: 'SNavDesktop',

    components: {
      SNavDesktopItems,
      SNavDesktopLocales
    },

    computed: {
      _items() {
        return this.$store.state.settings.navMain || [];
      },

      _locale() {
        let { current, alternates } = this.$store.state.locale;

        return {
          current,
          alternates
        };
      },

      _navClass() {
        switch(this.$store.state.settings.navMainAlignment || 'right') {
          case 'left': return 'justify-start';
          case 'center': return 'justify-center';
          default: return 'justify-end';
        }
      }
    },

    methods: {
      _link(slug) {
        return this.$getSlug(slug);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  @import '~assets/scss/material.scss';

  .s-nav-desktop {
    height: 100%;
    min-height: var(--header-height-desktop);

    display: flex;
    justify-content: flex-end;

    margin: 0;
    padding-right: 12px;

    position: relative;
    z-index: 1001;

    &.justify-start {
      margin-left: 24px;
    }

    &.justify-center {
      margin-left: 24px;
      margin-right: 200px;
    }

    ::v-deep nav {
      > ul {
        margin: 0;
        padding: 0;

        list-style: none;

        vertical-align: top;

        > li {
          height: var(--header-height-desktop);

          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;

          position: relative;

          &:first-child a,
          &:first-child a.call-to-action {
            margin-left: 0;
          }

          &:last-child a,
          &:last-child a.call-to-action {
            margin-right: 0;
          }

          > a {
            height: var(--header-height-desktop);

            display: flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;

            margin: 0;
            padding: 0 16px;

            position: relative;

            color: var(--nav-desktop-font-color);
            font-family: var(--nav-desktop-font-family);
            font-weight: var(--nav-desktop-font-weight);
            font-size: var(--nav-desktop-font-size);
            line-height: var(--nav-desktop-line-height);

            background-color: var(--nav-desktop-bg-color);

            text-transform: var(--nav-desktop-text-transform);
            text-decoration: none;

            white-space: nowrap;

            vertical-align: middle;

            > span.name {
              display: inline-block;
            }

            &:hover,
            &.nuxt-link-active:not([href='/']),
            &.nuxt-link-exact-active {
              color: var(--nav-desktop-font-color-hover);

              background-color: var(--nav-desktop-bg-color-hover);
            }

            &.has-children {
              padding-right: 32px;

              &:before {
                @include material('keyboard_arrow_down');

                position: absolute;
                top: 50%;
                right: 8px;

                color: var(--nav-desktop-font-color);
                font-size: 1rem;
                line-height: 1;

                transform: translateY(-50%);
              }

              &:hover,
              &.nuxt-link-active:not([href='/']),
              &.nuxt-link-exact-active {
                &:before {
                  color: var(--nav-desktop-font-color-hover);
                }
              }
            }

            &.call-to-action {
              height: auto;

              margin: 0 10px;
              padding: 12px 20px;

              color: var(--nav-desktop-cta-font-color);
              font-family: var(--nav-desktop-cta-font-family);
              font-weight: var(--nav-desktop-cta-font-weight);
              font-size: var(--nav-desktop-cta-font-size);
              line-height: var(--nav-desktop-cta-line-height);

              text-align: center;

              background-color: var(--nav-desktop-cta-bg-color);

              border: var(--nav-desktop-cta-border);
              border-radius: var(--nav-desktop-cta-border-radius);

              &:before {
                content: '';

                height: 100%;
                width: 0;

                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;

                background-color: var(--nav-desktop-cta-bg-hover-color);

                opacity: 0.1;

                transition: width 0.3s;
              }

              &:hover,
              &:focus {
                color: var(--nav-desktop-cta-font-color-hover);

                background-color: var(--nav-desktop-cta-bg-color-hover);
              }
            }
          }

          ul {
            min-width: 200px;

            display: block;

            margin: 0;
            padding: 0;

            background-color: var(--nav-desktop-child-bg-color);

            box-shadow: var(--nav-desktop-child-box-shadow);

            list-style: none;

            > li {
              display: block;

              position: relative;

              > a {
                display: block;

                margin: 0;
                padding: 16px;

                position: relative;

                color: var(--nav-desktop-child-font-color);
                font-family: var(--nav-desktop-child-font-family);
                font-weight: var(--nav-desktop-child-font-weight);
                font-size: var(--nav-desktop-child-font-size);
                line-height: var(--nav-desktop-child-line-height);

                text-transform: var(--nav-desktop-child-text-transform);
                text-decoration: none;

                white-space: nowrap;

                &:hover,
                &.nuxt-link-active:not([href='/']),
                &.nuxt-link-exact-active {
                  color: var(--nav-desktop-child-font-color-hover);

                  background-color: var(--nav-desktop-child-bg-color-hover);
                }

                &.has-children {

                  padding-right: 32px;

                  &:before {
                    @include material('keyboard_arrow_right');

                    position: absolute;
                    top: 50%;
                    right: 6px;

                    color: var(--nav-desktop-child-font-color);
                    font-size: 1.2rem;
                    line-height: 1;

                    transform: translateY(-50%);
                  }

                  &:hover,
                  &.nuxt-link-active:not([href='/']),
                  &.nuxt-link-exact-active {
                    &:before {
                      color: var(--nav-desktop-child-font-color-hover);
                    }
                  }
                }
              }
            }
          }
        }
      }

      ul {
        display: flex;

        margin: 0;
        padding: 0;

        list-style: none;

        li:hover > ul {
          left: 0;

          opacity: 1;

          &.right {
            left: auto;
            right: 0;
          }
        }

        ul {
          position: absolute;
          top: 100%;
          left: -999em;

          opacity: 0;

          transition: opacity 0s 0.1s ease;

          li:hover > ul {
            left: 100%;

            opacity: 1;

            &.right {
              left: auto;
              right: 100%;
            }
          }

          ul {
            top: 0;
          }
        }
      }
    }

    ::v-deep .s-nav-desktop-locales {
      > ul {
        margin: 0;
        padding: 0;

        list-style: none;

        vertical-align: top;

        > li {
          height: var(--header-height-desktop);

          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;

          position: relative;

          &:first-child a {
            margin-left: 0;
          }

          &:last-child a {
            margin-right: 0;
          }

          > a {
            height: var(--header-height-desktop);

            display: flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;

            margin: 0;
            padding: 0 32px 0 16px;

            position: relative;

            color: var(--nav-desktop-font-color);
            font-family: var(--nav-desktop-font-family);
            font-weight: var(--nav-desktop-font-weight);
            font-size: var(--nav-desktop-font-size);
            line-height: var(--nav-desktop-line-height);

            background-color: var(--nav-desktop-bg-color);

            text-transform: uppercase;
            text-decoration: none;

            white-space: nowrap;

            vertical-align: middle;

            &:before {
              @include material('keyboard_arrow_down');

              position: absolute;
              top: 50%;
              right: 8px;

              color: var(--nav-desktop-font-color);
              font-size: 1rem;
              line-height: 1;

              transform: translateY(-50%);
            }

            > span.name {
              display: inline-block;
            }

            &:hover,
            &.nuxt-link-active:not([href='/']),
            &.nuxt-link-exact-active {
              //color: var(--nav-desktop-font-color-hover);

              //background-color: var(--nav-desktop-bg-color-hover);

              &:before {
                //color: var(--nav-desktop-font-color-hover);
              }
            }
          }

          ul {
            min-width: 200px;

            display: block;

            margin: 0;
            padding: 0;

            background-color: var(--nav-desktop-child-bg-color);

            box-shadow: var(--nav-desktop-child-box-shadow);

            list-style: none;

            > li {
              display: block;

              position: relative;

              > span {
                display: block;

                margin: 0;
                padding: 16px;

                position: relative;

                color: var(--nav-desktop-child-font-color);
                font-family: var(--nav-desktop-child-font-family);
                font-weight: var(--nav-desktop-child-font-weight);
                font-size: var(--nav-desktop-child-font-size);
                line-height: var(--nav-desktop-child-line-height);

                text-transform: var(--nav-desktop-child-text-transform);
                text-decoration: none;

                white-space: nowrap;

                &:hover,
                &.nuxt-link-active:not([href='/']),
                &.nuxt-link-exact-active {
                  color: var(--nav-desktop-child-font-color-hover);

                  background-color: var(--nav-desktop-child-bg-color-hover);
                }
              }
            }
          }
        }
      }

      ul {
        display: flex;

        margin: 0;
        padding: 0;

        list-style: none;

        li:hover > ul {
          right: 0;

          opacity: 1;
        }

        ul {
          position: absolute;
          top: 100%;
          right: -999em;

          opacity: 0;

          transition: opacity 0s 0.1s ease;
        }
      }
    }
  }
</style>
