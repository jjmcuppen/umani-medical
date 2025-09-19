module.exports = {
  presets: [['@babel/env', {
    targets: {
      node: 'current'
    }
  }]],
  plugins: [
    ['module-resolver', {
      root: __dirname,
      alias: {
        '@': '.',
        '~': '.'
      }
    }]
  ]
};
