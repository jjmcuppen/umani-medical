const fs = require('fs');
const path = require('path');

let config = process.env;

// Only attempt to load local environment.json if it exists (for local development)
// Netlify provides environment variables via process.env at runtime
// Use fs.readFileSync instead of require() to prevent bundlers from statically analyzing it
const isNetlifyEnvironment = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
if (!isNetlifyEnvironment) {
  const envJsonPath = path.join(__dirname, '../.netlify/environment.json');
  if (fs.existsSync(envJsonPath)) {
    try {
      // Read and parse JSON file directly instead of using require()
      // This prevents bundlers from trying to resolve the module at build time
      const envJsonContent = fs.readFileSync(envJsonPath, 'utf8');
      const envData = JSON.parse(envJsonContent);
      config = { ...config, ...envData };
    }
    catch (e) {
      // File exists but couldn't be loaded, continue with process.env
    }
  }
}

module.exports = {
  config
};