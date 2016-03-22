module.exports = {
  entry: './src/index',
  output: {
    path: 'public',
    filename: 'browser-bundle.js',
    publicPath: '/public/'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
