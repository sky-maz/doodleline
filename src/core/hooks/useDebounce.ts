/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect } from 'react';
import useTimeout from './useTimeout';

type IUseDebounce = (
	callback: () => void,
	delay: number,
	dependencies: DependencyList
) => void;

const useDebounce: IUseDebounce = (callback, delay, dependencies) => {
	const { onReset, onClear } = useTimeout(callback, delay);
	useEffect(onReset, [...dependencies, onReset]);
	useEffect(onClear, []);
};

export default useDebounce;
