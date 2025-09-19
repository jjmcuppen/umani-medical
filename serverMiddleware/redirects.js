const redirects = {
  ...require('../assets/config/page/redirects.json')
};

const domainRedirects = {
  ...require('../assets/config/domain/redirects.json')
};

export default (req, res, next) => {
  let newUrl = null;
  
  if (/\/$/.exec(req.url)) {
    newUrl = req.url.replace(/\/$/, '');
  }
  
  if (req.url.startsWith('//')) {
    newUrl = req.url.replace(/^\/\//, '/');
  }
  const hostname = req.headers.host || '';
  
  if (domainRedirects[hostname]) {
    newUrl = `http://${domainRedirects[hostname]}${req.url}`;
  }
  
  if (redirects[hostname] !== undefined && redirects[hostname][newUrl || req.url]) {
    newUrl = redirects[hostname][newUrl || req.url];
  }
  
  if (newUrl) {
    res.writeHead(301, { Location: newUrl });
    
    return res.end();
  }
  
  next();
}