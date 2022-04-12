import React, { FC, useEffect, useState } from 'react';
import { Text, Progress, Stack, IconButton } from '@chakra-ui/react';
import { FaStepBackward, FaStepForward, FaPause, FaPlay } from 'react-icons/fa';
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
		<>
			<Stack direction='row' align='center' justify='center' spacing={4}>
				<Text color='brand.color' fontSize='sm'>
					{asTime(timer)}
				</Text>
				<Progress
					colorScheme='teal'
					size='sm'
					width='250px'
					borderRadius='5px'
					value={(timer / (threshold ?? 1)) * 100}
				/>
				<Text color='brand.color' fontSize='sm'>
					{asTime(threshold ?? 0)}
				</Text>
			</Stack>
			<Stack direction='row' align='center' justify='center' spacing={4}>
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
			</Stack>
		</>
	);
};

export default FooterControls;
