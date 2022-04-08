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
			gridTemplateColumns: {
				currency: 'repeat(3, 10%) 15% 20% 15% 15% 5%',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
	content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
};
