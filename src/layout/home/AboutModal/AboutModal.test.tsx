import React from 'react';
import { render } from '@testing-library/react';
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
		const view = render(<AboutModal isOpen={true} onClose={onCloseMock} />);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should display desktop view', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [false];

		// Execute
		const view = render(<AboutModal isOpen={true} onClose={onCloseMock} />);

		// Validation
		expect(view).toMatchSnapshot();
	});

	it('should be hidden if isOpen=false', () => {
		// Setup
		const onCloseMock = jest.fn();
		isMobile = [false];

		// Execute
		const view = render(<AboutModal isOpen={false} onClose={onCloseMock} />);

		// Validation
		expect(view).toMatchSnapshot();
	});
});
