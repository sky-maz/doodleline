import React from 'react';
import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { ChakraProvider } from '@chakra-ui/react';

import AboutModal from './AboutModal';

import defaultTheme from '@config/theme';
import homeEN from './../../../../locales/en/home.json';
import homeSP from './../../../../locales/sp/home.json';

let isMobile = [false];
jest.mock('@chakra-ui/react', () => {
	const originalModule = jest.requireActual('@chakra-ui/react');

	return {
		__esModule: true,
		...originalModule,
		useMediaQuery: jest.fn().mockImplementation(() => isMobile),
	};
});

describe('<AboutModal /> component ', () => {
	it('should display the en translation.', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [false];

		const view = render(
			<I18nProvider
				lang='en'
				namespaces={{
					home: homeEN,
				}}
			>
				<ChakraProvider theme={defaultTheme}>
					<AboutModal isOpen={true} onClose={onCloseMock} />
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display the sp translation.', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [false];

		const view = render(
			<I18nProvider
				lang='sp'
				namespaces={{
					home: homeSP,
				}}
			>
				<ChakraProvider theme={defaultTheme}>
					<AboutModal isOpen={true} onClose={onCloseMock} />
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display mobile view', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [true];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<AboutModal isOpen={true} onClose={onCloseMock} />
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});
});
