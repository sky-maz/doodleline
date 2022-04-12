export const asTime = (time: number): string => {
	const mins = Math.floor(time / 60);
	const segs = time % 60;
	const minsString = mins < 10 ? `0${mins}` : `${mins}`;
	const segsString = segs < 10 ? `0${segs}` : `${segs}`;
	return `${minsString}:${segsString}`;
};
