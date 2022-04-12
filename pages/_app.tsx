import '@sass/globals.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import defaultTheme from '@config/theme';

const App = ({ Component, pageProps }: AppProps) => (
	<ChakraProvider theme={defaultTheme}>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
