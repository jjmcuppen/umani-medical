<template>
  <v-col
    v-bind="_cols"
  >
    <div
      class="item-column-text"
    >
      <div
        :class="_contentClass"
      >
        <s-textarea
          v-if="item.title"
          :text="item.title"
          :tag="_titleTag"
          :class="_titleClass"
        />
        <s-richtext
          v-if="item.text"
          :text="item.text"
          :class="_textClass"
        />
        <div
          v-if="_link"
          class="button"
        >
          <s-button
            :to="_link"
            :theme="_linkStyle"
          >
            {{ item.linkText || $t('link.readMore') }}
          </s-button>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script>
  import SButton from '@/components/SButton';
  import STextarea from '@/components/STextarea';
  import SRichtext from '@/components/SRichtext';

  export default {
    name: 'ItemColumnText',

    components: {
      SButton,
      STextarea,
      SRichtext
    },

    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },

    computed: {
      _cols() {
        return {
          'cols': 12,
          'sm': this._colSize
        };
      },

      _colSize() {
        return this.blok.cols.split(';')[this.index] || '6';
      },

      _colSide() {
        return this.index === 0 ? 'left' : 'right';
      },

      _contentClass() {
        return [
          'content',
          `content-${this._colSide}`,
          `content-text-align-${this._textAlignment}`
        ];
      },

      _titleTag() {
        return this.item.titleTag || 'h1';
      },

      _titleClass() {
        return [
          `title-color-${this.item.titleColor}`,
          {
            [`title-border-${this.item.borderColor}`]: !!this.item.borderVisible
          }
        ];
      },

      _textClass() {
        return [
          'text',
          `text-color-${this.item.textColor || 'default'}`
        ];
      },

      _textAlignment() {
        return this.item.textAlignment || 'left';
      },

      _link() {
        return this.$isLink(this.item.link) && this.$getLink(this.item.link);
      },

      _linkStyle() {
        return this.item.linkStyle || 'primary';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .section-full-width {
    .item-column-text {
      .content {
        padding: 24px;

        @include breakpoint(lg-and-up) {
          padding: 48px;
        }
      }
    }
  }

  .item-column-text {
    height: auto;

    position: relative;

    text-align: left;

    .content {
      padding: 24px 0;

      &.content-left {
        padding-right: 0;

        @include breakpoint(sm-and-up) {
          padding-right: 24px;
        }

        @include breakpoint(lg-and-up) {
          padding-right: 48px;
        }
      }

      &.content-right {
        padding-left: 0;

        @include breakpoint(sm-and-up) {
          padding-left: 24px;
        }

        @include breakpoint(lg-and-up) {
          padding-left: 48px;
        }
      }

      @include breakpoint(md-and-up) {
        &.content-text-align-left {
          text-align: left;
        }

        &.content-text-align-center {
          text-align: center;
        }

        &.content-text-align-right {
          text-align: right;
        }

        &.content-text-align-justify {
          text-align: justify;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        display: block;

        position: relative;

        &.title-color-white {
          color: #ffffff;
        }

        &.title-color-primary {
          color: var(--heading-font-color-primary);
        }

        &.title-color-secondary {
          color: var(--heading-font-color-secondary);
        }

        &.title-border-primary {
          padding-bottom: 1rem;

          &:before {
            display: block;

            background-color: var(--heading-before-color-primary);
          }
        }

        &.title-border-secondary {
          padding-bottom: 1rem;

          &:before {
            display: block;

            background-color: var(--heading-before-color-secondary);
          }
        }

        &:before {
          content: '';

          height: 4px;
          width: 350px;
          max-width: 100%;

          display: none;

          margin: 0;
          padding: 0;

          position: absolute;
          bottom: 8px;

          background-color: var(--heading-before-color);
        }
      }

      .text {
        &.text-color-white {
          color: #ffffff;
        }

        &:not(:last-child) {
          padding-bottom: 1rem;
        }
      }
    }
  }
</style>
