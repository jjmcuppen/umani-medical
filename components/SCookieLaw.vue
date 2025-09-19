<template>
  <client-only>
    <cookie-law
      theme="base"
      @accept="accepted"
    >
      <template v-slot:default="{ accept }">
        <div class="s-cookie-law">
          <div class="text">
            {{ $t('cookie.text') }}
            <nuxt-link :to="_privacy">
              {{ $t('cookie.moreInfo') }}
            </nuxt-link>
          </div>
          <s-button
            theme="primary"
            @click="accept"
          >
            {{ $t('cookie.agree') }}
          </s-button>
        </div>
      </template>
    </cookie-law>
  </client-only>
</template>

<script>
  import CookieLaw from 'vue-cookie-law';

  import SButton from '@/components/SButton';

  export default {
    name: 'SCookieLaw',

    components: {
      CookieLaw,
      SButton
    },

    computed: {
      _privacy() {
        let { lang, root, prefix } = this.$store.state.config;

        let rootPath = (prefix ? `${root}/${lang}` : `${root}`).replace(/^\//g, '');

        return this.$getSlug(`${rootPath}/privacy-cookies/`);
      }
    },

    methods: {
      accepted() {
        // track event e.g. for analytics
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .Cookie {
    color: var(--cookie-font-color);

    background-color: var(--cookie-bg-color);
  }

  .s-cookie-law {
    display: flex;

    margin: 0;

    @include breakpoint(xs-only) {
      flex-direction: column;

      .text {
        text-align: center;

        margin-bottom: 1rem;
      }

      .s-button {
        justify-content: center;
      }
    }

    @include breakpoint(sm-and-up) {
      align-items: flex-end;
      justify-content: space-between;

      flex-grow: 1;

      .s-button {
        margin-left: 1rem;
      }
    }

    @include breakpoint(md-and-up) {
      align-items: center;
    }
  }
</style>
