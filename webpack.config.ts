import * as path from 'path';

import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
  context: path.join(__dirname, '/src'),

  entry: {
    js: "./ts/index.ts",
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
  },

  target: 'web',

  resolve: {
    extensions: ['.js', '.ts'],
    mainFields: ['main'],
    modules: [
      path.join(__dirname, '/src/js'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },

  devServer: {
    contentBase: 'dist',
    port: 3000
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 0,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-smart-import')({ addDependencyTo: webpack }),
                  require('postcss-cssnext')(),
                  require('postcss-mixins')(),
                  require('postcss-nested')(),
                ],
              },
            },
          ]
        })
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new BrowserSyncPlugin({
      server: { baseDir: ['./dist'] }
    }),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      template: 'index.pug'
    }),
    new CopyWebpackPlugin([
      { from: 'motion', to: 'motion' },
    ]),
  ],

};

export default config;