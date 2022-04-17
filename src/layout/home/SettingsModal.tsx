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
import { FaCheckCircle, FaCloudUploadAlt } from 'react-icons/fa';

import { Settings, practiceOptions, timerOptions } from '@utils/constants';

interface ISettingsModal {
	isOpen: boolean;
	onClose: () => void;
	onStart: (settings: Settings) => void;
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, onStart }) => {
	const [type, setType] = useState<string>(practiceOptions[0].value);
	const [timer, setTimer] = useState<string>(timerOptions[0].value);
	const [files, setFiles] = useState<FileList | null>(null);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const [isMd] = useMediaQuery('(min-width: 768px)');
	const toast = useToast();
	const hasFiles = files && files.length > 0;

	const onSubmit = () => {
		const hasType = practiceOptions.some((opt) => opt.value === type);
		const hasTime = timerOptions.some((opt) => opt.value === timer);
		if (hasType && hasTime && hasFiles) {
			onStart({
				type,
				timer: parseInt(timer),
				imgs: files,
			});
			onClose();
		} else {
			toast({
				title: 'Error starting practice',
				description: 'You need to upload reference to start practicing',
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: isMd ? 'top' : 'bottom',
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
			size={isMd ? 'lg' : 'xl'}
		>
			<ModalOverlay />
			<ModalContent
				marginTop='0px'
				marginBottom='0px'
				alignSelf={{ base: 'flex-end', md: 'center' }}
				borderRadius={{ base: '8px 8px 0px 0px', md: '8px' }}
			>
				<ModalHeader>Settings</ModalHeader>
				<ModalBody display='flex' flexDir='column' gap='20px'>
					<FormControl>
						<FormLabel htmlFor='type'>Practice type</FormLabel>
						<Select
							id='type'
							size='lg'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							{practiceOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='timer'>Timer</FormLabel>
						<Select
							id='timer'
							size='lg'
							value={timer}
							onChange={(e) => setTimer(e.target.value)}
						>
							{timerOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<input
							multiple
							id='references'
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
								h='100px'
								w='100%'
								variant={hasFiles ? 'solid' : 'outline'}
								colorScheme={hasFiles ? 'green' : undefined}
								leftIcon={hasFiles ? undefined : <FaCloudUploadAlt />}
								rightIcon={hasFiles ? <FaCheckCircle /> : undefined}
							>
								{hasFiles
									? `${files.length} references loaded`
									: 'Select references'}
							</Button>
						</FormLabel>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor='random'
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							margin='0px'
						>
							<Text>Shuffle references</Text>
							<Checkbox
								id='random'
								colorScheme='teal'
								checked={shuffle}
								onChange={() => setShuffle(!shuffle)}
							/>
						</FormLabel>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='teal' isFullWidth onClick={onSubmit}>
						Start!
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SettingsModal;
