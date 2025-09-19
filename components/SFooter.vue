<template>
  <footer
    class="s-footer"
  >
    <div
      class="top"
    >
      <v-container
        py-10
        px-6
      >
        <v-row>
          <v-col
            v-for="group in _groups"
            :key="group.name"
            cols="12"
            sm="6"
            lg="3"
          >
            <div
              class="footer-links"
            >
              <div
                class="heading"
              >
                <s-link
                  v-if="_link(group)"
                  :to="_link(group)"
                  :title="group.name"
                >
                  {{ group.name }}
                </s-link>
                <span
                  v-else
                >
                  {{ group.name }}
                </span>
              </div>
              <ul>
                <li
                  v-for="item in group.items"
                  :key="item._uid"
                >
                  <s-link
                    v-if="_link(item)"
                    :to="_link(item)"
                    :title="item.name"
                  >
                    {{ item.name }}
                  </s-link>
                  <span v-else>
                    {{ item.name }}
                  </span>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col
            v-if="_addressTitle || _address"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <div
              class="footer-address"
            >
              <div
                v-if="_addressTitle"
                class="heading"
              >
                <span>
                  {{ _addressTitle }}
                </span>
              </div>
              <s-richtext
                v-if="_address"
                :text="_address"
                class="text"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div
      class="bottom"
    >
      <v-container
        px-6
      >
        <v-row>
          <v-col
            cols="12"
            md="9"
          >
            <div
              class="footer-nav"
            >
              <nav
                class="links"
                role="navigation"
              >
                <ul>
                  <li>Copyright &copy; {{ $dayjs().format('YYYY') }}</li>
                  <li
                    v-for="item in _links"
                    :key="item._uid"
                  >
                    <s-link
                      v-if="_link(item)"
                      :to="_link(item)"
                      :title="item.name"
                    >
                      {{ item.name }}
                    </s-link>
                  </li>
                </ul>
              </nav>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <div
              class="footer-social"
            >
              <ul>
                <li
                  v-if="_twitter"
                >
                  <a
                    :href="_twitter"
                    title="Twitter"
                    target="_blank"
                  >
                    <span
                      class="icon-twitter"
                    />
                  </a>
                </li>
                <li
                  v-if="_facebook"
                >
                  <a
                    :href="_facebook"
                    title="Facebook"
                    target="_blank"
                  >
                    <span
                      class="icon-facebook"
                    />
                  </a>
                </li>
                <li
                  v-if="_linkedIn"
                >
                  <a
                    :href="_linkedIn"
                    title="LinkedIn"
                    target="_blank"
                  >
                    <span
                      class="icon-linkedin"
                    />
                  </a>
                </li>
                <li
                  v-if="_whatsApp"
                >
                  <a
                    :href="_whatsApp"
                    title="WhatsApp"
                    target="_blank"
                  >
                    <span
                      class="icon-whatsapp"
                    />
                  </a>
                </li>
                <li
                  v-if="_instagram"
                >
                  <a
                    :href="_instagram"
                    title="Instagram"
                    target="_blank"
                  >
                    <span
                      class="icon-instagram"
                    />
                  </a>
                </li>
                <li
                  v-if="_email"
                >
                  <a
                    :href="'mailto:' + _email"
                    title="Email"
                    target="_blank"
                  >
                    <span
                      class="icon-mail"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script>
  import SLink from '@/components/SLink';
  import SRichtext from '@/components/SRichtext';

  export default {
    name: 'SFooter',

    components: {
      SLink,
      SRichtext
    },

    computed: {
      _groups() {
        return this.$store.state.settings.navFooter || [];
      },

      _links() {
        return this.$store.state.settings.navSubFooter || [];
      },

      _addressTitle() {
        return this.$store.state.settings.addressTitleFooter || '';
      },

      _address() {
        let text = JSON.parse(JSON.stringify(
          this.$store.state.settings.addressFooter || {}
        ));

        return Object.keys(text).length === 0 ? '' : text;
      },

      _twitter() {
        return this.$store.state.settings.twitter || '';
      },

      _facebook() {
        return this.$store.state.settings.facebook || '';
      },

      _linkedIn() {
        return this.$store.state.settings.linkedin || '';
      },

      _whatsApp() {
        return this.$store.state.settings.whatsapp || '';
      },

      _instagram() {
        return this.$store.state.settings.instagram || '';
      },

      _email() {
        return this.$store.state.settings.email || '';
      }
    },

    methods: {
      _link(item) {
        return this.$isLink(item.link) && this.$getLink(item.link);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';

  .s-footer {
    position: relative;

    background-color: var(--footer-bg-color);

    .top {
      .footer-links {

        .heading {
          a,
          span {
            color: var(--footer-heading-font-color);
            font-family: var(--footer-heading-font-family);
            font-weight: var(--footer-heading-font-weight);
            font-size: var(--footer-heading-font-size);
            line-height: var(--footer-heading-line-height);

            text-transform: var(--footer-heading-text-transform);
            text-decoration: none;
          }
        }

        ul {
          margin: 0;
          padding: 0;

          list-style: none;

          > li {
            display: block;

            > a {
              display: inline-block;

              color: var(--footer-font-color);
              font-family: var(--footer-font-family);
              font-weight: var(--footer-font-weight);
              font-size: var(--footer-font-size);
              line-height: var(--footer-line-height);

              text-transform: var(--footer-text-transform);
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }

      .footer-address {
        .heading {
          a,
          span {
            color: var(--footer-heading-font-color);
            font-family: var(--footer-heading-font-family);
            font-weight: var(--footer-heading-font-weight);
            font-size: var(--footer-heading-font-size);
            line-height: var(--footer-heading-line-height);

            text-transform: var(--footer-heading-text-transform);
            text-decoration: none;
          }
        }

        .text {
          color: var(--footer-font-color);
          font-family: var(--footer-font-family);
          font-weight: var(--footer-font-weight);
          font-size: var(--footer-font-size);
          line-height: var(--footer-line-height);

          text-transform: var(--footer-text-transform);
          text-decoration: none;

          ::v-deep p {
            padding-bottom: 0;

            a {
              color: var(--footer-font-color);
            }
          }
        }
      }
    }

    .bottom {
      background-color: rgba(255, 255, 255, 0.05);

      .footer-nav {
        display: flex;
        justify-content: flex-start;

        ul {
          margin: 0;
          padding: 0;

          list-style: none;

          > li {
            display: block;

            color: var(--footer-font-color);
            font-family: var(--footer-font-family);
            font-weight: var(--footer-font-weight);
            font-size: var(--footer-font-size);
            line-height: var(--footer-line-height);

            text-transform: var(--footer-text-transform);
            text-decoration: none;

            > a {
              display: inline-block;

              color: var(--footer-font-color);
              font-family: var(--footer-font-family);
              font-weight: var(--footer-font-weight);
              font-size: var(--footer-font-size);
              line-height: var(--footer-line-height);

              text-transform: var(--footer-text-transform);
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }

            @include breakpoint(md-and-up) {
              display: inline-block;

              margin: 0 5px;

              &:first-child {
                margin-left: 0;
              }

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }

      .footer-social {
        display: flex;
        justify-content: flex-end;

        ul {
          margin: 0;
          padding: 0;

          list-style: none;

          > li {
            display: inline-block;

            margin: 0 5px;

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }

            > a {
              display: inline-block;

              color: var(--footer-font-color);

              text-decoration: none;
            }
          }
        }
      }
    }
  }
</style>
