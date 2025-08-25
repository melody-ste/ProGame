// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Pour reproduire __dirname dans un module ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js', // ton point d'entrée JS
  output: {
    filename: 'bundle.js',           // nom du bundle compilé
    path: path.resolve(__dirname, 'dist'), // dossier de sortie
    clean: true                      // supprime le contenu existant dans /dist avant build
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,        // pour gérer SCSS
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,               // pour gérer JS avec Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // ton HTML de base
      filename: 'index.html'           // HTML final généré dans /dist
    })
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // dossier à servir
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    extensions: ['.js']  // permet d'importer sans mettre l'extension
  },
  mode: 'development'
};
