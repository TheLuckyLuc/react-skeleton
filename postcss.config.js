const purgecss = require('@fullhuman/postcss-purgecss')({
	content: ['./client/src/**/*.js'],
	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	map: true,
	plugins: [
		require('tailwindcss'),
		...(isProduction ? [require('autoprefixer')] : []),
		require('cssnano'),
		...(isProduction ? [purgecss] : []),
	],
};
