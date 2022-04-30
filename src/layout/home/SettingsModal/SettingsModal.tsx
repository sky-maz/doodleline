import _ from 'lodash';
import React, { FC, useState } from 'react';
import {
	useToast,
	useMediaQuery,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Select,
	Text,
	Checkbox,
	Button,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { FaCheckCircle, FaCloudUploadAlt } from 'react-icons/fa';
import { NS, SETTINGS_MODAL } from '@constants/translations';

interface ISettingsModal {
	isOpen: boolean;
	onClose: () => void;
	onStart: (type: string, timer: number, files: File[]) => void;
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, onStart }) => {
	const { PRACTICE_OPTIONS, TIMER_OPTIONS } = SETTINGS_MODAL;
	const { t } = useTranslation(NS.HOME);
	const toast = useToast();
	const [isMd] = useMediaQuery('(min-width: 768px)');
	const [type, setType] = useState<string>(PRACTICE_OPTIONS[0].value);
	const [timer, setTimer] = useState<number>(TIMER_OPTIONS[0].value);
	const [files, setFiles] = useState<FileList | null>(null);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const hasFiles = files && files.length > 0;

	const onSubmit = () => {
		const hasType = PRACTICE_OPTIONS.some((opt) => opt.value === type);
		const hasTime = TIMER_OPTIONS.some((opt) => opt.value === timer);
		if (hasType && hasTime && hasFiles) {
			const filesArr = [];
			for (let i = 0; i < files.length; i++) {
				filesArr.push(files[i]);
			}
			onStart(type, timer, shuffle ? _.shuffle(filesArr) : filesArr);
			onClose();
		} else {
			toast({
				title: t(SETTINGS_MODAL.TOAST_TITLE),
				description: t(SETTINGS_MODAL.TOAST_DESCRIPTION),
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			blockScrollOnMount={true}
			closeOnEsc={false}
			closeOnOverlayClick={false}
			colorScheme='teal'
			motionPreset='slideInBottom'
			size={isMd ? 'lg' : '4xl'}
		>
			<ModalOverlay />
			<ModalContent
				marginTop='0px'
				marginBottom='0px'
				aria-label={t(SETTINGS_MODAL.ARIA)}
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '1em 1em 0px 0px', md: '1em' }}
			>
				<ModalHeader>{t(SETTINGS_MODAL.TITLE)}</ModalHeader>
				<ModalBody display='flex' flexDir='column' gap='2em'>
					<FormControl>
						<FormLabel htmlFor='type'>
							{t(SETTINGS_MODAL.PRACTICE_LABEL)}
						</FormLabel>
						<Select
							id='type'
							data-testid='type-selector'
							aria-label={t(SETTINGS_MODAL.PRACTICE_ARIA)}
							size='lg'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							{PRACTICE_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{t(opt.key)}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='timer'>
							{t(SETTINGS_MODAL.TIMER_LABEL)}
						</FormLabel>
						<Select
							id='timer'
							data-testid='timer-selector'
							aria-label={t(SETTINGS_MODAL.TIMER_ARIA)}
							size='lg'
							value={timer}
							onChange={(e) => setTimer(parseInt(e.target.value))}
						>
							{TIMER_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{t(opt.key, {
										value: opt.value > 30 ? opt.value / 60 : opt.value,
									})}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<input
							multiple
							id='references'
							data-testid='references-loader'
							accept='image/*'
							type='file'
							style={{ display: 'none' }}
							onChange={(e) => setFiles(e.target.files)}
						/>
						<FormLabel
							htmlFor='references'
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							margin='0px'
						>
							<Button
								as='span'
								size='lg'
								h='10em'
								w='100%'
								aria-label={t(SETTINGS_MODAL.REFERENCES_ARIA)}
								variant={hasFiles ? 'solid' : 'outline'}
								colorScheme={hasFiles ? 'green' : undefined}
								leftIcon={hasFiles ? undefined : <FaCloudUploadAlt />}
								rightIcon={hasFiles ? <FaCheckCircle /> : undefined}
							>
								{hasFiles
									? t(SETTINGS_MODAL.REFERENCES_DATA_LABEL, {
											length: files.length,
									  })
									: t(SETTINGS_MODAL.REFERENCES_EMPTY_LABEL)}
							</Button>
						</FormLabel>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor='random'
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							margin='0em'
						>
							<Text>{t(SETTINGS_MODAL.RANDOM_LABEL)}</Text>
							<Checkbox
								id='random'
								data-testid='shuffle-checkbox'
								aria-label={t(SETTINGS_MODAL.RANDOM_ARIA)}
								colorScheme='teal'
								checked={shuffle}
								onChange={() => setShuffle(!shuffle)}
							/>
						</FormLabel>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						isFullWidth
						data-testid='settings-start'
						aria-label={t(SETTINGS_MODAL.BTN_ARIA)}
						colorScheme='teal'
						onClick={onSubmit}
					>
						{t(SETTINGS_MODAL.BTN_TEXT)}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SettingsModal;
