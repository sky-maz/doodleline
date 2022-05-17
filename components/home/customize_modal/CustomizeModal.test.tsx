import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@utils/theme';
import CustomizeModal from './CustomizeModal';

let isMobile = [false];
jest.mock('@chakra-ui/react', () => {
	const originalModule = jest.requireActual('@chakra-ui/react');

	return {
		__esModule: true,
		...originalModule,
		useMediaQuery: jest.fn().mockImplementation(() => isMobile),
	};
});

describe('<CustomizeModal /> component ', () => {
	it('should display mobile view', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [true];

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<CustomizeModal isOpen={true} onClose={onCloseMock} />
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
			<ChakraProvider theme={theme}>
				<CustomizeModal isOpen={true} onClose={onCloseMock} />
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should allow user to change language, mode, and colors', () => {
		// Setup
		const onCloseMock = jest.fn();
		const newValue = 'sp';
		isMobile = [false];

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<CustomizeModal isOpen={true} onClose={onCloseMock} />
			</ChakraProvider>
		);

		// Validation
		const languageSelector = screen.getByTestId('language-selector');
		expect(languageSelector).toBeInTheDocument();
		fireEvent.change(languageSelector, { target: { value: newValue } });
		expect((languageSelector as HTMLSelectElement).value).toBe(newValue);

		const modeSwitch = screen.getByTestId('mode-switch');
		expect(modeSwitch).toBeInTheDocument();
		fireEvent.click(modeSwitch);

		expect(view).toMatchSnapshot();
	});
});
