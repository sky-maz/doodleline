import React from 'react';
import type { AppProps } from 'next/app';
import '../sass/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
	<Component {...pageProps} />
);

export default App;
