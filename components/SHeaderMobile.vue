<template>
  <div
    class="s-header-mobile"
  >
    <v-container
      fluid
      pa-0
    >
      <v-row
        no-gutters
      >
        <v-col
          v-if="_logo"
          cols="auto"
        >
          <div
            class="logo"
          >
            <s-link
              target="_self"
              :to="_homePage"
              :title="_siteName"
            >
              <img
                :src="_logo"
                :alt="_siteName"
              >
            </s-link>
          </div>
        </v-col>
        <v-col>
          <s-nav-mobile />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import SLink from '@/components/SLink';
  import SNavMobile from '@/components/SNavMobile';

  export default {
    name: 'SHeaderMobile',

    components: {
      SLink,
      SNavMobile
    },

    computed: {
      _startsWith() {
        let { lang, root, prefix } = this.$store.state.config;

        return (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');
      },

      _homePage() {
        return this.$getSlug(this._startsWith);
      },

      _logo() {
        return this.$store.state.settings.logoMobile && this.$store.state.settings.logoMobile.filename || this.$store.state.settings.logoDesktop && this.$store.state.settings.logoDesktop.filename || false;
      },

      _siteName() {
        return this.$store.state.settings.siteName || false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-header-mobile {
    height: 100%;
    min-height: var(--header-height-mobile);

    position: relative;
    z-index: 1001;

    .logo {
      height: var(--header-height-mobile);

      display: flex;

      margin: 0;
      padding-left: 12px;

      position: relative;

      vertical-align: top;

      a {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        img {
          height: calc(100% - 30px);
          width: auto;

          display: inline-block;

          margin: 15px 0;
          padding: 0;
        }
      }
    }
  }
</style>
