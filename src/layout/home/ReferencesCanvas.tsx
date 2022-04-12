import React, { FC, useEffect, useState } from 'react';
import { Flex, useEventListener } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { setReader } from '@utils/reader';

interface IReferencesCanvas {
	imgs?: FileList;
	current: number;
}

const ReferencesCanvas: FC<IReferencesCanvas> = (props) => {
	const { imgs, current } = props;
	const [zoom, setZoom] = useState<number>(1.0);
	const refCanvasId = 'reference-item';
	const zoomStep = 0.2;

	useEventListener('keypress', (e) => {
		switch (e.key) {
			case '-':
				setZoom(zoom - zoomStep);
				return;
			case '+':
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
		<Flex h='100%' w='100%' align='center' justify='center' overflow='hidden'>
			{props.imgs && (
				<motion.img
					id={refCanvasId}
					alt='Reference'
					drag
					dragMomentum={false}
					animate={{ scale: zoom }}
					height='auto'
					width='auto'
				/>
			)}
		</Flex>
	);
};

export default ReferencesCanvas;
