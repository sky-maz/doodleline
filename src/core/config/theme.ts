interface ContrastColor {
	low: string;
	medium: string;
	high: string;
}

interface ITheme {
	scaffoldBackgroundColor: string;
	surfaceBackgroundColor: string;
	lightTypographyColor: ContrastColor;
	darkTypographyColor: ContrastColor;
	primaryColor: ContrastColor;
}

const baseTheme: ITheme = {
	scaffoldBackgroundColor: '#f8f9fc',
	surfaceBackgroundColor: '#ffffff',
	lightTypographyColor: {
		low: '#000000',
		medium: '#000000',
		high: '#000000',
	},
	darkTypographyColor: {
		low: '#000000',
		medium: '#000000',
		high: '#000000',
	},
	primaryColor: {
		low: '#0470f3',
		medium: '#000000',
		high: '#000000',
	},
};

export default baseTheme;
