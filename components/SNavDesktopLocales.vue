<template>
  <div
    v-if="_locale.alternates.length"
    class="s-nav-desktop-locales"
  >
    <ul>
      <li>
        <a href="#">{{ _locale.current.lang }}</a>
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
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SNavDesktopLocales',

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
