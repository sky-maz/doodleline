import React, { FC } from 'react';
import {
	useMediaQuery,
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
	Button,
} from '@chakra-ui/react';
import { FaGlobe, FaMoon, FaPalette, FaSun } from 'react-icons/fa';
import { languageOptions } from '@utils/constants';

interface ICustomizeModal {
	isOpen: boolean;
	onClose: () => void;
}

const CustomizeModal: FC<ICustomizeModal> = ({ isOpen, onClose }) => {
	const [isMd] = useMediaQuery('(min-width: 768px)');
	const CurrentMode = true ? FaSun : FaMoon;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered={true}
			colorScheme='teal'
			motionPreset='slideInBottom'
			size={isMd ? 'lg' : '4xl'}
		>
			<ModalOverlay />
			<ModalContent
				marginTop='0px'
				marginBottom='0px'
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '1em 1em 0px 0px', md: '1em' }}
			>
				<ModalHeader>Customize Settings</ModalHeader>
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
							<Text>Language</Text>
						</FormLabel>
						<Select
							id='language'
							size='sm'
							w='15em'
							// value={type}
							// onChange={(e) => setType(e.target.value)}
						>
							{languageOptions.map((opt) => (
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
							<Text>Theme Mode</Text>
						</FormLabel>
						<Switch id='theme-mode' />
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
							<Text>Main Color</Text>
						</FormLabel>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='teal' isFullWidth>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CustomizeModal;
