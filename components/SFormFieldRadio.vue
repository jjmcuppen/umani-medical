<template>
  <v-radio-group
    v-bind="_properties"
    @change="$emit('input', $event)"
  >
    <v-radio
      v-for="option in field.options"
      :key="option._uid"
      :name="_fieldName"
      :label="option.name"
      :value="option.name"
      color="#000000"
    />
  </v-radio-group>
</template>

<script>
  export default {
    name: 'SFormFieldRadio',
    
    props: {
      field: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: null
      },
      value: {
        type: String,
        default: ''
      }
    },
    
    computed: {
      _properties() {
        return {
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
          v => !!v || this.$t('form.field.radio.rules.empty')
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    }
  }
</script>
