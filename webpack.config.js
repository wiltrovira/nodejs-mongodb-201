var path  = require("path");
var webpack  = require("webpack");
var webpackMd5Hash = require("webpack-md5-hash");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.js",
		productos: "./src/productos.js",
		acerca: "./src/acerca.js"
	},
	output: {
		path: path.resolve(__dirname, "dist/assets"),
		publicPath: "/",
		filename: "[name].bundle.[chunkhash].js"
	},
	target: "web",
	devServer:{
		contentBase: "src/html",
		inline: true,
		port: 3000,
		noInfo: true
	},
	devtool: "source-map", 
	watch: true,
	plugins:[
		//limpia la carpeta de los bundles
		new CleanWebpackPlugin(["dist/assets/*.*"]),

		//Genera un archivo css externo con un hash para mejorar el caché
		new ExtractTextPlugin("[name].[contenthash].css"),
		
		//crea un archivo HTML que incluye referencia al archivo bundle.js
		new HtmlWebpackPlugin({
			template:"./src/html/index.html",
			hash:true,
			inject: true,
			minify:{
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes:true,
				useShortDoctype: true,
				removeEmptyAttributes:true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		
		//hash a los archivos usando MD5 para que los nombres cambien cuando los contenidos cambian
		new webpackMd5Hash(),

		//permite generar múltiples bundles
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.bundle.js",
			
			minChunks: Infinity
		}),
		//Minificar JS
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, 
				exclude: /node_modules/, 
				loader: ["eslint-loader","babel-loader"] 
			},
			{ test: /\.css$/, 
				exclude: /node_modules/, 
				loader: ExtractTextPlugin.extract("css-loader"),
			}
		]
	},
	resolve: {
		modulesDirectories: ["src"]
	}
};
