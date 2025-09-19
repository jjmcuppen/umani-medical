<template>
  <v-radio-group
    v-bind="_properties"
  >
    <v-checkbox
      v-for="option in field.options"
      :key="option._uid"
      v-model="currentValue"
      :name="_fieldName"
      :label="option.name"
      :value="option.name"
      :rules="_rules"
      color="#000000"
      hide-details
    />
  </v-radio-group>
</template>

<script>
  export default {
    name: 'SFormFieldCheckbox',
    
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
        type: [ Array, String ],
        default: null
      }
    },
    
    data() {
      return {
        currentValue: this.value
      }
    },
    
    computed: {
      _properties() {
        return {
          value: this.currentValue,
          label: this._label,
          rules: this._rules,
          required: this._required
        }
      },
      
      _fieldName() {
        return this.field.options.length > 1 ? `${this.field.name}[]` : this.field.name;
      },
      
      _label() {
        return this.field.name + (this._required ? ' *' : '') || '';
      },
      
      _rules() {
        const message = this.field.options.length > 1 ?
          this.$t('form.field.checkbox.rules.multiple') :
          this.$t('form.field.checkbox.rules.single');
        
        return this._required ? [
          this.field.options.length > 1 ?
            v => (v && v.length > 0) || message :
            v => !!v || message
        ] : [];
      },
      
      _required() {
        return this.field.required || false;
      }
    },
    
    watch: {
      value(value) {
        this.currentValue = value;
      },
      
      currentValue(value) {
        this.$emit('input', value);
      }
    }
  }
</script>
