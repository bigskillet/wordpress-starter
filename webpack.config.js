const path = require('path');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './src/scripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: process.env.NODE_ENV == 'production'
      ? '[name].[contenthash:8].js'
      : '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'http://wordpress-starter.valet',
      files: [
        'src/**/*',
        '**/*.php'
      ],
      notify: false,
      snippetOptions: {
        rule: {
          match: /<\/body>/i,
          fn: (snippet, match) => {
            return snippet + match;
          }
        }
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/**/*',
          to: '[name][ext]',
          noErrorOnMissing: true,
          globOptions: {
            ignore: [
              '**/scripts',
              '**/styles'
            ]
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV == 'production'
        ? '[name].[contenthash:8].css'
        : '[name].css'
    }),
    new WebpackManifestPlugin({
      map: f => ({ ...f, name: f.path.replace(/.[a-f0-9]{8}/, '') })
    })
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      }),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ]
  }
};
