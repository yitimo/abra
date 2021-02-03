const path = require('path')
const webpackMerge = require('webpack-merge').merge
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
module.exports = webpackMerge({
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: {
    home: path.resolve(__dirname, 'pages/home/index.tsx'),
    popup: path.resolve(__dirname, 'pages/popup/index.tsx'),
  },
  resolve: {
    alias: {
      '@/libs': path.resolve(__dirname, 'libs'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  output: {
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[name].[fullhash].js',
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false, url: false, },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                data: `
                  @import 'libs/variables.scss';
                `,
              },
            },
          },
        ],
        exclude: /\.module\.(css|scss)$/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, url: false, },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                data: `
                  @import 'libs/variables.scss';
                `,
              },
            },
          },
        ],
        include: /\.module\.(css|scss)$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: path.resolve(__dirname, './pages/template.html'),
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: path.resolve(__dirname, './pages/template.html'),
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve('public'),
      }],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    port: 3000,
  },
}, isProd ? {
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].[fullhash].css`,
      chunkFilename: `css/[name].[fullhash].css`,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        defaultVendors: false,
        default: false
      },
    },
  },
} : {})
