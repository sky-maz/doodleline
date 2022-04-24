import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import defaultTheme from '@config/theme';
import FooterControls from './FooterControls';

describe('<FooterControls /> component ', () => {
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

	it('should display with threshold view', () => {
		// Setup
		const onToggleCustomizeMock = jest.fn();
		const onToggleAboutMock = jest.fn();
		const onPrevRefMock = jest.fn();
		const onNextRefMock = jest.fn();

		// Execute
		const view = render(
			<ChakraProvider theme={defaultTheme}>
				<FooterControls
					threshold={30}
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

	it('should allow user to interact with controls', () => {
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
