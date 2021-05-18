const path = require('path') // Nos permite acceder a las rutas del proyecto, en local o en la nube
const HtmlWebpackPlugin = require('html-webpack-plugin') //Plugin para poder trabajar  html con webpack
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Dotenv = require('dotenv-webpack')//Plugin de dotenv, para crear un servidor local y visualizar el proyecto en el navegador en tiempo real
// const { CleanWebpackPlugin } = require('clean-webpack-plugin') //Es una dependecia que nos ayuda a limpiar los archivos que se dupliquen por cada build en el dis, no esta activado por incompatibilidad con travis

module.exports = { //Modulos para exportar: Es donde instanciaremos toda configuracion de webpack
  entry: './src/index.js', //Lugar del que parte el codigo
  output: { //Ruta a la que compilara el codigo para produccion
    path: path.resolve(__dirname, "dist"), //Carpeta en la que se exportara el proyecto para produccion
    filename: 'main.js', //Nombre con el que se exportara el index.js pasado en el "entry:"
    assetModuleFilename: 'assets/images/[hash][ext][query]'//Por cada archivo tipo imagen me lo exportara con un hash diferente por cada build
  },
  resolve: {
    //Manisfetamos a webpack que usaremos archivos con extensiones especificas
    extensions: [".js"],
  },
  module: {//Modulos de reglas que necesitemos instanciar
    rules: [
      {
        test: /\.js$/, //Regla para identificar archivos .js usando el loader de babel, excluyendo la carpeta node_modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i, //Regla para identificar archivos .css usando la dependencia MiniCssExtract que nos ayudara a limpiar|acortar|minimizar nuestro codigo css
        use:
        [
          MiniCssExtractPlugin.loader,
            'css-loader'
        ]
      },
      {//Regla para identificar el tipo de imagenes que cargara nuestro proyecto
        test: /\.png|.jpg/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [//Donde instanciaremos los plugins con sus configuraciones que sean requiridos
    new HtmlWebpackPlugin({
      inject: 'body',//inject: 'body' Siginifica que los scripts de js seran identados al final de nuestro html
      template: './public/index.html',//Localizacion del template inicial
      filename: './index.html',//Localizacion donde se guardara
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns:
      [{//Regla que nos ayuda junto el plugin a copiar los archivos indicados de una ruta a otra especificada
        from: path.resolve(__dirname, "src","assets/images"),
        to: 'assets/images'
      }],
    }),
    new Dotenv(),//Plugin que nos ayudara a crear variables de entorno https://runebook.dev/es/docs/webpack/guides/environment-variables

    // new CleanWebpackPlugin(),
  ],
  devServer: { //Modulo de configuraciones de devServer
    contentBase: path.join(__dirname, 'dist'),//La ruta de la cual hara el servidor y se visualizara en el navegador
    compress: true,
    historyApiFallback: true,
    port: 3007, //Puerto que le especificamos para ser visualizado en el navegador (Puede ser otro aparte de 3007, tu decides)
  },
  optimization: {
    minimize: true,
    minimizer:
    [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
}