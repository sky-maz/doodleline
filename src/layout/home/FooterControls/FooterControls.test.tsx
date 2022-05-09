import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { ChakraProvider } from '@chakra-ui/react';
import FooterControls from './FooterControls';

import defaultTheme from '@config/theme';
import homeEN from './../../../../locales/en/home.json';
import homeSP from './../../../../locales/sp/home.json';
import { FOOTER_CONTROLS } from '@constants/translations';

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
				<ChakraProvider theme={defaultTheme}>
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
				<ChakraProvider theme={defaultTheme}>
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
			<ChakraProvider theme={defaultTheme}>
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
			<ChakraProvider theme={defaultTheme}>
				<FooterControls
					threshold={1800}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		const customizeBtn = screen.getByTestId('customize-btn');
		expect(customizeBtn).toBeInTheDocument();
		fireEvent.click(customizeBtn);
		expect(onToggleCustomizeMock).toBeCalledTimes(1);

		const aboutBtn = screen.getByTestId('about-btn');
		expect(aboutBtn).toBeInTheDocument();
		fireEvent.click(aboutBtn);
		expect(onToggleAboutMock).toBeCalledTimes(1);

		const prevBtn = screen.getByTestId('prev-btn');
		expect(prevBtn).toBeInTheDocument();
		fireEvent.click(prevBtn);
		expect(onPrevRefMock).toBeCalledTimes(1);

		const nextBtn = screen.getByTestId('next-btn');
		expect(nextBtn).toBeInTheDocument();
		fireEvent.click(nextBtn);
		expect(onNextRefMock).toBeCalledTimes(1);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should allow user to interact with controls with keyboard', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<FooterControls
					threshold={1}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		const footerControls = screen.getByTestId('footer-controls');
		fireEvent.keyDown(footerControls, { code: 'example' });
		fireEvent.keyDown(footerControls, { code: 'ShiftLeft' });
		expect(onToggleCustomizeMock).toBeCalledTimes(1);

		fireEvent.keyDown(footerControls, { code: 'Tab' });
		expect(onToggleAboutMock).toBeCalledTimes(1);

		fireEvent.keyDown(footerControls, { code: 'ArrowLeft' });
		expect(onPrevRefMock).toBeCalledTimes(1);

		fireEvent.keyDown(footerControls, { code: 'ArrowRight' });
		expect(onNextRefMock).toBeCalledTimes(1);

		fireEvent.keyDown(footerControls, { code: 'Space' });
		const playBtn = screen.getByTestId('play-btn');
		expect(playBtn.id).toBe('pause-btn');

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
			<ChakraProvider theme={defaultTheme}>
				<FooterControls
					threshold={1}
					onToggleCustomize={onToggleCustomizeMock}
					onToggleAbout={onToggleAboutMock}
					onPrevRef={onPrevRefMock}
					onNextRef={onNextRefMock}
				/>
			</ChakraProvider>
		);

		const playBtn = screen.getByTestId('play-btn');
		expect(playBtn).toBeInTheDocument();
		fireEvent.click(playBtn);

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
