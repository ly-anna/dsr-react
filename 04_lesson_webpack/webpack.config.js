const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map', /*  Source Map — это JSON-файл, который содержит информацию о том, как транспилировать код обратно в исходный код*/
  plugins: [
    new HTMLWebpackPlugin({  // создает новый index.html файл в результирующей папке по шаблону
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',     /*babel-loader для транспиляции современного JavaScript в ES5*/
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',  // когда обычные веб страницы, когда несколько html файлов
        options: {
          minimize: {             /* minimize - Default: true in production mode*/
            minifyCSS: true,      //<style> internal
            minifyJS: true,   // uglyfyJS

            // MiniCssExtractPlugin
            // 
          }
        }
      }
    ],
  },
}