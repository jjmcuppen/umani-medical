const mjml2html = require('mjml');
const nodemailer = require('nodemailer');

const { htmlToText } = require('nodemailer-html-to-text');

const { config } = require('./config');
const { twig } = require('twig');

const templates = {
  'form-confirmation': require('../lib/mjml/form-confirmation.mjml.twig'),
  'form-default': require('../lib/mjml/form-default.mjml.twig')
};

let transporter;

const sendMail = async message => {
  if (!transporter) {
    if (!config.MAILER_DSN) {
      throw 'Missing mailer DSN';
    }

    try {
      transporter = nodemailer.createTransport(config.MAILER_DSN);
      transporter.use('compile', htmlToText());
    } catch (error) {
      throw 'Malformed mailer DSN';
    }
  }

  await transporter.verify();

  return await transporter.sendMail({
    from: config.MAILER_FROM,
    replyTo: config.MAILER_REPLY_TO,
    ...message
  });
};

const createMessage = async (filename, options = {}) => {
  const template = twig({
    data: templates[filename]
  });
  
  const mjml = await template.render({
    basedir: config.BASE_URL,
    fromName: config.MAILER_FROM_NAME,
    ...options
  });
  
  const { html, errors } = mjml2html(mjml, {
    minify: true
  });

  if (errors.length) {
    throw {
      errors,
      message: 'Unable to parse MJML.',
    };
  }

  return html;
};

module.exports = {
  sendMail,
  createMessage
};