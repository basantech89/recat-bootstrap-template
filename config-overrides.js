module.exports = function override(config, env) {
  let loaders = config.module.rules[1].oneOf
  loaders.splice(
    7,
    1,
    {
      test: /\.scss$/i,
      exclude: /\.lazy\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.lazy\.scss$/i,
      use: [
        { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
        'css-loader',
        'sass-loader'
      ]
    }
  )

  return config
}
