const path = require('path');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: './src/scripts/main.js',
    editor: './src/scripts/editor.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
      },
      {
        test: /\.(svg|png|jpg|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
          publicPath: '/wp-content/themes/wordpress-starter/dist/'
        }
      }
    ]
  },
  devtool: process.env.NODE_ENV == 'development'
    ? 'source-map' : false,
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
      filename: '[name].css'
    })
  ],
  optimization: {
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
