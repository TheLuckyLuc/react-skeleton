const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleLoaders = () => {
	if (process.env.NODE_ENV === 'development') {
		return [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
				},
			},
		];
	} else {
		return [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader',
		];
	}
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
				test: /\.s?css$/,
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
	mode: process.env.NODE_ENV,
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
