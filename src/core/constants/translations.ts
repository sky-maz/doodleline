import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

// NSs
export const NS = {
	COMMON: 'common',
	HOME: 'home',
};

// Common NS

// Home NS
export const SETTINGS_MODAL = {
	TITLE: 'settings_modal_title',
	ARIA: 'settings_modal_aria',
	PRACTICE_LABEL: 'practice_label',
	PRACTICE_ARIA: 'practice_aria',
	PRACTICE_OPTIONS: [
		{ key: 'reference_option', value: 'REFERENCE' },
		{ key: 'structure_option', value: 'STRUCTURE' },
		{ key: 'mirror_option', value: 'MIRROR' },
		{ key: 'strategic_option', value: 'STRATEGIC' },
	],
	TIMER_LABEL: 'timer_label',
	TIMER_ARIA: 'timer_aria',
	TIMER_OPTIONS: [
		{ key: 'segs_option', value: 30 },
		{ key: 'min_option', value: 60 },
		{ key: 'mins_option', value: 180 },
		{ key: 'mins_option', value: 300 },
		{ key: 'mins_option', value: 600 },
		{ key: 'mins_option', value: 1800 },
		{ key: 'mins_option', value: 3600 },
		{ key: 'free_option', value: 0 },
	],
	REFERENCES_EMPTY_LABEL: 'references_empty_label',
	REFERENCES_DATA_LABEL: 'references_data_label',
	REFERENCES_ARIA: 'references_aria',
	RANDOM_LABEL: 'random_label',
	RANDOM_ARIA: 'random_aria',
	BTN_TEXT: 'settings_btn_text',
	BTN_ARIA: 'settings_btn_aria',
	TOAST_TITLE: 'toast_title',
	TOAST_DESCRIPTION: 'toast_description',
};

export const FOOTER_CONTROLS = {
	CUSTOMIZE_ARIA: 'customize_aria',
	PREV_ARIA: 'previous_aria',
	PLAY_ARIA: 'play_aria',
	PAUSE_ARIA: 'pause_aria',
	NEXT_ARIA: 'next_aria',
	ABOUT_ARIA: 'about_aria',
};

export const ABOUT_MODAL = {
	ARIA: 'about_modal_aria',
	INSTRUCTIONS_TITLE: 'instructions_title',
	INSTRUCTIONS_DESCRIPTION: 'instructions_description',
	INSTRUCTIONS_TYPES: [
		{ name: 'instructions_reference_def', desc: 'instructions_reference_desc' },
		{ name: 'instructions_structure_def', desc: 'instructions_structure_desc' },
		{ name: 'instructions_mirror_def', desc: 'instructions_mirror_desc' },
		{ name: 'instructions_strategic_def', desc: 'instructions_strategic_desc' },
	],
	SHORTCUTS_TITLE: 'shortcuts_title',
	SHORTCUTS: [
		{ key: 'shortcut_about_modal', shortcut: 'Tab' },
		{ key: 'shortcut_customize_modal', shortcut: 'Shift' },
		{ key: 'shortcut_prev_reference', shortcut: '&#8592;' },
		{ key: 'shortcut_toggle_practice', shortcut: 'Space' },
		{ key: 'shortcut_next_reference', shortcut: '&#8594;	' },
	],
	SOCIALS: [
		{ key: 'discord_aria', color: 'blue', to: '#discord', Icon: FaDiscord },
		{
			key: 'instagram_aria',
			color: 'purple',
			to: '#instagram',
			Icon: FaInstagram,
		},
		{ key: 'tiktok_aria', color: 'gray', to: '#tiktok', Icon: FaTiktok },
		{ key: 'youtube_aria', color: 'red', to: '#youtube', Icon: FaYoutube },
	],
	COPYRIGHT: 'about_modal_copyright',
};

export const CUSTOMIZE_MODAL = {};
