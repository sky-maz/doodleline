import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsModal from './SettingsModal';
import { ChakraProvider } from '@chakra-ui/react';
import defaultTheme from '@config/theme';

let isMobile = [false];
jest.mock('@chakra-ui/react', () => {
	const originalModule = jest.requireActual('@chakra-ui/react');

	return {
		__esModule: true,
		...originalModule,
		useMediaQuery: jest.fn().mockImplementation(() => isMobile),
	};
});

describe('<SettingsModal /> component ', () => {
	it('should display mobile view', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [true];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display desktop view', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [false];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should show a bottom toast on error submit in mobile view', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [true];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		const startBtn = screen.getByTestId('settings-start');
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(view).toMatchSnapshot();
	});

	it('should show a bottom toast on error submit in desktop view', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [false];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		const startBtn = screen.getByTestId('settings-start');
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(view).toMatchSnapshot();
	});

	it('should close the modal on successful submit', () => {
		// Setup
		const getFileList = () => {
			const blob = new Blob([''], { type: 'text/html' });
			const file = blob as File;
			const fileList = {
				0: file,
				1: file,
				length: 2,
				item: jest.fn(),
			};
			return fileList;
		};
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		const typeValue = 'STRATEGIC';
		const timerValue = '30';
		const filesValue = getFileList();
		isMobile = [false];

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		const typeSelector = screen.getByTestId('type-selector');
		expect(typeSelector).toBeInTheDocument();
		fireEvent.change(typeSelector, { target: { value: typeValue } });
		expect((typeSelector as HTMLSelectElement).value).toBe(typeValue);

		const timerSelector = screen.getByTestId('timer-selector');
		expect(timerSelector).toBeInTheDocument();
		fireEvent.change(timerSelector, { target: { value: timerValue } });
		expect((timerSelector as HTMLSelectElement).value).toBe(timerValue);

		const referencesLoader = screen.getByTestId('references-loader');
		expect(referencesLoader).toBeInTheDocument();
		fireEvent.change(referencesLoader, { target: { files: filesValue } });
		expect((referencesLoader as HTMLInputElement).files).toBe(filesValue);

		const shuffleCheckbox = screen.getByTestId('shuffle-checkbox');
		expect(shuffleCheckbox).toBeInTheDocument();
		fireEvent.click(shuffleCheckbox);
		expect((shuffleCheckbox as HTMLInputElement).checked).toBe(true);

		expect(view).toMatchSnapshot();

		const startBtn = screen.getByTestId('settings-start');
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(onStartMock.call.length).toBe(1);
		expect(onCloseMock.call.length).toBe(1);
		expect(view).toMatchSnapshot();
	});
});
