<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="s-richtext"
    v-html="_text"
  />
</template>

<script>
  export default {
    name: 'SRichtext',

    props: {
      text: {
        type: [ String, Object ],
        required: true
      },
      color: {
        type: String,
        default: null
      }
    },

    computed: {
      _text() {
        let html = '';

        if (this.text && typeof this.text === 'object') {
          let text = this.text;

          if (!this.$store.state.editMode && text.content) {
            text = {
              type: 'doc',
              content: this._formatRichtext(this.text.content)
            };
          }

          html = this.$storyapi.richTextResolver.render(text);
        }

        if (this.color) {
          html = html.replace(/<(h[1-6]|p)>/g, (match, tag) => {
            return `<${tag} style="color: ${this.color}">`;
          });
        }

        return html
      }
    },

    methods: {
      _formatRichtext(nodes) {
        return nodes.map(node => {
          if (node.content) {
            return {
              ...node,
              content: this._formatRichtext(node.content)
            }
          } else if (node.marks) {
            return {
              ...node,
              marks: this._formatRichtextMarks(node.marks)
            }
          }

          return node;
        })
      },

      _formatRichtextMarks(marks) {
        return marks.map(mark => {
          let { type, attrs } = mark;

          if (!(type === 'link' && Object.keys(attrs).length) || ['url', 'email'].includes(attrs.linktype)) {
            return mark;
          }

          let {
            href, uuid, linktype
          } = attrs;

          let link = {
            id: uuid,
            url: href,
            linktype: linktype
          }

          return {
            ...mark,
            attrs: {
              ...attrs,
              href: this.$isLink(link) && this.$getLink(link)
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-richtext ::v-deep {
    p {
      &:empty {
        &:before {
          content: ' ';
          white-space: pre;
        }
      }

      /*&:last-child:not(:first-child),*/
      /*&:first-child:last-child {*/
      /*  padding-bottom: 0;*/
      /*}*/

      b,
      strong {
        color: inherit;
      }

      a {
        color: var(--link-color);

        text-decoration: none;
      }
    }

    /*ul, ol {*/
    /*  &:not(:last-child) {*/
    /*    margin-bottom: 1rem;*/
    /*  }*/
    /*}*/

    img {
      height: auto;
      max-width: 100%;

      display: block;
    }

    blockquote {
      padding-left: 1em;

      font-style: italic;
      line-height: 2;

      border-left: 3px solid #eee;
    }
  }
</style>
