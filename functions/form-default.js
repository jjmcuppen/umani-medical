const axios = require('axios');

const { config } = require('../lib/config');
const { createMessage, sendMail } = require('../lib/mailer');
const { verifyToken } = require('../lib/recaptcha');

/**
 * Storyblok api
 * @type {AxiosInstance}
 */
const storyApi = axios.create({
  baseURL: 'https://api.storyblok.com/v1/cdn/',
  params: {
    token: config.STORYBLOK_ACCESS_TOKEN
  }
});

/**
 * Get cache version
 *
 * @returns {Promise<string>}
 */
const getCacheVersion = async () => {
  const { space } = await storyApi.get('spaces/me').then(res => res.data);

  const cacheVersion = !!space && space.version;

  if (!cacheVersion) {
    throw 'Unable to retrieve cache version';
  }

  return cacheVersion;
};

/**
 * Get story
 * @param uuid
 * @returns {Promise<boolean|*>}
 */
const getStory = async (uuid) => {
  const cacheVersion = await getCacheVersion();

  const { data } = await storyApi.get(`stories/${uuid}`, {
    params: {
      cv: cacheVersion,
      find_by: 'uuid'
    }
  });

  if (!data.story) {
    throw 'Unable to retrieve story';
  }

  return data.story;
};

/**
 * Find component by _uid
 * @param object
 * @param uid
 * @returns {undefined|*}
 */
const findByUid = (object, uid) => {
  if (object._uid === uid) {
    return object;
  }

  for (let key of Object.keys(object)) {
    if (object[key] instanceof Array) {
      for (let child of object[key]) {
        const result = findByUid(child, uid);
        if (result) {
          return result;
        }
      }
    }
    else if (object[key] instanceof Object) {
      const result = findByUid(object[key], uid);
      if (result) {
        return result;
      }
    }
  }
};

exports.handler = async function(event) {
  const { token, values, attachments, options } = JSON.parse(event.body);

  await verifyToken(token);

  const story = await getStory(options.story_id);
  if (!story) {
    throw 'Unable to retrieve story';
  }

  const component = findByUid(story.content.components, options.component_id);
  if (!component) {
    throw 'Unable to retrieve component';
  }

  const {
    fields,
    submitSubject,
    submitMailTo,
    confirmationSend,
    confirmationSubject,
    confirmationText
  } = component;

  const message = await createMessage('form-default', {
    baseUrl: config.BASE_URL,
    subject: submitSubject,
    logo: options.logo,
    fields: [{
      label: 'Huidige pagina',
      value: `${config.BASE_URL}${options.route.to}`
    },
      ...Object.keys(values).map(key => ({
        label: key,
        value: values[key]
      }))
    ]
  });

  try {
    await sendMail({
      subject: submitSubject,
      to: (submitMailTo ? submitMailTo.split(',') : false) || config.MAILER_TO || 'maurice@softmedia.nl',
      html: message,
      attachments: attachments.map(attachment => {
        return {
          filename: attachment.name,
          content: Buffer.from(attachment.data, 'base64')
        }
      })
    });
  }
  catch (e) {
    return {
      statusCode: 500,
      body: e.toString()
    }
  }

  if (confirmationSend) {
    const emailField = fields.find(field => field.type === 'email');
    if (emailField) {
      const email = values[emailField.name];
      if (email) {
        const message = await createMessage('form-confirmation', {
          baseUrl: config.BASE_URL,
          subject: confirmationSubject,
          logo: options.logo,
          text: confirmationText
        });

        try {
          await sendMail({
            subject: confirmationSubject,
            to: email,
            html: message
          });
        }
        catch (e) {
          return {
            statusCode: 500,
            body: e.toString()
          }
        }
      }
    }
  }

  return {
    statusCode: 200,
    body: 'success'
  };
};
