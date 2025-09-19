<template>
  <div
    v-if="_locale.alternates.length"
    class="s-nav-mobile-locales"
  >
    <ul>
      <li
        v-for="alternate in _locale.alternates"
        :key="alternate.lang"
      >
        <span
          :title="alternate.language"
          @click="switchLang(alternate.slug)"
        >
          {{ alternate.language }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SNavMobileLocales',

  computed: {
    _locale() {
      let { current, alternates } = this.$store.state.locale;

      return {
        current,
        alternates
      };
    }
  },

  methods: {
    switchLang(slug) {
      this.$cookies.set('lang-switched', true, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      window.location = this.$getSlug(slug, true);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
@import '~assets/scss/breakpoint.scss';

.s-nav-mobile-locales {
  width: 100%;

  position: relative;
  z-index: 2;

  background-color: var(--nav-mobile-bg-color);

  border-top: 1px solid rgba(255, 255, 255, 0.15);

  ul {
    height: auto;

    margin: 0;
    padding: 0;

    list-style: none;

    > li {
      height: 100%;

      display: block;

      position: relative;

      > span {
        display: block;

        margin: 0;
        padding: 12px 24px;

        color: var(--nav-mobile-locales-font-color);
        font: {
          family: var(--nav-mobile-locales-font-family);
          weight: var(--nav-mobile-locales-font-weight);
          size: var(--nav-mobile-locales-font-size);
        }
        line-height: var(--nav-mobile-locales-line-height);

        text-decoration: none;
      }
    }
  }
}
</style>
