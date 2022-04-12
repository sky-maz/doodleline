import { extendTheme } from '@chakra-ui/react';

const defaultTheme = extendTheme({
	colors: {
		brand: {
			scaffoldBg: '#1A202C',
			footerBg: '#171923',
			color: 'white',
		},
	},
});

export default defaultTheme;
