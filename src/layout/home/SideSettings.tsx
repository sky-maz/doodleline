import React, { FC, useState } from 'react';
import {
	useToast,
	Stack,
	Heading,
	Text,
	FormControl,
	FormLabel,
	Select,
	Button,
	Flex,
	Tooltip,
	IconButton,
	Checkbox,
} from '@chakra-ui/react';
import {
	FaCheckCircle,
	FaCloudUploadAlt,
	FaCog,
	FaQuestion,
} from 'react-icons/fa';

import { practiceOptions, Settings, timerOptions } from '@utils/constants';

interface ISideSettings {
	onStart: (settings: Settings) => void;
	onOpenCustomize: () => void;
	onOpenHelp: () => void;
}

const SideSettings: FC<ISideSettings> = (props) => {
	const { onStart, onOpenCustomize, onOpenHelp } = props;
	const toast = useToast();
	const [type, setType] = useState<string>(practiceOptions[0].value);
	const [timer, setTimer] = useState<string>(timerOptions[0].value);
	const [files, setFiles] = useState<FileList | null>(null);
	const [shuffle, setShuffle] = useState<boolean>(false);
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
		} else {
			toast({
				title: 'Error starting practice',
				description: 'You need to upload reference to start practicing',
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: 'bottom-left',
			});
			console.log('Error :(');
		}
	};

	return (
		<Stack spacing={5}>
			<Flex direction='row' alignItems='center' justifyContent='space-between'>
				<Heading size='lg'>Settings</Heading>
				<Flex alignItems='center' justifyContent='center' gap={5}>
					<Tooltip label='Customization'>
						<IconButton
							isRound
							aria-label='Customization'
							size='sm'
							icon={<FaCog />}
							onClick={onOpenCustomize}
						/>
					</Tooltip>
					<Tooltip label='About'>
						<IconButton
							isRound
							aria-label='About'
							size='sm'
							icon={<FaQuestion />}
							onClick={onOpenHelp}
						/>
					</Tooltip>
				</Flex>
			</Flex>
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
			<Button colorScheme='teal' onClick={onSubmit}>
				Start!
			</Button>
		</Stack>
	);
};

export default SideSettings;
