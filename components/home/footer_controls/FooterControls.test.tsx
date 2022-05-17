import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import homeEN from '@locales/en/home.json';
import homeSP from '@locales/sp/home.json';
import theme from '@utils/theme';

import FOOTER_CONTROLS from './FooterControls.constants';
import FooterControls from './FooterControls';

describe('<FooterControls /> component ', () => {
	it('should display the en translation', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<I18nProvider
				lang='en'
				namespaces={{
					home: homeEN,
				}}
			>
				<ChakraProvider theme={theme}>
					<FooterControls
						threshold={0}
						onToggleCustomize={onToggleCustomizeMock}
						onToggleAbout={onToggleAboutMock}
						onPrevRef={onPrevRefMock}
						onNextRef={onNextRefMock}
					/>
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display the sp translation', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<I18nProvider
				lang='sp'
				namespaces={{
					home: homeSP,
				}}
			>
				<ChakraProvider theme={theme}>
					<FooterControls
						threshold={0}
						onToggleCustomize={onToggleCustomizeMock}
						onToggleAbout={onToggleAboutMock}
						onPrevRef={onPrevRefMock}
						onNextRef={onNextRefMock}
					/>
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display without threshold view', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<FooterControls
					threshold={0}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should allow user to interact with controls with mouse', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<FooterControls
					threshold={1800}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		const customizeBtn = screen.getByTestId(FOOTER_CONTROLS.CUSTOMIZE_TEST_ID);
		expect(customizeBtn).toBeInTheDocument();
		fireEvent.click(customizeBtn);
		expect(onToggleCustomizeMock).toBeCalledTimes(1);

		const aboutBtn = screen.getByTestId(FOOTER_CONTROLS.ABOUT_TEST_ID);
		expect(aboutBtn).toBeInTheDocument();
		fireEvent.click(aboutBtn);
		expect(onToggleAboutMock).toBeCalledTimes(1);

		const prevBtn = screen.getByTestId(FOOTER_CONTROLS.PREV_TEST_ID);
		expect(prevBtn).toBeInTheDocument();
		fireEvent.click(prevBtn);
		expect(onPrevRefMock).toBeCalledTimes(1);

		const nextBtn = screen.getByTestId(FOOTER_CONTROLS.NEXT_TEST_ID);
		expect(nextBtn).toBeInTheDocument();
		fireEvent.click(nextBtn);
		expect(onNextRefMock).toBeCalledTimes(1);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should call onNextRef when treshold is met', async () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<FooterControls
					threshold={1}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		const toggleBtn = screen.getByTestId(FOOTER_CONTROLS.TOGGLE_TEST_ID);
		expect(toggleBtn).toBeInTheDocument();
		fireEvent.click(toggleBtn);

		await waitFor(
			() => {
				expect(onNextRefMock).toBeCalledTimes(1);
			},
			{ timeout: 2100 }
		);

		// Validation
		expect(view).toMatchSnapshot();
	});
});
