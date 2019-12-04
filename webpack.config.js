var path = require('path');

module.exports = [{
  mode: 'production',
  entry: path.resolve(__dirname, 'src') + '/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env']
            }
        }
      }
    ]
  }
}];