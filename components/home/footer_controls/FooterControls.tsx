/* eslint-disable react-hooks/exhaustive-deps */
import useTranslation from 'next-translate/useTranslation';
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
import { useDebounceEffect } from 'ahooks';

import FOOTER_CONTROLS from './FooterControls.constants';
import { useHomeContext } from '@components/home/home_provider/HomeProvider';

const FooterControls: FC = () => {
	const { t } = useTranslation('home');
	const [timer, setTimer] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const {
		state: { settings, current },
		dispatch,
		updateCurrent,
		toggleCustomize,
		toggleAbout,
		resetHome,
	} = useHomeContext();

	const hasThreshold = settings && settings.timeThreshold > 0;

	const onPrev = () => {
		if (settings && current > 0) {
			setTimer(0);
			dispatch(updateCurrent(current - 1));
		}
	};

	const onNext = () => {
		if (!settings) return;

		setTimer(0);
		const lastIndex = settings.images.length - 1;
		dispatch(current < lastIndex ? updateCurrent(current + 1) : resetHome());
	};

	const onTogglePause = () => setIsPaused(!isPaused);

	useDebounceEffect(
		() => {
			if (settings && !isPaused) {
				setTimer(timer + 1);
			}
		},
		[isPaused, timer],
		{ wait: 1000 }
	);

	useEffect(() => {
		if (settings && timer > settings.timeThreshold) {
			onNext();
		}
	}, [timer]);

	return (
		<Flex
			data-testid={FOOTER_CONTROLS.TEST_ID}
			bg='blackAlpha.300'
			h='100%'
			w='100%'
			direction='column'
			justify='stretch'
		>
			{hasThreshold && (
				<Progress
					colorScheme='teal'
					size='sm'
					width='100%'
					value={(timer / settings.timeThreshold) * 100}
				/>
			)}
			<Flex h='100%' w='100%' alignItems='center'>
				<Flex flex='1' justify='center'>
					<IconButton
						isRound
						aria-label={t(FOOTER_CONTROLS.CUSTOMIZE_ARIA)}
						data-testid={FOOTER_CONTROLS.CUSTOMIZE_TEST_ID}
						colorScheme='teal'
						size='md'
						icon={<FaCog />}
						onClick={() => dispatch(toggleCustomize())}
					/>
				</Flex>
				<Flex align='center' justify='center' gap={4}>
					<IconButton
						isRound
						aria-label={t(FOOTER_CONTROLS.PREV_ARIA)}
						data-testid={FOOTER_CONTROLS.PREV_TEST_ID}
						colorScheme='teal'
						size='md'
						icon={<FaStepBackward />}
						onClick={onPrev}
					/>
					{hasThreshold && (
						<IconButton
							isRound
							id={isPaused ? 'play-btn' : 'pause-btn'}
							aria-label={t(
								isPaused
									? FOOTER_CONTROLS.PLAY_ARIA
									: FOOTER_CONTROLS.PAUSE_ARIA
							)}
							data-testid={FOOTER_CONTROLS.TOGGLE_TEST_ID}
							colorScheme='teal'
							size='lg'
							icon={isPaused ? <FaPlay /> : <FaPause />}
							onClick={onTogglePause}
						/>
					)}
					<IconButton
						isRound
						aria-label={t(FOOTER_CONTROLS.NEXT_ARIA)}
						data-testid={FOOTER_CONTROLS.NEXT_TEST_ID}
						colorScheme='teal'
						size='md'
						icon={<FaStepForward />}
						onClick={onNext}
					/>
				</Flex>
				<Flex flex='1' justify='center'>
					<IconButton
						isRound
						aria-label={t(FOOTER_CONTROLS.ABOUT_ARIA)}
						data-testid={FOOTER_CONTROLS.ABOUT_TEST_ID}
						colorScheme='teal'
						size='md'
						icon={<FaQuestion />}
						onClick={() => dispatch(toggleAbout())}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FooterControls;
