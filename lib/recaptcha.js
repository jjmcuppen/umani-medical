// const axios = require('axios');

// const {
//   config
// } = require('./config');

// const {
//   stringify
// } = require('querystring');

// const verifyToken = async token => {
//   const data = await axios.post('https://google.com/recaptcha/api/siteverify', stringify({
//     secret: config.GOOGLE_RECAPTCHA_SECRET,
//     response: token
//   })).then(response => response.data);

//   if (!data || !data.success) {
//     throw {
//       token,
//       message: 'Invalid token'
//     };
//   }
// };

// module.exports = {
//   verifyToken
// };