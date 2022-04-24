import React, { FC, useEffect, useState } from 'react';
import { Text, Progress, IconButton, Flex } from '@chakra-ui/react';
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
	threshold: number;
	onToggleCustomize: () => void;
	onToggleAbout: () => void;
	onPrevRef: () => void;
	onNextRef: () => void;
}

const FooterControls: FC<IFooterControls> = ({
	threshold,
	onToggleCustomize,
	onToggleAbout,
	onPrevRef,
	onNextRef,
}) => {
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
					data-testid='customize-btn'
					aria-label='customize-settings'
					size='md'
					icon={<FaCog />}
					onClick={onToggleCustomize}
				/>
			</Flex>
			<Flex flex='2' flexDir='column' justify='stretch' gap={4}>
				<Flex align='center' justify='center' gap={2}>
					<Text data-testid='timer-span' fontSize='sm'>
						{asTime(timer)}
					</Text>
					<Progress
						colorScheme='teal'
						size='sm'
						width='100%'
						borderRadius='5px'
						value={(timer / threshold) * 100}
					/>
					<Text fontSize='sm'>{asTime(threshold)}</Text>
				</Flex>
				<Flex align='center' justify='center' gap={4}>
					<IconButton
						isRound
						data-testid='prev-btn'
						aria-label='previous-reference'
						colorScheme='teal'
						size='md'
						icon={<FaStepBackward />}
						onClick={onPrev}
					/>
					{threshold > 0 && (
						<IconButton
							isRound
							data-testid='play-btn'
							aria-label={isPaused ? 'play' : 'pause'}
							colorScheme='teal'
							size='lg'
							icon={isPaused ? <FaPlay /> : <FaPause />}
							onClick={() => setIsPaused(!isPaused)}
						/>
					)}
					<IconButton
						isRound
						data-testid='next-btn'
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
					data-testid='about-btn'
					aria-label='about-app'
					size='md'
					icon={<FaQuestion />}
					onClick={onToggleAbout}
				/>
			</Flex>
		</Flex>
	);
};

export default FooterControls;
