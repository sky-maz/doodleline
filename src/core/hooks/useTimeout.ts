import { useCallback, useEffect, useRef } from 'react';

type IUseTimeout = (
	callback: () => void,
	delay: number
) => { onReset: () => void; onClear: () => void };

const useTimeout: IUseTimeout = (callback, delay) => {
	const callbackRef = useRef<() => void>(callback);
	const timeoutRef = useRef<NodeJS.Timeout>();

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(callbackRef.current, delay);
	}, [delay]);

	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	return { onReset: reset, onClear: clear };
};

export default useTimeout;
