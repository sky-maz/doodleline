import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import homeEN from '@locales/en/home.json';
import homeSP from '@locales/sp/home.json';
import theme from '@utils/theme';

import SettingsModal from './SettingsModal';
import SETTINGS_MODAL from './SettingsModal.constants';

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
	it('should display the en translation.', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [false];

		const view = render(
			<I18nProvider
				lang='en'
				namespaces={{
					home: homeEN,
				}}
			>
				<ChakraProvider theme={theme}>
					<SettingsModal
						isOpen={true}
						onClose={onCloseMock}
						onStart={onStartMock}
					/>
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display the sp translation.', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [false];

		const view = render(
			<I18nProvider
				lang='sp'
				namespaces={{
					home: homeSP,
				}}
			>
				<ChakraProvider theme={theme}>
					<SettingsModal
						isOpen={true}
						onClose={onCloseMock}
						onStart={onStartMock}
					/>
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display mobile view.', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [true];

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
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

	it('should show a top toast on error submit.', () => {
		// Setup
		const onCloseMock = jest.fn();
		const onStartMock = jest.fn();
		isMobile = [false];

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		const startBtn = screen.getByTestId(SETTINGS_MODAL.BTN_TEST_ID);
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(view).toMatchSnapshot();
	});

	it('should submit data without random references.', () => {
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
			<ChakraProvider theme={theme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		// Validation
		const typeSelector = screen.getByTestId(SETTINGS_MODAL.PRACTICE_TEST_ID);
		expect(typeSelector).toBeInTheDocument();
		fireEvent.change(typeSelector, { target: { value: typeValue } });
		expect((typeSelector as HTMLSelectElement).value).toBe(typeValue);

		const timerSelector = screen.getByTestId(SETTINGS_MODAL.TIMER_TEST_ID);
		expect(timerSelector).toBeInTheDocument();
		fireEvent.change(timerSelector, { target: { value: timerValue } });
		expect((timerSelector as HTMLSelectElement).value).toBe(timerValue);

		const referencesLoader = screen.getByTestId(
			SETTINGS_MODAL.REFERENCES_TEST_ID
		);
		expect(referencesLoader).toBeInTheDocument();
		fireEvent.change(referencesLoader, { target: { files: filesValue } });
		expect((referencesLoader as HTMLInputElement).files).toBe(filesValue);

		expect(view).toMatchSnapshot();

		const startBtn = screen.getByTestId(SETTINGS_MODAL.BTN_TEST_ID);
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(onStartMock.call.length).toBe(1);
		expect(onCloseMock.call.length).toBe(1);
		expect(view).toMatchSnapshot();
	});

	it('should submit data with random references.', () => {
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
			<ChakraProvider theme={theme}>
				<SettingsModal
					isOpen={true}
					onClose={onCloseMock}
					onStart={onStartMock}
				/>
			</ChakraProvider>
		);

		const typeSelector = screen.getByTestId(SETTINGS_MODAL.PRACTICE_TEST_ID);
		expect(typeSelector).toBeInTheDocument();
		fireEvent.change(typeSelector, { target: { value: typeValue } });
		expect((typeSelector as HTMLSelectElement).value).toBe(typeValue);

		const timerSelector = screen.getByTestId(SETTINGS_MODAL.TIMER_TEST_ID);
		expect(timerSelector).toBeInTheDocument();
		fireEvent.change(timerSelector, { target: { value: timerValue } });
		expect((timerSelector as HTMLSelectElement).value).toBe(timerValue);

		const referencesLoader = screen.getByTestId(
			SETTINGS_MODAL.REFERENCES_TEST_ID
		);
		expect(referencesLoader).toBeInTheDocument();
		fireEvent.change(referencesLoader, { target: { files: filesValue } });
		expect((referencesLoader as HTMLInputElement).files).toBe(filesValue);

		const shuffleCheckbox = screen.getByTestId(SETTINGS_MODAL.RANDOM_TEST_ID);
		expect(shuffleCheckbox).toBeInTheDocument();
		fireEvent.click(shuffleCheckbox);
		expect((shuffleCheckbox as HTMLInputElement).checked).toBe(true);

		expect(view).toMatchSnapshot();

		const startBtn = screen.getByTestId(SETTINGS_MODAL.BTN_TEST_ID);
		expect(startBtn).toBeInTheDocument();
		fireEvent.click(startBtn);

		expect(onStartMock.call.length).toBe(1);
		expect(onCloseMock.call.length).toBe(1);
		expect(view).toMatchSnapshot();
	});
});
