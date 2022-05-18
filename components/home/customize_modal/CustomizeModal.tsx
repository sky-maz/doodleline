/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import {
	useMediaQuery,
	useColorMode,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Text,
	Select,
	Switch,
} from '@chakra-ui/react';
import { FaGlobe, FaMoon, FaPalette, FaSun } from 'react-icons/fa';

import CUSTOMIZE_MODAL from './CustomizeModal.constants';
import { useHomeContext } from '@components/home/home_provider/HomeProvider';

// TODO: Add dynamic and persistent colors
const CustomizeModal: FC = () => {
	const router = useRouter();
	const { t } = useTranslation('home');
	const [isMd] = useMediaQuery('(min-width: 768px)');
	const [language, setLanguage] = useState<string>('en');
	const { colorMode, toggleColorMode } = useColorMode();
	const {
		state: { showCustomize },
		dispatch,
		toggleCustomize,
	} = useHomeContext();

	const isDark = colorMode === 'dark';
	const CurrentMode = isDark ? FaMoon : FaSun;

	useEffect(() => {
		router.push('/', undefined, { locale: language });
	}, [language]);

	return (
		<Modal
			isOpen={showCustomize}
			onClose={() => dispatch(toggleCustomize())}
			isCentered={true}
			colorScheme='teal'
			motionPreset='slideInBottom'
			size={isMd ? 'lg' : '4xl'}
		>
			<ModalOverlay />
			<ModalContent
				aria-label={t(CUSTOMIZE_MODAL.ARIA)}
				marginTop='0px'
				marginBottom='0px'
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '1em 1em 0px 0px', md: '1em' }}
			>
				<ModalHeader>{t(CUSTOMIZE_MODAL.TITLE)}</ModalHeader>
				<ModalCloseButton />
				<ModalBody display='flex' flexDir='column' gap='2em'>
					<FormControl
						display='flex'
						alignItems='center'
						justifyContent='space-between'
					>
						<FormLabel
							htmlFor='language'
							display='flex'
							alignItems='center'
							gap='1em'
							margin={0}
						>
							<FaGlobe />
							<Text>{t(CUSTOMIZE_MODAL.LANGUAGE_LABEL)}</Text>
						</FormLabel>
						<Select
							id='language'
							data-testid={CUSTOMIZE_MODAL.LANGUAGE_TEST_ID}
							size='sm'
							w='15em'
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
						>
							{CUSTOMIZE_MODAL.LANGUAGE_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl
						display='flex'
						alignItems='center'
						justifyContent='space-between'
					>
						<FormLabel
							htmlFor='theme-mode'
							display='flex'
							alignItems='center'
							gap='1em'
							margin={0}
						>
							<CurrentMode />
							<Text>{t(CUSTOMIZE_MODAL.MODE_LABEL)}</Text>
						</FormLabel>
						<Switch
							id='theme-mode'
							data-testid={CUSTOMIZE_MODAL.MODE_TEST_ID}
							colorScheme='green'
							isChecked={isDark}
							onChange={toggleColorMode}
						/>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor='theme-color'
							display='flex'
							alignItems='center'
							gap='1em'
							margin={0}
						>
							<FaPalette />
							<Text>{t(CUSTOMIZE_MODAL.COLOR_LABEL)}</Text>
						</FormLabel>
					</FormControl>
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
};

export default CustomizeModal;
