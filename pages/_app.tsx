import '@sass/globals.scss';
import { AppProps } from 'next/app';
import React from 'react';

import { ChakraUI } from '@common/ChakraUI';

const App = ({ Component, pageProps }: AppProps) => (
	<ChakraUI cookies={pageProps.cookies}>
		<Component {...pageProps} />
	</ChakraUI>
);

export default App;
