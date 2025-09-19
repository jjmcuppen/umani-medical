<!-- eslint-disable vue/no-v-html -->
<template>
  <component
    :is="tag"
    class="s-textarea"
    v-html="_text"
  />
</template>

<script>
  import nl2br from '@/assets/js/nl2br';
  import sanitize from '@/assets/js/sanitize';

  export default {
    name: 'SText',

    props: {
      text: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        default: 'div'
      }
    },

    computed: {
      _text() {
        return nl2br(sanitize(this.text));
      }
    }
  }
</script>
