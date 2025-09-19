#!/usr/bin/env node
require('dotenv').config();
const { dirname } = require('path');
const { writeFile, mkdir, access } = require('fs').promises;

(async () => {
  const output = `${__dirname}/../.netlify/environment.json`;
  
  try {
    await access(dirname(output));
  } catch (e) {
    await mkdir(dirname(output));
  }
  
  await writeFile(output, JSON.stringify({
    BASE_URL: process.env.BASE_URL,
    ASSET_URL: process.env.ASSET_URL,
    ROOT: process.env.ROOT,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    GOOGLE_RECAPTCHA_KEY : process.env.GOOGLE_RECAPTCHA_KEY,
    GOOGLE_RECAPTCHA_SECRET: process.env.GOOGLE_RECAPTCHA_SECRET,
    MAILER_DSN: process.env.MAILER_DSN,
    MAILER_FROM: process.env.MAILER_FROM,
    MAILER_FROM_NAME: process.env.MAILER_FROM_NAME,
    MAILER_TO: process.env.MAILER_TO,
    MAILER_REPLY_TO: process.env.MAILER_REPLY_TO
  }));
})().catch(e => {
  console.error(e);
  process.exit(1);
});