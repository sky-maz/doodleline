/* eslint-disable @typescript-eslint/no-var-requires */
import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import homeEN from '@locales/en/home.json';
import homeSP from '@locales/sp/home.json';
import theme from '@utils/theme';

import ABOUT_MODAL from './AboutModal.constants';
import AboutModal from './AboutModal';

let isMobile = [false];
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
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
				<ChakraProvider theme={theme}>
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
				<ChakraProvider theme={theme}>
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
			<ChakraProvider theme={theme}>
				<AboutModal isOpen={true} onClose={onCloseMock} />
			</ChakraProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should allow user to click on social media icons', () => {
		// Setup
		const pushMock = jest.fn();
		const onCloseMock = jest.fn();
		isMobile = [true];
		useRouter.mockImplementationOnce(() => ({
			push: pushMock,
		}));

		// Execute
		const view = render(
			<ChakraProvider theme={theme}>
				<AboutModal isOpen={true} onClose={onCloseMock} />
			</ChakraProvider>
		);

		// Validation
		const social = screen.getByTestId(ABOUT_MODAL.SOCIALS[0].key);
		fireEvent.click(social);
		expect(pushMock).toBeCalledTimes(1);

		expect(view).toMatchSnapshot();
	});
});
