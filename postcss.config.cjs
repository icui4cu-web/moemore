module.exports = {
	plugins: process.env.NODE_ENV === 'production' ? [
		require('postcss-sort-media-queries')()
	] : []
};
