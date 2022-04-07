import { useEffect, useRef } from 'react';

type IUseEventListener = (
	type: string,
	callback: (e: Event | KeyboardEvent) => void,
	element: Window | HTMLElement
) => void;

const useEventListener: IUseEventListener = (
	type,
	callback,
	element = window
) => {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element == null) return;
		element.addEventListener(type, callbackRef.current);

		return () => element.removeEventListener(type, callbackRef.current);
	}, [type, element]);
};

export default useEventListener;
