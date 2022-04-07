import { useState } from 'react';

type IUseToggle = (initValue?: boolean) => {
	value: boolean;
	onToggle: () => void;
};

const useToggle: IUseToggle = (initValue = false) => {
	const [value, setValue] = useState<boolean>(initValue);

	const onToggle = (): void => {
		setValue(!value);
	};

	return { value, onToggle };
};

export default useToggle;
