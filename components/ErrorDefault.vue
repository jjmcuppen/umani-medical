<!-- eslint-disable vue/max-attributes-per-line vue/singleline-html-element-content-newline -->
<template>
  <section>
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          lg="10"
          xl="8"
        >
          <div class="error-message">
            <h1>Er is een fout opgetreden.</h1>
            <p>Klik <nuxt-link to="/" title="Home">hier</nuxt-link> om terug te keren naar de homepagina.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
	export default {
		name: 'ErrorDefault'
	}
</script>
