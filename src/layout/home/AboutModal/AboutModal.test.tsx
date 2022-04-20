import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import defaultTheme from '@config/theme';
import AboutModal from './AboutModal';

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

	it('should display desktop view', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [false];

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
