<template>
  <v-text-field
    v-bind="_properties"
    single-line
    outlined
    @input="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: 'SFormFieldText',
    
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
          type: this._type,
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
      
      _type() {
        return this.field.type || 'text';
      },
      
      _rules() {
        return this._required ? [
          v => !!v || this.$t('form.field.text.rules.empty')
            .replace(':name', this.field.name.toLowerCase()),
          v => this._isEmail(v) || this.$t('form.field.text.rules.email')
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    },
    
    methods: {
      _isEmail(value) {
        return (this._type !== 'email' || (this._type === 'email' && /.+@.+\..+/.test(value)));
      },
    }
  }
</script>
