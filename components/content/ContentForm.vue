<template>
  <section-content
    :blok="blok"
    :cols="_cols"
  >
    <div
      class="content-form"
    >
      <v-row>
        <v-col
          cols="12"
          md="8"
          offset-md="2"
        >
          <s-form
            action="form-default"
            :fields="_fields"
            :story="_story"
            :blok="_blok"
            class="form"
          />
        </v-col>
      </v-row>
    </div>
  </section-content>
</template>

<script>
  import SForm from '@/components/SForm';

  export default {
    name: 'ContentForm',

    components: {
      SForm,
    },

    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      }
    },

    data() {
      return {}
    },

    computed: {
      _cols() {
        return {
          'cols': 12,
          'md': 10,
          'lg': 8,
          'offset-md': 1,
          'offset-lg': 2
        }
      },

      _fields() {
        return this.blok.fields || [];
      },

      _story() {
        return this.story || null;
      },

      _blok() {
        return this.blok || null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .content-form {
    height: 100%;

    position: relative;
    z-index: 2;
  }
</style>
