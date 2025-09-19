<template>
  <v-textarea
    v-bind="_properties"
    single-line
    outlined
    @input="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: 'SFormFieldTextarea',
    
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: String,
        default: ''
      }
    },
    
    computed: {
      _properties() {
        return {
          backgroundColor: '#ffffff',
          color: '#000000',
          name: this._fieldName,
          value: this.value,
          label: this._label,
          rules: this._rules,
          required: this._required
        }
      },
      
      _fieldName() {
        return this.field.name;
      },
      
      _label() {
        return this.field.name + (this._required ? ' *' : '') || '';
      },
      
      _rules() {
        return this._required ? [
          v => !!v || this.$t('form.field.textarea.rules.empty')
            .replace(':name', this.field.name.toLowerCase())
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    }
  }
</script>
