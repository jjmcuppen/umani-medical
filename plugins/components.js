import Vue from 'vue';

import PageContent from '@/components/page/PageContent';
import PageSettings from '@/components/page/PageSettings';
import PageSitemap from '@/components/page/PageSitemap';

import SectionBanner from '@/components/section/SectionBanner';
import SectionContent from '@/components/section/SectionContent';

import ContentBannerImage from '@/components/content/ContentBannerImage';
import ContentBannerImages from '@/components/content/ContentBannerImages';
import ContentBlocks from '@/components/content/ContentBlocks';
import ContentColumns from '@/components/content/ContentColumns';
import ContentForm from '@/components/content/ContentForm';
import ContentGalleryMasonry from '@/components/content/ContentGalleryMasonry';
import ContentIframe from '@/components/content/ContentIframe';
import ContentImage from '@/components/content/ContentImage';
import ContentOverview from '@/components/content/ContentOverview';
import ContentText from '@/components/content/ContentText';
import ContentVideo from '@/components/content/ContentVideo';

import ItemBannerImages from '@/components/item/ItemBannerImages';
import ItemBlock from '@/components/item/ItemBlock';
import ItemColumnIframe from '@/components/item/ItemColumnIframe';
import ItemColumnImage from '@/components/item/ItemColumnImage';
import ItemColumnText from '@/components/item/ItemColumnText';
import ItemColumnVideo from '@/components/item/ItemColumnVideo';
import ItemGalleryMasonry from '@/components/item/ItemGalleryMasonry';

// Pages
Vue.component(PageContent.name, PageContent);
Vue.component(PageSettings.name, PageSettings);
Vue.component(PageSitemap.name, PageSitemap);

// Sections
Vue.component(SectionBanner.name, SectionBanner);
Vue.component(SectionContent.name, SectionContent);

// Content
Vue.component(ContentBannerImage.name, ContentBannerImage);
Vue.component(ContentBannerImages.name, ContentBannerImages);
Vue.component(ContentBlocks.name, ContentBlocks);
Vue.component(ContentColumns.name, ContentColumns);
Vue.component(ContentForm.name, ContentForm);
Vue.component(ContentGalleryMasonry.name, ContentGalleryMasonry);
Vue.component(ContentIframe.name, ContentIframe);
Vue.component(ContentImage.name, ContentImage);
Vue.component(ContentOverview.name, ContentOverview);
Vue.component(ContentText.name, ContentText);
Vue.component(ContentVideo.name, ContentVideo);

// Item
Vue.component(ItemBannerImages.name, ItemBannerImages);
Vue.component(ItemBlock.name, ItemBlock);
Vue.component(ItemColumnIframe.name, ItemColumnIframe);
Vue.component(ItemColumnImage.name, ItemColumnImage);
Vue.component(ItemColumnText.name, ItemColumnText);
Vue.component(ItemColumnVideo.name, ItemColumnVideo);
Vue.component(ItemGalleryMasonry.name, ItemGalleryMasonry);