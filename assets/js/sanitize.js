import sanitizeHtml from 'sanitize-html';

export default value => sanitizeHtml(value, {
  allowedTags: [],
  allowedAttributes: {}
});
