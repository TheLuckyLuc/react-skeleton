const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const getStyleLoaders = (setModule) => {
	return [
		isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: setModule
					? {
							mode: 'local',
							localIdentName: '[name]__[local]--[hash:base64:5]',
					  }
					: false,
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
				use: ['react-hot-loader/webpack', 'babel-loader'],
			},
			{
				enforce: 'pre',
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'eslint-loader',
					options: {
						baseConfig: {
							extends: [
								'eslint:recommended',
								'plugin:react/recommended',
							],
							settings: {
								react: {
									version: 'detect',
								},
							},
						},
						plugins: ['react-hooks'],
						rules: {
							'react-hooks/rules-of-hooks': 'error',
							'react-hooks/exhaustive-deps': 'warn',
						},
						envs: ['browser', 'node'],
						parserOptions: {
							ecmaVersion: 2018,
							sourceType: 'module',
							ecmaFeatures: {
								jsx: true,
								modules: true,
							},
						},
					},
				},
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
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	mode: process.env.NODE_ENV,
	devServer: {
		historyApiFallback: true,
		hot: true,
		contentBase: path.resolve(__dirname, 'client/build'),
	},
	devtool: isDevelopment ? 'cheap-module-source-map' : false,
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		}),
		new ErrorOverlayPlugin(),
	],
};
