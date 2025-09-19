<template>
  <section-content
    :blok="blok"
    :cols="_cols"
  >
    <div
      class="content-text"
    >
      <div
        :class="_contentClass"
      >
        <s-textarea
          v-if="blok.title"
          :text="blok.title"
          :tag="_titleTag"
          :class="_titleClass"
        />
        <s-richtext
          v-if="blok.text"
          :text="blok.text"
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
            {{ blok.linkText || $t('link.readMore') }}
          </s-button>
        </div>
      </div>
    </div>
  </section-content>
</template>

<script>
  import STextarea from '@/components/STextarea';
  import SRichtext from '@/components/SRichtext';
  import SButton from '@/components/SButton';
  
  export default {
    name: 'ContentText',
  
    components: {
      STextarea,
      SRichtext,
      SButton
    },
    
    props: {
      story: {
        type: Object,
        required: true
      },
      blok: {
        type: Object,
        required: true
      }
    },
    
    computed: {
      _cols() {
        const [ offsetMd, offsetLg, offsetXl ] = this._offset;
    
        return {
          'cols': 12,
          'md': 10,
          'lg': 10,
          'xl': 8,
          'offset-md': offsetMd,
          'offset-lg': offsetLg,
          'offset-xl': offsetXl
        }
      },
  
      _offset() {
        switch (this.blok.alignment) {
          case 'center': return [1, 1, 2];
          case 'right': return [2, 2, 4];
          default: return [0, 0, 0];
        }
      },
  
      _contentClass() {
        return [
          'content',
          `text-${this._textAlignment}`
        ];
      },
  
      _titleTag() {
        return this.blok.titleTag || 'h1';
      },
  
      _titleClass() {
        return [
          `title-color-${this.blok.titleColor}`,
          {
            [`title-border-${this.blok.borderColor}`]: !!this.blok.borderVisible
          }
        ];
      },
  
      _textClass() {
        return [
          'text',
          `text-color-${this.blok.textColor || 'default'}`
        ];
      },
      
      _textAlignment() {
        return this.blok.textAlignment || 'left';
      },
      
      _link() {
        return this.$isLink(this.blok.link) && this.$getLink(this.blok.link);
      },
      
      _linkStyle() {
        return this.blok.linkStyle || 'primary';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .content-text {
    height: 100%;

    position: relative;
    
    .content {
      &.text-center {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          &:before {
            left: 50%;
        
            transform: translateX(-50%);
          }
        }
      }
  
      &.text-right {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          &:before {
            right: 0;
          }
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