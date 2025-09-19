<template>
  <section-content
    :blok="blok"
  >
    <div
      class="content-gallery-masonry"
    >
      <v-row
        v-if="blok.title"
        no-gutters
      >
        <v-col>
          <s-title
            :blok="blok"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <div
            class="content-gallery"
          >
            <client-only>
              <masonry
                :cols="{default: 3, 960: 2, 600: 1}"
                :gutter="12"
              >
                <component
                  :is="item.component"
                  v-for="item in _items"
                  :key="item._uid"
                  :story="story"
                  :blok="blok"
                  :item="item"
                  @click.native="openPopup(item)"
                />
              </masonry>
            </client-only>
          </div>
        </v-col>
      </v-row>
    </div>
  </section-content>
</template>

<script>
  import PhotoSwipe from 'photoswipe/dist/photoswipe'
  import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

  import {
    getSrc,
    getResolution
  } from '@/assets/js/image';

  import STitle from '@/components/STitle';
  
  export default {
    name: 'ContentGalleryMasonry',

    components: {
      STitle
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
      _items() {
        return this.blok.blocks || [];
      },
      
      _photoswipeItems() {
        return this.blok.blocks.map(item => {
          const src = getSrc(
            item.image.filename,
            1920,
            {
              format: 'jpg'
            }
          );

          const [ w, h ] = getResolution(src);

          return {
            src,
            w,
            h,
            title: item.image.name || item.image.alt
          };
        });
      }
    },

    methods: {
      openPopup(item) {
        const store = this.$store;

        store.commit('photoswipe/setModalOpen', true);

        setTimeout(() => {
          const element = document.querySelectorAll('.pswp')[0];
          const index = this.blok.blocks.indexOf(item);

          const gallery = new PhotoSwipe(element, PhotoSwipeUIDefault, this._photoswipeItems, {
            index: index,
            closeOnScroll: false
          });

          gallery.listen('beforeChange', () => {
            this.index = gallery.getCurrentIndex()
          });

          gallery.listen('close', () => {
            store.commit('photoswipe/setModalOpen', false);
          });

          gallery.init();
        },
        100);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variables.scss';
  @import '~@/assets/scss/breakpoint.scss';
  
  .content-gallery-masonry {
    height: 100%;
  
    position: relative;
  
    overflow: hidden;
  }
</style>
