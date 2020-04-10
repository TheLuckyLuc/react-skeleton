const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const getStyleLoaders = (setModule) => {
	return [
		isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: setModule,
				sourceMap: isDevelopment,
			},
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: isDevelopment,
			},
		},
		{
			loader: 'sass-loader',
			options: {
				sourceMap: isDevelopment,
			},
		},
	];
};

module.exports = {
	entry: {
		bundled: path.resolve(__dirname, 'client/src/index.js'),
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'client/build'),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader',
			},
			{
				test: /\.module.(sa|sc|c)ss$/,
				use: getStyleLoaders(true),
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /\.module.(sa|sc|c)ss$/,
				use: getStyleLoaders(),
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
	mode: process.env.NODE_ENV,
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		}),
	],
};
