# Nuxt.js Storyblok Boilerplate

## How to get started?

1. [Register](https://app.storyblok.com/#!/signup) at Storyblok for free
2. Create a new empty Space and exchange the preview token with your own in ```nuxt.config.js``` (not required if you have downloaded the project via app.storyblok.com)
3. Read the Nuxt.js tutorial about Storyblok's concept: https://www.storyblok.com/tp/nuxt-js-multilanguage-website-tutorial
4. Enjoy and start developing

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Configuration

Add domain(s) to the domain configuration file

```bash
# /assets/config/domain/locales.json
``` 

Add domain redirects (optional)

```bash
# /assets/config/domain/redirects.json
``` 

Add page redirects (optional)

```bash
# /assets/config/page/redirects.json
``` 

## Multisite

Add multisite environment variable when using multiple folders/languages

```bash
# MULTISITE=1
``` 

Add i18n locales

```bash
# /plugins/vue-i18n.js

# /locales/<locale>.json
``` 