module.exports = function(env) {

  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const resolve = require('path').resolve;
  const webpack = require('webpack');
  const autoprefixer = require('autoprefixer');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const path = require('path');
  const constants =  require('./config/' + env + '.js');

  const ENTRY = {
    index: './src/index.jsx',
    vendor: ['react', 'react-dom']
  };

  const PLUGINS = [];
  PLUGINS.push(new ExtractTextPlugin('css/[name].css'));
  process.env.NODE_ENV === 'production' && PLUGINS.push(new webpack.optimize.UglifyJsPlugin());
  PLUGINS.push(new HtmlWebpackPlugin({
    inject: true,
    filename: `index.html`,
    template: `./src/index.hbs`,
 //   favicon: './src/assets/images/favicon.ico'
  }));

  PLUGINS.push(new webpack.DefinePlugin(constants));


  return {
    entry: ENTRY,
    output: {
      filename: 'js/[name].js',
      // the output bundle

      path: resolve(__dirname, 'dist'),

      publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    devServer: {
      contentBase: resolve(__dirname, 'dist'),
      // match the output path

      publicPath: '/',
      // match the output `publicPath`

      historyApiFallback: true
      // fix the react router problem for missing pages
    },

    module: {
      loaders: [
        {
          test: /.*\.(gif|png|jpe?g)$/i,
          loaders: [
            {
              loader: 'file-loader',
              query: {
                name: '[name]-[hash].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              query: {
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 7,
                },
                progressive: true,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
        {test: /\.(ico)$/i, loader: 'file-loader?name=[name].[ext]'},
        {
          test: /\.(hbs|html)$/,
          loader: 'handlebars-template-loader'
        },
        {
          test: /\.(js|jsx)$/,
          loaders: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({loader: ['css-loader', 'sass-loader'].join('!')})
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
      ],
    },

    plugins: PLUGINS,

    resolve: {
      extensions: ['.js', '.scss']
    }
  };
};