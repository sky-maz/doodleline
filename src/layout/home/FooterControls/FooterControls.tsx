/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Progress, IconButton, Flex } from '@chakra-ui/react';
import {
	FaStepBackward,
	FaStepForward,
	FaPause,
	FaPlay,
	FaCog,
	FaQuestion,
} from 'react-icons/fa';
import useTranslation from 'next-translate/useTranslation';
import { NS, FOOTER_CONTROLS } from '@constants/translations';
import { useDebounceEffect, useEventListener } from 'ahooks';

interface FooterControlsProps {
	threshold: number;
	onToggleCustomize: () => void;
	onToggleAbout: () => void;
	onPrevRef: () => void;
	onNextRef: () => void;
}

const FooterControls: FC<FooterControlsProps> = ({
	threshold,
	onToggleCustomize,
	onToggleAbout,
	onPrevRef,
	onNextRef,
}) => {
	const { t } = useTranslation(NS.HOME);
	const [timer, setTimer] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);

	const onPrev = () => {
		setTimer(0);
		onPrevRef();
	};

	const onNext = () => {
		setTimer(0);
		onNextRef();
	};

	const onTogglePause = () => setIsPaused(!isPaused);

	useDebounceEffect(
		() => {
			if (threshold && !isPaused) {
				setTimer(timer + 1);
			}
		},
		[isPaused, timer],
		{ wait: 1000 }
	);

	useEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ShiftLeft':
				return onToggleCustomize();
			case 'Tab':
				return onToggleAbout();
			case 'ArrowLeft':
				return onPrev();
			case 'ArrowRight':
				return onNext();
			case 'Space':
				return onTogglePause();
			default:
				return;
		}
	});

	useEffect(() => {
		if (threshold && timer > threshold) {
			onNext();
		}
	}, [timer]);

	return (
		<Flex
			data-testid='footer-controls'
			h='100%'
			w='100%'
			direction='column'
			justify='stretch'
		>
			<Progress
				colorScheme='teal'
				size='sm'
				width='100%'
				value={(timer / threshold) * 100}
			/>
			<Flex h='100%' w='100%' alignItems='center'>
				<Flex flex='1' justify='center'>
					<IconButton
						isRound
						data-testid='customize-btn'
						aria-label={t(FOOTER_CONTROLS.CUSTOMIZE_ARIA)}
						size='md'
						icon={<FaCog />}
						onClick={onToggleCustomize}
					/>
				</Flex>
				<Flex align='center' justify='center' gap={4}>
					<IconButton
						isRound
						data-testid='prev-btn'
						aria-label={t(FOOTER_CONTROLS.PREV_ARIA)}
						colorScheme='teal'
						size='md'
						icon={<FaStepBackward />}
						onClick={onPrev}
					/>
					{threshold > 0 && (
						<IconButton
							isRound
							id={isPaused ? 'play-btn' : 'pause-btn'}
							data-testid='play-btn'
							aria-label={t(
								isPaused
									? FOOTER_CONTROLS.PLAY_ARIA
									: FOOTER_CONTROLS.PAUSE_ARIA
							)}
							colorScheme='teal'
							size='lg'
							icon={isPaused ? <FaPlay /> : <FaPause />}
							onClick={onTogglePause}
						/>
					)}
					<IconButton
						isRound
						data-testid='next-btn'
						aria-label={t(FOOTER_CONTROLS.NEXT_ARIA)}
						colorScheme='teal'
						size='md'
						icon={<FaStepForward />}
						onClick={onNext}
					/>
				</Flex>
				<Flex flex='1' justify='center'>
					<IconButton
						isRound
						data-testid='about-btn'
						aria-label={t(FOOTER_CONTROLS.ABOUT_ARIA)}
						size='md'
						icon={<FaQuestion />}
						onClick={onToggleAbout}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FooterControls;
