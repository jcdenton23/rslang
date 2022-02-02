const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ development }) => ({
  entry: './src/index.ts',
  mode: development ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  optimization: {
    minimize: !development,
    minimizer: [new TerserPlugin()],
  },
  devtool: development ? 'source-map' : false,
  performance: {
    hints: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },

    port: 9000,
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { collapseWhitespace: !development },
      favicon: path.resolve(__dirname, './src/favicon.ico'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/'),
          to: path.resolve(__dirname, 'dist/public/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
});
