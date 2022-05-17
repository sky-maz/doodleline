/* eslint-disable require-jsdoc */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';

class Document extends NextDocument {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
