/* eslint-disable react-hooks/exhaustive-deps */
import {
	DependencyList,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

type AsyncResult<T> = { status: Status; error?: string; data?: T };

const useAsync = <T>(
	callback: () => Promise<T | string>,
	dependencies: DependencyList
): AsyncResult<T> => {
	const [status, setStatus] = useState<Status>(Status.IDLE);
	const errorRef = useRef<string>();
	const dataRef = useRef<T>();

	const callbackMemoized = useCallback(() => {
		errorRef.current = undefined;
		dataRef.current = undefined;
		setStatus(Status.LOADING);

		callback()
			.then((resp) => {
				dataRef.current = resp as T;
				setStatus(Status.SUCCESS);
			})
			.catch((err) => {
				errorRef.current = err;
				setStatus(Status.ERROR);
			});
	}, [...dependencies]);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return {
		status,
		error: errorRef.current,
		data: dataRef.current,
	};
};

export { Status };
export default useAsync;
