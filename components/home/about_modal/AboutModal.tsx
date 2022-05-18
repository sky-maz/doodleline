import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
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
	UnorderedList,
	ListItem,
	IconButton,
} from '@chakra-ui/react';

import ABOUT_MODAL from './AboutModal.constants';
import { useHomeContext } from '@components/home/home_provider/HomeProvider';

const AboutModal: FC = () => {
	const router = useRouter();
	const { t } = useTranslation('home');
	const [isMd] = useMediaQuery('(min-width: 768px)');
	const {
		state: { showAbout },
		dispatch,
		toggleAbout,
	} = useHomeContext();

	return (
		<Modal
			isOpen={showAbout}
			onClose={() => dispatch(toggleAbout())}
			isCentered={true}
			motionPreset='slideInBottom'
			size='4xl'
			scrollBehavior='inside'
		>
			<ModalOverlay />
			<ModalContent
				aria-label={t(ABOUT_MODAL.ARIA)}
				marginTop='0px'
				marginBottom='0px'
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '1em 1em 0px 0px', md: '1em' }}
			>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody>
					<Flex
						flexDir={isMd ? 'row' : 'column'}
						alignItems='flex-start'
						justifyContent='center'
						gap='2em'
					>
						<Flex flex='1' flexDir='column' gap='1em'>
							<Heading size='md'>{t(ABOUT_MODAL.INSTRUCTIONS_TITLE)}</Heading>
							<Text fontSize='md' textAlign='justify'>
								{t(ABOUT_MODAL.INSTRUCTIONS_DESCRIPTION)}
							</Text>
							<UnorderedList>
								{ABOUT_MODAL.INSTRUCTIONS_TYPES.map(({ name, desc }) => (
									<ListItem key={name}>
										<Text as='span' fontWeight='bold'>
											{`${t(name)}: `}
										</Text>
										<Text as='span'>{t(desc)}</Text>
									</ListItem>
								))}
							</UnorderedList>
						</Flex>
						<Divider orientation='vertical' />
						<Flex flex='1' flexDir='column' gap='1em'>
							<Heading size='md'>{t(ABOUT_MODAL.SHORTCUTS_TITLE)}</Heading>
							{ABOUT_MODAL.SHORTCUTS.map(({ key, shortcut }) => (
								<Flex key={key} align='center' justify='space-between'>
									<Text as='span'>{t(key)}</Text>
									<Kbd dangerouslySetInnerHTML={{ __html: shortcut }} />
								</Flex>
							))}
						</Flex>
					</Flex>
				</ModalBody>
				<ModalFooter
					display='flex'
					flexDir='column'
					justifyContent='center'
					gap='1em'
				>
					<Flex gap='2em'>
						{ABOUT_MODAL.SOCIALS.map(({ key, to, Icon }) => (
							<IconButton
								isRound
								key={key}
								aria-label={key}
								data-testid={key}
								size='sm'
								colorScheme='teal'
								icon={<Icon size={18} />}
								onClick={() => router.push(to)}
							/>
						))}
					</Flex>
					<Text fontSize='sm' textAlign='center'>
						Doodleline v1.0.0
					</Text>
					<Text fontSize='xs' textAlign='center'>
						{t(ABOUT_MODAL.COPYRIGHT)}
					</Text>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AboutModal;
