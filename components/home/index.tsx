import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { HomeProvider } from './home_provider/HomeProvider';
import ReferencesCanvas from './reference_canvas/ReferencesCanvas';
import FooterControls from './footer_controls/FooterControls';
import SettingsModal from './settings_modal/SettingsModal';
import CustomizeModal from './customize_modal/CustomizeModal';
import AboutModal from './about_modal/AboutModal';

const HomeView: FC = () => {
	return (
		<HomeProvider>
			<Flex direction='column' h='100vh' w='100vw'>
				<Flex h='calc(100vh - 6em)' w='100vw' gap='1em'>
					<ReferencesCanvas />
				</Flex>
				<Box h='6em' w='100vw'>
					<FooterControls />
				</Box>
				<SettingsModal />
				<CustomizeModal />
				<AboutModal />
			</Flex>
		</HomeProvider>
	);
};

export default HomeView;
