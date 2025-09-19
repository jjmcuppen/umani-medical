<template>
  <div
    v-if="_canPaginate"
    class="s-pagination"
  >
    <ul>
      <li
        class="prev"
      >
        <nuxt-link
          v-if="page > 1"
          :to="_to(_previousPage)"
          disabled
        >
          <span
            class="material-icons"
          >
            keyboard_arrow_left
          </span>
        </nuxt-link>
        <span
          v-else
          class="disabled"
        >
          <span
            class="material-icons"
          >
            keyboard_arrow_left
          </span>
        </span>
      </li>
      <li
        v-if="_hiddenBegin >= 1"
        class="index"
      >
        <nuxt-link
          :to="_to(1)"
        >
          <span>1</span>
        </nuxt-link>
      </li>
      <li
        v-if="_hiddenBegin >= 2"
        class="index"
      >
        <span>
          <span>...</span>
        </span>
      </li>
      <li
        v-for="index in _range"
        :key="index"
        class="index"
      >
        <nuxt-link
          :to="_to(index)"
        >
          <span>{{ index }}</span>
        </nuxt-link>
      </li>
      <li
        v-if="_hiddenEnd >= 2"
        class="index"
      >
        <span>
          <span>...</span>
        </span>
      </li>
      <li
        v-if="_hiddenEnd >= 1"
        class="index"
      >
        <nuxt-link
          :to="_to(length)"
        >
          <span>{{ length }}</span>
        </nuxt-link>
      </li>
      <li
        class="next"
      >
        <nuxt-link
          v-if="page < length"
          :to="_to(_nextPage)"
          disabled
        >
          <span
            class="material-icons"
          >
            keyboard_arrow_right
          </span>
        </nuxt-link>
        <span
          v-else
          class="disabled"
        >
          <span
            class="material-icons"
          >
            keyboard_arrow_right
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import range from 'lodash/range';
  
  export default {
    name: 'SPagination',
    
    props: {
      length: {
        type: Number,
        required: true
      },
      adjacent: {
        type: Number,
        default: 2,
        validator: v => v > 0
      }
    },
    
    data() {
      return {
        page: Number(this.$route.query.page) || 1
      };
    },
    
    computed: {
      _canPaginate() {
        return this.length > 1;
      },
      
      _previousPage() {
        return Math.max(1, this.page - 1);
      },
      
      _nextPage() {
        return Math.min(this.length, this.page + 1);
      },
      
      _begin() {
        return Math.max(1, this.page - this.adjacent);
      },
      
      _end() {
        return Math.min(this.length, this.page + this.adjacent);
      },
      
      _hiddenBegin() {
        return this.page - (this.adjacent + 1);
      },
      
      _hiddenEnd() {
        return this.length - (this.page + this.adjacent);
      },
      
      _range() {
        return range(this._begin, this._end + 1);
      }
    },
    
    watch: {
      '$route.query.page'(value) {
        this.page = Number(value) || 1;
      }
    },
    
    methods: {
      _to(page) {
        return {
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: page > 1 ? page : undefined
          }
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/variables.scss';
  @import '~assets/scss/breakpoint.scss';
  
  .s-pagination {
    display: flex;
    
    justify-content: center;
    
    ul {
      margin: 0;
      padding: 0;
      
      list-style: none;
      
      li {
        display: inline-block;
        
        position: relative;
        
        &.index {
          display: none;
        }
        
        > a,
        > span {
          height: 35px;
          width: 35px;
          
          display: inline-block;
  
          margin: 0 0.25rem;
          
          color: var(--pagination-font-color);
          font-family: var(--pagination-font-family);
          font-weight: var(--pagination-font-weight);
          font-size: var(--pagination-font-size);
          line-height: var(--pagination-line-height);
  
          text-align: center;
          
          background-color: var(--pagination-bg-color);
  
          border: 1px solid var(--pagination-border-color);
          border-radius: 3px;
          
          text-decoration: none;
          
          vertical-align: top;
          
          &.disabled {
            opacity: 0.5;
            
            &:hover {
              background-color: transparent;
            }
          }
          
          &:hover {
            background-color: var(--pagination-bg-color-hover);
          }
          
          > span {
            display: inline-block;
            
            position: relative;
            top: 50%;
  
            transform: translateY(-50%);
          }
        }
        
        @include breakpoint(md-and-up) {
          &.index {
            display: inline-block;
          }
        }
      }
    }
  }
</style>