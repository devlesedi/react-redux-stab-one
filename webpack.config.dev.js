'use strict'

// import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.config.base'

export default {
  ...baseConfig,

  debug: true,

  devtool: 'source-map',

  entry: {
    ...baseConfig.entry,
    vendor: [
      ...baseConfig.entry.vendor,
      'bootstrap-loader',
      'font-awesome-webpack!./src/static/styles/font-awesome.config.js',
      'babel-polyfill',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    ]
  },

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.scss$/,
        loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass'
      }
    ],
  },

  // plugins: [
  //   ...baseConfig.plugins,
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.DefinePlugin({
  //     __DEV__: true,
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('development')
  //     }
  //   })
  // ],
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
          NODE_ENV: JSON.stringify('development')
      },
      '__DEVELOPMENT__': true
    }),
    new ExtractTextPlugin('styles/[name].[contenthash].css'),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
}
