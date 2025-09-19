<template>
  <v-file-input
    v-bind="_properties"
    show-size
    single-line
    outlined
    @change="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: 'SFormFieldFile',
    
    props: {
      field: {
        type: Object,
        required: true
      },
      value: {
        type: Array,
        default: null
      }
    },
    
    computed: {
      _properties() {
        return {
          backgroundColor: '#ffffff',
          color: '#000000',
          prependIcon: '',
          prependInnerIcon: 'attach_file',
          name: this._fieldName,
          value: this.value,
          label: this._label,
          multiple: this._multiple,
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
      
      _multiple() {
        return this.field.multiple || false;
      },
      
      _rules() {
        const message = this._multiple ?
          this.$t('form.field.file.rules.multiple') :
          this.$t('form.field.file.rules.single');
        
        return this._required ? [
          v => (v && v.length > 0) || message
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    }
  }
</script>
