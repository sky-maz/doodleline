import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import {
	Box,
	Flex,
	IconButton,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Heading,
	Tooltip,
} from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdClear, MdGrid4X4, MdRedo, MdUndo } from 'react-icons/md';
import { setReader } from '@utils/reader';

import REFERENCES_CANVAS from './ReferencesCanvas.constants';
import { useHomeContext } from '@reducers/home/HomeProvider';

type Events =
	| React.MouseEvent
	| React.TouchEvent
	| React.PointerEvent
	| MouseEvent
	| TouchEvent
	| PointerEvent;

const ReferencesCanvas: FC = () => {
	const { t } = useTranslation('home');
	const dragControls = useDragControls();
	const [grid, setGrid] = useState<boolean>(false);
	const [rotation, setRotation] = useState<number>(0);
	const [zoom, setZoom] = useState<number>(50);
	const {
		state: { settings, current },
	} = useHomeContext();

	const hasReferences = settings && settings.images.length > 0;
	const refCanvasId = 'reference-item';

	const startDrag = (e: Events) => dragControls.start(e, {});

	const resetPosition = () => {
		const imgElement = document.getElementById(refCanvasId);
		if (imgElement) {
			setRotation(0);
			setZoom(50);
			imgElement.style.transform = 'none';
		}
	};

	useEffect(() => {
		if (hasReferences) {
			setReader(refCanvasId, settings.images[current]);
			resetPosition();
		}
	}, [settings, current]);

	return (
		<Flex
			data-testid={REFERENCES_CANVAS.TEST_ID}
			flex='1'
			align='center'
			justify='center'
			overflow='hidden'
		>
			{hasReferences ? (
				<>
					<Box
						as={motion.img}
						id={refCanvasId}
						data-testid={REFERENCES_CANVAS.REFERENCE_TEST_ID}
						aria-label={t(REFERENCES_CANVAS.REFERENCE_ARIA)}
						alt={t(REFERENCES_CANVAS.REFERENCE_ARIA)}
						drag
						dragControls={dragControls}
						dragMomentum={false}
						animate={{ scale: zoom / 50, rotate: rotation }}
						h='auto'
						w='auto'
						maxH='100%'
						maxW='100%'
					/>
					<Flex
						onPointerDown={startDrag}
						pos='absolute'
						direction='column'
						alignSelf='flex-start'
						justify='stretch'
						height='calc(100% - 6em)'
						width='100%'
					>
						{grid &&
							[0, 1, 2, 3].map((row) => (
								<Flex key={`grid-row-${row}`} flex='1'>
									{[0, 1, 2, 3].map((column) => (
										<Flex
											key={`grid-cell-${row}-${column}`}
											flex='1'
											border='1px solid rgba(0,0,0,0.2)'
										/>
									))}
								</Flex>
							))}
					</Flex>
					<Flex
						pos='absolute'
						direction='column'
						alignSelf='flex-end'
						align='center'
						right={0}
						p={4}
						gap='1em'
					>
						<Tooltip
							label={t(REFERENCES_CANVAS.TOGGLE_GRID_ARIA)}
							placement='left'
						>
							<IconButton
								data-testid={REFERENCES_CANVAS.TOGGLE_GRID_TEST_ID}
								aria-label={t(REFERENCES_CANVAS.TOGGLE_GRID_ARIA)}
								colorScheme={grid ? 'green' : undefined}
								icon={<MdGrid4X4 />}
								onClick={() => setGrid(!grid)}
							/>
						</Tooltip>
						<Tooltip
							label={t(REFERENCES_CANVAS.RESET_POSITION_ARIA)}
							placement='left'
						>
							<IconButton
								data-testid={REFERENCES_CANVAS.RESET_POSITION_TEST_ID}
								aria-label={t(REFERENCES_CANVAS.RESET_POSITION_ARIA)}
								icon={<MdClear />}
								onClick={resetPosition}
							/>
						</Tooltip>
						<Tooltip
							label={t(REFERENCES_CANVAS.ROTATE_LEFT_ARIA)}
							placement='left'
						>
							<IconButton
								data-testid={REFERENCES_CANVAS.ROTATE_LEFT_TEST_ID}
								aria-label={t(REFERENCES_CANVAS.ROTATE_LEFT_ARIA)}
								icon={<MdRedo />}
								onClick={() => setRotation(rotation + 45)}
							/>
						</Tooltip>
						<Tooltip
							label={t(REFERENCES_CANVAS.ROTATE_RIGHT_ARIA)}
							placement='left'
						>
							<IconButton
								data-testid={REFERENCES_CANVAS.ROTATE_RIGHT_TEST_ID}
								aria-label={t(REFERENCES_CANVAS.ROTATE_RIGHT_ARIA)}
								icon={<MdUndo />}
								onClick={() => setRotation(rotation - 45)}
							/>
						</Tooltip>
						<FaPlus color='green' />
						<Slider
							data-testid={REFERENCES_CANVAS.ZOOM_TEST_ID}
							aria-label={t(REFERENCES_CANVAS.ZOOM_ARIA)}
							size='lg'
							orientation='vertical'
							minH='20em'
							colorScheme='green'
							min={25}
							max={150}
							value={zoom}
							onChange={(value) => setZoom(value)}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
						<FaMinus color='green' />
					</Flex>
				</>
			) : (
				<Heading>{t(REFERENCES_CANVAS.NO_REFERENCES_MSG)}</Heading>
			)}
		</Flex>
	);
};

export default ReferencesCanvas;
