const path = require('path');  // path es un requerimineto disponible ne node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// esta es la creacion de un modulo con un objeto con la configuracion deseada  que vamos a exportar
module.exports = {
    //entry decimos aqui cual es el pundo de entrada de nuestra aplicacion 
  entry: './src/index.js',
  //output aqui decimos hacia donde vamos a enviar lo que va a preparar webpack
  output: {
    //path: path.resolve() lo utiliamos para saber en que directorio se encuentra nuestro proyecto y asi poderlo utilizar 
    path: path.resolve(__dirname, 'dist'),
    //filename nombre del archivo resultante
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  //EXtenciones con las cuales vamos a trabajar en el proyecto
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        // Test nos permitira saver que tipo de extensines vamos a utilizar 
        test: /\.m?js$/,
        //exclude para escluir 
        exclude: /node_modules/,
        //use para decirle que usara 
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      }
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}