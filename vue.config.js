const webpack = require('webpack')

module.exports = {
  lintOnSave: true,

  chainWebpack: chainableConfig => {
    chainableConfig
      .plugin('env')
      .use(
        webpack.EnvironmentPlugin,
        [
          'API_KEY',
          'AUTH_DOMAIN',
          'DATABASE_URL',
          'STORAGE_BUCKET',
          'MESSAGING_SENDER_ID'
        ]
      )
  },

  pwa: {
    name: 'DnD Hub (Beta)',
    themeColor: '#607D8B',
    msTileColor: '#607D8B'
  }
}
