export type Settings = { type: string; timer: number; imgs: FileList };

type SelectItem = { name: string; value: string };
export const practiceOptions: SelectItem[] = [
	{ name: 'Reference', value: 'REFERENCE' },
	{ name: 'Structure', value: 'STRUCTURE' },
	{ name: 'Mirror', value: 'MIRROR' },
	{ name: 'Strategic', value: 'STRATEGIC' },
];

export const timerOptions: SelectItem[] = [
	{ name: '30 segs', value: '30' },
	{ name: '1 min', value: '60' },
	{ name: '3 mins', value: '180' },
	{ name: '5 mins', value: '300' },
	{ name: '10 mins', value: '600' },
	{ name: '30 mins', value: '1800' },
	{ name: '60 mins', value: '3600' },
	{ name: 'Free', value: '0' },
];

export const languageOptions: SelectItem[] = [
	{ name: 'English', value: 'en' },
	{ name: 'Español', value: 'sp' },
];

export const colorOptions: SelectItem[] = [];
