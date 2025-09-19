<template>
  <component :is="_component" />
</template>

<script>
  import ErrorDefault from '@/components/ErrorDefault';
  import Error404 from '@/components/Error404';

  export default {
    name: 'Error',

    components: { ErrorDefault, Error404 },

    props: {
      error: {
        type: Object,
        default: () => ({})
      }
    },
    
    computed: {
      _component() {
        return this.error.statusCode === 404 ? 'error-404' : 'error-default';
      }
    }
  }
</script>
