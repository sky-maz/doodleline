import React, { FC, useEffect, useState } from 'react';
import { Text, Progress, Stack, IconButton, Flex } from '@chakra-ui/react';
import {
	FaStepBackward,
	FaStepForward,
	FaPause,
	FaPlay,
	FaCog,
	FaQuestion,
} from 'react-icons/fa';
import useDebounce from '@hooks/useDebounce';
import { asTime } from '@utils/convert';

interface IFooterControls {
	threshold?: number;
	onPrevRef: () => void;
	onNextRef: () => void;
}

const FooterControls: FC<IFooterControls> = (props) => {
	const { threshold, onPrevRef, onNextRef } = props;
	const [timer, setTimer] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);

	useDebounce(
		() => {
			if (threshold && !isPaused) {
				setTimer(timer + 1);
			}
		},
		1000,
		[isPaused, timer]
	);

	useEffect(() => {
		if (threshold && timer > threshold) {
			onNext();
		}
	}, [timer]);

	const onPrev = () => {
		setTimer(0);
		onPrevRef();
	};

	const onNext = () => {
		setTimer(0);
		onNextRef();
	};

	return (
		<Flex h='100%' w='100%' alignItems='center'>
			<Flex flex='1' justify='center'>
				<IconButton
					isRound
					aria-label='customize-settings'
					size='md'
					icon={<FaCog />}
				/>
			</Flex>
			<Flex flex='2' flexDir='column' justify='stretch' gap={4}>
				<Flex align='center' justify='center' gap={2}>
					<Text fontSize='sm'>{asTime(timer)}</Text>
					<Progress
						colorScheme='teal'
						size='sm'
						width='100%'
						borderRadius='5px'
						value={(timer / (threshold ?? 1)) * 100}
					/>
					<Text fontSize='sm'>{asTime(threshold ?? 0)}</Text>
				</Flex>
				<Flex align='center' justify='center' gap={4}>
					<IconButton
						isRound
						aria-label='previous-reference'
						colorScheme='teal'
						size='md'
						icon={<FaStepBackward />}
						onClick={onPrev}
					/>
					<IconButton
						isRound
						aria-label={isPaused ? 'play' : 'pause'}
						colorScheme='teal'
						size='lg'
						icon={isPaused ? <FaPlay /> : <FaPause />}
						onClick={() => setIsPaused(!isPaused)}
					/>
					<IconButton
						isRound
						aria-label='next-reference'
						colorScheme='teal'
						size='md'
						icon={<FaStepForward />}
						onClick={onNext}
					/>
				</Flex>
			</Flex>
			<Flex flex='1' justify='center'>
				<IconButton
					isRound
					aria-label='customize-settings'
					size='md'
					icon={<FaQuestion />}
				/>
			</Flex>
		</Flex>
		// <>
		// 	<Stack direction='row' align='center' justify='center' spacing={4}>
		// 		<Text color='brand.color' fontSize='sm'>
		// 			{asTime(timer)}
		// 		</Text>
		// 		<Progress
		// 			colorScheme='teal'
		// 			size='sm'
		// 			width='250px'
		// 			borderRadius='5px'
		// 			value={(timer / (threshold ?? 1)) * 100}
		// 		/>
		// 		<Text color='brand.color' fontSize='sm'>
		// 			{asTime(threshold ?? 0)}
		// 		</Text>
		// 	</Stack>
		// 	<Stack direction='row' align='center' justify='center' spacing={4}>
		// 		<IconButton
		// 			isRound
		// 			aria-label='previous-reference'
		// 			colorScheme='teal'
		// 			size='md'
		// 			icon={<FaStepBackward />}
		// 			onClick={onPrev}
		// 		/>
		// 		<IconButton
		// 			isRound
		// 			aria-label={isPaused ? 'play' : 'pause'}
		// 			colorScheme='teal'
		// 			size='lg'
		// 			icon={isPaused ? <FaPlay /> : <FaPause />}
		// 			onClick={() => setIsPaused(!isPaused)}
		// 		/>
		// 		<IconButton
		// 			isRound
		// 			aria-label='next-reference'
		// 			colorScheme='teal'
		// 			size='md'
		// 			icon={<FaStepForward />}
		// 			onClick={onNext}
		// 		/>
		// 	</Stack>
		// </>
	);
};

export default FooterControls;
