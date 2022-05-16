import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import homeEN from '@locales/en/home.json';
import homeSP from '@locales/sp/home.json';
import theme from '@utils/theme';

import REFERENCES_CANVAS from './ReferencesCanvas.constants';
import ReferencesCanvas from './ReferencesCanvas';

describe('<ReferenceCanvas /> component', () => {
	it('should display the en translation', () => {
		// Setup
		const blob = new Blob([''], { type: 'text/html' });
		const file = blob as File;

		// Execute
		const view = render(
			<I18nProvider
				lang='en'
				namespaces={{
					home: homeEN,
				}}
			>
				<ChakraProvider theme={theme}>
					<ReferencesCanvas reference={file} />
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display the sp translation', () => {
		// Setup
		const blob = new Blob([''], { type: 'text/html' });
		const file = blob as File;

		// Execute
		const view = render(
			<I18nProvider
				lang='sp'
				namespaces={{
					home: homeSP,
				}}
			>
				<ChakraProvider theme={theme}>
					<ReferencesCanvas reference={file} />
				</ChakraProvider>
			</I18nProvider>
		);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display the no images message', () => {
		// Execute
		const view = render(<ReferencesCanvas />);

		// Validation
		expect(view).toMatchSnapshot();
	});

	// it('should allow the user to interact with controls', () => {});
});
