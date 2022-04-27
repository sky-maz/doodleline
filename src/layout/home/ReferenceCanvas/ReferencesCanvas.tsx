import React, { FC, useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	useEventListener,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { setReader } from '@utils/reader';

interface IReferencesCanvas {
	imgs?: File[];
	current: number;
}

const ReferencesCanvas: FC<IReferencesCanvas> = ({ imgs, current }) => {
	const [zoom, setZoom] = useState<number>(1.0);
	const refCanvasId = 'reference-item';
	const zoomStep = 0.2;

	useEventListener('keypress', (e) => {
		switch (e.key) {
			case '-':
				setZoom(zoom - zoomStep);
				return;
			case '=':
				setZoom(zoom + zoomStep);
				return;
			default:
				return;
		}
	});

	useEffect(() => {
		if (imgs) {
			setReader(refCanvasId, imgs[current]);
			setZoom(1.0);
		}
	}, [imgs, current]);

	return (
		<Flex flex='1' align='center' justify='center' overflow='hidden'>
			{imgs && (
				<Box
					as={motion.img}
					id={refCanvasId}
					src='/example.jpeg'
					alt='Reference'
					drag
					dragMomentum={false}
					animate={{ scale: zoom }}
					h='auto'
					w='auto'
					maxH='100%'
					maxW='100%'
				/>
			)}
		</Flex>
	);
};

export default ReferencesCanvas;
