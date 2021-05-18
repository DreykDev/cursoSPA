const path = require('path') // Nos permite acceder a las rutas del proyecto, en local o en la nube
const HtmlWebpackPlugin = require('html-webpack-plugin') //Plugin para poder trabajar con html en webpack
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = { //Modulos para exportar: Es donde instanciaremos toda configuracion de webpack
  entry: './src/index.js', //Lugar del que parte el codigo
  output: { //Ruta a la que compilara el codigo para produccion
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js',
    assetModuleFilename: 'asset/images/[hash][ext][query]'
  },
  mode: 'development',
  resolve: {
    //Manisfetamos a webpack que usaremos archivos con extensiones especificas
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use:
        [
          MiniCssExtractPlugin.loader,
            'css-loader'
        ]
      },
      {
        test: /\.png|.jpg/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns:
      [{
        from: path.resolve(__dirname, "src","assets/images"),
        to: 'assets/images'
      }],
    }),
    new Dotenv(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3007,
  },
}