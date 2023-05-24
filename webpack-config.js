const Dotenv = require('dotenv-webpack');

module.exports = cfg => {
  cfg.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint').CLIEngine.getFormatter('stylish')
    }
  })
  cfg.plugins.push(new Dotenv());
}
