import Vue from 'vue';

import { resize } from '~/assets/js/image';
import {
  isLink,
  getStory,
  getUrl,
  getEmail,
  getAsset,
  getSlug,
  getLink
} from '~/assets/js/link';

Vue.filter('resize', resize);

Vue.prototype.$resize = resize;
Vue.prototype.$isLink = isLink;
Vue.prototype.$getStory = getStory;
Vue.prototype.$getUrl = getUrl;
Vue.prototype.$getEmail = getEmail;
Vue.prototype.$getAsset = getAsset;
Vue.prototype.$getSlug = getSlug;
Vue.prototype.$getLink = getLink;
