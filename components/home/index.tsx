import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { HomeProvider } from './home_provider/HomeProvider';
import ReferencesCanvas from './reference_canvas/ReferencesCanvas';
import FooterControls from './footer_controls/FooterControls';
import SettingsModal from './settings_modal/SettingsModal';
import CustomizeModal from './customize_modal/CustomizeModal';
import AboutModal from './about_modal/AboutModal';
import { useCookieState } from 'ahooks';

interface HomeViewProps {
	colorMode: string;
	colorScheme: string;
}

const HomeView: FC<HomeViewProps> = ({ colorScheme }) => {
	const [colorCookie, setColorCookie] = useCookieState(
		'chakra-ui-color-scheme'
	);
	const currentColor = colorCookie ?? colorScheme;

	return (
		<HomeProvider>
			<Flex direction='column' h='100vh' w='100vw'>
				<Flex h='calc(100vh - 6em)' w='100vw' gap='1em'>
					<ReferencesCanvas colorScheme={currentColor} />
				</Flex>
				<Box h='6em' w='100vw'>
					<FooterControls colorScheme={currentColor} />
				</Box>
				<SettingsModal colorScheme={currentColor} />
				<CustomizeModal
					colorScheme={currentColor}
					onChangeColorScheme={setColorCookie}
				/>
				<AboutModal colorScheme={currentColor} />
			</Flex>
		</HomeProvider>
	);
};

export default HomeView;
