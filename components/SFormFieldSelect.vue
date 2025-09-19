<template>
  <v-select
    v-bind="_properties"
    single-line
    outlined
    @input="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: 'SFormFieldSelect',
    
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
          items: this._items,
          itemText: 'name',
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
      
      _items() {
        return this.field.options || [];
      },
      
      _rules() {
        return this._required ? [
          v => !!v || this.$t('form.field.select.rules.empty')
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    }
  }
</script>
