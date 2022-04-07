module.exports = {
	theme: {
		extend: {
			colors: {
				grayPrimary: '#F2F2F2',
				graySecondary: '#D6DFE8',
				violetPrimary: '#7A89FE',
			},
			fontFamily: {
				body: ['Poppins'],
			},
		},
	},
	plugins: [],
	content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
};
