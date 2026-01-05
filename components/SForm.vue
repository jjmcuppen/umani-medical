<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div
    class="s-form"
  >
    <v-form
      ref="form"
      v-model="valid"
      name="Contact Form"
      data-netlify="1"
      lazy-validation
      novalidate
      netlify
    >
      <v-alert
        v-model="alert.enable"
        :type="alert.type"
        :icon="alert.icon"
        transition="scale-transition"
      >
        {{ alert.message }}
      </v-alert>

      <div
        class="field"
      >
        <input
          type="hidden"
          name="form-name"
          :value="_subject"
        >
      </div>

      <div
        v-for="field in fields"
        :key="field._uid"
        class="field"
      >
        <component
          :is="_component(field)"
          v-model="values[field.name]"
          :field="field"
        />
      </div>

      <!-- <div
        v-if="recaptcha && $recaptcha.hideBadge"
        class="recaptcha-no-badge"
      >
        <p
          v-html="$t('form.recaptcha')"
        />
      </div> -->
      <s-button
        :disabled="_disabled"
        type="submit"
        theme="secondary"
      >
        {{ $t('form.send') }}
      </s-button>
    </v-form>
  </div>
</template>

<script>
  import JSZip from 'jszip';

  import {
    getResolution
  } from 'assets/js/image';

  import SButton from '@/components/SButton';

  import SFormFieldCheckbox from '@/components/SFormFieldCheckbox';
  import SFormFieldFile from '@/components/SFormFieldFile';
  import SFormFieldRadio from '@/components/SFormFieldRadio';
  import SFormFieldSelect from '@/components/SFormFieldSelect';
  import SFormFieldText from '@/components/SFormFieldText';
  import SFormFieldTextarea from '@/components/SFormFieldTextarea';

  export default {
    name: 'SForm',

    components: {
      SButton,
      SFormFieldCheckbox,
      SFormFieldFile,
      SFormFieldRadio,
      SFormFieldSelect,
      SFormFieldText,
      SFormFieldTextarea
    },

    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      fields: {
        type: Array,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      // recaptcha: {
      //   type: Boolean,
      //   default: true
      // },
      // recaptchaAction: {
      //   type: String,
      //   default: ''
      // },
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
      const values = {};

      this.fields.forEach(field => {
        let value = '';
        if (
          (field.component === 'form-field-checkbox' && field.options.length > 1) ||
          (field.component === 'form-field-file')) {
          value = [];
        }

        values[field.name] = value;
      });

      return {
        values: values,
        valid: false,
        submitting: false,
        alert: {
          enable: false,
          message: '',
          type: 'success',
          icon: false
        }
      };
    },

    // computed: {
    //   _action() {
    //     return this.action.startsWith('/') ? this.action.replace(/^\/+/, '') : this.action;
    //   },

    //   // _recaptchaAction() {
    //   //   return this.recaptchaAction || this.action.replace(/[^A-Za-z/_]+/, '');
    //   // },

    //   _subject() {
    //     const path = this.$route.path.replace(/\/$/, '');

    //     return `${this.blok.submitSubject} - ${path}` || `Form - ${path}`;
    //   },

    //   _message() {
    //     return this.blok.submitMessage || this.$t('form.default.success');
    //   },

    //   _disabled() {
    //     return !this.valid || this.submitting;
    //   },

    //   _link() {
    //     return this.$isLink(this.blok.submitLink) && this.$getLink(this.blok.submitLink);
    //   },

    //   _linkStyle() {
    //     return this.blok.submitLinkStyle || 'blue';
    //   }
    // },

    // async mounted() {
      // if (this.recaptcha) {
      //   await this.$recaptcha.init();
      // }
    // },

    methods: {
      // async submit() {
      //   this.alert.enable = false;

      //   if (!this.$refs.form.validate()) {
      //     return;
      //   }

      //   this.submitting = true;

      //   let token;
      //   // try {
      //   //   token = this.recaptcha && await this.$recaptcha.execute(this._recaptchaAction);
      //   // }
      //   // catch (e) {
      //   //   throw `Recaptcha failed ${(e || '').toString()}`
      //   // }

      //   try {
      //     const { route, settings: { logoDesktop }} = this.$store.state;

      //     let width = 200;
      //     if (logoDesktop && logoDesktop.filename) {
      //       const [ w, h ] = getResolution(logoDesktop.filename);

      //       width = w && h ? Math.min(Math.max((w * (100 / h)), 100), 350) : width;
      //     }

      //     const {
      //       mailValues,
      //       mailAttachments,
      //       netlifyValues
      //     } = await this.processValues(this.values);

      //     await Promise.all([
      //       // Process form submission and save form to netlify
      //       this.$axios.$post('/', this.encodeData({
      //         'form-name': this._subject,
      //         ...netlifyValues
      //       }), {
      //         headers: {
      //           'Content-Type': 'multipart/form-data'
      //         }
      //       }),
      //       // Process form submission and send/confirmation result mail
      //       this.$axios.$post(`/.netlify/functions/${this._action}`, {
      //         ...token ? {
      //           token
      //         } : {},
      //         values: mailValues,
      //         attachments: mailAttachments,
      //         options: {
      //           logo: {
      //             src: logoDesktop && logoDesktop.filename || false,
      //             width: `${width}px`
      //           },
      //           route: route,
      //           story_id: this.story.uuid,
      //           component_id: this.blok._uid
      //         }
      //       })
      //     ]);

      //     // fire event when data has been submitted
      //     this.$emit('submitted');

      //     if (this._link) {
      //       if (this._link.includes('://')) {
      //         return location.href = this._link;
      //       }

      //       return await this.$router.push(this._link);
      //     }

      //     this.$refs.form.reset();

      //     this.$emit('input', { ...this.values });

      //     this.alert.type = 'success';
      //     this.alert.message = this._message;

      //   } catch (error) {
      //     // eslint-disable-next-line
      //     console.error(!!error && error.toString());

      //     this.alert.type = 'error';
      //     this.alert.message = this.$t('form.default.error');
      //   }

      //   this.alert.enable = true;
      //   this.submitting = false;

      //   await this.$vuetify.goTo(this.$refs.form, {
      //     offset: 110
      //   });
      // },

      // async processValues(values) {
      //   let mailValues = {};
      //   let mailAttachments = [];

      //   let netlifyValues = {};

      //   for (let key of Object.keys(values)) {
      //     let value = values[key];

      //     if (value instanceof Array && value[0] instanceof File) {
      //       const zip = new JSZip();

      //       for (let file of value) {
      //         zip.file(file.name, file);
      //       }

      //       const zipFile = await zip.generateAsync({
      //         type : 'blob'
      //       }).then(blob => {
      //         return new File([blob], `${key}.zip`, {
      //           lastModified: Date.now(),
      //           type: 'application/zip'
      //         });
      //       });

      //       mailAttachments.push({
      //         name: `${key}.zip`,
      //         data: await this.getBase64(zipFile)
      //       });

      //       mailValues[key] = value.map(file => file.name);

      //       netlifyValues[key] = zipFile;
      //     } else {
      //       mailValues[key] = netlifyValues[key] = value;
      //     }
      //   }

      //   return {
      //     mailValues,
      //     mailAttachments,
      //     netlifyValues
      //   }
      // },

      // encodeData(values) {
      //   const formData = new FormData();

      //   Object.keys(values).forEach((key) => formData.append(key, values[key]));

      //   return formData;
      // },

      // async getBase64(file) {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = () => {
      //       let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      //       if ((encoded.length % 4) > 0) {
      //         encoded += '='.repeat(4 - (encoded.length % 4));
      //       }
      //       resolve(encoded);
      //     };
      //     reader.onerror = error => reject(error);
      //   });
      // },

      _component(field) {
        return `s-${field.component}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-form {

    ::v-deep {
      .v-input .v-label {
        height: auto;
      }

      .v-input--selection-controls {
        margin-top: 0;

        .v-label {
          /*color: #ffffff !important;*/
        }
      }

      .v-input--radio-group__input > .v-label {
        font-weight: 600;
      }

      .v-input--checkbox {
        margin: 0 16px 8px 0;
        padding: 0;

        .v-input__slot {
          margin: 0;
        }
      }

      .v-messages {
        margin-top: 0;
        margin-bottom: 0;

        &.error--text {
          .v-messages__message {
            color: #212121 !important;
            font-size: 0.6rem;
            font-weight: 600;

            caret-color: #212121 !important;
          }
        }

        .v-messages__message {
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .recaptcha-no-badge,
      .recaptcha-no-badge a {
        margin-bottom: 16px;

        font-size: 0.75rem;
      }
    }
  }


</style>
