<template>
  <article
    :class="_itemClass"
    @click="click($event)"
  >
    <div
      class="inner"
    >
      <div
        v-if="item.image && item.image.filename"
        class="image"
      >
        <s-image
          :src="item.image.filename"
          :srcset="_srcset"
          :sizes="_sizes"
          :aspect-ratio="_aspectRatio"
          :focus="item.image.focus"
          :alt="_alt"
          overlay
          preload
          cover
        />
      </div>
      <div
        v-if="item.title || item.date || item.text"
        class="content"
      >
        <h3
          v-if="item.title"
        >
          {{ item.title }}
        </h3>
        <p
          v-if="item.date"
          class="date"
        >
          {{ $dayjs(item.date).format('D MMM YYYY') }}
        </p>
        <s-richtext
          v-if="item.text"
          :text="item.text"
          class="text"
        />
        <div
          v-if="item.link"
          class="button"
        >
          <s-button
            :to="item.link"
            :theme="_linkStyle"
          >
            {{ item.linkText || $t('link.readMore') }}
          </s-button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import {
    defaultSrcset
  } from '@/assets/js/image';

  import SButton from '@/components/SButton';
  import SImage from '@/components/SImage';
  import SRichtext from "@/components/SRichtext";

  export default {
    name: 'ItemBlock',

    components: {
      SButton,
      SImage,
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
      }
    },

    computed: {
      _itemClass() {
        return [
          'item-block',
          { 'item-text-center': this.blok.textCenter },
          { 'item-has-image': this.item.image && this.item.image.filename },
          { 'item-has-link': this.item.link },
        ]
      },

      _srcset() {
        return defaultSrcset;
      },

      _alt() {
        return this.item.image.name || this.item.image.alt;
      },

      _sizes() {
        return '(min-width: 1300px) 33.3vw, (min-width: 960px) 50vw, 100vw';
      },

      _aspectRatio() {
        return '16:10';
      },

      _linkStyle() {
        return this.item.linkStyle || 'primary';
      }
    },

    methods: {
      click($event) {
        const target = $event.target;
        if (target.tagName.toLowerCase() === 'a') {
          return;
        }

        const { link } = this.item;

        if (link && link.includes('://')) {
          window.open(link, '_blank');
        } else {
          this.$router.push(link);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .item-block {
    height: 100%;

    position: relative;

    overflow: hidden;

    background-color: var(--blocks-bg-color);

    border: var(--blocks-border);
    border-radius: var(--blocks-border-radius);

    box-shadow: var(--blocks-box-shadow);

    &.item-text-center {
      text-align: center;

      .inner {
        .content {
          .button {
            left: 50%;

            transform: translateX(-50%);
          }
        }
      }
    }

    &.item-has-image {
      padding-top: 62.5%;
    }

    &.item-has-link {
      cursor: pointer;

      &:hover {
        .inner {
          .image {
            .s-image:before {
              opacity: 0.4;
            }
          }
        }
      }

      .inner {
        .content {
          padding-bottom: 84px;
        }
      }
    }

    .inner {
      height: 100%;

      margin: 0;
      padding: 0;

      .image {
        width: 100%;

        display: inline-block;

        position: absolute;
        top: 0;
        left: 0;

        vertical-align: top;
      }

      .content {
        height: 100%;
        width: 100%;

        margin: 0;
        padding: var(--blocks-padding);

        position: relative;

        background-color: #ffffff;

        vertical-align: top;

        h3 {
          display: block;

          color: var(--blocks-heading-font-color);
          font-family: var(--blocks-heading-font-family);
          font-weight: var(--blocks-heading-font-weight);
          font-size: var(--blocks-heading-font-size);
          line-height: var(--blocks-heading-line-height);
        }

        .date {
          padding-bottom: 0.75rem;

          color: var(--blocks-date-font-color);
          font-family: var(--blocks-date-font-family);
          font-weight: var(--blocks-date-font-weight);
          font-size: var(--blocks-date-font-size);
          line-height: var(--blocks-date-line-height);

          text-decoration: none;
        }

        .text {
          color: var(--blocks-text-font-color);
          font-family: var(--blocks-text-font-family);
          font-weight: var(--blocks-text-font-weight);
          font-size: var(--blocks-text-font-size);
          line-height: var(--blocks-text-line-height);

          text-decoration: none;
        }

        .button {
          position: absolute;
          left: 18px;
          bottom: 24px;
        }
      }
    }
  }
</style>
