import React, { ComponentProps, FC } from 'react';
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import theme from '@utils/theme';

interface ChakraProps extends ComponentProps<'div'> {
	cookies: string;
}

export const ChakraUI: FC<ChakraProps> = ({ cookies, children }) => {
	return (
		<ChakraProvider
			theme={theme}
			colorModeManager={cookieStorageManager(cookies)}
		>
			{children}
		</ChakraProvider>
	);
};
