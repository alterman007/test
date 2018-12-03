const path = require('path');

// const webpack = require('webpack');
const merge = require('webpack-merge');

const HTMLWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');
const { isDevMode } = require('../utils/env');

const rootDir = process.cwd();
const outputPath = path.resolve(rootDir, 'dist');

const styleLoader = isDevMode ? [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    },
  },
] : [
  MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader',
];
const fileLoader = [{
  loader: 'file-loader',
}];
const imgLoader = isDevMode
  ? fileLoader
  : [
    {
      loader: 'url-loader', // base64
      options: {
        limit: 1024,
      },
    },
    {
      loader: 'image-webpack-loader', // 压缩图片
    },
  ];
const commonConfig = {
  mode: isDevMode ? 'development' : 'production',
  // context: rootDir,
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[hash:10].js',
    path: outputPath,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {

      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}), // production 模式中最小化css
    ],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: styleLoader,
        // exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: imgLoader,
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: fileLoader,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:5].css',
      chunkFilename: '[id].[hash:5].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.join(rootDir, 'src'),
      tsconfig: path.join(rootDir, 'tsconfig.json'),
      tslint: path.join(rootDir, 'tslint.json'),
    }),
    new HTMLWebpackPlugin({
      template: path.join(rootDir, 'template/index.html'),
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    // }),
    new ProgressBarPlugin(),
  ],
  // devServer: {
  //   port: 8080,
  //   overlay: {
  //     errors: true,
  //     warnings: true,
  //   },
  //   historyApiFallback: {
  //     rewrites: [
  //       {
  //         from: '/',
  //         to: '/project',
  //       },
  //     ],
  //   },
  // },
};

module.exports = merge(
  commonConfig,
  isDevMode ? devConfig : prodConfig,
);
