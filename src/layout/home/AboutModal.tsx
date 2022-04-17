import React, { FC } from 'react';
import {
	useMediaQuery,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalCloseButton,
	ModalFooter,
	Heading,
	Text,
	Divider,
	Kbd,
	Flex,
	IconButton,
} from '@chakra-ui/react';
import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

interface IAboutModal {
	isOpen: boolean;
	onClose: () => void;
}

const AboutModal: FC<IAboutModal> = ({ isOpen, onClose }) => {
	const [isMd] = useMediaQuery('(min-width: 768px)');

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered={true}
			colorScheme='teal'
			motionPreset='slideInBottom'
			size={isMd ? 'lg' : 'xl'}
			scrollBehavior='inside'
		>
			<ModalOverlay />
			<ModalContent
				marginTop='0px'
				marginBottom='0px'
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '8px 8px 0px 0px', md: '8px' }}
			>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody>
					<Flex alignItems='flex-start' justifyContent='center' gap='20px'>
						<Flex flex='1' flexDir='column' gap='20px'>
							<Heading size='md'>Instructions</Heading>
							<Text fontSize='md' textAlign='justify'>
								......
							</Text>
						</Flex>
						<Divider orientation='vertical' />
						<Flex flex='1' flexDir='column' gap='20px'>
							<Heading size='md'>Shortcuts</Heading>
							<span>
								<Kbd>shift</Kbd> + <Kbd>H</Kbd>
							</span>
							<span>
								<Kbd>shift</Kbd> + <Kbd>H</Kbd>
							</span>
						</Flex>
					</Flex>
				</ModalBody>
				<ModalFooter
					display='flex'
					flexDir='column'
					justifyContent='center'
					gap='10px'
				>
					<Flex gap='20px'>
						<IconButton
							isRound
							aria-label='discord link'
							colorScheme='blue'
							size='sm'
							icon={<FaDiscord size={18} />}
						/>
						<IconButton
							isRound
							aria-label='instagram link'
							colorScheme='purple'
							size='sm'
							icon={<FaInstagram size={18} />}
						/>
						<IconButton
							isRound
							aria-label='tiktok link'
							colorScheme='gray'
							size='sm'
							icon={<FaTiktok size={18} />}
						/>
						<IconButton
							isRound
							aria-label='youtube link'
							colorScheme='red'
							size='sm'
							icon={<FaYoutube size={18} />}
						/>
					</Flex>
					<Text fontSize='sm' color='blackAlpha.600' textAlign='center'>
						Doodleline v1.0.0
					</Text>
					<Text fontSize='xs' color='blackAlpha.600' textAlign='center'>
						Developed by SkyCodelabs © 2022.
					</Text>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AboutModal;
